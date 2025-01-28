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
import { Hospital, Search } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";

interface GdaDetails {
  name: string;
  photo: string;
  time: string;
  contact: string;
}

const gdaData: GdaDetails = {
  name: "John Doe",
  photo: "/images/gda-photo.jpg",
  time: "9:00 AM - 5:00 PM",
  contact: "+1 234 567 890",
};

export default function PatientGdaView() {
  const { userId } = useAuth();

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
              <img
                src={gdaData.photo}
                alt={gdaData.name}
                className="h-32 w-32 rounded-full object-cover shadow-lg"
              />
              <h2 className="text-xl font-bold text-primary">{gdaData.name}</h2>
              <p className="text-muted-foreground">
                Shift Timing: {gdaData.time}
              </p>
              <p className="text-muted-foreground">
                Contact: {gdaData.contact}
              </p>
              <Button className="mt-4 hover:scale-105 transition-transform">
                Contact GDA
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
