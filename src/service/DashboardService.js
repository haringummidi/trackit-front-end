import { ENDPOINTS } from "../config/apiConfig";

const HOST = "http://localhost:8080";

export async function totalOrders() {
  const TOKEN = JSON.parse(window.localStorage.getItem("userInfo")).accessToken;

  // console.log(TOKEN);
  try {
    const response = await fetch(`${HOST}${ENDPOINTS.orderCount}`, {
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
