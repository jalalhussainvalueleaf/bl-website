import React from "react";
import { UserProvider } from "@/utils/UserContext"; // Adjust the path as needed
import Header from "@/components/Header/StatusHeader";

export default function App({ children }) {
  return (
    <UserProvider>
      <Header />
      {children}
    </UserProvider>
  );
}
