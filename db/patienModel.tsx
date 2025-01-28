import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    illness: {
      type: String,
      required: true,
    },
    arrivalTime: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      default: "Waiting Area",
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "in-progress", "completed"],
      default: "pending",
    },
    details: {
      type: String,
    },
    contact: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    notes: {
      type: String,
    },
    assignedGDA: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GDA",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "emergency"],
      default: "medium",
    },
    estimatedWaitTime: {
      type: Number, // in minutes
    },
  },
  {
    timestamps: true,
  }
);

const Patient =
  mongoose.models.Patient || mongoose.model("Patient", patientSchema);

export default Patient;
