import Subscribe from "@/components/Common/Subscribe";

export const menuData = [
  {
    label: "Personal Loan",
    subMenu: [
      {
        label: "Instant Loan",
        href: "/instant-loan",
      },
      {
        label: "Personal Loan",
        href: "/personal-loan",
      },
      {
        label: "Marriage Loan",
        href: "/marriage-loan",
      },
      { label: "Travel Loan", href: "/travel-loan" },
      {
        label: "Medical Loan",
        href: "/medical-loan",
      },
    ],
  },
  { label: "Business Loan", href: "/business-loan" },
  {
    label: "Two-Wheeler Loan",
    href: "/two-wheeler-loan",
  },
  { label: "Car Loan", href: "/car-loan" },
  {
    label: "Education Loan",
    href: "/education-loan",
  },
  { label: "Home Loan", href: "/home-loan" },
  { label: "Gold Loan", href: "/gold-loan" },
];

export const menuItems = [
  { label: "Loans", type: "dropdown", data: menuData },
  {
    label: "Free Credit Score",
    href: "/credit-score",
    badge: (
      <span className="me-2 rounded bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
        NEW
      </span>
    ),
  },
  { label: "About Us", href: "/about-us" },
  { label: "Blog", href: "/blog" },
];

export const LoanTypes = [
  {
    title: "Personal Loan",
    desc: "Personal loan for everything you need",
    img: "/loans/Personal-Loan.gif",
    btn: "Apply For Loan",
    url: "/apply-loan-online/?utm_source=seo&utm_medium=homepglta&utm_campaign=organic",
  },
  {
    title: "Business Loan",
    desc: "Large business capital made affordable",
    img: "/loans/Business-Loan-2.gif",
    btn: "Expand Business",
    url: "/apply-loan-online/?utm_source=seo&utm_medium=homepglta&utm_campaign=organic",
  },
  {
    title: "Travel Loan",
    desc: "Travel the world with your loved ones",
    img: "/loans/Travel-Loan.gif",
    btn: "Plan A Travel",
    url: "/apply-loan-online/?utm_source=seo&utm_medium=homepglta&utm_campaign=organic",
  },
  {
    title: "Marriage Loan",
    desc: "Make your big day worth remembering",
    img: "/loans/Marriage-Loan.gif",
    btn: "Book A Car",
    url: "/apply-loan-online/?utm_source=seo&utm_medium=homepglta&utm_campaign=organic",
  },
  {
    title: "Car Loan",
    desc: "Bring home your dream car today",
    img: "/loans/Car-Loan.gif",
    btn: "Book A Bike",
    url: "/apply-loan-online/?utm_source=seo&utm_medium=homepglta&utm_campaign=organic",
  },
  {
    title: "Medical Loan",
    desc: "For any recovery, feel no financial burden",
    img: "/loans/Medical-Loan.gif",
    btn: "Get A Loan",
    url: "/apply-loan-online/?utm_source=seo&utm_medium=homepglta&utm_campaign=organic",
  },
  {
    title: "Education Loan",
    desc: "Simplified finances for your education goals",
    img: "/loans/Education-Loan.gif",
    btn: "Pursue A Course",
    url: "/apply-loan-online/?utm_source=seo&utm_medium=homepglta&utm_campaign=organic",
  },
  {
    title: "Home Loan",
    desc: "Come home to your dream home",
    img: "/loans/Home-Loan.gif",
    btn: "Own A Home",
    url: "/apply-loan-online/?utm_source=seo&utm_medium=homepglta&utm_campaign=organic",
  },
  {
    title: "Gold Loan",
    desc: "Let your jewellery get you a loan",
    img: "/loans/Gold-Loan.gif",
    btn: "Get Money",
    url: "/apply-loan-online/?utm_source=seo&utm_medium=homepglta&utm_campaign=organic",
  },
];

