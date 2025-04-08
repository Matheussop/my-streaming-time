import {
  Bar,
  BarChart,
  CartesianGrid,
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

interface ScreenTimeData {
  genre: string;
  quantity: number;
}

export default function GenreChart({ data }: { data: ScreenTimeData[] }) {
  const config: ChartConfig = {
    quantity: {
      label: "Quantity",
    },
    ...data.reduce((acc, item, index) => {
      acc[item.genre.toLowerCase()] = {
        label: item.genre,
        color: `hsl(var(--chart-${(index % 5) + 1}))`,
      };
      return acc;
    }, {} as ChartConfig),
  };
  const newData = data.map((item) => ({
    ...item,
    quantity: item.quantity.toFixed(2),
    fill: `var(--color-${item.genre.toLowerCase()})`,
  }));

  return (
    <div>
      <ChartContainer config={config}>
        <BarChart accessibilityLayer data={newData}>
          <CartesianGrid vertical={false} horizontal={false} />
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
            width={10}
            height={10}
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
          >
            <LabelList
              position="top"
              offset={12}
              fontSize={12}
              className="fill-white"
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  );
}
