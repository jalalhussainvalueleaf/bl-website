import React from "react";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function Slider() {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Carousel
      responsive={responsive}
      swipeable={false}
      draggable={false}
      showDots={false}
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      autoPlay={true}
      //   deviceType={this.props.deviceType}
      autoPlaySpeed={5000}
      keyBoardControl={true}
      //   customTransition="all .5"
      //   transitionDuration={500}
      removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
    >
      <div>
        <Image
          src="/images/slide1.jpg"
          width={700}
          height={800}
          className="h-[800px] w-[700px]"
        />
      </div>
      <div>
        {" "}
        <Image
          src="/images/slide2.jpg"
          width={700}
          height={800}
          className="h-[800px] w-[700px]"
        />
      </div>
      <div>
        {" "}
        <Image
          src="/images/slide3.jpg"
          width={700}
          height={800}
          className="h-[800px] w-[700px]"
        />
      </div>
      <div>
        {" "}
        <Image
          src="/images/slide4.jpg"
          width={700}
          height={800}
          className="h-[800px] w-[700px]"
        />
      </div>
      <div>
        {" "}
        <Image
          src="/images/slide5.jpg"
          width={700}
          height={800}
          className="h-[800px] w-[700px]"
        />
      </div>
    </Carousel>
  );
}
