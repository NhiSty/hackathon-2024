"use client";

import ReactECharts from "echarts-for-react";

export function StatsChart({data}) {
  const options = {
    title: {
      text: "sdev le bg",
      left: "center",
      top: "center",
    },
    series: [
      {
        type: "pie",
        data: [
          {
            value: data.numberOfRatingBetweenZeroAndFive,
            name: "numberOfRatingBetweenZeroAndFive",
          },
          {
            value: data.numberOfRatingBetweenFiveAndTen,
            name: "numberOfRatingBetweenFiveAndTen",
          },
          // {
          //   value: 1548,
          //   name: "C",
          // },
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
