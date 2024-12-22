"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import MobileValidation from "@/components/LoanApply/MobileValidation";

const MainPageContent = () => {
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
  }, [searchParams]);

  return (
    <MobileValidation
      utmSource={utmParams.utm_source}
      utmMedium={utmParams.utm_medium}
      utmCampaign={utmParams.utm_campaign}
      platform={utmParams.platform}
    />
  );
};

const MainPage = () => {
  const [loading, setLoading] = useState(true);

  // Checks for token and redirects if not found.
  useEffect(() => {
    const saved_token = sessionStorage.getItem("_token");
    setLoading(true);
    if (saved_token) {
      // If there is a previous history entry, go back
      if (window.history.length > 1) {
        window.history.back(); // Go back to the previous page in history
      }
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {loading ? <h3>Loading....</h3> : <MainPageContent />}
    </Suspense>
  );
};

export default MainPage;
