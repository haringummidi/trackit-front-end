import React from "react";
import ReactEcharts from "echarts-for-react";
import * as echarts from "echarts";
import "./echartsTheme"; // Import the theme file to ensure it gets registered

const NightingaleChart = ({ data, title, subtext }) => {
  const option = {
    title: {
      text: title,
      subtext: subtext,
      left: "center",
      top: 0,
    },
    tooltip: {
      trigger: "item",
    },
    grid: {
      top: "10%",
    },
    legend: {
      top: "bottom",
      left: "center",
    },
    series: [
      {
        name: title,
        type: "pie",
        type: "pie",
        radius: [50, 250],
        center: ["50%", "50%"],
        roseType: "area",
        itemStyle: {
          borderRadius: 8,
        },
        data: data
          .filter((item) => item[0])
          .map((item) => ({
            name: item[0]?.substring(0, 10) || "Others",
            value: item[1],
          })),
      },
    ],
  };

  return (
    <ReactEcharts
      option={option}
      echarts={echarts}
      // theme="shine"
      style={{ height: 650, width: "100%" }}
    />
  );
};

export default NightingaleChart;
