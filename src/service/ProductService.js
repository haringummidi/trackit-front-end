import { ENDPOINTS } from "../config/apiConfig";

const HOST = "http://localhost:8080";

export async function getAllProducts() {
  const TOKEN = JSON.parse(window.localStorage.getItem("userInfo")).accessToken;

  // console.log(TOKEN);
  try {
    const response = await fetch(`${HOST}${ENDPOINTS.getAllProducts}`, {
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

export async function getProductById(id) {
  const TOKEN = JSON.parse(window.localStorage.getItem("userInfo")).accessToken;

  // console.log(TOKEN);
  try {
    const response = await fetch(`${HOST}${ENDPOINTS.getAllProducts}/${id}`, {
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

export async function getProductsByOrder(id) {
  const TOKEN = JSON.parse(window.localStorage.getItem("userInfo")).accessToken;

  // console.log(TOKEN);
  try {
    const response = await fetch(`${HOST}${ENDPOINTS.getAllProducts}/${id}`, {
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

export async function createProduct(product) {
  const TOKEN = JSON.parse(window.localStorage.getItem("userInfo")).accessToken;

  // console.log(TOKEN);
  try {
    const response = await fetch(`${HOST}${ENDPOINTS.saveProduct}`, {
      // const response = await fetch(
      //   `https://webhook.site/5dde5401-7f2a-458a-b659-198f8ab034ae`,
      //   {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + TOKEN,
      },
      body: JSON.stringify(product),
      credentials: "include",

      // mode: "no-cors",
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

export async function updateProduct(product) {
  const TOKEN = JSON.parse(window.localStorage.getItem("userInfo")).accessToken;

  // console.log(TOKEN);
  try {
    const response = await fetch(
      `${HOST}${ENDPOINTS.saveProduct}/${product.id}`,
      {
        // const response = await fetch(
        //   `https://webhook.site/5dde5401-7f2a-458a-b659-198f8ab034ae`,
        //   {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + TOKEN,
        },
        body: JSON.stringify(product),
        credentials: "include",

        // mode: "no-cors",
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

export async function deleteProduct(productId) {
  const TOKEN = JSON.parse(window.localStorage.getItem("userInfo")).accessToken;

  // console.log(TOKEN);
  try {
    const response = await fetch(
      `${HOST}${ENDPOINTS.saveProduct}/${productId}`,
      {
        method: "DELETE",
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

export async function getProductByBarcode(barcode) {
  const TOKEN = JSON.parse(window.localStorage.getItem("userInfo")).accessToken;

  // console.log(TOKEN);
  try {
    const response = await fetch(
      `${HOST}${ENDPOINTS.getProductByBarcode}/${barcode}`,
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
