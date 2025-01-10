import CONSTANTS from "./constants";

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
const keyData = hexToUint8Array(CONSTANTS.SECRETKEYHEX);
const iv = new TextEncoder().encode(CONSTANTS.SECRETIVASCII);

// Encrypt data using AES decryption
export async function encryptData64(data) {
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

// Decrypt data using AES decryption
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
