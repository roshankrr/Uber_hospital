import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  priority: {
    type: String,
    enum: ['Normal', 'Emergency'],
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  requiredSkills: [{
    type: String,
  }],
  estimatedTime: {
    type: Number, // in minutes
    required: true,
  },
  assignedTo: {
    type: String, // GDA's Clerk User ID
    ref: 'User',
  },
  status: {
    type: String,
    enum: ['Pending', 'Assigned', 'In Progress', 'Completed'],
    default: 'Pending',
  },
  createdBy: {
    type: String, // Admin's Clerk User ID
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  completedAt: {
    type: Date,
  },
});

export default mongoose.models.Task || mongoose.model('Task', TaskSchema);