import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ConsultationSlots() {
  const slots = [
    {
      gda: "Devon Lane",
      department: "Emergency Ward",
      time: "10:30 AM - 11:30 AM",
      image: "/placeholder.svg",
    },
    {
      gda: "Jenny Wilson",
      department: "General Ward",
      time: "11:30 AM - 12:30 PM",
      image: "/placeholder.svg",
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-blue-900">
          GDA Assignments
        </h2>
        <Button
          variant="outline"
          className="text-blue-600 border-blue-300 hover:bg-blue-100 hover:text-blue-700 transition-colors duration-300"
        >
          View all
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {slots.map((slot, index) => (
          <Card
            key={index}
            className="bg-white border-blue-200 transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-blue-100 hover:-translate-y-1 group"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12 transition-transform duration-300 group-hover:scale-110">
                    <AvatarImage src={slot.image} />
                    <AvatarFallback>{slot.gda[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-900 group-hover:text-blue-600 transition-colors duration-300">
                      {slot.gda}
                    </h3>
                    <p className="text-blue-600 group-hover:text-blue-400 transition-colors duration-300">
                      {slot.department}
                    </p>
                    <p className="text-sm text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                      {slot.time}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="text-blue-600 border-blue-300 hover:bg-blue-100 hover:text-blue-700 transition-colors duration-300"
                >
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
