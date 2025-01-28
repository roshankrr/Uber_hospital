"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserButton, SignInButton, SignUpButton, useAuth } from "@clerk/nextjs";
import { Hospital, Search, Clock, MapPin, User, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { getPatientById } from "@/actions";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

interface PatientDetails {
  _id: string;
  name: string;
  age: number;
  illness: string;
  arrivalTime: string;
  location: string;
  contact: string;
  status: string;
  notes: string;
}

export default function GdaPatientView() {
  const { userId } = useAuth();
  const { toast } = useToast();
  const [patientData, setPatientData] = useState<PatientDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const patientId = searchParams.get("id");

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  useEffect(() => {
    const fetchPatientData = async () => {
      if (!patientId) {
        setLoading(false);
        toast({
          title: "Error",
          description: "No patient ID provided",
          variant: "destructive",
        });
        return;
      }

      try {
        const response = await getPatientById(patientId);

        if (response.success && response.data) {
          setPatientData(response.data);
        } else {
          toast({
            title: "Error",
            description: "Failed to fetch patient details",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error fetching patient details:", error);
        toast({
          title: "Error",
          description: "Failed to fetch patient details",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [toast, patientId]);

  const handleNavigationWithCheck = (path: string) => {
    if (hasUnsavedChanges) {
      if (
        window.confirm(
          "You have unsaved changes. Are you sure you want to leave?"
        )
      ) {
        router.push(path);
      }
    } else {
      router.push(path);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!patientId) {
    return <div>No patient ID provided</div>;
  }

  if (!patientData) {
    return <div>Patient not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-3">
            <Hospital className="h-10 w-10 text-primary" />
            <button
              onClick={() => handleNavigationWithCheck("/")}
              className="text-3xl font-bold text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600"
            >
              Uber_Hospital
            </button>
          </div>

          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-8 w-full"
              />
            </div>
          </div>

          <div>
            {userId ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <div className="space-x-4">
                <SignInButton mode="modal">
                  <Button variant="outline">Sign In</Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button>Sign Up</Button>
                </SignUpButton>
              </div>
            )}
          </div>
        </header>

        <main className="mt-8">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Patient Details</CardTitle>
              <CardDescription>
                View and manage patient information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">{patientData.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Age: {patientData.age}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Contact</p>
                      <p className="text-sm text-muted-foreground">
                        {patientData.contact}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Arrival Time</p>
                      <p className="text-sm text-muted-foreground">
                        {patientData.arrivalTime}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">
                        {patientData.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Illness</h3>
                <p className="text-muted-foreground">{patientData.illness}</p>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Notes</h3>
                <p className="text-muted-foreground">{patientData.notes}</p>
              </div>

              <div className="border-t pt-4 flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setHasUnsavedChanges(true)}
                >
                  Update Status
                </Button>
                <Button onClick={() => setHasUnsavedChanges(true)}>
                  Contact Patient
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
