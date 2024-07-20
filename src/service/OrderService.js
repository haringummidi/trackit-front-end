import { ENDPOINTS } from "../config/apiConfig";

const HOST = "http://localhost:8080";

export async function getAllOrders(page, size) {
  const TOKEN = JSON.parse(window.localStorage.getItem("userInfo")).accessToken;

  // console.log(TOKEN);
  try {
    const response = await fetch(
      `${HOST}${ENDPOINTS.getAllOrders}?page=${page}&size=${size}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + TOKEN,
        },
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Request failed:", error);
  }
}

export async function createOrder(order) {
  const TOKEN = JSON.parse(window.localStorage.getItem("userInfo")).accessToken;

  // console.log(TOKEN);
  try {
    const response = await fetch(`${HOST}${ENDPOINTS.createOrder}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + TOKEN,
      },
      body: JSON.stringify(order),
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Request failed:", error);
  }
}

export async function getOrderDetails(orderId) {
  const TOKEN = JSON.parse(window.localStorage.getItem("userInfo")).accessToken;

  // console.log(TOKEN);
  try {
    const response = await fetch(
      `${HOST}${ENDPOINTS.getOrderDetails}/${orderId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + TOKEN,
        },
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Request failed:", error);
  }
}

export async function saveOrderDetails(orderDetails) {
  const TOKEN = JSON.parse(window.localStorage.getItem("userInfo")).accessToken;

  // console.log(TOKEN);
  try {
    const response = await fetch(`${HOST}${ENDPOINTS.saveOrderDetails}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + TOKEN,
      },
      body: JSON.stringify(orderDetails),
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Request failed:", error);
  }
}

export async function searchCustomerByPhone(phoneNumber) {
  const TOKEN = JSON.parse(window.localStorage.getItem("userInfo")).accessToken;

  // console.log(TOKEN);
  try {
    const response = await fetch(
      `${HOST}${ENDPOINTS.getCustomerByPhone}/${phoneNumber}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + TOKEN,
        },
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Request failed:", error);
  }
}

export async function createCustomer(customer) {
  const TOKEN = JSON.parse(window.localStorage.getItem("userInfo")).accessToken;

  // console.log(TOKEN);
  try {
    const response = await fetch(`${HOST}${ENDPOINTS.createCustomer}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + TOKEN,
      },
      body: JSON.stringify(customer),
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Request failed:", error);
  }
}
