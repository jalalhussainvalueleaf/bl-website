"use client";
import { useState } from "react";

const CreditScoreForm = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    ename: "",
    pan_no: "",
    dob: "",
    gender: "",
    pincode: "",
    mobile_no: "",
    foo_bar: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <form
      id="bs-blog-form"
      name="score_form"
      method="post"
      autoComplete="off"
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-lg rounded-md border bg-white p-6 shadow-md"
    >
      {/* First Name */}
      <div className="mb-4">
        <label htmlFor="fname" className="block font-medium text-gray-700">
          First Name
        </label>
        <input
          id="firstname"
          type="text"
          name="fname"
          value={formData.fname}
          required
          placeholder="As per your PAN Card"
          onChange={handleChange}
          onKeyUp={(e) => {
            e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
          }}
          autoComplete="off"
          className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Last Name */}
      <div className="mb-4">
        <label htmlFor="lname" className="block font-medium text-gray-700">
          Last Name
        </label>
        <input
          id="lastname"
          type="text"
          name="lname"
          value={formData.lname}
          required
          placeholder="As per your PAN Card"
          onChange={handleChange}
          onKeyUp={(e) => {
            e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
          }}
          autoComplete="off"
          className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label htmlFor="ename" className="block font-medium text-gray-700">
          Email ID
        </label>
        <input
          type="email"
          name="ename"
          value={formData.ename}
          required
          placeholder="As per Your Bank Records"
          onChange={handleChange}
          autoComplete="off"
          className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* PAN Card */}
      <div className="mb-4">
        <label htmlFor="pan_no" className="block font-medium text-gray-700">
          PAN Card
        </label>
        <input
          type="text"
          name="pan_no"
          value={formData.pan_no}
          required
          placeholder="Permanent Account Number"
          maxLength="10"
          onChange={handleChange}
          autoComplete="off"
          className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* DOB */}
      <div className="mb-4">
        <label htmlFor="dob" className="block font-medium text-gray-700">
          D.O.B.
        </label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          required
          max="2022-05-20"
          onChange={handleChange}
          autoComplete="off"
          className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Gender */}
      <div className="mb-4">
        <label htmlFor="gender" className="block font-medium text-gray-700">
          Gender
        </label>
        <select
          name="gender"
          value={formData.gender}
          required
          onChange={handleChange}
          className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>
            Select Your Gender
          </option>
          <option value="1">Male</option>
          <option value="2">Female</option>
          <option value="3">Others</option>
        </select>
      </div>

      {/* PIN Code */}
      <div className="mb-4">
        <label htmlFor="pincode" className="block font-medium text-gray-700">
          Residential PIN Code
        </label>
        <input
          type="tel"
          name="pincode"
          value={formData.pincode}
          required
          maxLength="6"
          placeholder="As per Your Bank Records"
          onChange={handleChange}
          onKeyPress={(e) => {
            if (e.target.value.length === 6) e.preventDefault();
          }}
          pattern="[1-9]{1}[0-9]{5}"
          autoComplete="off"
          className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Mobile Number */}
      <div className="mb-4">
        <label htmlFor="mobile_no" className="block font-medium text-gray-700">
          Mobile Number
        </label>
        <input
          type="tel"
          name="mobile_no"
          value={formData.mobile_no}
          required
          maxLength="10"
          placeholder="As per your Bank Records"
          onChange={handleChange}
          onKeyPress={(e) => {
            if (e.target.value.length === 10) e.preventDefault();
          }}
          pattern="[6-9]{1}[0-9]{9}"
          autoComplete="off"
          className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Checkbox */}
      <div className="mb-4 flex items-start">
        <input
          type="checkbox"
          name="foo_bar"
          checked={formData.foo_bar}
          onChange={handleChange}
          id="foo_bar"
          className="mt-1"
        />
        <label
          htmlFor="foo_bar"
          className="ml-2 text-sm leading-tight text-gray-700"
        >
          I hereby appoint Buddy Loan as my authorised representative to receive
          my credit information from{" "}
          <a
            href="https://www.buddyloan.com/experian-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Experian
          </a>
          .
        </label>
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          type="submit"
          className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Check Free Credit Score
        </button>
      </div>
    </form>
  );
};

export default CreditScoreForm;
