import axios from "axios";
import { useGlobalContext } from "context/GlobalContext";
import { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
} from "recharts";

const graphData = ["Mon", "Tus", "Wen", "Thu", "Fri", "Sat", "Sun"].map((i) => {
  const revenue = 500 + Math.random() * 2000;
  const expectedRevenue = Math.max(revenue + (Math.random() - 0.5) * 2000, 0);
  return {
    name: i,
    revenue,
    expectedRevenue,
    sales: Math.floor(Math.random() * 500),
  };
});

interface Props {}

function Graph({}: Props) {
  const {
    data: { studentAddedInLastSevenDays },
  } = useGlobalContext();
  console.log("studentAddedInLastSevenDays", studentAddedInLastSevenDays);
  return (
    <div className="flex p-4 h-full flex-col">
      <div className="">
        <div className="flex items-center">
          <div className="font-bold text-white">Register Summary</div>
          <div className="flex-grow" />

          <div className="ml-2">Last 7 Days</div>
          <div className="ml-6 w-5 h-5 flex justify-center items-center rounded-full icon-background">
            ?
          </div>
        </div>
        <div className="font-bold ml-5">Mon - Sun</div>
      </div>

      <div className="flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={studentAddedInLastSevenDays}
          >
            <defs>
              <linearGradient id="paint0_linear" x1="0" y1="0" x2="1" y2="0">
                <stop stopColor="#6B8DE3" />
                <stop offset="1" stopColor="#7D1C8D" />
              </linearGradient>
            </defs>
            <CartesianGrid
              horizontal={false}
              strokeWidth="6"
              stroke="#252525"
            />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tickMargin={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
              tickMargin={10}
            />

            <Line
              dataKey="value"
              stroke="url(#paint0_linear)"
              strokeWidth="4"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Graph;
