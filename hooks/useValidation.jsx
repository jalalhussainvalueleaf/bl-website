import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Define individual field schemas
const fieldSchemas = {
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters")
    .regex(/^[a-zA-Z\s]*$/, "Name should only contain letters and spaces"),

  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must not exceed 50 characters")
    .regex(
      /^[a-zA-Z\s]*$/,
      "First name should only contain letters and spaces",
    ),

  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must not exceed 50 characters")
    .regex(/^[a-zA-Z\s]*$/, "Last name should only contain letters and spaces"),

  mobileNumber: z
    .string()
    .length(10, "Mobile number must be exactly 10 digits")
    .regex(/^[0-9]+$/, "Mobile number should only contain numbers"),

  panNumber: z
    .string()
    .length(10, "PAN number must be exactly 10 characters")
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN number format"),

  dob: z
    .date()
    .max(new Date(), "Date of birth cannot be in the future")
    .min(new Date(1900, 0, 1), "Invalid date of birth")
    .transform((date) => new Date(date)),

  pincode: z
    .string()
    .length(6, "Pincode must be exactly 6 digits")
    .regex(/^[0-9]+$/, "Pincode should only contain numbers"),

  state: z
    .string()
    .min(2, "State name is required")
    .max(30, "State name is too long"),

  city: z
    .string()
    .min(2, "City name is required")
    .max(30, "City name is too long"),

  email: z
    .string()
    .email("Invalid email address")
    .min(5, "Email is required")
    .refine(
      (email) => {
        const blockedDomains = ["test.com", "testing.com", "example.com"];
        const domain = email.split("@")[1];
        const isBlockedDomain = blockedDomains.includes(domain);
        return !isBlockedDomain;
      },
      {
        message: "This email address is not allowed.",
      },
    ),

  companyName: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .max(50, "Company name must not exceed 50 characters")
    .regex(
      /^[a-zA-Z\s]*$/,
      "Company name should only contain letters and spaces",
    ),

  monthlyIncome: z
    .string()
    .regex(/^\d+$/, "Monthly income must be a valid numeric value")
    .min(1, "Monthly income is required")
    .refine(
      (value) => parseInt(value) > 0 && parseInt(value) <= 10000000,
      "Monthly income must be greater than 0 and less than or equal to 10,000,000",
    ),

  address: z
    .string()
    .min(5, "Address must be at least 5 characters long")
    .max(100, "Address must not exceed 100 characters")
    .regex(
      /^[a-zA-Z0-9\s,.'-]+$/,
      "Address should contain only letters, numbers, spaces, and common punctuation (,.'-)",
    ),

  otp: z
    .string()
    .length(6, "OTP must be 6 digits")
    .regex(/^[0-9]+$/, "OTP should only contain numbers"),

  upiId: z
    .string()
    .min(5, "UPI ID must be at least 5 characters long")
    .regex(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9.-]+$/, "Invalid UPI ID format"),

  accountNumber: z
    .string()
    .length(16, "Account number must be exactly 16 digits")
    .regex(/^[0-9]+$/, "Account number should only contain numbers"),

  ifscNumber: z
    .string()
    .length(11, "IFSC code must be exactly 11 characters")
    .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code format"),

  terms: z.literal(true, {
    errorMap: () => ({
      message: "You must accept the terms and conditions",
    }),
  }),

  registrationId: z
    .string()
    .min(5, "Registration ID must be at least 5 characters long")
    .max(20, "Registration ID must not exceed 20 characters")
    .regex(
      /^[a-zA-Z0-9]+$/,
      "Registration ID should only contain alphanumeric characters",
    )
    .optional(),

  annualTurnover: z
    .string()
    .regex(/^\d+$/, "Annual turnover must be a valid numeric value")
    .min(1, "Annual turnover is required"),

  gstNumber: z
    .string()
    .regex(
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[A-Z0-9]{1}$/,
      "Invalid GST number format",
    )
    .optional(),

  hasBusinessProof: z.string().optional(),

  hasGst: z.string().optional(),

  gender: z.string().min(1, "Please select a gender"),

  tenure: z.string().min(1, "Please select a tenure option"),

  maritalStatus: z.string().min(1, "Please select your marital status"),

  experience: z.string().min(1, "Please select your experience"),

  companyType: z.string().min(1, "Please select your company type"),
};

// Create dynamic schema based on required fields and form state
export const createSchema = (fields, formData) => {
  const schemaObject = {};

  fields.forEach((field) => {
    if (fieldSchemas[field]) {
      if (field === "registrationId") {
        schemaObject[field] =
          formData?.hasBusinessProof === "yes"
            ? z
                .string()
                .min(1, "Registration ID is required")
                .and(fieldSchemas[field])
            : z.string().optional();
      } else if (field === "gstNumber") {
        schemaObject[field] =
          formData?.hasGst === "yes"
            ? z
                .string()
                .min(1, "GST number is required")
                .and(fieldSchemas[field])
            : z.string().optional();
      } else {
        schemaObject[field] = fieldSchemas[field];
      }
    }
  });

  return z.object(schemaObject);
};

export const useFormValidation = (fields) => {
  const form = useForm({
    resolver: (values, context, options) => {
      const schema = createSchema(fields, values);
      return zodResolver(schema)(values, context, options);
    },
    mode: "onChange",
  });

  return form;
};
