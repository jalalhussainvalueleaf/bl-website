"use client";

import { useLottie } from "lottie-react";

export default function Lottie({ data, loop }) {
  if (typeof window === "undefined") return null; // Ensure it runs only on the client

  const options = {
    animationData: data,
    loop: loop,
  };

  const { View } = useLottie(options);

  return View;
}
