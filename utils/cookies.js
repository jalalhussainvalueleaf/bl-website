import Cookies from "js-cookie";

/**
 * Store the token in cookies securely with a 1-hour expiration.
 * @param {string} token - The token to be stored.
 */
export function setToken(token) {
  const oneHourFromNow = new Date(new Date().getTime() + 60 * 60 * 1000); // Current time + 1 hour
  Cookies.set("_token", token, {
    expires: oneHourFromNow, // Token expires in 1 hour
    secure: true, // Ensures it's sent over HTTPS
    sameSite: "Strict", // Limits cross-origin access
  });
}

/**
 * Retrieve the token from cookies.
 * @returns {string | undefined} - The token if it exists, or undefined if not found.
 */
export function getToken() {
  return Cookies.get("_token");
}

/**
 * Remove the token from cookies.
 */
export function removeToken() {
  Cookies.remove("_token");
}
