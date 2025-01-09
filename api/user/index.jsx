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

// Check Users Offer API
export const checkOffers = (payload) => {
  return api.post("/fetch_user_appl_wise_loan_status.php", payload);
};

// Check Email Delivery Level API
export const checkEmailDelivery = (payload) => {
  return api.post("/email_validate.php", payload);
};

// Update Partial User Data API
export const partialSubmit = (payload) => {
  return api.post("/update_user_temp.php", payload);
};

// Check Pincode API
export const checkPincodeAPI = (payload) => {
  return api.post("/autopopulate_pincode_api.php", payload);
};



