import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Rectangle,
  XAxis,
  YAxis,
  ResponsiveContainer,
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
      label: "Quantity (%)",
    },
    ...data.reduce((acc, item, index) => {
      acc[item.genre.toLowerCase()] = {
        label: item.genre,
        color: `hsl(var(--chart-${(index % 5) + 1}))`,
      };
      return acc;
    }, {} as ChartConfig),
  };

  const newData = data.map((item, index) => ({
    ...item,
    quantity: Number(item.quantity.toFixed(2)),
    fill: `hsl(var(--chart-${(index % 5) + 1}))`,
  }));

  // Encontrar o valor máximo para definir o domínio do YAxis
  const maxValue = Math.max(...newData.map((item) => item.quantity));
  const yAxisDomain = [0, Math.ceil(maxValue * 1.1)]; // Adiciona 10% de espaço extra

  return (
    <div className="h-full w-full">
      <ChartContainer config={config}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={newData}>
            <CartesianGrid vertical={false} horizontal={false} />
            <XAxis
              dataKey="genre"
              tickLine={true}
              tickMargin={10}
              axisLine={false}
              interval={0}
              tickFormatter={(value) => value}
            />
            <YAxis
              domain={yAxisDomain}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value: number) => `${value}%`}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar
              dataKey="quantity"
              strokeWidth={2}
              radius={[8, 8, 0, 0]}
              maxBarSize={60}
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
                dataKey="quantity"
                position="top"
                offset={12}
                fontSize={12}
                className="fill-white"
                formatter={(value: number) => `${value}%`}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
