import React, { useState, useEffect } from "react";
import {
  countTotalProducts,
  countProductsByDepartment,
  countProductsByCategory,
  findStockLevelsByProduct,
  findTopMostStockedProducts,
  findTopLeastStockedProducts,
  findSupplierContributionToStock,
  findTopSuppliersByNumberOfProductsSupplied,
  findProductsWithNoStock,
  findTotalSalesByMonth,
  findTotalSalesByYear,
  findCustomerOrderFrequency,
  findTopCustomersBySalesVolume,
  findOrdersByDay,
  findAverageOrderValue,
  findTopBestSellingProducts,
  findSalesByProductCategory,
  findSalesByProductDepartment,
} from "../service/ReportService";
import { ClipLoader } from "react-spinners";
import { Col, Container, Row, Card } from "react-bootstrap";
import MonthlySalesChart from "../components/report/MonthlySalesChart";
import YearlySalesChart from "../components/report/YearlySalesChart";
import ProductsByCategoryChart from "../components/report/ProductsByCategoryChart";
import PiePadAngle from "../components/report/PiePadAngleChart";
import MonthsInYearSalesChart from "../components/report/MonthsInYearSalesChart";
import NightingaleChart from "../components/report/NightingaleChart";
import {
  FaBox,
  FaDollarSign,
  FaChartLine,
  FaShoppingCart,
} from "react-icons/fa";
import "./Report.css"; // Import the custom CSS
import Loader from "../components/Loader";

const InfoCard = ({ icon, title, value, change }) => (
  <Card className="info-card">
    <div className="icon">{icon}</div>
    <div className="info">
      <div className="title">{title}</div>
      <div className="value">{value}</div>
      {change && <div className="change">{change}</div>}
    </div>
  </Card>
);

