"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import ReactDOM from "react-dom/client";
import ConfigData from "@/config";
import CreditScore from "@/components/Blogs/CreditScore";
import BuddyLoan from "@/components/Blogs/BuddyLoan";
import PersonalLoan from "@/components/Blogs/PersonalLoan";
import EligibilityCheck from "@/components/Blogs/EligibilityCheck";
import QuickLoans from "@/components/Blogs/QuickLoans";
import EmiCalculator from "@/components/Calculators/Calculator";
import Features from "@/components/Blogs/FeaturesBenefits";
import FaqSection from "@/components/Common/FaqSection";
import CalculatorLoop from "@/components/Calculators/CalculatorLoop";
import LoopType from "@/components/Common/LoopType";
import ContactUs from "@/components/Common/ContactUs";



export default function Page() {
  const [faqData, setFaqData] = useState();
  const [calcLoopData, setCalLoopData] = useState();
  const [expandedSection, setExpandedSection] = useState(null);
  const [post, setPost] = useState(null);
  const [loopType, setLoopType] = useState(null);
  const [calcBanner, setCalcBanner] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const fetchedPost = await fetchData();
        setPost(fetchedPost);
        setFaqData(fetchedPost.faq_data);
        setCalLoopData(fetchedPost.calculator_loop.details);
        setLoopType(fetchedPost.loan_types);
        setCalcBanner(fetchedPost.acf);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    if (!post) return;

    setTimeout(updateClasses, 100);

    const transformedContent = replacePlaceholders(post.content.rendered);
    const container = document.getElementById("dynamic-content");

    if (container) {
      container.innerHTML = transformedContent;
      Object.entries(COMPONENT_MAP).forEach(([tag, { component: Component, props = {} }]) => {
        container.querySelectorAll(`[id^="${tag}-component"]`).forEach((placeholder) => {
          if (!rootInstances.has(placeholder)) {
            const root = ReactDOM.createRoot(placeholder);
            rootInstances.set(placeholder, root);
          }
          rootInstances.get(placeholder).render(<Component {...props} />);
        });
      });
    }

    return () => {
      rootInstances.forEach((root) => root.unmount());
      rootInstances.clear();
    };
  }, [post]);

  const toggleSection = (sectionId) => {
    setExpandedSection((prev) => (prev === sectionId ? null : sectionId));
  };

  return (
    <>
      <div className="mt-10 flex min-h-80 items-center justify-center bg-gray-200 px-12">
        <h1 className="text-5xl font-semibold text-bl-blue">{post?.title.rendered || ''}</h1>
      </div>
      <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Buddy Loan</h1>
    <p class="mb-4">Buddy Loan is a Digital Fintech Marketplace that facilitates a seamless personal loan journey. We connect you to multiple verified lenders, making it easier for you to secure the funds you need. It’s important to note that Buddy Loan shares only your basic details with lenders. The subsequent steps, including document submission and further proceedings, are conducted on the lender’s website.</p>
    
    <h2 class="text-xl font-semibold mb-2">Customer Care</h2>
    <p class="mb-4">For any queries, concerns, general inquiries, or initial assistance regarding Buddy Loan, you can reach our dedicated Customer Care team at:</p>
    <p class="mb-4"><strong>Email:</strong> <a href="mailto:info@buddyloan.com" class="text-blue-500">info@buddyloan.com</a></p>
    <p class="mb-4">Remember, for lender-specific concerns or further proceedings regarding your loan, we recommend reaching out directly to the respective lender using the contact details provided by them.</p>
    
    <h2 class="text-xl font-semibold mb-2">Buddy Loan Lender Contact Details</h2>
    <p class="mb-4">Connect directly with the verified lenders in our network to address queries, discuss loan specifics, and have a transparent lending experience.</p>
    
    <table class="min-w-full bg-white border border-gray-200">
        <thead>
            <tr>
                <th class="py-2 px-4 border-b">Lender</th>
                <th class="py-2 px-4 border-b">Contact Number</th>
                <th class="py-2 px-4 border-b">Contact Email</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="py-2 px-4 border-b">PaySense</td>
                <td class="py-2 px-4 border-b">Nil</td>
                <td class="py-2 px-4 border-b"><a href="mailto:support@gopaysense.com" class="text-blue-500">support@gopaysense.com</a></td>
            </tr>
            <tr>
                <td class="py-2 px-4 border-b">CASHe</td>
                <td class="py-2 px-4 border-b">Nil</td>
                <td class="py-2 px-4 border-b"><a href="mailto:support@cashe.co.in" class="text-blue-500">support@cashe.co.in</a></td>
            </tr>
            <tr>
                <td class="py-2 px-4 border-b">Earlysalary (Fibe)</td>
                <td class="py-2 px-4 border-b">020-67639797</td>
                <td class="py-2 px-4 border-b"><a href="mailto:care@fibe.in" class="text-blue-500">care@fibe.in</a></td>
            </tr>
            <tr>
                <td class="py-2 px-4 border-b">Muthoot Finance</td>
                <td class="py-2 px-4 border-b">
                    <p>SOUTH INDIA: 99469 01212</p>
                    <p>REST OF INDIA: 78348 86464 (Lv. 1), 88006 75111, 011 46697744 (Lv. 2)</p>
                </td>
                <td class="py-2 px-4 border-b"><a href="mailto:mails@muthootgroup.com" class="text-blue-500">mails@muthootgroup.com</a></td>
            </tr>
            <tr>
                <td class="py-2 px-4 border-b">Axis Bank</td>
                <td class="py-2 px-4 border-b">1800-419-8585</td>
                <td class="py-2 px-4 border-b"><a href="mailto:etc.management@axisbank.com" class="text-blue-500">etc.management@axisbank.com</a></td>
            </tr>
            <tr>
                <td class="py-2 px-4 border-b">ICICI Bank</td>
                <td class="py-2 px-4 border-b">1800 1080</td>
                <td class="py-2 px-4 border-b"><a href="mailto:customer.care@icicibank" class="text-blue-500">customer.care@icicibank</a></td>
            </tr>
            <tr>
                <td class="py-2 px-4 border-b">Loanbaba</td>
                <td class="py-2 px-4 border-b">18001038024</td>
                <td class="py-2 px-4 border-b"><a href="mailto:customersupport@loanbaba.com" class="text-blue-500">customersupport@loanbaba.com</a></td>
            </tr>
            <tr>
                <td class="py-2 px-4 border-b">MoneyTap</td>
                <td class="py-2 px-4 border-b">Nil</td>
                <td class="py-2 px-4 border-b"><a href="mailto:hello@moneytap.com" class="text-blue-500">hello@moneytap.com</a></td>
            </tr>
            <tr>
                <td class="py-2 px-4 border-b">NAVI</td>
                <td class="py-2 px-4 border-b">Nil</td>
                <td class="py-2 px-4 border-b"><a href="mailto:help@navi.com" class="text-blue-500">help@navi.com</a></td>
            </tr>
            <tr>
                <td class="py-2 px-4 border-b">KreditBee</td>
                <td class="py-2 px-4 border-b">080-44292200 / 080-68534522</td>
                <td class="py-2 px-4 border-b"><a href="mailto:help@kreditbee.in" class="text-blue-500">help@kreditbee.in</a></td>
            </tr>
            <tr>
                <td class="py-2 px-4 border-b">mPokket</td>
                <td class="py-2 px-4 border-b">033- 6645 2400</td>
                <td class="py-2 px-4 border-b"><a href="mailto:support@mpokket.com" class="text-blue-500">support@mpokket.com</a></td>
            </tr>
            <tr>
                <td class="py-2 px-4 border-b">Upwards Fintech</td>
                <td class="py-2 px-4 border-b">+91 77150 98615</td>
                <td class="py-2 px-4 border-b"><a href="mailto:help@go-upwards.com" class="text-blue-500">help@go-upwards.com</a></td>
            </tr>
            <tr>
                <td class="py-2 px-4 border-b">Vivifi (FlexSalary)</td>
                <td class="py-2 px-4 border-b">
                    <p>+91-40-4617-5151</p>
                    <p>+919908935151</p>
                    <p>+919100038349</p>
                </td>
                <td class="py-2 px-4 border-b"><a href="mailto:support@flexsalary.com" class="text-blue-500">support@flexsalary.com</a></td>
            </tr>
            <tr>
                <td class="py-2 px-4 border-b">moneyview</td>
                <td class="py-2 px-4 border-b">080 6939 0476</td>
                <td class="py-2 px-4 border-b"><a href="mailto:care@moneyview.in" class="text-blue-500">care@moneyview.in</a></td>
            </tr>
            <tr>
                <td class="py-2 px-4 border-b">SMEcorner/Ambit Finvest</td>
                <td class="py-2 px-4 border-b">+91 91159 98000</td>
                <td class="py-2 px-4 border-b"><a href="mailto:info.retail@ambit.co" class="text-blue-500">info.retail@ambit.co</a></td>
            </tr>
            <tr>
                <td class="py-2 px-4 border-b">Mcapital</td>
                <td class="py-2 px-4 border-b">1800 102 2699</td>
                <td class="py-2 px-4 border-b"><a href="mailto:connect@mcapital.co.in" class="text-blue-500">connect@mcapital.co.in</a></td>
            </tr>
            <tr>
                <td class="py-2 px-4 border-b">Lendingkart</td>
                <td class="py-2 px-4 border-b">1800-572-0202</td>
                <td class="py-2 px-4 border-b"><a href="mailto:care@lendingkart.com" class="text-blue-500">care@lendingkart.com</a></td>
            </tr>
            <tr>
                <td class="py-2 px-4 border-b">Standard Chartered</td>
                <td class="py-2 px-4 border-b">6601 2424 / 3940 2424</td>
                <td class="py-2 px-4 border-b"><a href="mailto:Head.Service@sc.com" class="text-blue-500">Head.Service@sc.com</a></td>
            </tr>
            <tr>
                <td class="py-2 px-4 border-b">Prefr</td>
                <td class="py-2 px-4 border-b">Nil</td>
                <td class="py-2 px-4 border-b"><a href="mailto:wecare@prefr.com" class="text-blue-500">wecare@prefr.com</a></td>
            </tr>
            <tr>
                <td class="py-2 px-4 border-b">InCred</td>
                <td class="py-2 px-4 border-b">1800-102-2192</td>
                <td class="py-2 px-4 border-b"><a href="mailto:Care@InCred.com" class="text-blue-500">Care@InCred.com</a></td>
            </tr>
            <tr>
                <td class="py-2 px-4 border-b">L&T Finance</td>
                <td class="py-2 px-4 border-b">+91 22 6212 5000</td>
                <td class="py-2 px-4 border-b"><a href="mailto:customercare@ltfs.com" class="text-blue-500">customercare@ltfs.com</a></td>
            </tr>
            <tr>
                <td class="py-2 px-4 border-b">NIRA</td>
                <td class="py-2 px-4 border-b">9591196740</td>
                <td class="py-2 px-4 border-b"><a href="mailto:support@nirafinance.com" class="text-blue-500">support@nirafinance.com</a></td>
            </tr>
            <tr>
                <td class="py-2 px-4 border-b">Zype</td>
                <td class="py-2 px-4 border-b">1800 121 7710</td>
                <td class="py-2 px-4 border-b"><a href="mailto:support@getzype.com" class="text-blue-500">support@getzype.com</a></td>
            </tr>
            <tr>
                <td class="py-2 px-4 border-b">Phocket Loan</td>
                <td class="py-2 px-4 border-b">+919205977390</td>
                <td class="py-2 px-4 border-b"><a href="mailto:info@phocket.in" class="text-blue-500">info@phocket.in</a></td>
            </tr>
        </tbody>
    </table>
    
    <p class="mt-4">Don’t know your credit score? You can find out for free!</p>
    
    <h2 class="text-xl font-semibold mt-6 mb-2">Buddy Loan Customer Care Grievance Redressal</h2>
    <p class="mb-4">At Buddy Loan, we are committed to ensure that your experience is as smooth and transparent as possible. As we understand & extend our platform to resolve matters at the earliest, there may be occasions when you have emergency concerns or grievances, and we prioritise them.</p>
    <p class="mb-4">To address such matters effectively, we have established a comprehensive Grievance Redressal Mechanism.</p>
    
    <h3 class="text-lg font-semibold mb-2">Contacting Respective Lenders</h3>
    <p class="mb-4">For any queries, concerns, or grievances related to your loan application, document submission, or specific loan details, we advise you to contact the respective lender directly. Buddy Loan serves as the connection point, and as such, the lender is better equipped to provide detailed information and assistance related to your specific loan.</p>
    
    <h3 class="text-lg font-semibold mb-2">Grievance Redressal Levels</h3>
    <p class="mb-4"><strong>First Level:</strong> Buddy Loan Customer Care</p>
    <p class="mb-4">Contact Buddy Loan Customer Care For Grievances of any kind concerning both general and lender-specific. Our dedicated team will work diligently to address and resolve your concerns promptly.</p>
    <p class="mb-4">You can reach out via email: <a href="mailto:info@buddyloan.com" class="text-blue-500">info@buddyloan.com</a></p>
    
    <p class="mb-4"><strong>Second Level:</strong> Lender’s Customer Care</p>
    <p class="mb-4">If your concern is not resolved at the initial level, lenders typically provide multiple levels of escalation. We encourage you to refer to the respective lender’s grievance redressal process for further assistance.</p>
    
    <p class="mb-4"><strong>Third Level:</strong> Escalation to Higher Authorities</p>
    <p class="mb-4">Some lenders offer an escalation process to higher authorities within their organisation. This ensures that complex issues are addressed with most priority.</p>
    
    <p class="mb-4">Note that for more specific information on how to escalate your concern with a particular lender, please go through the respective lender’s official website or contact their customer care.</p>
    
    <p class="mt-4">Ready to take next step?</p>
</div>

      <CalculatorLoop data={calcLoopData} />
      {post ? (
        <div id="dynamic-content" className="mx-auto w-11/12 py-4" />
      ) : (
        <p>Loading...</p>
      )}
      <LoopType data={loopType} />
      <FaqSection faqData={faqData} />
    </>
  );
}
