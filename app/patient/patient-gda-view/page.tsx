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
import { Hospital, Search, Loader2 } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { getPatientByClerkId, getAssignedGDAForPatient } from "@/actions";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

interface GdaDetails {
  _id: string;
  name: string;
  imageUrl?: string;
  shift: string;
  contact: string;
  email: string;
  department: string;
}

export default function PatientGdaView() {
  const { userId } = useAuth();
  const { toast } = useToast();
  const [gdaData, setGdaData] = useState<GdaDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGDADetails() {
      if (!userId) {
        setError("Please sign in to view your assigned GDA");
        setLoading(false);
        return;
      }

      try {
        // Get patient record using clerkId
        const patientResponse = await getPatientByClerkId(userId);

        if (!patientResponse.success || !patientResponse.data) {
          setError("No patient request found. Please submit a request first.");
          setLoading(false);
          return;
        }

        const patient = patientResponse.data;

        // Check if patient has an assigned GDA
        if (!patient.assignedGDA) {
          setError(
            "No GDA has been assigned yet. Please wait for a GDA to accept your request."
          );
          setLoading(false);
          return;
        }

        // Fetch GDA details using patient ID
        const gdaResponse = await getAssignedGDAForPatient(patient._id);

        if (gdaResponse.success && gdaResponse.data) {
          setGdaData(gdaResponse.data);
        } else {
          setError("Failed to fetch GDA details");
        }
      } catch (err) {
        console.error("Error fetching GDA details:", err);
        setError("An error occurred while fetching GDA details");
        toast({
          title: "Error",
          description: "Failed to load GDA information",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchGDADetails();
  }, [userId, toast]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-3">
            <Hospital className="h-10 w-10 text-primary" />
            <Link href="/">
              <h1 className="text-3xl font-bold text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
                Uber_Hospital
              </h1>
            </Link>
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
                  <Button
                    variant="outline"
                    className="hover:scale-105 transition-transform"
                  >
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button className="hover:scale-105 transition-transform">
                    Sign Up
                  </Button>
                </SignUpButton>
              </div>
            )}
          </div>
        </header>

        <main className="mt-16">
          <Card className="max-w-lg mx-auto">
            <CardHeader>
              <CardTitle className="text-center">Your Assigned GDA</CardTitle>
              <CardDescription className="text-center text-muted-foreground">
                Details of the GDA allocated to you.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <Loader2 className="h-12 w-12 animate-spin text-primary" />
                  <p className="mt-4 text-muted-foreground">
                    Loading GDA details...
                  </p>
                </div>
              ) : error ? (
                <div className="text-center py-8">
                  <p className="text-destructive font-medium">{error}</p>
                  <Link href="/patient">
                    <Button className="mt-4" variant="outline">
                      Go to Patient Dashboard
                    </Button>
                  </Link>
                </div>
              ) : gdaData ? (
                <>
                  {gdaData.imageUrl && (
                    <img
                      src={gdaData.imageUrl}
                      alt={gdaData.name}
                      className="h-32 w-32 rounded-full object-cover shadow-lg"
                    />
                  )}
                  {!gdaData.imageUrl && (
                    <div className="h-32 w-32 rounded-full bg-primary/10 flex items-center justify-center shadow-lg">
                      <span className="text-4xl font-bold text-primary">
                        {gdaData.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <h2 className="text-xl font-bold text-primary">
                    {gdaData.name}
                  </h2>
                  <p className="text-muted-foreground">
                    Department: {gdaData.department}
                  </p>
                  <p className="text-muted-foreground">
                    Shift Timing: {gdaData.shift}
                  </p>
                  <p className="text-muted-foreground">
                    Contact: {gdaData.contact}
                  </p>
                  <p className="text-muted-foreground">
                    Email: {gdaData.email}
                  </p>
                  <Button className="mt-4 hover:scale-105 transition-transform">
                    Contact GDA
                  </Button>
                </>
              ) : null}
            </CardContent>
          </Card>
        </main>
      </div>
      <Toaster />
    </div>
  );
}
