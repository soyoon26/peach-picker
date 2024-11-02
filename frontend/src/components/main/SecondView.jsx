import React, { useEffect, useState } from "react";
import register from "../../../public/register.png";
import dailycheck from "../../../public/dailycheck.png";
import follow from "../../../public/follow.png";
import possible from "../../../public/possible.png";
import tips from "../../../public/tips.png";
import Carousel from "./Carousel";
import nodrawing from "../../../public/nodrawing.png";
import useDrawingStore from "@/store/drawingStore";

export default function SecondView() {
  const { data, fetchData } = useDrawingStore();
  const [rankingImages, setRankingImages] = useState([]);
  const [rankingLinks, setRankingLinks] = useState([]);
  const images = [register, dailycheck, follow, possible, tips];
  const links = [
    "/register",
    "/about",
    "https://www.instagram.com/peachpicker_official?igsh=MTBpc282aTBjcWRvYQ%3D%3D&utm_source=qr",
    "/drawings",
    "/brandstory",
  ];
  console.log("두번째");
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  console.log(data);
  useEffect(() => {
    const now = new Date();
    const sortedData = data
      .filter((item) => new Date(item.drawingAt) > now)
      .sort((a, b) => b.viewCount - a.viewCount)
      .slice(0, 7);

    const images = sortedData.map((item) => item.thumbnailPath || nodrawing);
    const links = sortedData.map((item) => `/drawings/${item.id}`);

    // nodrawing 이미지
    while (images.length < 7) {
      images.push(nodrawing);
      links.push("/drawings");
    }

    setRankingImages(images);
    setRankingLinks(links);
  }, [data]);

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-6">
      <section className="w-5/6 max-w-full mb-4">
        <div className="pl-10 mb-2 text-lg font-bold">실시간 추첨 랭킹</div>
        <Carousel images={rankingImages} links={rankingLinks} />
      </section>
      <section className="w-5/6 max-w-full mb-4">
        <div className="pl-10 mb-2 text-lg font-bold">진행중인 이벤트</div>
        <Carousel images={images} links={links} />
      </section>
    </div>
  );
}
