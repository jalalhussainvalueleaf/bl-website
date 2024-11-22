import React from "react";

export default function Introductions() {
  return (
    <div className="grid grid-cols-2 gap-8 px-4 py-12">
      <div>
        <iframe
          src="https://www.youtube.com/embed/HijmDHew7RM"
          title="Introduction To Buddy Loan - India&#39;s Biggest Loan Aggregator"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
          className="h-full w-full"
        ></iframe>
      </div>
      <div>
        <h2 className="pb-4 text-2xl font-semibold">
          Get Loan Online In A Few Clicks
        </h2>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          From planning your big day to facing unexpected cash crunches,
          personal loans are a great financial instrument that helps you avail
          funds for multiple reasons. A personal loan is an unsecured loan that
          you can receive without any collateral or guarantor. You may want
          custom-made loans for different purposes, and we have them all. With
          an
          <a href="https://www.buddyloan.com/instant-loan">
            {" "}
            instant personal loan
          </a>
          , you can borrow up to Rs. 15 Lakh and enjoy quick approval on it so
          that you can make a better financial decision.
        </p>
        <p className="py-8 font-normal text-gray-700 dark:text-gray-400">
          For instant loan approval, match our simple eligibility specifications
          and minimal paperless documentation to get loans online in the
          difficult times. With a flexible tenure period ranging from 12 months
          to 5 years, repay the amount as per your convenience. Trust the best
          personal loans that are flexible, fast, and pocket-friendly to fulfill
          your financial gaps. To avail a
          <a href="https://www.buddyloan.com/personal-loan">
            {" "}
            quick personal loan
          </a>{" "}
          online, Buddy Loan is the most trusted platform among all to choose.
          Our loans are available for both salaried professionals and business
          owners at lower interest rates starting at 11.99% with no prepayment
          or hidden charges. Buddy Loan - India’s Biggest Loan Aggregator is the
          answer to all your financial requirements!
        </p>
      </div>
    </div>
  );
}
