"use client";

import ReactECharts from "echarts-for-react";

export function StatsChart() {
  const options = {
    title: {
      text: "A Case of Doughnut Chart",
      left: "center",
      top: "center",
    },
    series: [
      {
        type: "pie",
        data: [
          {
            value: 335,
            name: "A",
          },
          {
            value: 234,
            name: "B",
          },
          {
            value: 1548,
            name: "C",
          },
        ],
        radius: ["40%", "70%"],
      },
    ],
  };

  return (
    <ReactECharts
      option={options}
      notMerge={true}
      className="w-full"
      style={{ height: "400px" }}
    />
  );
}
