"use client";
import React from "react";
import LeftBannerSlider from "./components/LeftBannerSlider";
import RightSection from "./components/RightSection";

const MobileValidation = ({ utmSource, utmMedium, utmCampaign, platform }) => {
  return (
    <div className="bg-fill flex h-screen flex-col items-center justify-center bg-[url('/images/bg1.png')] bg-center p-4 md:h-screen md:flex-row xl:p-0">
      {/* Sider only show in desktop view */}
      <LeftBannerSlider />

      <RightSection
        utmSource={utmSource}
        utmMedium={utmMedium}
        utmCampaign={utmCampaign}
        platform={platform}
      />
    </div>
  );
};

export default MobileValidation;
