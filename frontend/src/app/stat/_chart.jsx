"use client";

import ReactECharts from "echarts-for-react";

export function StatsChart({data}) {

  console.log(data);
  const options = {
    title: {
      text: "Notes",
      left: "center",
      top: "center",
    },
    series: [
      {
        type: "pie",
        data: [
          {
            value: data.numberOfRatingBetweenZeroAndFive,
            name: `numberOfRatingBetweenZeroAndFive : ${ data.numberOfRatingBetweenZeroAndFive}`,
          },
          {
            value: data.numberOfRatingBetweenSixAndTen,
            name: `numberOfRatingBetweenSixAndTen : ${data.numberOfRatingBetweenSixAndTen}`,
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

    <>
        <ReactECharts
      option={options}
      notMerge={true}
      className="w-full"
      style={{ height: "400px" }}
    /> 
    </>
  );
}
