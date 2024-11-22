import React, { useEffect, useState } from "react";
import Wheel from "@/components/drawing/Wheel";
import DrawDetails from "@/components/drawing/DrawDetails";
import ParticipantList from "@/components/drawing/ParticipantsList";
import EmojiRain from "@/components/drawing/EmojiRain";
import Button from "@/components/button/Button";
import Image from "next/image";
import axios from "axios";
import Confetti from "react-confetti";
import darkModeStore from "@/store/darkModeStore";
import { useRouter } from "next/router";
import DarkModeToggle from "@/components/button/DarkModeToggle";
import LottoBox from "@/components/drawing/LottoBox";
import useDrawingStore from "@/store/drawingStore";

export default function DrawId() {
  const { data, fetchData } = useDrawingStore(); // 데이터 가져오기
  const [datas, setDatas] = useState(null);
  const [showRoulette, setShowRoulette] = useState(false);
  const [winners, setWinners] = useState([]);
  const [currentWinnerIndex, setCurrentWinnerIndex] = useState(0);
  const [isConfettiVisible, setIsConfettiVisible] = useState(false);
  const [isRouletteFinished, setIsRouletteFinished] = useState(false);
  const [isDrawNotificationShown, setIsDrawNotificationShown] = useState(false);
  const router = useRouter();
  const { darkMode } = darkModeStore();
  const { drawId, from, viewType, drawingType = "룰렛" } = router.query;

  const handleBackToList = () => {
    router.push("/completedDrawings");
  };

  useEffect(() => {
    if (drawId) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/drawing/${drawId}`,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const result = response.data;
          setDatas(result);

          await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/drawing/${drawId}/increment-view`
          );

          const drawingTime = new Date(result.drawingAt);
          if (drawingTime < new Date()) {
            const filteredWinners = result.participants.filter(
              (participant) => participant.winner
            );
            setWinners(filteredWinners);
            setShowRoulette(true);
          }
        } catch (error) {
          console.error(
            "Error fetching data or incrementing view count:",
            error
          );
        }
      };

      fetchData();
    }
  }, [drawId]);

  useEffect(() => {
    if (datas && !isDrawNotificationShown) {
      const drawingTime = new Date(datas.drawingAt);

      const intervalId = setInterval(() => {
        const now = new Date();
        if (
          drawingTime.getFullYear() === now.getFullYear() &&
          drawingTime.getMonth() === now.getMonth() &&
          drawingTime.getDate() === now.getDate() &&
          drawingTime.getHours() === now.getHours() &&
          drawingTime.getMinutes() === now.getMinutes() &&
          now.getSeconds() === 0
        ) {
          setIsDrawNotificationShown(true);
          alert("추첨이 시작됩니다!");
          window.location.reload();
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [datas, isDrawNotificationShown]);

  const handleSpinEnd = () => {
    if (currentWinnerIndex < winners.length - 1) {
      setCurrentWinnerIndex(currentWinnerIndex + 1);
    } else {
      setShowRoulette(false);
      setIsRouletteFinished(true);
      setIsConfettiVisible(true);

      setTimeout(() => {
        setIsConfettiVisible(false);
      }, 30000);

      document.querySelector(".emoji-rain-container").classList.add("show");
    }
  };

  if (!datas) {
    return (
      <div
        className={`center2 h-screen ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
      >
        <p>Loading...</p>
      </div>
    );
  }

  const isDrawingPassed = new Date(datas.drawingAt) < new Date();

  return (
    <div
      className={`flex flex-col h-screen items-center ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {isConfettiVisible && <Confetti />}
      {isConfettiVisible && <EmojiRain />}

      <div
        key={datas.id}
        className="relative flex w-full max-w-4xl p-6 mt-10 overflow-hidden bg-gray-100 rounded-lg shadow-md dark:bg-gray-800"
        style={{ height: "75vh" }}
      >
        <div className="relative w-1/2 h-full">
          {datas.thumbnailUrl ? (
            <Image
              src={datas.thumbnailUrl}
              alt={datas.title}
              layout="fill"
              objectFit="contain"
              className="absolute inset-0 rounded"
            />
          ) : (
            <p>No Image Available</p>
          )}
        </div>
        <section className="flex-col w-1/2 center1">
          {showRoulette && winners.length > 0 ? (
            <div className="w-full mt-10 center1">
              {drawingType === "룰렛" ? (
                <Wheel
                  names={datas.participants.map(
                    (p) => `${p.name} ${p.phone.slice(-4)}`
                  )}
                  selectedWinner={`${
                    winners[currentWinnerIndex]?.name
                  } ${winners[currentWinnerIndex]?.phone.slice(-4)}`}
                  onSpinEnd={handleSpinEnd}
                />
              ) : drawingType === "로또" ? (
                <LottoBox
                  names={datas.participants.map(
                    (p) => `${p.name} ${p.phone.slice(-4)}`
                  )}
                  selectedWinner={`${
                    winners[currentWinnerIndex]?.name
                  } ${winners[currentWinnerIndex]?.phone.slice(-4)}`}
                  onSpinEnd={handleSpinEnd}
                />
              ) : (
                <p>알 수 없는 드로잉 타입입니다.</p>
              )}
            </div>
          ) : (
            <>
              <DrawDetails
                data={datas}
                darkMode={darkMode}
                DarkModeToggle={DarkModeToggle}
              />
              <ParticipantList
                isRouletteFinished={isRouletteFinished}
                isDrawingPassed={isDrawingPassed}
                showRoulette={showRoulette}
                winners={winners}
                participants={datas.participants}
              />
            </>
          )}
        </section>
      </div>

      <div className="flex justify-end w-2/3 mt-6 mr-48">
        <Button
          text="목록"
          onClick={handleBackToList}
          className="px-4 text-white bg-black"
        />
      </div>

      <div className="emoji-rain-container"></div>
    </div>
  );
}
