import React from "react";
import { UserProvider } from "../../utils/UserContext"; // Adjust the path as needed

export default function App({ children }) {
  return <UserProvider>{children}</UserProvider>;
}
