"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { financialData } from "@/utils/data";

export default function Page() {
 

  return (
    <>



    <div className="bg-gray-50 p-6 sm:p-8 lg:p-12 mt-20">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Financial Sources</h1>


      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-white uppercase bg-bl-blue dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Source Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Publication
                </th>
                <th scope="col" class="px-6 py-3">
                    Description
                </th>
               
            </tr>
        </thead>
        <tbody>
        {financialData.map((item, index) => (
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index} >
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {item.name}
                </th>
                <td class="px-6 py-4 break-all">
                <Link href={item.url} target="_blank" rel="noopener noreferrer" className="text-gray-600 underline hover:text-bl-blue">
            {item.url}
          </Link>
                </td>
                <td class="px-6 py-4">
                {item.description}
                </td>
                
            </tr>
             ))}
        </tbody>
    </table>
</div>



     
    </div>
    </>
  );
}
