import React from "react";
import register from "../../../public/register.png";
import dailycheck from "../../../public/dailycheck.png";
import follow from "../../../public/follow.png";
import possible from "../../../public/possible.png";
import tips from "../../../public/tips.png";
import Carousel from "./Carousel";

export default function SecondView() {
  const images = [register, dailycheck, follow, possible, tips];
  const links = [
    "/register",
    "/dailycheck",
    "https://www.instagram.com/peachpicker_official?igsh=MTBpc282aTBjcWRvYQ%3D%3D&utm_source=qr",
    "/drawings",
    "/tips",
  ];
  console.log("두번째");
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-6">
      <section className="w-5/6 max-w-full mb-4">
        <div className="pl-10 mb-2 text-lg font-bold">실시간 랭킹</div>
        <Carousel images={images} links={links} />
      </section>
      <section className="w-5/6 max-w-full mb-4">
        <div className="pl-10 mb-2 text-lg font-bold">진행중인 이벤트</div>
        <Carousel images={images} links={links} />
      </section>
    </div>
  );
}
