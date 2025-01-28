import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, Users, Stethoscope, Calendar } from "lucide-react";

export function MetricCards() {
  const metrics = [
    {
      title: "Hospital Earnings",
      value: "$ 800K - 500K",
      icon: DollarSign,
      color: "bg-blue-500",
    },
    {
      title: "Total Patient",
      value: "600",
      icon: Users,
      color: "bg-yellow-500",
    },
    {
      title: "Operation",
      value: "400",
      icon: Stethoscope,
      color: "bg-red-500",
    },
    {
      title: "Appointments",
      value: "80",
      icon: Calendar,
      color: "bg-green-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <Card
          key={index}
          className="bg-[#28293D] border-gray-700 hover:border-gray-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
        >
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">{metric.title}</p>
              <p className="text-white text-2xl font-bold mt-2">
                {metric.value}
              </p>
            </div>
            <div className={`${metric.color} p-4 rounded-full`}>
              <metric.icon className="h-6 w-6 text-white" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
