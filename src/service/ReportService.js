import { ENDPOINTS } from "../config/apiConfig";

const HOST = "http://localhost:8080";

export async function countTotalProducts() {
  const TOKEN = JSON.parse(window.localStorage.getItem("userInfo")).accessToken;

  try {
    const response = await fetch(`${HOST}${ENDPOINTS.countTotalProducts}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + TOKEN,
      },
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

export async function countProductsByDepartment() {
  const TOKEN = JSON.parse(window.localStorage.getItem("userInfo")).accessToken;

  try {
    const response = await fetch(
      `${HOST}${ENDPOINTS.countProductsByDepartment}`,
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

export async function countProductsByCategory() {
  const TOKEN = JSON.parse(window.localStorage.getItem("userInfo")).accessToken;

  try {
    const response = await fetch(
      `${HOST}${ENDPOINTS.countProductsByCategory}`,
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

export async function findStockLevelsByProduct() {
  const TOKEN = JSON.parse(window.localStorage.getItem("userInfo")).accessToken;

  try {
    const response = await fetch(
      `${HOST}${ENDPOINTS.findStockLevelsByProduct}`,
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

export async function findTopMostStockedProducts(page, size) {
  const TOKEN = JSON.parse(window.localStorage.getItem("userInfo")).accessToken;

  try {
    const response = await fetch(
      `${HOST}${ENDPOINTS.findTopMostStockedProducts}?page=${page}&size=${size}`,
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

export async function findTopLeastStockedProducts(page, size) {
  const TOKEN = JSON.parse(window.localStorage.getItem("userInfo")).accessToken;

  try {
    const response = await fetch(
      `${HOST}${ENDPOINTS.findTopLeastStockedProducts}?page=${page}&size=${size}`,
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

export async function findSupplierContributionToStock() {
  const TOKEN = JSON.parse(window.localStorage.getItem("userInfo")).accessToken;

  try {
    const response = await fetch(
      `${HOST}${ENDPOINTS.findSupplierContributionToStock}`,
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

export async function findTopSuppliersByNumberOfProductsSupplied(page, size) {
  const TOKEN = JSON.parse(window.localStorage.getItem("userInfo")).accessToken;

  try {
    const response = await fetch(
      `${HOST}${ENDPOINTS.findTopSuppliersByNumberOfProductsSupplied}?page=${page}&size=${size}`,
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

export async function findProductsWithNoStock() {
  const TOKEN = JSON.parse(window.localStorage.getItem("userInfo")).accessToken;

  try {
    const response = await fetch(
      `${HOST}${ENDPOINTS.findProductsWithNoStock}`,
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

// Methods for OrderController endpoints
export async function findTotalSalesByMonth() {
  const TOKEN = JSON.parse(window.localStorage.getItem("userInfo")).accessToken;

  try {
    const response = await fetch(`${HOST}${ENDPOINTS.findTotalSalesByMonth}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + TOKEN,
      },
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

export async function findTotalSalesByYear() {
  const TOKEN = JSON.parse(window.localStorage.getItem("userInfo")).accessToken;

  try {
    const response = await fetch(`${HOST}${ENDPOINTS.findTotalSalesByYear}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + TOKEN,
      },
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

export async function findCustomerOrderFrequency() {
  const TOKEN = JSON.parse(window.localStorage.getItem("userInfo")).accessToken;

  try {
    const response = await fetch(
      `${HOST}${ENDPOINTS.findCustomerOrderFrequency}`,
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

export async function findTopCustomersBySalesVolume(page, size) {
  const TOKEN = JSON.parse(window.localStorage.getItem("userInfo")).accessToken;

  try {
    const response = await fetch(
      `${HOST}${ENDPOINTS.findTopCustomersBySalesVolume}?page=${page}&size=${size}`,
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

export async function findOrdersByDay() {
  const TOKEN = JSON.parse(window.localStorage.getItem("userInfo")).accessToken;

  try {
    const response = await fetch(`${HOST}${ENDPOINTS.findOrdersByDay}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + TOKEN,
      },
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

export async function findAverageOrderValue() {
  const TOKEN = JSON.parse(window.localStorage.getItem("userInfo")).accessToken;

  try {
    const response = await fetch(`${HOST}${ENDPOINTS.findAverageOrderValue}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + TOKEN,
      },
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

// Methods for OrderDetailController endpoints
export async function findTopBestSellingProducts(page, size) {
  const TOKEN = JSON.parse(window.localStorage.getItem("userInfo")).accessToken;

  try {
    const response = await fetch(
      `${HOST}${ENDPOINTS.findTopBestSellingProducts}?page=${page}&size=${size}`,
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

export async function findSalesByProductCategory() {
  const TOKEN = JSON.parse(window.localStorage.getItem("userInfo")).accessToken;

  try {
    const response = await fetch(
      `${HOST}${ENDPOINTS.findSalesByProductCategory}`,
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

export async function findSalesByProductDepartment() {
  const TOKEN = JSON.parse(window.localStorage.getItem("userInfo")).accessToken;

  try {
    const response = await fetch(
      `${HOST}${ENDPOINTS.findSalesByProductDepartment}`,
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
