"use server";
import { redirect } from "next/navigation";
import { baseUrl, getHeaders } from "./config";
import { revalidatePath } from "next/cache";
import { deleteToken, setToken } from "@/lib/token";
import { headers } from "next/headers";

export async function logout() {
  try {
    await deleteToken(); // This deletes the token cookie
    return true; // Return success
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
}

export async function generateOTP(civilId) {
  try {
    const response = await fetch(`${baseUrl}generate-otp`, {
      method: "POST",
      headers: await getHeaders(),
      body: JSON.stringify({ civilId }), // Ensure structure matches the backend DTO
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to generate OTP.");
    }

    const result = await response.text(); // Backend returns plain text
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error generating OTP:", error.message);
    throw error;
  }
}

export async function validateOTP(otp) {
  try {
    const response = await fetch(`${baseUrl}validate-otp`, {
      method: "POST",
      headers: await getHeaders(),
      body: JSON.stringify({ otp }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to validate OTP.");
    }

    const result = await response.text(); // Backend returns plain text token
    console.log("Token:", result);

    // Store the token for future requests
    await setToken(result);
    return result;
  } catch (error) {
    console.error("Error validating OTP:", error.message);
    throw error;
  }
}

export async function registerUser(civilId, username, password) {
  try {
    const response = await fetch(`${baseUrl}register`, {
      method: "POST",
      headers: await getHeaders(),
      body: JSON.stringify({ civilId, username, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to register user.");
    }

    const result = await response.text();
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error registering user:", error.message);
    throw error;
  }
}

export async function login(username, password) {
  try {
    const payload = { username, password };
    const headers = {
      "Content-Type": "application/json",
    };

    const response = await fetch(`${baseUrl}login`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();

    if (!response.ok) {
      throw new Error(responseText || "Failed to login.");
    }

    // Store the token
    await setToken(responseText);

    console.log("Token: ", responseText);
    return responseText;
  } catch (error) {
    console.error("Error logging in user:", error.message);
    throw error;
  }
}

export async function getBankCards() {
  try {
    const response = await fetch(`${baseUrl}bank-cards`, {
      method: "GET",
      headers: await getHeaders(),
    });
    console.log("Response Status:", response.status); // Log the response status
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch bank cards.");
    }

    const result = await response.json(); // Backend returns a list of cards
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error fetching bank cards:", error.message);
    throw error;
  }
}

export async function saveSelectedCards(cardIds) {
  try {
    const response = await fetch(`${baseUrl}select-cards`, {
      method: "POST",
      headers: await getHeaders(),
      body: JSON.stringify(cardIds), // Send card IDs array
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to save selected cards.");
    }

    const result = await response.text();
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error saving selected cards:", error.message);
    throw error;
  }
}

export async function getLinkedCards() {
  try {
    const response = await fetch(`${baseUrl}linked-cards`, {
      method: "GET",
      headers: await getHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch linked cards.");
    }

    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error fetching linked cards:", error.message);
    throw error;
  }
}

export async function getUserDetails() {
  try {
    const response = await fetch(`${baseUrl}user-details`, {
      method: "GET",
      headers: await getHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch user details.");
    }

    const result = await response.json();
    console.log("User details:", result);
    return result;
  } catch (error) {
    console.error("Error fetching user details:", error.message);
    throw error;
  }
}
