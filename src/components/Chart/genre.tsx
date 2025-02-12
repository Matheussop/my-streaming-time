"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Rectangle,
  XAxis,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@components/ui/chart";
import { useState, useEffect } from "react";
import { config } from "process";
import { fill } from "lodash";

const streamingGenre = [
  { genre: "Action", quantity: 300 },
  { genre: "Comedy", quantity: 400 },
  { genre: "Drama", quantity: 400 },
  { genre: "Horror", quantity: 200 },
  { genre: "Sci-Fi", quantity: 300 },
];

interface ScreenTimeData {
  genre: string;
  quantity: number;
}

// const chartConfig = {
//   quantity: {
//     label: "Quantity",
//   },
// } satisfies ChartConfig;

export default function GenreChart() {
  const [screenTime, setScreenTime] = useState<ScreenTimeData[] | undefined>(
    undefined,
  );
  const [chartConfig, setChartConfig] = useState<ChartConfig>(
    {} as ChartConfig,
  );

  const fetchScreenTime = async () => {
    // Dados fictícios
    const data: ScreenTimeData[] = streamingGenre;
    const config: ChartConfig = {
      quantity: {
        label: "Quantity",
      },
      ...streamingGenre.reduce((acc, item, index) => {
        acc[item.genre.toLowerCase()] = {
          label: item.genre,
          color: `hsl(var(--chart-${(index % 5) + 1}))`,
        };
        return acc;
      }, {} as ChartConfig),
    };
    const newData = data.map((item) => ({
      ...item,
      fill: `var(--color-${item.genre.toLowerCase()})`,
    }));
    setChartConfig(config);
    setScreenTime(newData);
  };
  useEffect(() => {
    fetchScreenTime();
  }, []);

  if (!screenTime) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <ChartContainer config={chartConfig}>
        <BarChart accessibilityLayer data={screenTime}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="genre"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Bar
            dataKey="quantity"
            strokeWidth={2}
            radius={8}
            activeBar={({ ...props }) => {
              return (
                <Rectangle
                  {...props}
                  fillOpacity={0.8}
                  stroke={props.payload.fill}
                  strokeDasharray={4}
                  strokeDashoffset={4}
                />
              );
            }}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
