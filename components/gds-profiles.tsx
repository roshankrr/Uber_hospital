import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function GDAProfiles() {
  const gdas = [
    {
      name: "Leslie Thompson",
      role: "Senior GDA",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Harry Wilson",
      role: "Emergency GDA",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Leo Martinez",
      role: "ICU GDA",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Jenny Parker",
      role: "General GDA",
      image: "/placeholder.svg?height=100&width=100",
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-blue-900">Best GDAs</h2>
        <Button
          variant="outline"
          className="text-blue-600 border-blue-300 hover:bg-blue-100 hover:text-blue-700 transition-colors duration-300"
        >
          View all
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {gdas.map((gda, index) => (
          <Card
            key={index}
            className="bg-white border-blue-200 transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-blue-100 hover:-translate-y-1 group"
          >
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <img
                  src={gda.image || "/placeholder.svg"}
                  alt={gda.name}
                  className="w-24 h-24 rounded-full mb-4 border-2 border-blue-300 transition-transform duration-300 group-hover:scale-110"
                />
                <h3 className="text-lg font-semibold text-blue-900 group-hover:text-blue-600 transition-colors duration-300">
                  {gda.name}
                </h3>
                <p className="text-blue-600 mt-1 group-hover:text-blue-400 transition-colors duration-300">
                  {gda.role}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
