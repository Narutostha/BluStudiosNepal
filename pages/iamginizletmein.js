import { useState, useEffect, useCallback } from 'react'
import Head from 'next/head'
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(null)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [debugMode, setDebugMode] = useState(false)
  const [tables, setTables] = useState([])
  const [schema, setSchema] = useState({})
  const [editingItem, setEditingItem] = useState(null)
  const [formValues, setFormValues] = useState({})
  const [showAddForm, setShowAddForm] = useState(false)
  const [initializing, setInitializing] = useState(true)

  // Discover tables from Supabase
  const discoverTables = useCallback(async () => {
    try {
      console.log('Discovering database tables...')
      
      // First try to get list of tables directly from Supabase
      const { data: tableData, error: tableError } = await supabase
        .from('information_schema.tables')
        .select('table_name')
        .eq('table_schema', 'public')
        .not('table_name', 'like', 'pg_%')
        .not('table_name', 'like', '_prisma_%')
        .order('table_name')

      if (tableError) {
        console.error('Error discovering tables via information_schema:', tableError)
        
        // Try another method - get all tables by trying meta query
        try {
          const { data: metaData } = await supabase.rpc('get_table_list')
          
          if (metaData && Array.isArray(metaData)) {
            console.log('Tables discovered via RPC:', metaData)
            
            const formattedTables = metaData
              .filter(table => !table.startsWith('_') && !table.startsWith('pg_'))
              .map(tableName => ({
                id: tableName,
                name: formatTableName(tableName)
              }))
            
            setTables(formattedTables)
            if (formattedTables.length > 0 && !activeTab) {
              setActiveTab(formattedTables[0].id)
            }
            return formattedTables
          }
        } catch (rpcError) {
          console.error('RPC table discovery failed:', rpcError)
        }
        
        // If both methods fail, try direct querying of known tables
        console.log('Falling back to direct table detection...')
        const knownTables = ['callback_requests', 'consultations', 'contacts', 'service_quote_requests']
        const existingTables = []
        
        for (const table of knownTables) {
          try {
            const { error: testError } = await supabase
              .from(table)
              .select('count', { count: 'exact', head: true })
            
            if (!testError) {
              existingTables.push({
                id: table,
                name: formatTableName(table)
              })
            }
          } catch (e) {
            console.log(`Table ${table} not found`)
          }
        }
        
        if (existingTables.length > 0) {
          console.log('Tables discovered via direct testing:', existingTables)
          setTables(existingTables)
          if (!activeTab) {
            setActiveTab(existingTables[0].id)
          }
          return existingTables
        }
        
        // Last resort - just use the default tables
        const defaultTables = [
          { id: 'callback_requests', name: 'Callback Requests' },
          { id: 'consultations', name: 'Consultations' },
          { id: 'contacts', name: 'Contact Form Submissions' },
          { id: 'service_quote_requests', name: 'Service Quote Requests' }
        ]
        
        console.log('Using default table list as last resort')
        setTables(defaultTables)
        if (!activeTab) {
          setActiveTab(defaultTables[0].id)
        }
        return defaultTables
      }
      
      // If we successfully got tables from information_schema
      if (tableData && tableData.length > 0) {
        console.log('Tables discovered via information_schema:', tableData)
        
        const formattedTables = tableData
          .map(table => ({
            id: table.table_name,
            name: formatTableName(table.table_name)
          }))
          .filter(table => !table.id.startsWith('_'))
        
        console.log('Formatted tables:', formattedTables)
        setTables(formattedTables)
        
        if (formattedTables.length > 0 && !activeTab) {
          setActiveTab(formattedTables[0].id)
        }
        
        return formattedTables
      }
      
      // If we get here, we found no tables
      throw new Error('No tables found in database')
      
    } catch (err) {
      console.error('Error discovering tables:', err)
      setError(`Failed to discover database tables: ${err.message}`)
      
      // Fallback to default tables
      const defaultTables = [
        { id: 'callback_requests', name: 'Callback Requests' },
        { id: 'consultations', name: 'Consultations' },
        { id: 'contacts', name: 'Contact Form Submissions' },
        { id: 'service_quote_requests', name: 'Service Quote Requests' }
      ]
      
      setTables(defaultTables)
      if (!activeTab) {
        setActiveTab(defaultTables[0].id)
      }
      return defaultTables
    }
  }, [activeTab])

  // Helper to format table names for display
  const formatTableName = (tableName) => {
    return tableName
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  // Discover schema for a table
  const discoverTableSchema = useCallback(async (tableName) => {
    if (!tableName) return null
    
    try {
      console.log(`Discovering schema for table: ${tableName}`)
      
      // Try to get columns from information_schema
      const { data: columnData, error: columnError } = await supabase
        .from('information_schema.columns')
        .select('column_name, data_type, is_nullable, column_default')
        .eq('table_name', tableName)
        .eq('table_schema', 'public')
        .order('ordinal_position')
      
      if (columnError) {
        console.error(`Error fetching schema from information_schema for ${tableName}:`, columnError)
        
        // Fall back to inferring schema from data
        return await inferSchemaFromData(tableName)
      }
      
      if (columnData && columnData.length > 0) {
        console.log(`Schema discovered for ${tableName}:`, columnData)
        
        const tableSchema = columnData.map(column => ({
          name: column.column_name,
          type: mapPostgresTypeToJs(column.data_type),
          nullable: column.is_nullable === 'YES',
          hasDefault: !!column.column_default,
          originalType: column.data_type
        }))
        
        // Update schema state
        setSchema(prev => ({
          ...prev,
          [tableName]: tableSchema
        }))
        
        return tableSchema
      }
      
      // If we get here, try to infer the schema from data
      return await inferSchemaFromData(tableName)
      
    } catch (err) {
      console.error(`Error discovering schema for ${tableName}:`, err)
      
      // Try to infer schema from data as last resort
      return await inferSchemaFromData(tableName)
    }
  }, [])

  // Helper to infer schema from actual data
  const inferSchemaFromData = async (tableName) => {
    try {
      console.log(`Inferring schema from data for ${tableName}...`)
      
      // Get a sample of data to infer schema
      const { data: sampleData, error: sampleError } = await supabase
        .from(tableName)
        .select('*')
        .limit(5)
      
      if (sampleError) {
        console.error(`Error fetching sample data from ${tableName}:`, sampleError)
        throw sampleError
      }
      
      if (!sampleData || sampleData.length === 0) {
        console.log(`No sample data available for ${tableName}, creating minimal schema`)
        
        // Create a minimal schema with just id and created_at
        const minimalSchema = [
          { name: 'id', type: 'number', nullable: false, hasDefault: true },
          { name: 'created_at', type: 'datetime', nullable: true, hasDefault: true }
        ]
        
        setSchema(prev => ({
          ...prev,
          [tableName]: minimalSchema
        }))
        
        return minimalSchema
      }
      
      // Combine all fields from all rows
      const allFields = new Set()
      sampleData.forEach(row => {
        Object.keys(row).forEach(key => allFields.add(key))
      })
      
      // Create schema from all found fields
      const inferredSchema = Array.from(allFields).map(field => {
        // Find first non-null value for this field
        const sampleValue = sampleData.find(row => row[field] !== null && row[field] !== undefined)?.[field]
        const valueType = sampleValue !== undefined ? typeof sampleValue : 'string'
        
        // Detect if it's a date field
        const isDateField = (field.includes('date') || field.includes('_at')) && 
                            (valueType === 'string' && isIsoDateString(String(sampleValue)))
        
        return {
          name: field,
          type: isDateField ? 'datetime' : valueType,
          nullable: sampleData.some(row => row[field] === null || row[field] === undefined),
          hasDefault: field === 'id' || field === 'created_at' || field === 'updated_at'
        }
      })
      
      console.log(`Inferred schema for ${tableName}:`, inferredSchema)
      
      // Update schema state
      setSchema(prev => ({
        ...prev,
        [tableName]: inferredSchema
      }))
      
      return inferredSchema
    } catch (err) {
      console.error(`Error inferring schema for ${tableName}:`, err)
      
      // Return a minimal default schema
      const defaultSchema = [
        { name: 'id', type: 'number', nullable: false, hasDefault: true },
        { name: 'created_at', type: 'datetime', nullable: true, hasDefault: true }
      ]
      
      setSchema(prev => ({
        ...prev,
        [tableName]: defaultSchema
      }))
      
      return defaultSchema
    }
  }

  // Helper to check if a string is an ISO date
  const isIsoDateString = (str) => {
    if (typeof str !== 'string') return false
    return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(str)
  }

  // Helper to map Postgres data types to JavaScript types
  const mapPostgresTypeToJs = (pgType) => {
    if (!pgType) return 'string'
    
    const pgTypeLower = pgType.toLowerCase()
    
    if (pgTypeLower.includes('int') || pgTypeLower.includes('float') || 
        pgTypeLower.includes('decimal') || pgTypeLower.includes('numeric') ||
        pgTypeLower.includes('double') || pgTypeLower.includes('real')) {
      return 'number'
    }
    
    if (pgTypeLower.includes('bool')) {
      return 'boolean'
    }
    
    if (pgTypeLower.includes('json')) {
      return 'object'
    }
    
    if (pgTypeLower.includes('timestamp') || pgTypeLower.includes('date') || 
        pgTypeLower.includes('time')) {
      return 'datetime'
    }
    
    // Default to string for everything else
    return 'string'
  }

  // Fetch data from a table
  const fetchData = async (tableName) => {
    if (!tableName) return
    
    setLoading(true)
    setError(null)
    
    try {
      console.log(`Fetching data from ${tableName}...`)
      
      // Check if schema exists for this table, if not, discover it
      if (!schema[tableName]) {
        await discoverTableSchema(tableName)
      }
      
      // Get column that can be used for sorting (prefer created_at, then id, then first column)
      const tableSchema = schema[tableName] || []
      let orderColumn = 'created_at'
      
      if (!tableSchema.some(col => col.name === 'created_at')) {
        if (tableSchema.some(col => col.name === 'id')) {
          orderColumn = 'id'
        } else if (tableSchema.length > 0) {
          orderColumn = tableSchema[0].name
        }
      }
      
      // Fetch the data
      const { data: tableData, error: dataError, status, statusText } = await supabase
        .from(tableName)
        .select('*')
        .order(orderColumn, { ascending: false })
      
      console.log(`Response status: ${status} ${statusText}`)
      
      if (dataError) {
        console.error(`Error fetching data from ${tableName}:`, dataError)
        throw dataError
      }
      
      console.log(`Data fetched from ${tableName}:`, tableData)
      console.log(`Number of records: ${tableData?.length || 0}`)
      
      setData(tableData || [])
    } catch (err) {
      console.error(`Error in fetchData for ${tableName}:`, err)
      
      const errorMessage = err.message || err.toString()
      const errorCode = err.code || 'Unknown error code'
      const hint = getErrorHint(err, tableName)
      
      setError(`Failed to load data from ${tableName}. ${errorMessage} (${errorCode})\n${hint}`)
      setData([])
    } finally {
      setLoading(false)
    }
  }

  // Get error hint based on error message
  const getErrorHint = (err, tableName) => {
    const errorMsg = err.message || ''
    
    if (errorMsg.includes('not found') || errorMsg.includes('does not exist')) {
      return `Hint: Table "${tableName}" might not exist in your database.`
    }
    
    if (errorMsg.includes('permission denied') || errorMsg.includes('access denied')) {
      return 'Hint: Check your Supabase Row Level Security (RLS) policies.'
    }
    
    if (errorMsg.includes('network') || errorMsg.includes('fetch')) {
      return 'Hint: Check your internet connection or Supabase endpoint URL.'
    }
    
    if (errorMsg.includes('auth') || errorMsg.includes('key')) {
      return 'Hint: Your API key might be invalid or expired.'
    }
    
    return 'Hint: Check browser console for more details.'
  }

  // Initialize dashboard
  useEffect(() => {
    const initializeDashboard = async () => {
      if (!isAuthenticated) return
      
      setInitializing(true)
      
      try {
        console.log('Initializing dashboard...')
        
        // Verify Supabase connection
        if (!supabase) {
          throw new Error('Supabase client is not initialized')
        }
        
        // Discover available tables
        const discoveredTables = await discoverTables()
        
        if (discoveredTables && discoveredTables.length > 0) {
          // Set active tab if not already set
          const firstTable = discoveredTables[0].id
          if (!activeTab) {
            setActiveTab(firstTable)
          }
          
          // Fetch schema for active table
          const tableToUse = activeTab || firstTable
          await discoverTableSchema(tableToUse)
          
          // Fetch data for active table
          await fetchData(tableToUse)
        } else {
          setError('No tables were found in your database. Please check your Supabase setup.')
        }
      } catch (err) {
        console.error('Error initializing dashboard:', err)
        setError(`Failed to initialize dashboard: ${err.message}`)
      } finally {
        setInitializing(false)
      }
    }
    
    if (isAuthenticated) {
      initializeDashboard()
    }
  }, [isAuthenticated, discoverTables, discoverTableSchema, activeTab])

  // Fetch data when active tab changes
  useEffect(() => {
    if (isAuthenticated && activeTab && !initializing) {
      fetchData(activeTab)
    }
  }, [activeTab, isAuthenticated, initializing])

  // Handle authentication
  const authenticate = (e) => {
    e.preventDefault()
    // Simple password protection - in a real app, use proper authentication
    if (password === 'BluAdmin2025!') {
      setIsAuthenticated(true)
      setPasswordError(false)
    } else {
      setPasswordError(true)
    }
  }

  // Handle tab change
  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
    
    // Reset editing state
    setEditingItem(null)
    setFormValues({})
    setShowAddForm(false)
  }

  // Get appropriate input type for a schema field
  const getInputTypeForField = (field) => {
    if (field.name === 'id') return 'hidden'
    
    if (field.name === 'created_at' || field.name === 'updated_at' || 
        field.type === 'datetime' || field.name.includes('date')) {
      return 'datetime-local'
    }
    
    if (field.name.includes('email')) return 'email'
    if (field.name.includes('phone') || field.name.includes('contact_info')) return 'tel'
    if (field.name.includes('password')) return 'password'
    
    if (field.type === 'number') return 'number'
    if (field.type === 'boolean') return 'checkbox'
    
    if (field.name.includes('message') || field.name.includes('details') || 
        field.name.includes('description') || field.name.includes('content') ||
        field.name.includes('notes')) {
      return 'textarea'
    }
    
    return 'text'
  }

  // Format value for display
  const formatValue = (value, fieldName, fieldType) => {
    if (value === null || value === undefined) return 'N/A'
    
    // Format dates and timestamps
    if (fieldType === 'datetime' || fieldName.includes('date') || 
        fieldName === 'created_at' || fieldName === 'updated_at') {
      try {
        return new Date(value).toLocaleString()
      } catch (e) {
        return String(value)
      }
    }
    
    // Format objects and arrays
    if (typeof value === 'object') {
      return JSON.stringify(value)
    }
    
    // Format booleans
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No'
    }
    
    // Default string conversion
    return String(value)
  }

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormValues(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Format input value for form fields
  const formatInputValue = (value, fieldType) => {
    if (value === null || value === undefined) {
      return fieldType === 'boolean' ? false : ''
    }
    
    if (fieldType === 'datetime' && value) {
      try {
        // Format date for datetime-local input (YYYY-MM-DDTHH:MM)
        const date = new Date(value)
        
        if (isNaN(date.getTime())) return ''
        
        return new Date(value).toISOString().substring(0, 16)
      } catch (e) {
        return ''
      }
    }
    
    if (fieldType === 'object' && typeof value === 'object') {
      return JSON.stringify(value)
    }
    
    return value
  }

  // Start editing an item
  const startEditing = (item) => {
    setEditingItem(item)
    
    // Format values for the form
    const formattedValues = {}
    const tableSchema = schema[activeTab] || []
    
    for (const key in item) {
      const fieldSchema = tableSchema.find(field => field.name === key) || { type: typeof item[key] }
      formattedValues[key] = formatInputValue(item[key], fieldSchema.type)
    }
    
    setFormValues(formattedValues)
    setShowAddForm(false)
  }

  // Cancel editing
  const cancelEditing = () => {
    setEditingItem(null)
    setFormValues({})
  }

  // Update an item
  const updateItem = async () => {
    try {
      setLoading(true)
      
      // Don't modify these fields
      const { id, created_at, ...updateData } = formValues
      
      // Format data for update
      const tableSchema = schema[activeTab] || []
      const formattedData = {}
      
      for (const key in updateData) {
        const fieldSchema = tableSchema.find(field => field.name === key)
        
        if (!fieldSchema) {
          formattedData[key] = updateData[key]
          continue
        }
        
        if (fieldSchema.type === 'number' && updateData[key] !== '') {
          formattedData[key] = Number(updateData[key])
        } else if (fieldSchema.type === 'boolean') {
          formattedData[key] = Boolean(updateData[key])
        } else if (fieldSchema.type === 'object' && typeof updateData[key] === 'string') {
          try {
            formattedData[key] = JSON.parse(updateData[key])
          } catch (e) {
            formattedData[key] = updateData[key]
          }
        } else {
          formattedData[key] = updateData[key]
        }
      }
      
      // Add updated_at timestamp if the field exists
      if (tableSchema.some(field => field.name === 'updated_at')) {
        formattedData.updated_at = new Date().toISOString()
      }
      
      const { error } = await supabase
        .from(activeTab)
        .update(formattedData)
        .eq('id', id)
      
      if (error) throw error
      
      // Refresh data
      await fetchData(activeTab)
      
      // Reset form
      setEditingItem(null)
      setFormValues({})
      
    } catch (err) {
      console.error('Error updating item:', err)
      alert(`Error updating item: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  // Delete an item
  const deleteItem = async (id) => {
    if (!confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
      return
    }
    
    try {
      setLoading(true)
      
      const { error } = await supabase
        .from(activeTab)
        .delete()
        .eq('id', id)
      
      if (error) throw error
      
      // Refresh data
      await fetchData(activeTab)
      
    } catch (err) {
      console.error('Error deleting item:', err)
      alert(`Error deleting item: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  // Show form to add a new item
  const showNewItemForm = () => {
    setShowAddForm(true)
    setEditingItem(null)
    
    // Initialize form with default values based on schema
    const tableSchema = schema[activeTab] || []
    const defaults = {}
    
    tableSchema.forEach(field => {
      if (field.name !== 'id' && field.name !== 'created_at' && field.name !== 'updated_at') {
        if (field.type === 'boolean') {
          defaults[field.name] = false
        } else if (field.type === 'number') {
          defaults[field.name] = ''
        } else if (field.type === 'object') {
          defaults[field.name] = '{}'
        } else {
          defaults[field.name] = ''
        }
      }
    })
    
    setFormValues(defaults)
  }

  // Add a new item
  const addNewItem = async () => {
    try {
      setLoading(true)
      
      // Format data for insert
      const tableSchema = schema[activeTab] || []
      const formattedData = {}
      
      for (const key in formValues) {
        const fieldSchema = tableSchema.find(field => field.name === key)
        
        if (!fieldSchema) {
          formattedData[key] = formValues[key]
          continue
        }
        
        if (fieldSchema.type === 'number' && formValues[key] !== '') {
          formattedData[key] = Number(formValues[key])
        } else if (fieldSchema.type === 'boolean') {
          formattedData[key] = Boolean(formValues[key])
        } else if (fieldSchema.type === 'object' && typeof formValues[key] === 'string') {
          try {
            formattedData[key] = JSON.parse(formValues[key])
          } catch (e) {
            formattedData[key] = formValues[key]
          }
        } else {
          formattedData[key] = formValues[key]
        }
      }
      
      // Add timestamps if the fields exist
      if (tableSchema.some(field => field.name === 'created_at')) {
        formattedData.created_at = new Date().toISOString()
      }
      
      if (tableSchema.some(field => field.name === 'updated_at')) {
        formattedData.updated_at = new Date().toISOString()
      }
      
      const { error } = await supabase
        .from(activeTab)
        .insert(formattedData)
      
      if (error) throw error
      
      // Refresh data
      await fetchData(activeTab)
      
      // Reset form
      setShowAddForm(false)
      setFormValues({})
      
    } catch (err) {
      console.error('Error adding item:', err)
      alert(`Error adding item: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  // Toggle debug mode
  const toggleDebugMode = () => {
    setDebugMode(!debugMode)
  }

  // Render the edit/add form
  const renderForm = () => {
    const tableSchema = schema[activeTab] || []
    const isEditing = !!editingItem
    
    // Sort fields to show required/important fields first
    const sortedSchema = [...tableSchema].sort((a, b) => {
      // System fields go last
      if (a.name === 'id' || a.name === 'created_at' || a.name === 'updated_at') return 1
      if (b.name === 'id' || b.name === 'created_at' || b.name === 'updated_at') return -1
      
      // Required fields go first
      if (!a.nullable && b.nullable) return -1
      if (a.nullable && !b.nullable) return 1
      
      // Sort by name
      return a.name.localeCompare(b.name)
    })
    
    return (
      <div className="form-container">
        <h3>{isEditing ? 'Edit Item' : 'Add New Item'}</h3>
        
        <div className="form-fields">
          {sortedSchema
            .filter(field => !['id', 'created_at', 'updated_at'].includes(field.name))
            .map(field => (
              <div key={field.name} className="form-group">
                <label htmlFor={field.name}>
                  {field.name.replace(/_/g, ' ')}
                  {!field.nullable && !field.hasDefault && <span className="required">*</span>}
                </label>
                
                {getInputTypeForField(field) === 'textarea' ? (
                  <textarea
                    id={field.name}
                    value={formValues[field.name] || ''}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    rows={4}
                    required={!field.nullable && !field.hasDefault}
                  />
                ) : getInputTypeForField(field) === 'checkbox' ? (
                  <input
                    type="checkbox"
                    id={field.name}
                    checked={!!formValues[field.name]}
                    onChange={(e) => handleInputChange(field.name, e.target.checked)}
                  />
                ) : getInputTypeForField(field) === 'hidden' ? (
                  <input
                    type="hidden"
                    id={field.name}
                    value={formValues[field.name] || ''}
                  />
                ) : (
                  <input
                    type={getInputTypeForField(field)}
                    id={field.name}
                    value={formValues[field.name] || ''}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    required={!field.nullable && !field.hasDefault}
                  />
                )}
              </div>
            ))}
        </div>
        
        <div className="form-actions">
          {isEditing ? (
            <>
              <button
                className="action-button save-button"
                onClick={updateItem}
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                className="action-button cancel-button"
                onClick={cancelEditing}
                disabled={loading}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                className="action-button save-button"
                onClick={addNewItem}
                disabled={loading}
              >
                {loading ? 'Adding...' : 'Add Item'}
              </button>
              <button
                className="action-button cancel-button"
                onClick={() => setShowAddForm(false)}
                disabled={loading}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    )
  }

  // Render the table data
  const renderTableData = () => {
    if (initializing) return <div className="loading">Initializing dashboard...</div>
    if (loading && !data.length) return <div className="loading">Loading data...</div>
    if (error) return <div className="error-message">{error}</div>
    if (data.length === 0) return <div className="no-data">No data available</div>

    // Get schema for active table
    const tableSchema = schema[activeTab] || []
    
    // Get all unique keys from the data
    const allKeys = [...new Set(data.flatMap(item => Object.keys(item)))]
    
    // Sort keys in a logical order
    const priorityKeys = ['id', 'name', 'email', 'contact_name', 'company_name', 'status']
    const timeKeys = ['created_at', 'updated_at', 'date']
    
    // Keys that should appear first, in order
    const firstKeys = [...priorityKeys.filter(key => allKeys.includes(key))]
    
    // Keys that should appear last
    const lastKeys = [...timeKeys.filter(key => allKeys.includes(key))]
    
    // All other keys, alphabetically sorted
    const middleKeys = [...allKeys.filter(key => 
      !firstKeys.includes(key) && !lastKeys.includes(key)
    )].sort()
    
    // Final ordered columns
    const orderedKeys = [...firstKeys, ...middleKeys, ...lastKeys]

    return (
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              {orderedKeys.map(key => (
                <th key={key}>{key.replace(/_/g, ' ')}</th>
              ))}
              <th className="actions-column">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              // Find the schema type for each field
              const getFieldType = (fieldName) => {
                const field = tableSchema.find(f => f.name === fieldName)
                return field ? field.type : typeof item[fieldName]
              }
              
              return (
                <tr key={item.id || index} className={editingItem?.id === item.id ? 'editing-row' : ''}>
                  {orderedKeys.map(key => (
                    <td key={`${item.id || index}-${key}`}>
                      {formatValue(item[key], key, getFieldType(key))}
                    </td>
                  ))}
                  <td className="actions-cell">
                    <button 
                      className="table-action-button edit-button"
                      onClick={() => startEditing(item)}
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button 
                      className="table-action-button delete-button"
                      onClick={() => deleteItem(item.id)}
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }

  // Render table stats
  const renderTableStats = () => {
    if (!activeTab || !data || initializing) return null
    
    return (
      <div className="table-stats">
        <div className="stat-item">
          <span className="stat-label">Total Records:</span>
          <span className="stat-value">{data.length}</span>
        </div>
        
        {data.length > 0 && (
          <div className="stat-item">
            <span className="stat-label">Latest Record:</span>
            <span className="stat-value">
              {data[0]?.created_at ? new Date(data[0].created_at).toLocaleString() : 'N/A'}
            </span>
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard - BluStudiosNepal</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="admin-dashboard">
        {!isAuthenticated ? (
          <div className="auth-container">
            <div className="auth-form">
              <h1>Admin Access</h1>
              <p>Please enter the password to access the admin dashboard.</p>
              
              {passwordError && (
                <div className="auth-error">
                  Incorrect password. Please try again.
                </div>
              )}
              
              <form onSubmit={authenticate}>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="auth-button">
                  Login
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="dashboard-container">
            <div className="dashboard-header">
              <h1>Admin Dashboard</h1>
              <p>View and manage data from all database tables</p>
              <div className="header-actions">
                <button 
                  onClick={toggleDebugMode} 
                  className="debug-toggle"
                >
                  {debugMode ? 'Hide Debug Info' : 'Show Debug Info'}
                </button>
              </div>
            </div>

            <div className="tabs">
              {tables.map(table => (
                <button
                  key={table.id}
                  className={`tab-button ${activeTab === table.id ? 'active' : ''}`}
                  onClick={() => handleTabChange(table.id)}
                >
                  {table.name}
                  {activeTab === table.id && (
                    <motion.span
                      className="active-indicator"
                      layoutId="activeTab"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="data-container">
              <div className="data-header">
                <h2>{tables.find(t => t.id === activeTab)?.name || 'Loading...'}</h2>
                <button 
                  className="action-button add-button"
                  onClick={showNewItemForm}
                  disabled={showAddForm || !!editingItem || !activeTab || initializing}
                >
                  {initializing ? 'Loading...' : 'Add New'}
                </button>
              </div>
              
              {renderTableStats()}
              
              {(showAddForm || editingItem) && renderForm()}
              
              {!showAddForm && !editingItem && renderTableData()}
            </div>

            {debugMode && (
              <div className="debug-panel">
                <h3>Debug Information</h3>
                <div className="debug-info">
                  <p><strong>Active Tab:</strong> {activeTab || 'None'}</p>
                  <p><strong>Available Tables:</strong> {tables.length}</p>
                  <p><strong>Data Count:</strong> {data.length}</p>
                  <p><strong>Schema Available:</strong> {schema[activeTab] ? `Yes (${schema[activeTab].length} fields)` : 'No'}</p>
                  <p><strong>Loading Status:</strong> {initializing ? 'Initializing...' : loading ? 'Loading...' : 'Complete'}</p>
                  <p><strong>Error:</strong> {error || 'None'}</p>
                  <p><strong>Supabase URL:</strong> {supabase?.supabaseUrl ? '✓ Set' : '❌ Missing'}</p>
                  <p><strong>API Key:</strong> {supabase?.supabaseKey ? '✓ Set (Masked)' : '❌ Missing'}</p>
                  
                  <div className="debug-actions">
                    <button 
                      onClick={() => fetchData(activeTab)} 
                      className="debug-button"
                      disabled={!activeTab || initializing}
                    >
                      Refresh Data
                    </button>
                    <button 
                      onClick={() => discoverTables()} 
                      className="debug-button"
                      disabled={initializing}
                    >
                      Refresh Tables
                    </button>
                    <button 
                      onClick={() => discoverTableSchema(activeTab)} 
                      className="debug-button"
                      disabled={!activeTab || initializing}
                    >
                      Refresh Schema
                    </button>
                    <button
                      onClick={() => {
                        console.log('Current Schema:', schema[activeTab]);
                        alert('Schema logged to console');
                      }}
                      className="debug-button"
                      disabled={!activeTab || !schema[activeTab]}
                    >
                      Log Schema
                    </button>
                    <button
                      onClick={() => {
                        console.log('Current Data:', data);
                        alert(`Logged ${data.length} records to console`);
                      }}
                      className="debug-button"
                      disabled={data.length === 0}
                    >
                      Log Data
                    </button>
                  </div>
                </div>
                
                {activeTab && schema[activeTab] && (
                  <div className="schema-debug">
                    <h4>Table Schema</h4>
                    <div className="schema-table-container">
                      <table className="schema-table">
                        <thead>
                          <tr>
                            <th>Field</th>
                            <th>Type</th>
                            <th>Required</th>
                            <th>Has Default</th>
                          </tr>
                        </thead>
                        <tbody>
                          {schema[activeTab].map(field => (
                            <tr key={field.name}>
                              <td>{field.name}</td>
                              <td>{field.type}</td>
                              <td>{!field.nullable ? '✓' : ''}</td>
                              <td>{field.hasDefault ? '✓' : ''}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        .admin-dashboard {
          min-height: 100vh;
          background: #0a0a0a;
          color: #fff;
          padding: 2rem;
        }

        .auth-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 80vh;
        }

        .auth-form {
          background: #171e20;
          padding: 2rem;
          border-radius: 10px;
          width: 100%;
          max-width: 400px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .auth-form h1 {
          margin-bottom: 1rem;
          color: #00dc93;
        }

        .auth-form p {
          margin-bottom: 2rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .auth-error {
          background: rgba(255, 68, 68, 0.1);
          color: #ff4444;
          padding: 0.75rem;
          border-radius: 5px;
          margin-bottom: 1rem;
          border: 1px solid rgba(255, 68, 68, 0.2);
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          color: rgba(255, 255, 255, 0.9);
        }

        .form-group input, .form-group textarea {
          width: 100%;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 5px;
          color: #fff;
        }

        .form-group input[type="checkbox"] {
          width: auto;
          margin-right: 0.5rem;
        }

        .required {
          color: #ff4444;
          margin-left: 0.25rem;
        }

        .auth-button {
          width: 100%;
          padding: 0.75rem;
          background: #00dc93;
          color: #080e10;
          border: none;
          border-radius: 5px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .auth-button:hover {
          background: #00c483;
          transform: translateY(-2px);
        }

        .dashboard-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .dashboard-header {
          margin-bottom: 2rem;
          text-align: center;
        }

        .dashboard-header h1 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
          background: linear-gradient(to right, #fff, #00dc93);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .dashboard-header p {
          color: rgba(255, 255, 255, 0.7);
        }

        .header-actions {
          margin-top: 1rem;
          display: flex;
          justify-content: center;
          gap: 1rem;
        }

        .tabs {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .tab-button {
          padding: 0.75rem 1.5rem;
          background: #171e20;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 5px;
          color: #fff;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }

        .tab-button:hover {
          background: rgba(0, 220, 147, 0.1);
          border-color: rgba(0, 220, 147, 0.3);
        }

        .tab-button.active {
          background: rgba(0, 220, 147, 0.1);
          border-color: #00dc93;
          color: #00dc93;
        }

        .active-indicator {
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 2px;
          background: #00dc93;
        }

        .data-container {
          background: #171e20;
          padding: 2rem;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .data-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .data-header h2 {
          color: #00dc93;
          font-size: 1.5rem;
          margin: 0;
        }

        .table-stats {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }

        .stat-item {
          background: rgba(0, 0, 0, 0.2);
          padding: 0.75rem 1rem;
          border-radius: 5px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .stat-label {
          color: rgba(255, 255, 255, 0.7);
          margin-right: 0.5rem;
        }

        .stat-value {
          color: #00dc93;
          font-weight: 500;
        }

        .action-button {
          padding: 0.6rem 1.2rem;
          border-radius: 5px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 1px solid;
        }
        .add-button {
          background: rgba(0, 220, 147, 0.1);
          border-color: #00dc93;
          color: #00dc93;
        }

        .add-button:hover {
          background: rgba(0, 220, 147, 0.2);
          transform: translateY(-2px);
        }

        .add-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }

        .save-button {
          background: rgba(0, 220, 147, 0.1);
          border-color: #00dc93;
          color: #00dc93;
        }

        .save-button:hover {
          background: rgba(0, 220, 147, 0.2);
          transform: translateY(-2px);
        }

        .cancel-button {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.8);
          margin-left: 0.5rem;
        }

        .cancel-button:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .form-container {
          background: rgba(0, 0, 0, 0.2);
          padding: 1.5rem;
          border-radius: 8px;
          margin-bottom: 2rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .form-container h3 {
          margin-top: 0;
          margin-bottom: 1.5rem;
          color: #00dc93;
        }

        .form-fields {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .form-actions {
          margin-top: 2rem;
          display: flex;
          justify-content: flex-end;
        }

        .loading, .error-message, .no-data {
          padding: 2rem;
          text-align: center;
          color: rgba(255, 255, 255, 0.7);
        }

        .error-message {
          color: #ff4444;
          white-space: pre-line;
          font-family: monospace;
          text-align: left;
          background: rgba(255, 68, 68, 0.05);
          padding: 1rem;
          border-radius: 5px;
          border: 1px solid rgba(255, 68, 68, 0.1);
        }

        .table-responsive {
          overflow-x: auto;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .data-table th {
          background: rgba(0, 220, 147, 0.1);
          color: #00dc93;
          padding: 1rem;
          text-transform: capitalize;
          font-weight: 500;
          position: sticky;
          top: 0;
        }

        .actions-column {
          width: 100px;
          text-align: center;
        }

        .data-table td {
          padding: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.9);
          max-width: 300px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .data-table tr:hover td {
          background: rgba(255, 255, 255, 0.03);
        }

        .editing-row td {
          background: rgba(0, 220, 147, 0.05) !important;
        }

        .actions-cell {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
        }

        .table-action-button {
          background: none;
          border: none;
          font-size: 1.2rem;
          cursor: pointer;
          padding: 0.25rem;
          border-radius: 4px;
          transition: all 0.2s ease;
        }

        .edit-button:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .delete-button:hover {
          background: rgba(255, 68, 68, 0.1);
        }

        .debug-panel {
          margin-top: 2rem;
          padding: 1rem;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
        }

        .debug-panel h3, .debug-panel h4 {
          color: #00dc93;
          margin-bottom: 1rem;
        }

        .debug-panel h3 {
          font-size: 1.2rem;
        }

        .debug-panel h4 {
          font-size: 1rem;
          margin-top: 1.5rem;
        }

        .debug-info {
          font-family: monospace;
          font-size: 0.9rem;
        }

        .debug-info p {
          margin-bottom: 0.5rem;
        }

        .debug-actions {
          display: flex;
          gap: 0.5rem;
          margin-top: 1rem;
          flex-wrap: wrap;
        }

        .debug-button {
          padding: 0.5rem 0.75rem;
          background: #171e20;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 4px;
          color: #fff;
          cursor: pointer;
          font-family: monospace;
          font-size: 0.8rem;
        }

        .debug-button:hover {
          background: rgba(0, 220, 147, 0.1);
          border-color: rgba(0, 220, 147, 0.3);
        }

        .debug-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .debug-toggle {
          padding: 0.25rem 0.5rem;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 4px;
          color: rgba(255, 255, 255, 0.6);
          cursor: pointer;
          font-size: 0.8rem;
        }

        .debug-toggle:hover {
          background: rgba(0, 0, 0, 0.5);
          color: rgba(255, 255, 255, 0.8);
        }
        
        .schema-table-container {
          overflow-x: auto;
          margin-top: 0.5rem;
        }
        
        .schema-table {
          width: 100%;
          border-collapse: collapse;
          font-family: monospace;
          font-size: 0.85rem;
        }
        
        .schema-table th,
        .schema-table td {
          padding: 0.5rem;
          text-align: left;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .schema-table th {
          background: rgba(255, 255, 255, 0.05);
        }

        @media (max-width: 768px) {
          .admin-dashboard {
            padding: 1rem;
          }
          
          .tabs {
            flex-direction: column;
            gap: 0.5rem;
          }
          
          .data-container {
            padding: 1rem;
          }
          
          .data-table th, 
          .data-table td {
            padding: 0.75rem 0.5rem;
            font-size: 0.9rem;
          }

          .debug-actions {
            flex-direction: column;
          }
          
          .form-fields {
            grid-template-columns: 1fr;
          }
          
          .data-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          
          .table-stats {
            flex-direction: column;
            gap: 0.5rem;
          }
        }
      `}</style>
    </>
  )
}

export default AdminDashboard