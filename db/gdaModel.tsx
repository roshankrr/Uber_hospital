import mongoose from "mongoose";

const gdaSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    imageUrl: {
      type: String,
    },
    assignedPatients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
      },
    ],
    status: {
      type: String,
      enum: ["available", "busy", "offline"],
      default: "available",
    },
    department: {
      type: String,
      required: true,
    },
    shift: {
      type: String,
      enum: ["morning", "afternoon", "night"],
      required: true,
    },
    contact: {
      type: String,
    },
    experience: {
      type: Number,
      default: 0,
    },
    specializations: [
      {
        type: String,
      },
    ],
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const GDA = mongoose.models.GDA || mongoose.model("GDA", gdaSchema);

export default GDA;
