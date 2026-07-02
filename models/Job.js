const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    company: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    salary: {
      type: Number,
    },
    jobType: {
      type: String,
      enum: ['Internship', 'Full-Time', 'Part-Time', 'Contract', 'Remote'],
      default: 'Internship',
    },
    status: {
      type: String,
      enum: [
        'Applied',
        'OA Received',
        'OA Completed',
        'Interview Scheduled',
        'HR Round',
        'Technical Round',
        'Offer',
        'Rejected',
        'Accepted',
      ],
      default: 'Applied',
    },
    appliedDate: {
      type: Date,
    },
    link: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
    interviewDate: {
      type: Date,
    },
    interviewTime: {
      type: String,
    },
    interviewMode: {
      type: String,
      enum: ['Online', 'Offline', 'Phone'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Job', jobSchema);