export const Advanatages = [
  {
    loanType: "Collateral-Free Loans",
    loanDesc:
      "We offer loans with minimal documentation based on your credit history and require no pledges for security",
    btnUrl: "/features",
  },
  {
    loanType: "Safe and Transparent",
    loanDesc:
      "Our platform is completely safe and secure and so are your details. Also, there are no hidden or pre-payment charges",
    btnUrl: "/features",
  },
  {
    loanType: "Loan Amount and Tenure",
    loanDesc:
      "Choose the loan amount of your choice, from ₹ 10000 to ₹ 15 lakhs for a tenure of 12 months to 5 years starting @ 11.99% p.a.",
    btnUrl: "/features",
  },
  {
    loanType: "Highest Loan Approval Rate",
    loanDesc:
      "We have the highest loan approval rate in the industry, thanks to our wide pool of loan providers",
    btnUrl: "/features",
  },
  {
    loanType: "Quick Sanction",
    loanDesc:
      "Get your loan approved within 48 hours of submitting your application. It’s really quick and hassle-free",
    btnUrl: "/features",
  },
];

export const WhyChooseUs = [
  {
    title: "Instant Cash Loan",
    desc: "Access up to ₹15 Lakh in a flash to meet your financial needs",
    img: "/why-us/minDocs.webp",
  },
  {
    title: "Affordable Interest Rate",
    desc: "Enjoy the benefit of pocket-friendly interest rates, starting at just 11.99% p.a.",
    img: "/why-us/lowInt.webp",
  },
  {
    title: "Quick & High Approval Rate",
    desc: "Our streamlined processes ensure rapid approval & have the industry's top approval rate",
    img: "/why-us/collatral.webp",
  },
  {
    title: "Flexible Repayment Plans",
    desc: "Plans designed to align seamlessly with your financial capabilities.",
    img: "/why-us/med-icon1.webp",
  },
  {
    title: "Safe and Secure",
    desc: "Your financial data is treated with the utmost confidentiality.",
    img: "/why-us/ARO.webp",
  },
];

export const footerLinks = [
  {
    title: "Loan Types",
    links: [
      {
        href: "/personal-loan",
        label: "Personal Loan",
      },
      { href: "/instant-loan", label: "Instant Loan" },
      {
        href: "/business-loan",
        label: "Business Loan",
      },
      {
        href: "/two-wheeler-loan",
        label: "Two-Wheeler Loan",
      },
      { href: "/car-loan", label: "Car Loan" },
      {
        href: "/marriage-loan",
        label: "Marriage Loan",
      },
      { href: "/travel-loan", label: "Travel Loan" },
      { href: "/medical-loan", label: "Medical Loan" },
      {
        href: "/education-loan",
        label: "Education Loan",
      },
      { href: "/home-loan", label: "Home Loan" },
      { href: "/gold-loan", label: "Gold Loan" },
    ],
  },
  {
    title: "Resources",
    links: [
      {
        href: "/privacy-policy",
        label: "Privacy Policy",
      },
      {
        href: "/terms-and-conditions",
        label: "Terms & Conditions",
      },
      {
        href: "/buddy-score/credit-score",
        label: "Buddy Score",
      },
      {
        href: "/calculators",
        label: "Buddy Calculator",
      },
      { href: "/buddy-quiz", label: "Buddy Quiz" },
      { href: "/buddy-games", label: "Buddy Games" },
      { href: "/buddy-cash", label: "Buddy Points" },
      {
        href: "/buddyloan-personal-loan-app",
        label: "Buddyloan App",
      },
      {
        href: "/our-lenders",
        label: "Our Business Partners",
      },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about-us", label: "About Us" },
      { href: "/features", label: "Features" },
      {
        href: "/video-testimonials",
        label: "Testimonials",
      },
      { href: "/blog/", label: "Blog" },
      { href: "/sitemap", label: "Sitemap" },
      {
        href: "/press-release",
        label: "Press Release",
      },
      {
        href: "/customer-care",
        label: "Customer Care",
      },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "info@buddyloan.com" },
      {
        label:
          "21st Cross Rd, Sector 7, HSR Layout, Bangalore, Karnataka 560102.",
      },
      { label: <img src="/images/creditImage.png" /> },
      { label: <Subscribe /> },
    ],
  },
];

