// utils/cryptoUtils.js

import CryptoJS from "crypto-js";

// Secret key and IV for AES encryption/decryption
const secretKeyHex =
  "3c06413b2f13ed3edd4afddbeacb08b93b5da8ae4c5ba73e8683ce3c73ae1c59"; // Hexadecimal key
const secretIvAscii = "1a2b3c4d5e6f7g8h"; // ASCII IV

// Utility functions
const hexToUint8Array = (hex) => {
  return new Uint8Array(hex.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));
};

const base64Encode = (buffer) => {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)));
};

const base64Decode = (base64) => {
  return Uint8Array.from(atob(base64), (char) => char.charCodeAt(0));
};

// Convert secret key and IV to appropriate formats
const keyData = hexToUint8Array(secretKeyHex);
const iv = new TextEncoder().encode(secretIvAscii);

/**
 * Encrypt data using AES encryption
 * @param {string} data - Data to encrypt (string format)
 * @returns {Promise<string>} - Encrypted string in Base64 format
 */
export async function encryptData(data) {
  try {
    // Import the encryption key
    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "AES-CBC" },
      false,
      ["encrypt"],
    );

    // Encrypt the data
    const dataBuffer = new TextEncoder().encode(data);
    const encryptedBuffer = await crypto.subtle.encrypt(
      { name: "AES-CBC", iv },
      cryptoKey,
      dataBuffer,
    );

    // Combine IV and encrypted data
    const combinedData = new Uint8Array(iv.length + encryptedBuffer.byteLength);
    combinedData.set(iv);
    combinedData.set(new Uint8Array(encryptedBuffer), iv.length);

    // Encode to Base64
    return base64Encode(combinedData);
  } catch (error) {
    console.error("Encryption failed:", error);
    throw error;
  }
}

/**
 * Decrypt data using AES decryption
 * @param {string} encryptedData - The encrypted string in Base64 format
 * @returns {Promise<string>} - Decrypted string
 */
export async function decryptData64(encryptedData) {
  try {
    // Decode Base64 to get combined data
    const combinedData = base64Decode(encryptedData);

    // Extract IV and encrypted data
    const extractedIv = combinedData.slice(0, iv.length);
    const encryptedBuffer = combinedData.slice(iv.length);

    // Import the decryption key
    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "AES-CBC" },
      false,
      ["decrypt"],
    );

    // Decrypt the data
    const decryptedBuffer = await crypto.subtle.decrypt(
      { name: "AES-CBC", iv: extractedIv },
      cryptoKey,
      encryptedBuffer,
    );

    // Decode to string
    return new TextDecoder().decode(decryptedBuffer);
  } catch (error) {
    console.error("Decryption failed:", error);
    throw error;
  }
}
