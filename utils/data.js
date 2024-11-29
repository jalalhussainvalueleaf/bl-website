export const menuData = [
  {
    label: "Personal Loan",
    subMenu: [
      {
        label: "Instant Loan",
        href: "https://www.buddyloan.com/instant-loan",
      },
      {
        label: "Personal Loan",
        href: "https://www.buddyloan.com/personal-loan",
      },
      {
        label: "Marriage Loan",
        href: "https://www.buddyloan.com/marriage-loan",
      },
      { label: "Travel Loan", href: "https://www.buddyloan.com/travel-loan" },
      {
        label: "Medical Loan",
        href: "https://www.buddyloan.com/medical-loan",
      },
    ],
  },
  { label: "Business Loan", href: "https://www.buddyloan.com/business-loan" },
  {
    label: "Two-Wheeler Loan",
    href: "https://www.buddyloan.com/two-wheeler-loan",
  },
  { label: "Car Loan", href: "https://www.buddyloan.com/car-loan" },
  {
    label: "Education Loan",
    href: "https://www.buddyloan.com/education-loan",
  },
  { label: "Home Loan", href: "https://www.buddyloan.com/home-loan" },
  { label: "Gold Loan", href: "https://www.buddyloan.com/gold-loan" },
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
  { label: "About Us", href: "#" },
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
