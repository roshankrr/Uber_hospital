"use client";
// import { Header } from "@/components/header"
import { MetricsCards } from "@/components/metrics-cards";
import { GDAProfiles } from "@/components/gds-profiles";
import { Charts } from "@/components/charts";
import { ConsultationSlots } from "@/components/consultation-slots";
import { Button } from "@/components/ui/button";
import {
  Search,
  Menu,
  Hospital,
  User,
  Users,
  UserCog,
  Activity,
  Shield,
  Clock,
} from "lucide-react";
import { SignUpButton, useAuth, useUser } from "@clerk/nextjs";
import { SignInButton } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { UserButton } from "@clerk/nextjs";
// import { Header } from "@radix-ui/react-accordion";

export default function Home() {
  const { userId } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-blue-50">
      {/* <Header /> */}
      <header className="border-b bg-white/80 backdrop-blur-sm fixed top-0 w-full z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Hospital className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Uber_Hospital
            </h1>
          </div>

          <nav className="flex items-center">
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => router.push("/patient")}
                className="flex items-center gap-2 hover:bg-blue-100"
              >
                <User className="h-4 w-4" />
                Patient
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/gda")}
                className="flex items-center gap-2 hover:bg-blue-100"
              >
                <Users className="h-4 w-4" />
                GDA
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/admin")}
                className="flex items-center gap-2 hover:bg-blue-100"
              >
                <UserCog className="h-4 w-4" />
                Admin
              </Button>
            </div>
          </nav>

          <div className="hidden sm:block relative w-full max-w-[256px]">
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 pr-4 py-1 text-sm border-blue-200 focus:border-blue-400 rounded-full w-full"
            />
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-400" />
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
        </div>
      </header>
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-white">
          <div className="flex flex-col items-center justify-center h-full">
            {["Patient", "GDA", "Admin"].map((item) => (
              <Button
                key={item}
                variant="ghost"
                size="lg"
                className="text-xl mb-4 hover:text-blue-600 hover:bg-blue-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </Button>
            ))}
            <Button
              variant="ghost"
              size="lg"
              className="text-xl text-gray-600 mt-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
      <main className="container mx-auto py-6 mt-20">
        <MetricsCards />
        <Charts />
        <GDAProfiles />
        <ConsultationSlots />
      </main>
    </div>
  );
}
