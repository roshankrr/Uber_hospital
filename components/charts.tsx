"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";

const hourlyPatientData = [
  { hour: "00:00", patients: 20 },
  { hour: "04:00", patients: 5 },
  { hour: "08:00", patients: 25 },
  { hour: "12:00", patients: 45 },
  { hour: "16:00", patients: 40 },
  { hour: "20:00", patients: 28 },
];

const hourlyHelpData = [
  { hour: "00:00", helped: 18 },
  { hour: "04:00", helped: 4 },
  { hour: "08:00", helped: 23 },
  { hour: "12:00", helped: 43 },
  { hour: "16:00", helped: 38 },
  { hour: "20:00", helped: 26 },
];

const gdaDistributionData = [
  { name: "Active", value: 400, fill: "#3B82F6" },
  { name: "Inactive", value: 150, fill: "#EF4444" },
  { name: "Free", value: 50, fill: "#22C55E" },
];

const COLORS = ["#3B82F6", "#EF4444", "#22C55E"];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 rounded shadow-lg border border-blue-100">
        <p className="text-blue-900">{`${label} : ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const CustomPieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 rounded shadow-lg border border-blue-100">
        <p className="text-blue-900">{`${payload[0].name} : ${
          payload[0].value
        } (${((payload[0].value / 600) * 100).toFixed(1)}%)`}</p>
      </div>
    );
  }
  return null;
};

export function Charts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
      <Card className="bg-white border-blue-200 transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-blue-200 hover:-translate-y-1">
        <CardHeader>
          <CardTitle className="text-blue-900">GDA Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={gdaDistributionData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                >
                  {gdaDistributionData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      className="transition-opacity duration-300 hover:opacity-80"
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomPieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white border-blue-200 transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-blue-200 hover:-translate-y-1">
        <CardHeader>
          <CardTitle className="text-blue-900">
            Peak Patient Times (Hourly)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hourlyPatientData}>
                <XAxis dataKey="hour" stroke="#3B82F6" />
                <YAxis stroke="#3B82F6" />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="patients"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 8 }}
                  className="transition-opacity duration-300 hover:opacity-80"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white border-blue-200 transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-blue-200 hover:-translate-y-1 lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-blue-900">
            Help Raised & Response (Hourly)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hourlyHelpData}>
                <XAxis dataKey="hour" stroke="#3B82F6" />
                <YAxis stroke="#3B82F6" />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="helped"
                  stroke="#22C55E"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 8 }}
                  className="transition-opacity duration-300 hover:opacity-80"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