export const AboutFAQ = [
  {
    question: "What Are The Maximum & Minimum Loan Limits on Buddy Loan?",
    answer:
      "At Buddy Loan, an applicant can apply for a minimum loan amount that is Rs. 10,000 and the maximum loan amount is Rs. 15 Lakhs at lower interest rates starting from 11.99% p.a. The Applicant can repay the same over a flexible tenure ranging from 12 months to years.",
  },
  {
    question: "What is The Most User-Friendly Instant Loan App in India?",
    answer:
      "When you are in urgent need of cash, there are very few options available. Traditional banks take a long time to approve and process loan applications. But if you are looking for an instant loan with fast approval, user-friendly interface, and quick sanction, then Buddy Loan is the answer. Buddy Loan - One of the fastest-growing Digital Fintech Marketplace that connects the borrowers with verified lenders on its platform, well-known for the highest approval rate in the industry and quick processing.",
  },
  {
    question: "What Is The Best App for Personal Loans?",
    answer:
      "Buddy Loan is the best app for personal loan. It is one of the fastest-growing Digital Fintech Marketplace that connects the borrowers with the verified lenders on its platform, well-know for the highest approval rate in the industry and quick processing. If you are lookin for an instant loan with fast approval, user-friendly interface, and quick sanction then Buddy Loan is the answer.",
  },
  {
    question: "Are Instant Loan Apps Safe?",
    answer:
      "If you are looking for a safe and secure instant personal loan app then Buddy Loan is the right place. Buddy Loan is one of the most trustworthy apps where the entire process is transparent. Buddy Loan has created a safety net for its customers by partnering with verified lenders. Hence, the app is completely safe to use.",
  },
  {
    question: "Where Can I Get a Quick & Instant Loan Online?",
    answer:
      "Though there are multiple banks and NBFCs that offer personal loans to meet all financial needs. But if you are looking for a quick and instant loan online, then Buddy Loan is the right place. You can get a quick access of personal loan up to Rs. 15 Lakhs through an easy digital process. You need to download the app, fill in the required details, submit the documents, choose the lender, and wait for a few minutes to get the approval. Once approved, your loan amount will be credited directly to your bank account within hours.",
  },
  {
    question: "How To Get a Personal Loan Online in India?",
    answer: `<p>Applying for a personal loan online is easy and simple with Buddy Loan. If you are planning to take a loan, then follow the below steps</p>
    <ul accord-option">
    <li>Download the Buddy Loan app or visit website <a href="https://www.buddyloan.com">/</a></li>
    <li>Entire the desired loan amount and tenure period, then fill in the required details including name, email, id, phone number, residential address, employment details, net income, etc.</li>
    <li>Submit the required documents including salary slips, bank statements, identity proof, and residential proof.</li>
    <li>verified lenders who match with your eligibility will contact you shortly after submitting the application.</li>
    </ul>
    <p>It's always suggested that you check the eligibility criteria and other factors before the final submission.</p>`,
  },
  {
    question: "What is The Eligibility To Apply For a Loan on Buddy Loan App?",
    answer: `<ul accord-option">
                                <li>You must be a resident or citizen of India
                                </li><li>Your age should be between 21 and 57 years
                                </li><li>You need to be salaried individual or business professional, having an experience of 1 year in the current organization
                                </li><li>Need to meet the salary requirement which is your income should be more than Rs. 18,000
                            </li></ul>`,
  },
  {
    question: "What is The Minimum Salary Required To Get a Personal Loan?",
    answer:
      "Though Buddy Loan sets a simple eligibility criteria and digital documentation process to avail a personal loan. However, the minimum salary required to get a quick loan is Rs. 18,000.",
  },
  {
    question: "What do you mean by Buddy loan?",
    answer:
      "Buddy Loan is a user-friendly digital-only platform, accessible 24/7 through web and android app. Using the app, you can apply for a loan upto 15 lakhs instantly. The users can also avail exciting deals & offers, earn & redeem points at multiple levels.",
  },
];

