import { Card, CardContent } from "@/components/ui/card";
import { Users, UserCheck, UserMinus, UserPlus } from "lucide-react";

export function MetricsCards() {
  const metrics = [
    {
      title: "Total GDAs",
      value: "600",
      icon: Users,
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
    },
    {
      title: "Active GDAs",
      value: "400",
      icon: UserCheck,
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600",
    },
    {
      title: "Inactive GDAs",
      value: "150",
      icon: UserMinus,
      color: "bg-red-500",
      hoverColor: "hover:bg-red-600",
    },
    {
      title: "Free GDAs",
      value: "50",
      icon: UserPlus,
      color: "bg-yellow-500",
      hoverColor: "hover:bg-yellow-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {metrics.map((metric, index) => (
        <Card
          key={index}
          className="bg-white border-blue-200 transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-blue-200 hover:-translate-y-1"
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">
                  {metric.title}
                </p>
                <h3 className="text-2xl font-bold text-blue-900 mt-2">
                  {metric.value}
                </h3>
              </div>
              <div
                className={`p-3 rounded-full ${metric.color} ${metric.hoverColor} transition-colors duration-300`}
              >
                <metric.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
