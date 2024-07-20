import { ENDPOINTS } from "../config/apiConfig";

const HOST = "http://localhost:8080";

export const getUsers = async () => {
  const TOKEN = JSON.parse(window.localStorage.getItem("userInfo")).accessToken;

  // console.log(TOKEN);
  try {
    const response = await fetch(`${HOST}${ENDPOINTS.getUsers}`, {
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
};

export const createUser = async (user) => {
  const TOKEN = JSON.parse(window.localStorage.getItem("userInfo")).accessToken;

  // console.log(TOKEN);
  try {
    const response = await fetch(`${HOST}${ENDPOINTS.getUsers}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + TOKEN,
      },
      body: JSON.stringify(user),
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
};

export const updateUser = async (id, user) => {
  const TOKEN = JSON.parse(window.localStorage.getItem("userInfo")).accessToken;

  // console.log(TOKEN);
  try {
    const response = await fetch(`${HOST}${ENDPOINTS.getUsers}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + TOKEN,
      },
      body: JSON.stringify(user),
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
};

export const deleteUser = async (id) => {
  const TOKEN = JSON.parse(window.localStorage.getItem("userInfo")).accessToken;

  // console.log(TOKEN);
  try {
    const response = await fetch(`${HOST}${ENDPOINTS.getUsers}/${id}`, {
      method: "DELETE",
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
};

export const getAllRoles = async (id) => {
  const TOKEN = JSON.parse(window.localStorage.getItem("userInfo")).accessToken;

  // console.log(TOKEN);
  try {
    const response = await fetch(`${HOST}${ENDPOINTS.getUsers}/roles`, {
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
};
