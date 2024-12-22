"use client";
import React from "react";
import LeftBannerSlider from "./components/LeftBannerSlider";
import RightSection from "./components/RightSection";

const MobileValidation = ({ utmSource, utmMedium, utmCampaign, platform }) => {
  return (
    <div className="flex h-[100vh] flex-col items-center justify-center p-4 md:h-screen md:flex-row xl:p-0">
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
