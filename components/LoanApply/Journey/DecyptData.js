import CryptoJS from "crypto-js";

export default function DecryptExample() {
  // Values received from the server
  const encryptedDataBase64 =
    "hUjVgE0Pn25MxHkifRepPugQCuPK4AGEEVigXPrFQ6eVToIzZi0xCwL5K/95yvFg"; // Encrypted data
  const secretKey = "1234567890123456"; // Secret key
  const secretIv = "abcdefghijklmnop"; // Initialization vector (IV)

  // Decrypt function
  const decryptData = (encryptedData, key, iv) => {
    try {
      // Decode encrypted data from Base64
      const encryptedBytes = CryptoJS.enc.Base64.parse(encryptedData);

      // Parse the key and IV to Utf8
      const parsedKey = CryptoJS.enc.Utf8.parse(key);
      const parsedIv = CryptoJS.enc.Utf8.parse(iv);

      // Perform AES decryption
      const decryptedBytes = CryptoJS.AES.decrypt(
        { ciphertext: encryptedBytes },
        parsedKey,
        {
          iv: parsedIv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7,
        },
      );

      // Convert decrypted bytes to a readable string
      const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);

      return JSON.parse(decryptedData); // Parse JSON if the data is in JSON format
    } catch (error) {
      console.error("Decryption error:", error);
      return null;
    }
  };

  // Call the decryption function
  const decryptedResponse = decryptData(
    encryptedDataBase64,
    secretKey,
    secretIv,
  );

  // Log and display decrypted data
  console.log("Decrypted Response:", decryptedResponse);

  return (
    <div>
      <h1>Decryption Example</h1>
      <pre>{JSON.stringify(decryptedResponse, null, 2)}</pre>
    </div>
  );
}
