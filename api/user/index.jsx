import api from "../index";

// Check Users API
export const sendSMS = (payload) => {
  return api.post("/v2/sendsms_v2.php", payload);
};

// Verify OTP API
export const verifyOTP = (payload) => {
  return api.post("/verifynewotp.php", payload);
};

// Resend OTP API
export const resendOTP = (payload) => {
  return api.post("/Resend_otp.php", payload);
};

// Check Users API
export const userSearch = (payload) => {
  return api.post("/user_search.php", payload);
};
