import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function GDAProfiles() {
  const gdas = [
    {
      name: "Leslie Thompson",
      role: "Senior GDA",
      image:
        "https://i.pinimg.com/474x/b4/3a/89/b43a892e3f68c50a5b7ce996aa41a1af.jpg",
    },
    {
      name: "Harry Wilson",
      role: "Emergency GDA",
      image:
        "https://i.pinimg.com/474x/97/39/5e/97395e774f335d862cef7fc0e9b22956.jpg",
    },
    {
      name: "Leo Martinez",
      role: "ICU GDA",
      image:
        "https://i.pinimg.com/474x/5c/2c/71/5c2c71a48d6d1a166c529c2c9d2c7348.jpg",
    },
    {
      name: "Jenny Parker",
      role: "General GDA",
      image:
        "https://i.pinimg.com/474x/82/19/e9/8219e955fd50a0eb26959d17f4b173c7.jpg",
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
