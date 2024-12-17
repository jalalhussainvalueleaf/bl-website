"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Seo({ data }) {
  const [main_banner_button_text, setMain_banner_button_text] = useState(
    data.acf.main_banner_button_text,
  );
  const [main_banner_button_url, setMain_banner_button_url] = useState(
    data.acf.main_banner_button_url,
  );
  const [main_banner_left, setMain_banner_left] = useState();
  const [main_banner_text_right, setMain_banner_text_right] = useState(
    data.acf.main_banner_text_right,
  );

  return (
    <>
      <div className="flex flex-col items-center justify-center bg-gray-50">
        <div
          className=""
          dangerouslySetInnerHTML={{ __html: main_banner_text_right }}
        ></div>
        <Link href={main_banner_button_url} className="inline-block">
          <button className="rounded bg-bl-blue px-4 py-2 text-white transition hover:bg-blue-700">
            {main_banner_button_text}
          </button>
        </Link>
        <p className="mt-4 text-sm text-gray-500">*T&amp;C Apply</p>
      </div>
    </>
  );
}
