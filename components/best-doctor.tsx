import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const doctors = [
  {
    name: "Dr. Leslie Thompson",
    specialty: "Cardiologist",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Dr. Harry Wilson",
    specialty: "Neurologist",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Dr. Leo Martinez",
    specialty: "Surgeon",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Dr. Jenny Parker",
    specialty: "Pediatrician",
    image: "/placeholder.svg?height=100&width=100",
  },
];

export function BestDoctors() {
  return (
    <Card className="bg-[#28293D] border-gray-700">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Best Doctor's</h2>
          <Button variant="link" className="text-blue-400 hover:text-blue-300">
            View all
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {doctors.map((doctor, index) => (
            <div key={index} className="text-center group">
              <img
                src={doctor.image || "/placeholder.svg"}
                alt={doctor.name}
                className="w-20 h-20 rounded-full mx-auto mb-2 border-2 border-blue-500 transition-transform duration-300 transform group-hover:scale-110"
              />
              <h3 className="text-white font-medium group-hover:text-blue-400 transition-colors">
                {doctor.name}
              </h3>
              <p className="text-gray-400 text-sm">{doctor.specialty}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
