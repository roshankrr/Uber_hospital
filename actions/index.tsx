"use server";

import dbConnect from "@/db/dbconnect";
import Patient from "@/db/patienModel";
import GDA from "@/db/gdaModel";

// Patient Actions
export async function createPatientRequest(formData: {
  name: string;
  illness: string;
  arrivalTime: string;
  //   arrivalDate: string;
  details?: string;
  contact?: string;
  age?: number;
  notes?: string;
}) {
  try {
    await dbConnect();
    const patient = await Patient.create(formData);
    return { success: true, data: patient };
  } catch (error) {
    console.error("Error creating patient request:", error);
    return { success: false, error: "Failed to create patient request" };
  }
}

// Get all pending patient requests for GDAs to view
export async function getPendingPatientRequests() {
  try {
    await dbConnect();
    const requests = await Patient.find({ status: "pending" }).sort({
      createdAt: -1,
    });
    return { success: true, data: requests };
  } catch (error) {
    console.error("Error fetching pending requests:", error);
    return { success: false, error: "Failed to fetch pending requests" };
  }
}

// Get patient details by ID
export async function getPatientById(patientId: string) {
  try {
    await dbConnect();
    const patient = await Patient.findById(patientId);
    return { success: true, data: patient };
  } catch (error) {
    console.error("Error fetching patient:", error);
    return { success: false, error: "Failed to fetch patient details" };
  }
}

// Get assigned GDA details for a patient
export async function getAssignedGDAForPatient(patientId: string) {
  try {
    await dbConnect();
    const gda = await GDA.findOne({ assignedPatients: patientId }).select(
      "name email contact department shift"
    );
    return { success: true, data: gda };
  } catch (error) {
    console.error("Error fetching assigned GDA:", error);
    return { success: false, error: "Failed to fetch assigned GDA" };
  }
}

// Get GDA by Clerk ID
export async function getGDAByClerkId(clerkId: string) {
  try {
    await dbConnect();
    const gda = await GDA.findOne({ clerkId });
    return { success: true, data: gda };
  } catch (error) {
    console.error("Error fetching GDA by Clerk ID:", error);
    return { success: false, error: "Failed to fetch GDA details" };
  }
}

// GDA Actions
export async function createGDA(formData: {
  clerkId: string;
  name: string;
  email: string;
  department: string;
  shift: string;
  contact: string;
  experience?: number;
  specializations?: string[];
  notes?: string;
}) {
  try {
    await dbConnect();
    const gda = await GDA.create(formData);
    return { success: true, data: gda };
  } catch (error) {
    console.error("Error creating GDA:", error);
    return { success: false, error: "Failed to create GDA" };
  }
}

// Set GDA data
export async function setGDAData(
  gdaId: string,
  formData: {
    name?: string;
    email?: string;
    department?: string;
    shift?: string;
    contact?: string;
    experience?: number;
    specializations?: string[];
    notes?: string;
    imageUrl?: string;
    status?: string;
  }
) {
  try {
    await dbConnect();
    const gda = await GDA.findByIdAndUpdate(
      gdaId,
      { ...formData },
      { new: true }
    );
    return { success: true, data: gda };
  } catch (error) {
    console.error("Error updating GDA data:", error);
    return { success: false, error: "Failed to update GDA data" };
  }
}

// GDA accepts a patient request
export async function acceptPatientRequest(gdaId: string, patientId: string) {
  try {
    await dbConnect();

    // Update patient status and assign GDA
    const patient = await Patient.findByIdAndUpdate(
      patientId,
      {
        status: "accepted",
        assignedGDA: gdaId,
      },
      { new: true }
    );
    console.log("Patient:", patient);

    // Add patient to GDA's assigned patients and update status
    await GDA.findByIdAndUpdate(gdaId, {
      $addToSet: { assignedPatients: patientId },
      status: "busy",
    });

    // Get updated GDA data
    const gda = await GDA.findById(gdaId);

    return { success: true, data: { patient, gda } };
  } catch (error) {
    console.error("Error accepting patient request:", error);
    return { success: false, error: "Failed to accept patient request" };
  }
}

// Get all patients assigned to a GDA
export async function getGDAAssignedPatients(gdaId: string) {
  try {
    await dbConnect();
    const gda = await GDA.findById(gdaId).populate({
      path: "assignedPatients",
      select:
        "name illness arrivalTime arrivalDate location status details contact age notes",
    });
    return { success: true, data: gda?.assignedPatients || [] };
  } catch (error) {
    console.error("Error fetching GDA's patients:", error);
    return { success: false, error: "Failed to fetch assigned patients" };
  }
}

// Update patient status
export async function updatePatientStatus(patientId: string, status: string) {
  try {
    await dbConnect();
    const patient = await Patient.findByIdAndUpdate(
      patientId,
      { status },
      { new: true }
    );
    return { success: true, data: patient };
  } catch (error) {
    console.error("Error updating patient status:", error);
    return { success: false, error: "Failed to update patient status" };
  }
}

// Update GDA status and availability
export async function updateGDAStatus(gdaId: string, status: string) {
  try {
    await dbConnect();
    const gda = await GDA.findByIdAndUpdate(gdaId, { status }, { new: true });
    return { success: true, data: gda };
  } catch (error) {
    console.error("Error updating GDA status:", error);
    return { success: false, error: "Failed to update GDA status" };
  }
}
