"use client";

import { Card, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "New", value: 30 },
  { name: "Recovered", value: 50 },
  { name: "Treatment", value: 20 },
];

const COLORS = ["#3B82F6", "#10B981", "#EF4444"];

export function Patients() {
  return (
    <Card className="bg-[#28293D] border-gray-700">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Patients</h2>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-gray-400 text-sm">Total Patient</h3>
            <p className="text-white text-2xl font-bold">784,670 People</p>
          </div>
          <ResponsiveContainer width={150} height={150}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: "#374151", border: "none" }}
                itemStyle={{ color: "#F3F4F6" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex justify-between">
          {data.map((entry, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`w-3 h-3 rounded-full mr-2`}
                style={{ backgroundColor: COLORS[index] }}
              ></div>
              <span className="text-gray-400 text-sm">{entry.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
