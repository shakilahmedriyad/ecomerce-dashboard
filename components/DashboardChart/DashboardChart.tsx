"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";

export default function DashboardChart() {
  const chartData = [
    { month: "Jan", sales: 20 },
    { month: "Feb", sales: 30 },
    { month: "Mar", sales: 23 },
    { month: "Apr", sales: 7 },
    { month: "May", sales: 29 },
    { month: "Jun", sales: 17 },
    { month: "Jul", sales: 21 },
    { month: "Aug", sales: 24 },
    { month: "Sept", sales: 12 },
    { month: "Oct", sales: 10 },
    { month: "Nov", sales: 8 },
    { month: "Dec", sales: 14 },
  ];
  const chartConfig = {
    sales: {
      label: "sales",
      color: "#2563eb",
    },
  } satisfies ChartConfig;
  return (
    <ChartContainer config={chartConfig} className="max-h-[450px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <XAxis
          dataKey={"month"}
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          dataKey={"sales"}
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Bar dataKey="sales" fill="var(--color-sales)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
