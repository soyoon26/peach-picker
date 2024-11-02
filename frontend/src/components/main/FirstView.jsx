import Image from "next/image";
import Head from "next/head";
import circle from "../../images/circle.png";
import greenEffect from "../../images/greeny.png";
import peach from "../../images/3dpeach.png";
import mainpeach from "../../../public/mainpeach.png";
import blue_heart from "../../images/blue_heart.png";
import main_picker from "../../images/main-picker.png";
import main_letter from "../../images/mainLetter.webp";
import earth from "../../images/earth.webp";
import Menu from "../Menu";
import { useEffect, useState } from "react";

export default function Home() {
  const [isGrowing, setIsGrowing] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [visibleLetters, setVisibleLetters] = useState([]);
  console.log("첫번째");
  return (
    <div className="min-w-[1300px] flex flex-col w-screen h-screen bg-[#FFF8F2]">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Menu />
      <div className="flex flex-col justify-between flex-grow">
        <div className="flex">
          <section className="w-2/3 mt-5 ml-10">
            <div>
              <div className="text-9xl font-Remboy">Peach Picker</div>
              <div className="text-7xl font-Remboy">
                WE CAN MAKE A DIFFERENCE
              </div>
              {/* <Image src={main_letter} alt="main" layout="responsive" width={100} /> */}
            </div>
          </section>
          <section className="w-1/3 pt-[65px] flex items-center">
            <Image
              src={mainpeach}
              alt="mainpeach"
              layout="fixed"
              height={400}
              width={400}
            />
          </section>
        </div>

        <div className="flex flex-col justify-end flex-grow">
          <section className="flex">
            <div className="flex flex-col w-1/4 px-3 pt-2 my-5 ml-10 text-2xl bg-white border-2 border-black">
              <div className="flex items-center justify-start h-1/2">
                PEACH-DAY
              </div>
              <div className="w-full border-t border-b border-black "></div>
              <div className="flex items-center pt-2 justify-start h-1/2">
                26/06/2024
              </div>
            </div>

            <div className="min-w-[300px] flex flex-col w-1/4 px-3 pt-3 my-5 ml-10 text-2xl bg-white border-2 border-black">
              <div className="flex items-center justify-start h-1/2">IG</div>{" "}
              <div className="w-full border-t border-b border-black my-2"></div>
              <div className="flex items-center justify-start h-1/2">
                @peachpicker_official
              </div>
            </div>

            <div className="min-w-[490px] flex w-1/2 px-3 pt-3 my-5 ml-10 mr-10 text-2xl text-left bg-white border-2 border-black ">
              <div className="flex flex-col justify-between flex-grow">
                <div>E-MAIL</div>
                <div className="flex flex-col w-full border border-black "></div>
                <div>peach.patch.picker@gmail.com</div>
              </div>
              <div className="flex items-center justify-end pb-3 w-1/6 ml-4">
                <Image
                  src={earth}
                  alt="earth"
                  layout="fixed"
                  height={50}
                  width={100}
                />
              </div>
            </div>
          </section>
          <div
            className="flex items-center justify-between p-4 mx-10 mb-5 text-xl text-center text-black bg-red-300 border-2 border-black"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            <div>Created by PEACH-PATCH</div>
            <div>#공정함을 잃지 말자</div>
          </div>
        </div>
      </div>
    </div>
  );
}
