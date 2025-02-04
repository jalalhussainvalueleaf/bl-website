"use client";
import dynamic from "next/dynamic";
import { memo } from "react";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const LottieAnimation = memo(
  ({
    animationData,
    height = "100%",
    width = "100%",
    loop = true,
    autoplay = true,
    style = {},
    ...props
  }) => {
    const combinedStyle = {
      width: width,
      height: height,
      ...style,
    };

    return (
      <Lottie
        animationData={animationData}
        loop={loop}
        autoplay={autoplay}
        style={combinedStyle}
        {...props}
      />
    );
  },
);

// Setting the display name for the memoized component
LottieAnimation.displayName = "LottieAnimation";

export default LottieAnimation;
