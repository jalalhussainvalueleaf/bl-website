import React from 'react'
import Link from "next/link"

export default function CalculatorLoop({data}) {
    

  // If faqData is empty, don't render the FAQ section
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className='grid lg:grid-cols-4 w-11/12 mx-auto py-4 gap-4'>

{data.map((item, index) => (
          
          <div className='hover:shadow-lg rounded-lg p-2 border-gray-200 border relative hover:scale-105 transition-all' key={index}>
            <h1 className='text-xl font-semibold h-16'>{item.heading}</h1>
            <p className='text-lg min-h-40'>{item.description}</p>
            <div className='flex justify-between items-end'>
            <Link href={item.button_url} className=' py-1 px-6 rounded-lg border-bl-blue border-2 text-bl-blue hover:text-white hover:bg-bl-blue '>{item.button_name}</Link>
            <img src={item.image} className='w-32 right-0 absolute'/>
            </div>
        </div>
          
        ))}


        
    </div>
  )
}
