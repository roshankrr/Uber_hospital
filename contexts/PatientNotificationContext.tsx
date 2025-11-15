"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useAuth } from "@clerk/nextjs";
import { getPatientByClerkId } from "@/actions";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface PatientNotificationContextType {
  isWaitingForGDA: boolean;
  assignedGDA: any | null;
}

const PatientNotificationContext = createContext<PatientNotificationContextType>({
  isWaitingForGDA: false,
  assignedGDA: null,
});

export function PatientNotificationProvider({ children }: { children: ReactNode }) {
  const { userId } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [isWaitingForGDA, setIsWaitingForGDA] = useState(false);
  const [assignedGDA, setAssignedGDA] = useState<any | null>(null);
  const [hasNotified, setHasNotified] = useState(false);

  useEffect(() => {
    if (!userId) return;

    let intervalId: NodeJS.Timeout;

    const checkForGDAAssignment = async () => {
      try {
        const patientResponse = await getPatientByClerkId(userId);

        if (patientResponse.success && patientResponse.data) {
          const patient = patientResponse.data;

          // Patient has pending request
          if (patient.status === "pending") {
            setIsWaitingForGDA(true);
          }

          // GDA has been assigned and patient was previously waiting
          if (patient.assignedGDA && patient.status === "accepted" && !hasNotified) {
            setAssignedGDA(patient.assignedGDA);
            setIsWaitingForGDA(false);
            setHasNotified(true);

            // Show notification
            toast({
              title: "GDA Assigned!",
              description: "A General Duty Assistant has accepted your request. Redirecting you now...",
              duration: 3000,
            });

            // Redirect to GDA view page after 2 seconds
            setTimeout(() => {
              router.push("/patient/patient-gda-view");
            }, 2000);

            // Stop polling
            if (intervalId) {
              clearInterval(intervalId);
            }
          }
        }
      } catch (error) {
        console.error("Error checking for GDA assignment:", error);
      }
    };

    // Initial check
    checkForGDAAssignment();

    // Poll every 5 seconds
    intervalId = setInterval(checkForGDAAssignment, 5000);

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [userId, hasNotified, toast, router]);

  return (
    <PatientNotificationContext.Provider value={{ isWaitingForGDA, assignedGDA }}>
      {children}
    </PatientNotificationContext.Provider>
  );
}

export const usePatientNotification = () => useContext(PatientNotificationContext);
