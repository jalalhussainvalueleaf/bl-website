"use client";
import React, { useEffect, useState } from "react";
import FaqSection from "@/components/Common/FaqSection";
import ContactUs from "@/components/Common/ContactUs"
import {QuizFAQ} from "@/utils/data"



export default function Page() {  

  return (
    <>
      <div className="mt-10 flex justify-center items-center min-h-80 bg-gray-200 px-12">
 <h1 className="text-bl-blue text-5xl font-semibold">Buddy Quiz</h1>
</div>

<div class=" mx-auto p-6 w-11/12">
        <div class="">
            <h1 class="text-3xl font-bold text-bl-blue text-center">Win with Buddy Quiz!</h1>
            <p class="mt-4 text-gray-700 text-lg text-center">Welcome to Buddy Loan, your trusted Digital Fintech Marketplace! We believe in making your financial journey not only easy but also fun.</p>
            <p class="mt-4 text-gray-700">Introducing the <span class="font-bold">Buddy Quiz</span>, our exciting initiative designed to help you through the loan journey with an opportunity to win additional takeaways.</p>

            <section class="mt-8">
                <h2 class="text-2xl font-semibold text-bl-blue">What Is Buddy Quiz?</h2>
                <p class="mt-2 text-gray-700">Buddy Quiz is our way of adding a touch of excitement to your experience with Buddy Loan. It’s not just about loans; it’s about creating a community where learning and fun go hand in hand. Make way for a curated series of interesting and informative quizzes that cover something for everyone.</p>
            </section>

            <section class="mt-8">
                <h2 class="text-2xl font-semibold text-bl-blue">Why Participate?</h2>
                <ul class="mt-4 list-disc list-inside text-gray-700 space-y-1">
                    <li>Engage with Buddy Quiz to reinforce your connection with Buddy Loan in a lighthearted manner.</li>
                    <li>Our quizzes are designed to be informative and enjoyable, offering a refreshing break from the ordinary.</li>
                    <li>Every quiz session is an opportunity to win fantastic prizes! From exclusive discounts to special offers, there’s always something to look forward to.</li>
                </ul>
            </section>

            <section class="mt-8">
                <h2 class="text-2xl font-semibold text-bl-blue">Steps To Participate In Buddy Quiz</h2>
                <ol class="mt-4 list-decimal list-inside text-gray-700 space-y-1">
                    <li>Login to the Buddy Loan App: Install Buddy Loan App from Play Store or App Store. Open the app and log in to your account.</li>
                    <li>Click on the Buddy Quiz: On the dashboard click on the Buddy Loan Quiz option.</li>
                    <li>Read the Guidelines: Take a moment to go through the guidelines provided. It’s essential to understand the rules before you begin.</li>
                    <li>Click ‘Start’: Ready to dive in? Click on ‘Start’ to embark on your quiz journey.</li>
                    <li>Answer the Questions: Put your knowledge to the test and answer the questions correctly. Remember, speed matters!</li>
                    <li>Stand a Chance to Win: Successfully answering all questions could make you the daily winner. Brace yourself for an exciting reward!</li>
                    <li>Provide Your Selfie & Shipping Address: After completing the quiz, submit your selfie and the necessary details such as the delivery address.</li>
                </ol>
            </section>
            <section class="mt-8 space-y-1">
<p className="font-semibold">            Please take note of the following:</p>
<p>A Winner per Day: Only one lucky participant will be selected as the winner each day.</p>
<p>Exclusive to Buddy Loan App: Our gaming contests are conducted solely through the Buddy Loan app. Ensure you have the latest version installed to participate and claim your prizes.</p>
            </section>

            <section class="mt-8">
                <h2 class="text-2xl font-semibold text-bl-blue">Buddy Quiz Terms & Conditions</h2>
                <ul class="mt-4 list-disc list-inside text-gray-700 space-y-1">
                    <li>All Answers Must be Correct: Ensure all your responses are accurate to stay in the running for the prize.</li>
                    <li>Fastest Finger First: The user who answers the questions in the shortest time will be awarded the prize.</li>
                    <li>Fair Play: Fraudulent activities or repeated attempts will lead to disqualification.</li>
                    <li>Selfie Requirement: Every participant must provide a proper selfie at the end of the quiz.</li>
                    <li>Management Rights: Buddy Loan reserves the right to qualify or disqualify participants based on the management’s discernment of Buddy Quiz winner.</li>
                </ul>
            </section>

            <div class="mt-8 text-center">
                <p class="text-gray-700">Don’t miss out on the excitement – install the Buddy Loan app now and let the Buddy Quiz bring joy and rewards to your fingertips!</p>
                <button class="mt-4 bg-bl-blue text-white font-bold py-2 px-6 rounded shadow hover:bg-bl-blue">Join Buddy Quiz Now</button>
            </div>
            <section>
            <p className="font-semibold">Stay Connected, Stay Informed:</p>
            <div className="space-y-1">
<p>Buddy Quiz is not just about winning prizes; it’s about staying connected and staying informed. We believe in making your financial journey a seamless blend of education and entertainment.</p>
<p>So, what are you waiting for? Dive into the Buddy Quiz, engage with us, and let the learning and fun begin!</p>
<p>For assistance or more information about personal loans and to address concerns, please</p>
<p>Join Buddy Quiz Now – Your gateway to learning, fun, and fantastic rewards!</p>
</div>
            </section>
        </div>
    </div>
      
<ContactUs/>
      
      <FaqSection faqData={QuizFAQ} />
    </>
  );
}
