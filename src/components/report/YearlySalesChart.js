import React from "react";
import ReactEcharts from "echarts-for-react";
import * as echarts from "echarts";
import "./echartsTheme"; // Import the theme file to ensure it gets registered

const YearlySalesChart = ({ data, title, subtext }) => {
  const option = {
    title: {
      text: title,
      subtext: subtext,
      left: "center",
    },
    grid: {
      left: "15%",
    },
    xAxis: {
      type: "category",
      data: data.map((item) => item[0] || "Others"),
    },
    yAxis: {
      type: "value",
    },
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c}",
    },
    series: [
      {
        data: data.filter((item) => item[0]).map((item) => item[1]),
        type: "bar",
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgba(255, 70, 131, 1)" },
            { offset: 1, color: "rgba(255, 158, 68, 0.8)" },
          ]),
        },
      },
    ],
  };

  return (
    <ReactEcharts
      option={option}
      echarts={echarts}
      // theme="shine"
      style={{ height: 500, width: "100%" }}
    />
  );
};

export default YearlySalesChart;
