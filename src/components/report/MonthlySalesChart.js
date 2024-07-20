import React from "react";
import ReactEcharts from "echarts-for-react";
import * as echarts from "echarts";

const MonthlySalesChart = ({ data }) => {
  const option = {
    title: {
      text: "Monthly Sales",
      subtext: "Salea graph from 2019 to 2024 in months",
      left: "center",
    },
    tooltip: {
      trigger: "item",
      formatter: "Total Sales in {b}: {c} $",
    },
    xAxis: {
      type: "category",
      data: data.map((item) => item[0]), // Assuming data is in [label, value] format
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Total Sales",
        type: "line",
        data: data.map((item) => item[1]), // Assuming data is in [label, value] format
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(255, 158, 68, 0.8)", // Gradient color at the top
            },
            {
              offset: 1,
              color: "rgba(255, 70, 131, 0.1)", // Gradient color at the bottom
            },
          ]),
        },
        lineStyle: {
          color: "rgba(255, 158, 68, 1)", // Line color
        },
      },
    ],
  };

  return (
    <ReactEcharts option={option} style={{ height: 600, width: "100%" }} />
  );
};

export default MonthlySalesChart;
