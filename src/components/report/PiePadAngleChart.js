import React from "react";
import ReactEcharts from "echarts-for-react";
import * as echarts from "echarts";
import "./echartsTheme"; // Import the theme file to ensure it gets registered

const PiePadAngle = ({ data, title, subtext }) => {
  const option = {
    title: {
      text: title,
      subtext: subtext,
      left: "center",
      top: 10,
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "bottom",
      left: "center",
    },
    series: [
      {
        name: title,
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: false,
            fontSize: 15,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: data
          .filter((item) => item[0])
          .map((item) => ({
            name: item[0]?.substring(0, 15) || "Others",
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
      style={{ height: 500, width: "100%" }}
    />
  );
};

export default PiePadAngle;
