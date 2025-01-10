const CONSTANTS = {
  MOBILE_REGEX: /^[6-9]\d{9}$/,
  INVALID_NUMBERS: [
    "1111111111",
    "2222222222",
    "3333333333",
    "4444444444",
    "5555555555",
    "6666666666",
    "7777777777",
    "8888888888",
    "9876543210",
    "1234567890",
  ],
  STORAGE_KEYS: {
    TOKEN: "_token",
    JOURNEY: "journey",
    USER_STAT: "u_stat_bdl",
    MOBILE: "mobileNumber",
    HASERROR: "hasError",
  },
  TRANSITION_DELAY: 300,
  OTP_REGEX: /^[0-9]?$/,
  MESSAGES: {
    USER_TOKEN_MISSING: "User token is not available.",
    UNEXPECTED_ERROR: "An unexpected error occurred.",
    USER_SEARCH_ERROR: "In user search an unexpected error occurred.",
    OTP_SUCCESS: "OTP sent successfully.",
  },
  DELAY: 1000,
  SECRETKEYHEX:
    "3c06413b2f13ed3edd4afddbeacb08b93b5da8ae4c5ba73e8683ce3c73ae1c59",
  SECRETIVASCII: "1a2b3c4d5e6f7g8h",
};

export default CONSTANTS;
