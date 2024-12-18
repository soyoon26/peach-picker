import React from "react";
import Footer from "../Footer";
import peach_logo from "../../../public/peach_logo.png";
import brandstory from "../../images/brand.png";
import lottery from "../../images/lottery.png";
import Image from "next/image";
import Link from "next/link";

export default function LastView() {
  console.log("마지막");
  return (
    <div className="min-w-[1300px] flex flex-col min-h-screen">
      <section className="flex">
        <div className="w-3/4 ">
          <Link href="/brandstory" passHref>
            <Image
              src={brandstory}
              width={100}
              height={100}
              layout="responsive"
              alt="logo"
            />
          </Link>
        </div>
        <div className="w-1/4 p-10 pr-16">
          <Link href="/brandstory" passHref>
            <Image
              src={lottery}
              width={100}
              height={100}
              layout="responsive"
              alt="logo"
            />
          </Link>
        </div>
      </section>
      <section className="flex flex-col w-full bg-white">
        <div className="flex flex-col w-full h-0 border border-gray-500 "></div>
        <div className="flex ">
          <div className="w-1/6 center2 ">
            <div className="w-3/4 ">
              <div className="text-5xl font-Radio text-rose-400">피치피커</div>
              {/* <Image
                src={peach_logo}
                width={100}
                height={100}
                layout="responsive"
                alt="logo"
              /> */}
            </div>
          </div>
          <article className="w-1/6 pt-10">
            <div className="pb-2 font-bold">추첨</div>
            <div>추첨 등록</div>
            <div>
              <Link href="/drawings">실시간 추첨</Link>
            </div>
            <div>
              <Link href="/completedDrawings">추첨 기록실</Link>
            </div>
            <div>
              <Link href="/mypage/mylist">내 추첨 보기</Link>
            </div>
          </article>
          <article className="w-1/6 pt-10">
            <div className="pb-2 font-bold">고객 서비스</div>
            <div>
              <Link href="/login">회원 가입</Link>
            </div>
            <div>
              <a
                href="https://pf.kakao.com/_vxhxixoG"
                target="_blank"
                rel="noopener noreferrer"
              >
                고객 상담
              </a>
            </div>
          </article>
          <article className="w-1/6 pt-10">
            <div className="pb-2 font-bold">회사 소개</div>

            <Link href="/about">기업 정보</Link>
            <div>
              <Link href="/brandstory">브랜드 스토리</Link>
            </div>
            <div>
              <a
                href="https://pf.kakao.com/_vxhxixoG"
                target="_blank"
                rel="noopener noreferrer"
              >
                카카오톡
              </a>
            </div>

            <div>
              <a
                href="https://www.instagram.com/peachpicker_official?igsh=MTBpc282aTBjcWRvYQ%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
              >
                인스타그램
              </a>
            </div>
          </article>
          <article className="w-2/6 pt-20 text-right pr-14 ">
            <div>피치피커 고객상담</div>
            <div>월~금 08:30~17:00</div>
          </article>
        </div>
      </section>
      <div className="flex-grow bg-white"></div>
      <Footer />
    </div>
  );
}
