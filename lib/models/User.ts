import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  employeeId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['GDA', 'Admin'],
    required: true,
  },
  status: {
    type: String,
    enum: ['Available', 'In Progress', 'Emergency'],
    default: 'Available',
  },
  location: {
    type: {
      floor: Number,
      wing: String,
      coordinates: {
        x: Number,
        y: Number,
      },
    },
  },
  currentTask: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
  },
  skills: [{
    type: String,
  }],
});

export default mongoose.models.User || mongoose.model('User', UserSchema);