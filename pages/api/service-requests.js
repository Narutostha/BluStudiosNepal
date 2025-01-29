import { supabase } from '@/lib/supabase'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { error } = await supabase
        .from('service_quote_requests')
        .insert(req.body)

      if (error) throw error

      res.status(201).json({ 
        success: true, 
        message: 'Service request created successfully'
      })
    } catch (error) {
      console.error('Error creating service request:', error)
      res.status(400).json({ 
        success: false, 
        error: error.message || 'Error creating service request'
      })
    }
  } else {
    res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    })
  }
}