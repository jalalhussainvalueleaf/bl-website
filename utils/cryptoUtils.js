// utils/cryptoUtils.js

import CryptoJS from "crypto-js";

// Secret key and IV for AES encryption/decryption
const secretKey = "1234567890123456"; // 16-byte key for AES
const secretIv = "abcdefghijklmnop"; // 16-byte initialization vector (IV)

/**
 * Encrypt data using AES encryption
 * @param {any} data - Data to encrypt (can be any JavaScript object)
 * @returns {string} - Encrypted string
 */
export function encryptData(data) {
  const dataString = JSON.stringify(data);

  const encryptedData = CryptoJS.AES.encrypt(
    dataString,
    CryptoJS.enc.Utf8.parse(secretKey),
    {
      iv: CryptoJS.enc.Utf8.parse(secretIv),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    },
  ).toString();

  return encryptedData;
}

/**
 * Decrypt data using AES decryption
 * @param {string} encryptedData - The encrypted string
 * @returns {any} - Decrypted data (JavaScript object)
 */
export function decryptData(encryptedData) {
  const bytes = CryptoJS.AES.decrypt(
    encryptedData,
    CryptoJS.enc.Utf8.parse(secretKey),
    {
      iv: CryptoJS.enc.Utf8.parse(secretIv),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    },
  );

  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

  // Return the parsed JSON data
  return JSON.parse(decryptedData);
}
