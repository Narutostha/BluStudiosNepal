import mongoose from 'mongoose';

const ConsultationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  companyName: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },
  personName: {
    type: String,
    required: [true, 'Person name is required'],
    trim: true
  },
  contactInfo: {
    type: String,
    required: [true, 'Contact information is required'],
    trim: true
  },
  productsServices: {
    type: String,
    required: [true, 'Products and services description is required'],
    trim: true
  },
  focusProducts: {
    type: String,
    required: [true, 'Focus products/services is required'],
    trim: true
  },
  shortTermGoals: {
    type: String,
    required: [true, 'Short term goals are required'],
    trim: true
  },
  longTermGoals: {
    type: String,
    required: [true, 'Long term goals are required'],
    trim: true
  },
  status: {
    type: String,
    default: 'pending',
    enum: {
      values: ['pending', 'in-review', 'accepted', 'completed'],
      message: '{VALUE} is not a valid status'
    }
  },
  created_at: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes for better query performance
ConsultationSchema.index({ email: 1 });
ConsultationSchema.index({ status: 1 });
ConsultationSchema.index({ created_at: -1 });

export default mongoose.models.Consultation || mongoose.model('Consultation', ConsultationSchema);