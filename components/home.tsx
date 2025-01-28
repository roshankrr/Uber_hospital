import { useState } from "react";
import {
  Search,
  ChevronDown,
  Activity,
  Clock,
  Shield,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { AnimatedDoctor } from "./animated-docter";

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm fixed top-0 w-full z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-blue-600 rounded-lg transform rotate-45"></div>
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
                U
              </div>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
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
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {["Patient", "GDA", "Admin"].map((item) => (
                <Button
                  key={item}
                  variant="ghost"
                  size="sm"
                  className="text-sm lg:text-base hover:text-blue-600 hover:bg-blue-50 px-2 lg:px-4"
                >
                  {item}
                </Button>
              ))}
            </div>
          </nav>

          <div className="hidden sm:block relative w-full max-w-[200px] lg:max-w-[256px]">
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 pr-4 py-1 text-sm border-blue-200 focus:border-blue-400 rounded-full w-full"
            />
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-400" />
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
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

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="container mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-up">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Revolutionizing
              </span>
              <br />
              Healthcare Management
            </h2>
            <p className="text-xl text-gray-600 mb-8 animate-fade-up animation-delay-200 max-w-2xl">
              Experience the future of hospital administration with AI-driven
              task coordination and real-time analytics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-up animation-delay-400">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg h-12 px-8 rounded-full"
              >
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg h-12 px-8 border-blue-200 hover:bg-blue-50 rounded-full"
              >
                Watch Demo
              </Button>
            </div>
          </div>
          <div className="flex-1 relative animate-float">
            <div className="w-full aspect-square max-w-xl mx-auto">
              <AnimatedDoctor />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 animate-fade-up">
            Why Choose Uber_Hospital?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Activity className="w-8 h-8" />,
                title: "Real-time Analytics",
                description:
                  "Monitor hospital performance with live data visualization.",
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: "Smart Scheduling",
                description:
                  "AI-powered appointment and staff management system.",
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Enhanced Security",
                description:
                  "State-of-the-art data protection for patient information.",
              },
            ].map((feature, index) => (
              <div
                key={feature.title}
                className={`bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-up`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center text-blue-600">
                  {feature.icon}
                </div>
                <h4 className="font-bold text-xl mb-2 text-center">
                  {feature.title}
                </h4>
                <p className="text-gray-600 text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4 animate-fade-up">
            Ready to Transform Your Hospital?
          </h3>
          <p className="text-xl mb-8 animate-fade-up animation-delay-200">
            Join the healthcare revolution and streamline your operations today.
          </p>
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-blue-50 text-lg h-12 px-8 rounded-full animate-fade-up animation-delay-400"
          >
            Schedule a Demo
          </Button>
        </div>
      </section>
    </div>
  );
}
