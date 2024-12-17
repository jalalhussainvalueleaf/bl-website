import React from "react";
import Image from "next/image";
import { loanSections, accordionData, blogContent } from "@/utils/data";

export default function FeaturesBenefits() {
  return (
    <div className="mx-auto grid w-11/12 grid-cols-3 gap-4 py-8">
      {blogContent.map((section) => (
        <>
          <div className="flex flex-col items-center">
            <Image
              src={section.icon}
              width={300}
              height={300}
              className="w-24"
              alt=""
            />
            <h3>{section.title}</h3>
            <p className="text-center">{section.description}</p>
          </div>
        </>
      ))}
    </div>
  );
}
