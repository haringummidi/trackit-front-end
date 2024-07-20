import React, { useState } from "react";
import ReactEcharts from "echarts-for-react";
import * as echarts from "echarts";
import MultiSelectDropdown from "../MultiSelectDropdown";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// Generate an array of months and years for dropdowns
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getYears = (data) => {
  const years = new Set(data.map((item) => new Date(item[0]).getFullYear()));
  return Array.from(years).sort((a, b) => b - a);
};

// Define an array of gradient colors
const gradientColors = [
  [
    { offset: 0, color: "rgba(255, 158, 68, 0.8)" },
    { offset: 1, color: "rgba(255, 70, 131, 0.1)" },
  ],
  [
    { offset: 0, color: "rgba(68, 255, 158, 0.8)" },
    { offset: 1, color: "rgba(68, 131, 255, 0.1)" },
  ],
  [
    { offset: 0, color: "rgba(158, 68, 255, 0.8)" },
    { offset: 1, color: "rgba(131, 255, 68, 0.1)" },
  ],
  [
    { offset: 0, color: "rgba(255, 68, 158, 0.8)" },
    { offset: 1, color: "rgba(131, 68, 255, 0.1)" },
  ],
];

const MonthsInYearSalesChart = ({ data }) => {
  // Extract unique years from the data
  const years = getYears(data);

  // States for selected months and years
  const [selectedYears, setSelectedYears] = useState([years[0].toString()]);
  const [selectedMonths, setSelectedMonths] = useState([months[0]]);
  const [key, setKey] = useState(0);

  // Handle change in year selection
  const handleYearChange = (selectedOptions) => {
    setSelectedYears(selectedOptions);
    setKey((prevKey) => prevKey + 1); // Force re-render by updating the key
  };

  // Handle change in month selection
  const handleMonthChange = (selectedOptions) => {
    setSelectedMonths(selectedOptions);
    setKey((prevKey) => prevKey + 1); // Force re-render by updating the key
  };

  // Helper functions
  const getDay = (dateString) => new Date(dateString).getDate();

  // Prepare series data
  const seriesData = [];
  selectedYears.forEach((year, yearIndex) => {
    selectedMonths.forEach((month, monthIndex) => {
      const monthIndexNumber = months.indexOf(month);
      const filteredData = data.filter(([date]) => {
        const d = new Date(date);
        return (
          d.getFullYear().toString() === year &&
          d.getMonth() === monthIndexNumber
        );
      });

      // Group data by day
      const groupedData = Array(31).fill(null); // Array for days 1 to 31
      filteredData.forEach(([date, value]) => {
        const day = getDay(date);
        groupedData[day - 1] = value;
      });

      // Cycle through the gradient colors
      const gradientColor =
        gradientColors[
          (yearIndex * selectedMonths.length + monthIndex) %
            gradientColors.length
        ];

      seriesData.push({
        name: `${month} ${year}`,
        type: "line",
        data: groupedData,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, gradientColor),
        },
        lineStyle: {
          color: gradientColor[0].color, // Use the start color for the line
        },
      });
    });
  });

  const option = {
    title: {
      text: "Monthly Sales",
      left: "center",
      top: "bottom",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: seriesData.map((s) => s.name),
      left: "left",
    },
    xAxis: {
      type: "category",
      data: Array.from({ length: 31 }, (_, i) => i + 1), // Days of the month 1 to 31
      name: "Day",
    },
    yAxis: {
      type: "value",
    },
    series: seriesData,
  };

  return (
    <Container>
      <Row className="mb-3 justify-content-center">
        <Col md={6} className="d-flex justify-content-center">
          <MultiSelectDropdown
            title="Select Years"
            options={years.map(String)}
            selectedOptions={selectedYears}
            onChange={handleYearChange}
          />
        </Col>
        <Col md={6} className="d-flex justify-content-center">
          <MultiSelectDropdown
            title="Select Months"
            options={months}
            selectedOptions={selectedMonths}
            onChange={handleMonthChange}
          />
        </Col>
      </Row>
      <ReactEcharts
        key={key}
        option={option}
        style={{ height: 500, width: "100%" }}
      />
    </Container>
  );
};

export default MonthsInYearSalesChart;
