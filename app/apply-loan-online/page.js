"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import MobileValidation from "../../components/LoanApply/MobileValidation";

function MainPageContent() {
  const searchParams = useSearchParams();
  const [utmParams, setUtmParams] = useState({});

  useEffect(() => {
    // Extract query parameters from the URL
    const utm_source = searchParams.get("utm_source");
    const utm_medium = searchParams.get("utm_medium");
    const utm_campaign = searchParams.get("utm_campaign");
    const platform = searchParams.get("platform");

    // Set the UTM parameters in state
    setUtmParams({
      utm_source: utm_source || "Organic",
      utm_medium: utm_medium || "Organic",
      utm_campaign: utm_campaign || "Organic",
      platform: platform || "Nweb",
    });

    console.log("UTM Parameters:", {
      utm_source,
      utm_medium,
      utm_campaign,
      platform,
    });
  }, [searchParams]);

  return (
    <MobileValidation
      utmSource={utmParams.utm_source}
      utmMedium={utmParams.utm_medium}
      utmCampaign={utmParams.utm_campaign}
      platform={utmParams.platform}
    />
  );
}

export default function MainPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MainPageContent />
    </Suspense>
  );
}
