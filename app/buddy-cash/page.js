import React from 'react';
import Link from 'next/link';

const Page = () => {
    return (
        <>
        <div className="grid grid-cols-2 bg-white">
        <div className="flex flex-col items-center justify-center bg-gray-100 bg-[url('/images/buddyloanlogo.png')] bg-contain bg-center bg-no-repeat">
          <h2 className="text-4xl">Fullfil All Your</h2>
          <h2 className="text-4xl">Personal Financing Needs</h2>
        </div>
        <div>
          <div className="flex h-[400px] flex-col items-center justify-center bg-gray-200">
            <h2 className="py-4 text-3xl">Get a Loan Instantly</h2>
            <Link
              href="/"
              className="rounded border bg-bl-blue px-12 py-4 text-xl text-white hover:border-bl-blue hover:bg-white hover:text-bl-blue"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </div>
        <div className="mx-auto mt-0 w-11/12 px-4 py-8">
            <div className="flex flex-wrap">
                <div className="w-full">
                    <h2 className="mt-6 text-2xl font-bold text-gray-800">What is Buddy Points?</h2>
                </div>
                <div className="w-full">
                    <p className="mt-6 leading-relaxed text-gray-700">
                        Buddy Loan, the biggest loan aggregator in India, is well-known for connecting individuals with the right lenders to fulfill their financial needs.
                        At Buddy Loan, people can avail up to Rs. 15 Lakh at competitive interest rates and flexible repayment tenure. With its latest update, the app now lets you earn and redeem real money when you refer your friends or family members and they download the Buddy Loan app and apply for a personal loan. 
                        Let’s go over how it works.
                    </p>
                </div>
                <div className="w-full">
                    <h2 className="mt-6 text-2xl font-bold text-gray-800">Earn Real Money With Buddy Points</h2>
                    <p className="mt-6 leading-relaxed text-gray-700">
                        Buddy Points is a section in the app where you can get Rs. 50 once your loved ones sign up and complete the procedure of loan application. With this referral program, every time you introduce a new customer to the Buddy Loan app, you can earn Rs. 50 instantly. 
                        To do so, visit the Buddy Loan app, find the ‘Buddy Points’ option, click on the ‘Continue’ button, and start referring your friends and relatives. Every time you refer, you get a chance to win real money.
                    </p>
                    <p className="mt-6 leading-relaxed text-gray-700">
                        Besides, you can earn more money by playing games, uploading documents, and much more. 
                        Once you do so, you can earn certain points. 1000 points = Rs. 1. You can redeem your money directly to your bank account.
                    </p>
                </div>
                <div className="flex flex-wrap">
                    <div className="w-full md:w-1/2">
                        <h2 className="mt-6 text-2xl font-bold text-gray-800">How Does Buddy Points Work?</h2>
                        <p className="mt-6 leading-relaxed text-gray-700">
                            Ready to earn some real money? Here’s a quick tip for getting started.
                        </p>
                        <ul className="mt-4 list-disc space-y-3 pl-6">
                            <li>
                                <p className="leading-relaxed text-gray-700">Visit the Buddy Loan app and navigate to the Buddy Points section.</p>
                            </li>
                            <li>
                                <p className="leading-relaxed text-gray-700">
                                    Click on the ‘Continue’ button and share the app link with your friends, family, and colleagues. You can share the app link via text message, WhatsApp, Messenger, and other messaging apps.
                                </p>
                            </li>
                            <li>
                                <p className="leading-relaxed text-gray-700">
                                    Once your referral signs up and applies for a personal loan, you get the reward of Rs. 50.
                                </p>
                            </li>
                            <li>
                                <p className="leading-relaxed text-gray-700">
                                    To withdraw the amount, link your bank account/UPI details. It’s safe, easy, and completely secure.
                                </p>
                            </li>
                            <li>
                                <p className="leading-relaxed text-gray-700">
                                    Once your bank account details are added successfully, the amount will be sent to your account.
                                </p>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/2">
                        <iframe
                            className="mt-6 h-72 w-full"
                            src="https://www.youtube.com/embed/-IgK0IYXwbE"
                            srcDoc="<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style> <a href=https://www.youtube.com/embed/-IgK0IYXwbE?autoplay=1><img src=https://img.youtube.com/vi/-IgK0IYXwbE/hqdefault.jpg alt='Video The Dark Knight Rises: What Went Wrong? – Wisecrack Edition'><span>▶</span></a>"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="YouTube video player"
                        ></iframe>
                    </div>
                </div>
                <div className="flex w-full">
                    <div>
                    <h2 className="mt-6 text-2xl font-bold text-gray-800">The Simple Way to Earn Real Points</h2>
                    <p className="mt-6 leading-relaxed text-gray-700">
                    Earn some serious cash simply by referring people and fulfill all your financial requirements. Be a part of this exciting cashback journey by referring to your family and friends.
</p><p className="mt-6 leading-relaxed text-gray-700">
You can check the status of your referral list and withdrawal history including date, amount and transfer details in the same Buddy Points section. Select the date and click on account type to get all the transfer status.
</p><p className="mt-6 leading-relaxed text-gray-700">
What now? Start referring and get the real money spinning!!
                    </p>
                    </div>
                    <div>
                    <img src="https://buddyloan-wordpress-blog.s3.ap-south-1.amazonaws.com/blog/wp-content/uploads/2025/01/08153516/buddycash_website_banner.png"/>
                </div>
                </div>
                
            </div>
        </div>
        
        </>
    );
};

export default Page;