export const loanSections = [
  {
    id: "011",
    title: "Business Loan",
    links: [
      {
        text: "Business Loan Interest Rates",
        url: "https://www.buddyloan.com/business-loan-interest-rates",
      },
      {
        text: "Business Loan EMI Calculator",
        url: "https://www.buddyloan.com/business-loan-emi-calculator",
      },
      {
        text: "Business Loan Eligibility",
        url: "https://www.buddyloan.com/business-loan-eligibility",
      },
      {
        text: "SME Loan",
        url: "https://www.buddyloan.com/sme-loan",
      },
      {
        text: "MSME Loan",
        url: "https://www.buddyloan.com/msme-loan",
      },
    ],
  },
  {
    id: "022",
    title: "Business Loan Types",
    links: [
      {
        text: "Small Business Loan",
        url: "https://www.buddyloan.com/small-business-loan",
      },
      {
        text: "Business Loans for Women",
        url: "https://www.buddyloan.com/sbi-business-loan-for-women",
      },
      {
        text: "Startup Business Loans",
        url: "https://www.buddyloan.com/business-loan-for-startup",
      },
      {
        text: "Working Capital Loan",
        url: "https://www.buddyloan.com/working-capital-loan",
      },
      {
        text: "Unsecured Business Loan",
        url: "https://www.buddyloan.com/unsecured-business-loan",
      },
      {
        text: "Cash Credit Loan",
        url: "https://www.buddyloan.com/cash-credit-loan",
      },
      {
        text: "Commercial Loans",
        url: "https://www.buddyloan.com/commercial-loans",
      },
      {
        text: "Commercial Vehicle Loans",
        url: "https://www.buddyloan.com/commercial-vehicle-loans",
      },
      {
        text: "Equipment Loans",
        url: "https://www.buddyloan.com/equipment-loan",
      },
      {
        text: "Medical Equipment Loan",
        url: "https://www.buddyloan.com/medical-equipment-loan",
      },
      {
        text: "Construction Equipment Loan",
        url: "https://www.buddyloan.com/construction-equipment-loan",
      },
      {
        text: "Equipment Leasing Loan",
        url: "https://www.buddyloan.com/equipment-leasing",
      },
      {
        text: "Corporate Loan",
        url: "https://www.buddyloan.com/corporate-loan",
      },
      {
        text: "Collateral Free Loans",
        url: "https://www.buddyloan.com/collateral-free-loans",
      },
      {
        text: "Business Loan for Startup",
        url: "https://www.buddyloan.com/business-loan-for-startup",
      },
      {
        text: "Types of Business Loan",
        url: "https://www.buddyloan.com/types-of-business-loan",
      },
    ],
  },
  {
    id: "033",
    title: "Business Loan By Government",
    links: [
      {
        text: "Emergency Credit Line Guarantee Scheme",
        url: "https://www.buddyloan.com/emergency-credit-line-guarantee-scheme",
      },
      {
        text: "CGTMSE Scheme",
        url: "https://www.buddyloan.com/cgtmse-scheme",
      },
      {
        text: "PMEGP Loan",
        url: "https://www.buddyloan.com/pmegp-loan",
      },
      {
        text: "Stand Up India Scheme",
        url: "https://www.buddyloan.com/stand-up-india-scheme",
      },
      {
        text: "GECL Loan",
        url: "https://www.buddyloan.com/gecl-loan",
      },
      {
        text: "Psbloansin59minutes",
        url: "https://www.buddyloan.com/psb-loans-in-59-mintues",
      },
      {
        text: "Udyogini Scheme",
        url: "https://www.buddyloan.com/udyogini-scheme",
      },
      {
        text: "SIDBI",
        url: "https://www.buddyloan.com/sidbi",
      },
      {
        text: "SMILE Scheme",
        url: "https://www.buddyloan.com/smile-scheme",
      },
    ],
  },
  {
    id: "111",
    title: "Business Loan Calculator",
    links: [
      {
        text: "Business Loan EMI Calculator",
        url: "https://www.buddyloan.com/business-loan-emi-calculator",
      },
      {
        text: "Business Loan Eligibility Calculator",
        url: "https://www.buddyloan.com/business-loan-eligibility-calculator",
      },
      {
        text: "MSME Loan Calculator",
        url: "https://www.buddyloan.com/msme-loan-calculator",
      },
      {
        text: "Mudra Loan EMI Calculator",
        url: "https://www.buddyloan.com/mudra-loan-emi-calculator",
      },
      {
        text: "PMEGP Loan Calculator",
        url: "https://www.buddyloan.com/pmegp-loan-calculator",
      },
    ],
  },
  {
    id: "122",
    title: "Loan for Business",
    links: [
      {
        text: "Loans for Restaurants",
        url: "https://www.buddyloan.com/loans-for-restaurants",
      },
      {
        text: "Loans for Private Schools",
        url: "https://www.buddyloan.com/loans-for-private-schools",
      },
      {
        text: "Loans for Defence Personnel",
        url: "https://www.buddyloan.com/loans-for-defence-personnel",
      },
      {
        text: "Loans for Construction",
        url: "https://www.buddyloan.com/loans-for-construction",
      },
      {
        text: "Loans for Commercial Shop Purchases",
        url: "https://www.buddyloan.com/shop-purchase-loan",
      },
      {
        text: "Loans for Chartered Accountants",
        url: "https://www.buddyloan.com/loans-for-chartered-accountants",
      },
      {
        text: "Loans for Buying Land",
        url: "https://www.buddyloan.com/loans-for-buying-land",
      },
      {
        text: "Loan for Beauty Parlour",
        url: "https://www.buddyloan.com/loan-for-beauty-parlour",
      },
      {
        text: "Loan for Warehouse",
        url: "https://www.buddyloan.com/loans-for-warehouse",
      },
      {
        text: "Cold Storage Loan",
        url: "https://www.buddyloan.com/cold-storage-loan",
      },
      {
        text: "Dairy Farm Loan",
        url: "https://www.buddyloan.com/dairy-farm-loan",
      },
      {
        text: "E-Commerce Loans",
        url: "https://www.buddyloan.com/ecommerce-business-loan",
      },
      {
        text: "Animal Husbandry Loan",
        url: "https://www.buddyloan.com/animal-husbandry-loan",
      },
      {
        text: "Loan for Medical Shop",
        url: "https://www.buddyloan.com/loans-for-medical-shop",
      },
      {
        text: "Loan for Dental Clinic",
        url: "https://www.buddyloan.com/loans-for-dentist",
      },
    ],
  },
  {
    id: "133",
    title: "Mudra Loan",
    links: [
      {
        text: "Mudra Loan Apply Online",
        url: "https://www.buddyloan.com/mudra-loan-apply-online",
      },
      {
        text: "Mudra Loan Documents",
        url: "https://www.buddyloan.com/mudra-loan-documents",
      },
      {
        text: "Mudra Loan EMI Calculator",
        url: "https://www.buddyloan.com/mudra-loan-emi-calculator",
      },
    ],
  },
  {
    id: "144",
    title: "Business Loan By Banks",
    links: [
      {
        text: "SBI Business Loan",
        url: "https://www.buddyloan.com/sbi-business-loan",
      },
      {
        text: "HDFC Bank Business Loan",
        url: "https://www.buddyloan.com/hdfc-bank-business-loan",
      },
      {
        text: "Axis Bank Business Loan",
        url: "https://www.buddyloan.com/axis-bank-business-loan",
      },
      {
        text: "Bank of Baroda Business Loan",
        url: "https://www.buddyloan.com/bank-of-baroda-business-loan",
      },
      {
        text: "PNB Business Loan",
        url: "https://www.buddyloan.com/pnb-business-loan",
      },
      {
        text: "Canara Bank Business Loan",
        url: "https://www.buddyloan.com/canara-bank-business-loan",
      },
      {
        text: "ICICI Bank Business Loan",
        url: "https://www.buddyloan.com/icici-bank-business-loan",
      },
      {
        text: "IDFC Bank Business Loan",
        url: "https://www.buddyloan.com/idfc-bank-business-loan",
      },
      {
        text: "IOB Business Loan",
        url: "https://www.buddyloan.com/iob-business-loan",
      },
      {
        text: "IDBI Bank Business Loan",
        url: "https://www.buddyloan.com/idbi-bank-business-loan",
      },
      {
        text: "Bank of India Business Loan",
        url: "https://www.buddyloan.com/bank-of-india-business-loan",
      },
      {
        text: "Federal Bank Business Loan",
        url: "https://www.buddyloan.com/federal-bank-business-loan",
      },
      {
        text: "UCO Bank Business Loan",
        url: "https://www.buddyloan.com/uco-bank-business-loan",
      },
      {
        text: "Union Bank Business Loan",
        url: "https://www.buddyloan.com/union-bank-business-loan",
      },
      {
        text: "Yes Bank Business Loan",
        url: "https://www.buddyloan.com/yes-bank-business-loan",
      },
      {
        text: "Central Bank of India Business Loan",
        url: "https://www.buddyloan.com/central-bank-of-india-business-loan",
      },
      {
        text: "IndusInd Business Loan",
        url: "https://www.buddyloan.com/indusind-bank-business-loan",
      },
      {
        text: "Indian Bank Business Loan",
        url: "https://www.buddyloan.com/indian-bank-business-loan",
      },
      {
        text: "RBL Bank Business Loan",
        url: "https://www.buddyloan.com/rbl-bank-business-loan",
      },
      {
        text: "Bandhan Bank Business Loan",
        url: "https://www.buddyloan.com/bandhan-bank-business-loan",
      },
    ],
  },
  {
    id: "155",
    title: "SBI Business Loan",
    links: [
      {
        text: "SBI Small Business Loan",
        url: "https://www.buddyloan.com/sbi-small-business-loan",
      },
      {
        text: "SBI MSME Loan Eligibility",
        url: "https://www.buddyloan.com/sbi-msme-loan-eligibility",
      },
      {
        text: "SBI Commercial Loan",
        url: "https://www.buddyloan.com/sbi-commercial-loan",
      },
      {
        text: "SBI Startup Loan",
        url: "https://www.buddyloan.com/sbi-startup-loan",
      },
      {
        text: "SBI Business Loan Eligibility for Women",
        url: "https://www.buddyloan.com/sbi-business-loan-for-women-eligibility",
      },
      {
        text: "SBI Stree Shakti Yojana",
        url: "https://www.buddyloan.com/sbi-stree-shakti-yojana",
      },
      {
        text: "SBI Working Capital Loan",
        url: "https://www.buddyloan.com/sbi-working-capital-loan",
      },
    ],
  },
];

