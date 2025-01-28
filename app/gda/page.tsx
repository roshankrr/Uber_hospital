"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserButton, SignInButton, SignUpButton, useAuth } from "@clerk/nextjs";
import { Hospital, Search, Clock, MapPin, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import {
  getPendingPatientRequests,
  acceptPatientRequest,
  getAssignedGDAForPatient,
  getGDAByClerkId,
} from "@/actions";
import Link from "next/link";
import { Toaster } from "@/components/ui/toaster";

interface PatientRequest {
  _id: string;
  name: string;
  illness: string;
  arrivalTime: string;
  location: string;
  status: "pending" | "accepted";
  details?: string;
  notes?: string;
}

export default function GdaView() {
  const { userId } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [requests, setRequests] = useState<PatientRequest[]>([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await getPendingPatientRequests();
        if (response.success && response.data) {
          setRequests(response.data);
          toast({
            title: "Requests Loaded",
            description: "Successfully fetched patient requests",
          });
        } else {
          toast({
            title: "Error",
            description: "Failed to fetch patient requests",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
        toast({
          title: "Error",
          description: "Failed to fetch patient requests",
          variant: "destructive",
        });
      }
    };

    fetchRequests();
  }, [toast]);

  const acceptRequest = async (requestId: string) => {
    if (!userId) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to accept patient requests",
        variant: "destructive",
      });
      return;
    }

    try {
      // First get the MongoDB GDA ID using Clerk ID
      const gdaResponse = await getGDAByClerkId(userId);
      if (!gdaResponse.success || !gdaResponse.data) {
        toast({
          title: "Error",
          description: "Could not verify GDA credentials",
          variant: "destructive",
        });
        throw new Error("Could not find GDA details");
      }

      const gdaId = gdaResponse.data._id;

      const response = await acceptPatientRequest(gdaId, requestId);
      if (response.success) {
        // Get GDA details to show to patient
        const assignedGdaResponse = await getAssignedGDAForPatient(requestId);

        if (assignedGdaResponse.success && assignedGdaResponse.data) {
          const gdaDetails = assignedGdaResponse.data;

          setRequests(
            requests.map((request) => {
              if (request._id === requestId) {
                return { ...request, status: "accepted" };
              }
              return request;
            })
          );

          toast({
            title: "Request Accepted Successfully",
            description:
              "You have been assigned to this patient. Redirecting to patient view...",
          });

          // Show patient the GDA details who accepted their request
          toast({
            title: "GDA Assignment Confirmed",
            description: `Patient has been notified that ${gdaDetails.name} (${gdaDetails.department}) will assist them.`,
          });

          router.push(`/gda/patient-view?id=${requestId}`);
        }
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      toast({
        title: "Request Failed",
        description: "Unable to accept the request. Please try again.",
        variant: "destructive",
      });
    }
  };

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
                placeholder="Search requests..."
                className="pl-8 w-full"
                onChange={() => {
                  toast({
                    title: "Search Feature",
                    description: "Search functionality coming soon!",
                  });
                }}
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
          {requests.length === 0 ? (
            <div className="text-center text-gray-500 text-lg">
              No requests are available at this time
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {requests.map((request) => (
                <Card
                  key={request._id}
                  className={`hover:shadow-lg transition-shadow ${
                    request.status === "accepted"
                      ? "border-2 border-primary"
                      : ""
                  }`}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      {request.name}
                    </CardTitle>
                    <CardDescription>{request.illness}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {request.arrivalTime}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {request.location || "Waiting Area"}
                      </div>
                      {request.notes && (
                        <p className="text-sm text-muted-foreground">
                          {request.notes}
                        </p>
                      )}
                      <Button
                        className="w-full mt-4"
                        onClick={() => acceptRequest(request._id)}
                        disabled={request.status === "accepted"}
                      >
                        {request.status === "accepted"
                          ? "Accepted"
                          : "Accept Request"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
      <Toaster />
    </div>
  );
}
