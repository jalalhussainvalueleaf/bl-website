import React from 'react'

export default function NoFound() {
return (
    <div 
        className="relative min-h-screen justify-center items-start flex bg-[url('https://buddyloan-wordpress-blog.s3.ap-south-1.amazonaws.com/blog/wp-content/uploads/2025/01/09151915/404.gif')] bg-contain bg-center bg-no-repeat overflow-hidden mt-10" 
        
    >
        <div className='absolute flex flex-col min-h-[580px] justify-between'>
            <p className='text-[200px] font-bold text-bl-blue'>404</p>
            <div className='text-center'>
            <p className='text-3xl font-semibold'>Look like you&lsquo;re lost</p>
            <p className='text-xl'>the page you are looking for not avaible!</p>
            </div>
            </div>
    </div>
)
}