const Reporting = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    totalProducts: 0,
    productsByDepartment: [],
    productsByCategory: [],
    stockLevels: [],
    mostStockedProducts: [],
    leastStockedProducts: [],
    supplierContribution: [],
    topSuppliers: [],
    productsWithNoStock: [],
    totalSalesByMonth: [],
    totalSalesByYear: [],
    customerOrderFrequency: [],
    topCustomers: [],
    ordersByDay: [],
    averageOrderValue: 0,
    bestSellingProducts: [],
    salesByProductCategory: [],
    salesByProductDepartment: [],
  });
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          totalProducts,
          productsByDepartment,
          productsByCategory,
          stockLevels,
          mostStockedProducts,
          leastStockedProducts,
          supplierContribution,
          topSuppliers,
          productsWithNoStock,
          totalSalesByMonth,
          totalSalesByYear,
          customerOrderFrequency,
          topCustomers,
          ordersByDay,
          averageOrderValue,
          bestSellingProducts,
          salesByProductCategory,
          salesByProductDepartment,
        ] = await Promise.all([
          countTotalProducts(),
          countProductsByDepartment(),
          countProductsByCategory(),
          findStockLevelsByProduct(),
          findTopMostStockedProducts(page, size),
          findTopLeastStockedProducts(page, size),
          findSupplierContributionToStock(),
          findTopSuppliersByNumberOfProductsSupplied(page, size),
          findProductsWithNoStock(),
          findTotalSalesByMonth(),
          findTotalSalesByYear(),
          findCustomerOrderFrequency(),
          findTopCustomersBySalesVolume(page, size),
          findOrdersByDay(),
          findAverageOrderValue(),
          findTopBestSellingProducts(page, size),
          findSalesByProductCategory(),
          findSalesByProductDepartment(),
        ]);

        setData({
          totalProducts,
          productsByDepartment,
          productsByCategory,
          stockLevels,
          mostStockedProducts,
          leastStockedProducts,
          supplierContribution,
          topSuppliers,
          productsWithNoStock,
          totalSalesByMonth,
          totalSalesByYear,
          customerOrderFrequency,
          topCustomers,
          ordersByDay,
          averageOrderValue,
          bestSellingProducts,
          salesByProductCategory,
          salesByProductDepartment,
        });

        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [page, size]);

  const currentYear = new Date().getFullYear();
  const sumOfOrdersThisYear = data.ordersByDay
    .filter(([date]) => new Date(date).getFullYear() === currentYear)
    .reduce((sum, [, orders]) => sum + orders, 0);

  if (loading) {
    return <Loader />;
  }

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h1>Sales Report</h1>
          <p className="text-muted">Overview of key metrics and trends</p>
        </Col>
      </Row>
      <Row className="mb-4" style={{ marginTop: "50px" }}>
        <Col md={3}>
          <InfoCard
            icon={<FaBox size="2.2rem" color="#ffffff" />}
            title="Total Orders in this Year"
            value={sumOfOrdersThisYear.toLocaleString("en-US")}
            // change="+10% from last month"
          />
        </Col>
        <Col md={3}>
          <InfoCard
            icon={<FaDollarSign size="2.2rem" color="#ffffff" />}
            title="Average Order Value"
            value={`${data.averageOrderValue.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}`}
            // change="+5% from last month"
          />
        </Col>
        <Col md={3}>
          <InfoCard
            icon={<FaChartLine size="2.2rem" color="#ffffff" />}
            title="Total Sales by Year"
            value={data.totalSalesByYear[0][1].toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
            // change="+15% from last year"
          />
        </Col>
        <Col md={3}>
          <InfoCard
            icon={<FaShoppingCart size="2.2rem" color="#ffffff" />}
            title="Total Sales by Month"
            value={data.totalSalesByMonth[
              data.totalSalesByMonth.length - 1
            ][1].toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
            // change="+8% from last month"
          />
        </Col>
      </Row>
      <hr />
      <Row className="mb-4" style={{ marginTop: "50px" }}>
        <Col md={6}>
          <MonthlySalesChart data={data.totalSalesByMonth} />
        </Col>
        <Col md={6}>
          <YearlySalesChart
            data={data.totalSalesByYear}
            title={"Yearly Sales"}
            subtext={"Sales Data from 2020 to 2024"}
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={8}>
          <MonthsInYearSalesChart data={data.ordersByDay} />
        </Col>
        <Col md={4}>
          <PiePadAngle
            data={data.salesByProductDepartment}
            title="Best Selling Products"
            subtext="Products with most sales!"
          />
        </Col>
      </Row>
      <hr className="mt-4" />

      <h2>Products Report</h2>
      <Row className="mb-4">
        <Col md={4}>
          <PiePadAngle
            data={data.bestSellingProducts}
            title="Best Selling Products"
            subtext="Products with most sales!"
          />
        </Col>
        <Col md={4}>
          <YearlySalesChart
            data={data.mostStockedProducts}
            title="Most Stock Products"
            subtext="Most stocked items based on count"
          />
        </Col>
        <Col md={4}>
          <YearlySalesChart
            data={data.leastStockedProducts}
            title="Low Stock Products"
            subtext="Least stocked items based on count"
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={6}>
          <ProductsByCategoryChart
            data={data.productsByCategory}
            title="Products by Category"
            subtext="Distribution of Products Categories"
          />
        </Col>
        <Col md={6}>
          <ProductsByCategoryChart
            data={data.productsByDepartment}
            title="Products by Department"
            subtext="Distribution of Products Departments"
          />
        </Col>
      </Row>
      <hr className="mt-4" />

      <h2>Supplier Report</h2>
      <Row className="mb-4">
        <Col md={12}>
          <YearlySalesChart
            data={data.supplierContribution}
            title="Supplier Contribution"
            subtext="Suppliers distribution based on products"
          />
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <NightingaleChart
            data={data.topSuppliers}
            title="Top Suppliers"
            subtext="Suppliers distribution based on sales of product"
          />
        </Col>
      </Row>

      <hr className="mt-4" />

      <h2>Customer Report</h2>
      <Row className="mb-4">
        <Col md={12}>
          <NightingaleChart
            data={data.topCustomers}
            title="Top Customer"
            subtext="Customers with more sales"
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={12}>
          <ProductsByCategoryChart
            data={data.customerOrderFrequency}
            title="Customer Order Frequency"
            subtext="Distribution of customers based on the frequency"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Reporting;
