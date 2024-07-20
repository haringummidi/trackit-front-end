import React, { useRef, useEffect } from "react";
import ReactEcharts from "echarts-for-react";
import * as echarts from "echarts";
import "./echartsTheme"; // Import the theme file to ensure it gets registered

const ProductsByCategoryChart = ({ data, title, subtext }) => {
  const chartRef = useRef(null);

  const dataAxis = data.map((item) => item[0]?.substring(0, 20) || "Other");
  const values = data.map((item) => item[1]);

  const yMax = Math.max(...values) * 1.1; // Adding 10% margin to the max value
  const dataShadow = Array(values.length).fill(yMax);

  useEffect(() => {
    if (!chartRef.current) return;
    const chartInstance = chartRef.current.getEchartsInstance();
    const zoomSize = 6;

    const handleClick = (params) => {
      console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
      chartInstance.dispatchAction({
        type: "dataZoom",
        startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
        endValue:
          dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)],
      });
    };

    chartInstance.on("click", handleClick);

    return () => {
      chartInstance.off("click", handleClick);
    };
  }, [data, dataAxis]);

  const option = {
    title: {
      text: title,
      subtext: subtext,
      left: "center",
    },
    tooltip: {
      trigger: "item",
      formatter: "Total items in {b}: {c}",
    },
    grid: {
      bottom: "30%",
    },
    xAxis: {
      data: dataAxis,
      axisLabel: {
        inside: false,
        color: "#aaa",
        rotate: 45,
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#ccc",
        },
      },
      z: 10,
    },
    yAxis: {
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: "#999",
      },
    },
    dataZoom: [
      {
        type: "inside",
        xAxisIndex: [0],
      },
      {
        type: "slider",
        xAxisIndex: [0],
        start: 0,
        end: 100,
      },
    ],
    series: [
      {
        type: "bar",
        showBackground: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgba(255, 70, 131, 1)" },
            { offset: 1, color: "rgba(255, 158, 68, 0.8)" },
          ]),
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#2378f7" },
              { offset: 0.7, color: "#2378f7" },
              { offset: 1, color: "#83bff6" },
            ]),
          },
        },
        data: values,
      },
    ],
  };

  return (
    <ReactEcharts
      ref={chartRef}
      option={option}
      echarts={echarts}
      style={{ height: 500, width: "100%" }}
    />
  );
};

export default ProductsByCategoryChart;
