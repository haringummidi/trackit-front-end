import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import "./Dashboard.css"; // Import custom styles
import { totalOrders } from "../service/DashboardService";
import ReactEcharts from "echarts-for-react";
import { color } from "echarts";
import Loader from "../components/Loader";

const Dashboard = () => {
  const [dashboardInfo, setDashboardInfo] = useState({
    totalOrders: 0,
    totalItems: 0,
    numberOfAvailableItems: 0,
    numberOfLowStockItems: 0,
    numberOfOutOfStockItems: 0,
    latestOrders: [],
    importantAlerts: [],
  });
  const [loading, setLoading] = useState(true);

  const inventoryOptions = {
    title: {
      text: "Inventory Item Status",
      left: "center",
      top: 0,
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "Stock Status",
        type: "pie",
        radius: "60%",
        data: [
          // { value: dashboardInfo.totalItems, name: "Total" },
          { value: dashboardInfo.numberOfAvailableItems, name: "Available" },
          {
            value:
              dashboardInfo.numberOfLowStockItems -
              dashboardInfo.numberOfOutOfStockItems,
            name: "Low Stock",
          },
          {
            value: dashboardInfo.numberOfOutOfStockItems,
            name: "Out of Stock",
          },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  const todaysSalesOption = {
    title: {
      text: "Today's Sales",
      left: "center",
      top: 0, // Adjust the top value to control the space between the title and the chart
    },
    series: [
      {
        type: "gauge",
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 100,
        splitNumber: 4,
        itemStyle: {
          color: "#58D9F9",
          shadowColor: "rgba(0,138,255,0.45)",
          shadowBlur: 10,
          shadowOffsetX: 2,
          shadowOffsetY: 2,
        },
        progress: {
          show: true,
          roundCap: true,
          width: 18,
        },
        pointer: {
          icon: "path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z",
          length: "75%",
          width: 16,
          offsetCenter: [0, "5%"],
        },
        axisLine: {
          roundCap: true,
          lineStyle: {
            width: 18,
          },
        },
        axisTick: {
          splitNumber: 2,
          lineStyle: {
            width: 2,
            color: "#999",
          },
        },
        splitLine: {
          length: 12,
          lineStyle: {
            width: 3,
            color: "#999",
          },
        },
        axisLabel: {
          distance: 30,
          color: "#999",
          fontSize: 20,
        },
        detail: {
          backgroundColor: "#fff",
          borderColor: "#999",
          borderWidth: 2,
          width: "70%",
          lineHeight: 40,
          height: 40,
          borderRadius: 8,
          offsetCenter: [0, "35%"],
          valueAnimation: true,
          formatter: function (value) {
            return "{value|" + value.toFixed(0) + "}{unit|ord}";
          },
          rich: {
            value: {
              fontSize: 35,
              fontWeight: "bolder",
              color: "#777",
            },
            unit: {
              fontSize: 15,
              color: "#999",
              padding: [0, 0, -20, 10],
            },
          },
        },
        data: [
          {
            value: dashboardInfo.dailyOrders,
          },
        ],
      },
    ],
  };

  const todayAmountOption = {
    title: {
      text: `Today's Sale Amount: ${dashboardInfo.todaySaleAmount} $`,
      left: "center",
      top: 0, // Adjust the top value to control the space between the title and the chart
    },
    series: [
      {
        type: "gauge",
        axisLine: {
          lineStyle: {
            width: 30,
            color: [
              [0.3, "#fd666d"],
              [0.7, "#37a2da"],
              [1, "#67e0e3"],
            ],
          },
        },
        pointer: {
          itemStyle: {
            color: "auto",
          },
        },
        axisTick: {
          distance: -30,
          length: 8,
          lineStyle: {
            color: "#fff",
            width: 2,
          },
        },
        splitLine: {
          distance: -30,
          length: 30,
          lineStyle: {
            color: "#fff",
            width: 4,
          },
        },
        axisLabel: {
          color: "inherit",
          distance: 40,
          fontSize: 10,
        },
        title: {
          show: true,
          offsetCenter: [0, "-40%"], // Adjust the position of the title
          textStyle: {
            color: "#fff",
            fontSize: 14,
          },
          text: "Today's Sales",
        },
        detail: {
          valueAnimation: true,
          formatter: "{value} %",
          color: "inherit",
          offsetCenter: [0, "70%"], // Move the value below the gauge
          fontSize: 16,
        },
        data: [
          {
            value: ((dashboardInfo.todaySaleAmount / 400000) * 100).toFixed(2),
          },
        ],
      },
    ],
  };

  useEffect(() => {
    const fetchDashboardInfo = async () => {
      try {
        const response = await totalOrders();
        if (response) {
          setDashboardInfo(response);
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard info:", error);
      }
    };
    fetchDashboardInfo();
  }, []);

  if (loading) {
    return <Loader />;
  }

  const renderCard = (title, value, cName) => (
    <Col md={6}>
      <Card className={`shadow-sm p-2 mb-4 bg-white rounded ${cName}`}>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            <h3>{value.toLocaleString("en-US")}</h3>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );

  const renderAlert = (message, key) => (
    <Col md={12} key={key}>
      <Card className="shadow-sm p-3 mb-4 bg-white rounded">
        <Card.Body>
          <Card.Text>
            <FontAwesomeIcon icon={faCircleExclamation} size="1x" color="red" />
            <strong> {message}</strong>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );

  return (
    <div style={{ width: "95vw" }}>
      <Container fluid style={{ margin: "20px" }}>
        <Row>
          <Col>
            <h3>Important Information</h3>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Card
              className="shadow-sm p-3 mb-4 bg-white rounded"
              style={{ height: "400px" }}
            >
              <Card.Body>
                <ReactEcharts
                  option={todaysSalesOption}
                  style={{ height: "100%", width: "100%" }}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card
              className="shadow-sm p-3 mb-4 bg-white rounded"
              style={{ height: "400px" }}
            >
              <Card.Body>
                <ReactEcharts
                  option={todayAmountOption}
                  style={{ height: "100%", width: "100%" }}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card
              className="shadow-sm p-3 mb-4 bg-white rounded"
              style={{ height: "400px" }}
            >
              <Card.Body>
                <ReactEcharts
                  option={inventoryOptions}
                  style={{ height: "100%", width: "100%" }}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {/* <Row>
          <Col md={12}>
            <Card
              className="shadow-sm p-3 mb-4 bg-white rounded"
              style={{ height: "400px" }}
            >
              <Card.Body>
                <ReactEcharts
                  option={inventoryOptions}
                  style={{ height: "100%", width: "100%" }}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row> */}
        <Row className="mb-4">
          {renderCard(
            "Total Products in Inventory",
            dashboardInfo.totalItems,
            "summary-card"
          )}
          {renderCard(
            "Low Stock Items",
            dashboardInfo.numberOfLowStockItems -
              dashboardInfo.numberOfOutOfStockItems,
            "lowstock-card"
          )}
          {renderCard(
            "Out-of-Stock Items",
            dashboardInfo.numberOfOutOfStockItems,
            "outstock-card"
          )}
          {renderCard(
            "Total Orders",
            dashboardInfo.totalOrders,
            "totalorders-card"
          )}
        </Row>

        <Row>
          <Col>
            <h2>Recent Orders</h2>
          </Col>
        </Row>
        <Row className="mb-4">
          {dashboardInfo.latestOrders.map((order) => (
            <Col md={12} key={order.id}>
              <Card className="shadow-sm p-3 mb-4 bg-white rounded recent-order-card ">
                <Card.Body>
                  <Card.Text className="d-flex justify-content-between">
                    <div>
                      <strong>Order #{order.id}</strong>
                      <br />
                      Order Date: {order.orderDate}
                    </div>
                    <div style={{ textAlign: "right" }}>
                      Customer: {order.customer.name}
                      <br />
                      Status: Delivered
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Row>
          <Col>
            <h2>Important Alerts</h2>
          </Col>
        </Row>
        <Row>
          {dashboardInfo.importantAlerts.map((alert, index) =>
            renderAlert(alert, index)
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