export const accordionData = [
  {
    id: 1,
    question: "How can I get a business loan quickly?",
    answer:
      "Consider lenders who offer quick loan approvals. Fintech companies and online lenders may have streamlined processes and faster turnaround times than traditional banks.",
  },
  {
    id: 2,
    question: "What is the maximum amount of a business loan?",
    answer:
      "The maximum amount of a business loan can vary depending on the lender, borrower's eligibility, and other factors, but it can range from a few lakhs to crores of rupees.",
  },
  {
    id: 3,
    question: "Can a fresher get a business loan?",
    answer:
      "Getting a business loan as a fresher can be challenging due to the lack of established track record and financial stability. However, with a strong business plan and collateral or a co-signer, it's possible to increase the chances of obtaining a loan.",
  },
  {
    id: 4,
    question: "What is the interest rate of a business loan?",
    answer:
      "The interest rate of a business loan can vary depending on factors such as the borrower's creditworthiness, loan amount, loan tenure, and prevailing market conditions.",
  },
  {
    id: 5,
    question: "How much is the business loan processing fee?",
    answer:
      "The processing fee for a business loan can vary among lenders and is typically a percentage of the loan amount.",
  },
  {
    id: 6,
    question: "What are the documents required for a business loan in SBI?",
    answer:
      "The specific documentation requirements for a business loan in State Bank of India (SBI) may vary based on the type of loan and the borrower's profile. However, the general list of documents is required which can be referred from above.",
  },
  {
    id: 7,
    question: "Is the business loan amount taxable?",
    answer:
      "The business loan amount itself is not taxable as it is considered a liability and not an income.",
  },
  {
    id: 8,
    question: "Disclaimer",
    answer:
      "Display of trademarks, tradenames, logos, and other subject matters of Intellectual Property displayed on this website belongs to their respective intellectual property owners & is not owned by Bvalue Services Pvt. Ltd. Display of such Intellectual Property and related product information does not imply, Bvalue Services Pvt. Ltd company’s partnership with the owner of the Intellectual Property or proprietor of such products. Please read the Terms & Conditions carefully as deemed & proceed at your discretion.",
  },
];

export const blogContent = [
  {
    title: "Minimal Paperwork",
    description: "Get your loan approved within minimum documention",
    icon: "/images/approval.webp",
  },
  {
    title: "Low Interest Rates",
    description: "Starting at 11.99% p. a.",
    icon: "/images/lowInt.webp",
  },
  {
    title: "No Collateral",
    description: "Get the financial assets without risk.",
    icon: "/images/flexiblity.webp",
  },
  {
    title: "Plenty of options",
    description: "Financing available for various car modles and brands.",
    icon: "/images/car-icon4.webp",
  },
  {
    title: "Flexible Loan Amount",
    description: "Avail the loan amount you need to upscale your business.",
    icon: "/images/ARO.webp",
  },
  {
    title: "Flexible Repayments",
    description:
      "Get the loan amount your business scales for the type of project",
    icon: "/images/twoWheele_icon3.webp",
  },
];
