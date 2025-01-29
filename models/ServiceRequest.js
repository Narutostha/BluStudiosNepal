import mongoose from 'mongoose';

const ServiceRequestSchema = new mongoose.Schema({
  service_id: {
    type: Number,
    required: [true, 'Service ID is required']
  },
  company_name: {
    type: String,
    trim: true
  },
  contact_name: {
    type: String,
    required: [true, 'Contact name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    trim: true
  },
  budget_range: {
    type: String,
    trim: true
  },
  timeline: {
    type: String,
    trim: true
  },
  project_details: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    default: 'pending',
    enum: {
      values: ['pending', 'in-review', 'accepted', 'rejected'],
      message: '{VALUE} is not a valid status'
    }
  },
  created_at: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add indexes for better query performance
ServiceRequestSchema.index({ email: 1 });
ServiceRequestSchema.index({ status: 1 });
ServiceRequestSchema.index({ created_at: -1 });

// Pre-save middleware to clean data
ServiceRequestSchema.pre('save', function(next) {
  // Clean strings
  if (this.company_name) this.company_name = this.company_name.trim();
  if (this.contact_name) this.contact_name = this.contact_name.trim();
  if (this.email) this.email = this.email.trim().toLowerCase();
  if (this.phone) this.phone = this.phone.trim();
  
  next();
});

export default mongoose.models.ServiceRequest || mongoose.model('ServiceRequest', ServiceRequestSchema);