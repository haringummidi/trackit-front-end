import { ENDPOINTS } from "../config/apiConfig";

const HOST = "http://localhost:8080";

export async function loginUser(email, password) {
  console.log(ENDPOINTS.login);
  try {
    const response = await fetch(`${HOST}${ENDPOINTS.login}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
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
