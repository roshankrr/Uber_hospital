"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { createPatientRequest } from "@/actions";
import { Toaster } from "@/components/ui/toaster";
import { useAuth } from "@clerk/nextjs";

const commonIllnesses = [
  "Common Cold",
  "Flu",
  "Fever",
  "Headache",
  "Stomach Ache",
  "Bleeding",
  "Fracture",
  "Allergic Reaction",
  "Other",
];

export default function Patient_view() {
  const [name, setName] = useState("");
  const [illness, setIllness] = useState("");
  const [otherIllness, setOtherIllness] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [contact, setContact] = useState("");
  const [age, setAge] = useState("");
  const [notes, setNotes] = useState("");
  const { toast } = useToast();
  const { userId } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!name.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter the patient's name",
        variant: "destructive",
      });
      return;
    }

    if (!illness) {
      toast({
        title: "Missing Information",
        description: "Please select a condition or illness",
        variant: "destructive",
      });
      return;
    }

    if (illness === "Other" && !otherIllness.trim()) {
      toast({
        title: "Missing Information",
        description: "Please specify the patient's condition",
        variant: "destructive",
      });
      return;
    }

    if (!arrivalTime) {
      toast({
        title: "Missing Information",
        description: "Please select an expected arrival time",
        variant: "destructive",
      });
      return;
    }

    if (!contact.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide a contact number",
        variant: "destructive",
      });
      return;
    }

    // Validate contact number format (basic validation)
    const contactRegex = /^\+?[\d\s-]{10,}$/;
    if (!contactRegex.test(contact.trim())) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid contact number",
        variant: "destructive",
      });
      return;
    }

    if (!age) {
      toast({
        title: "Missing Information",
        description: "Please enter the patient's age",
        variant: "destructive",
      });
      return;
    }

    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum <= 0 || ageNum > 120) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid age between 1 and 120",
        variant: "destructive",
      });
      return;
    }

    const formData = {
      clerkId: userId || undefined,
      name: name.trim(),
      illness: illness === "Other" ? otherIllness.trim() : illness,
      arrivalTime,
      contact: contact.trim(),
      age: ageNum,
      notes: notes.trim(),
    };

    try {
      const response = await createPatientRequest(formData);

      if (response.success) {
        toast({
          title: "Request Submitted Successfully",
          description:
            "A General Duty Assistant has been notified of your request.",
        });

        // Reset form
        setName("");
        setIllness("");
        setOtherIllness("");
        setArrivalTime("");
        setContact("");
        setAge("");
        setNotes("");
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      toast({
        title: "Submission Failed",
        description:
          "There was an error submitting your request. Please try again.",
        variant: "destructive",
      });
      console.error("Form submission error:", error);
    }
  };

  return (
    <>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Request Hospital Assistant</CardTitle>
          <CardDescription>
            Request a General Duty Assistant before arriving at the hospital
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Patient Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter patient name"
                  required
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="illness">Patient's Condition</Label>
                <Select value={illness} onValueChange={setIllness}>
                  <SelectTrigger id="illness">
                    <SelectValue placeholder="Select condition or illness" />
                  </SelectTrigger>
                  <SelectContent>
                    {commonIllnesses.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {illness === "Other" && (
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="otherIllness">Specify Other Condition</Label>
                  <Textarea
                    id="otherIllness"
                    placeholder="Describe the patient's condition or illness"
                    value={otherIllness}
                    onChange={(e) => setOtherIllness(e.target.value)}
                  />
                </div>
              )}

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="arrivalTime">
                  Expected Arrival Time (minutes)
                </Label>
                <Select value={arrivalTime} onValueChange={setArrivalTime}>
                  <SelectTrigger id="arrivalTime">
                    <SelectValue placeholder="Select arrival time range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-5min">0-5 minutes</SelectItem>
                    <SelectItem value="5-10min">5-10 minutes</SelectItem>
                    <SelectItem value="10-15min">10-15 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="contact">Contact Number</Label>
                <Input
                  id="contact"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Enter contact number"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={Number(age) > 120 ? 120 : age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Enter age"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any additional information"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => {
              setName("");
              setIllness("");
              setOtherIllness("");
              setArrivalTime("");
              setContact("");
              setAge("");
              setNotes("");
            }}
          >
            Reset
          </Button>
          <Button onClick={handleSubmit}>Raise Request</Button>
        </CardFooter>
      </Card>
      <Toaster />
    </>
  );
}
