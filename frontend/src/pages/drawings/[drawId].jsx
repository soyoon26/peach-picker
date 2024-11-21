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
import useWinnerStore from "@/store/winnerStore";

export default function DrawId() {
  const [data, setData] = useState(null);
  const [showRoulette, setShowRoulette] = useState(false);
  const [winners, setWinners] = useState([]);
  const [lottoWinners, setLottoWinners] = useState([]);
  const [currentWinnerIndex, setCurrentWinnerIndex] = useState(0);
  const [isConfettiVisible, setIsConfettiVisible] = useState(false);
  const [isRouletteFinished, setIsRouletteFinished] = useState(false);
  const [isDrawNotificationShown, setIsDrawNotificationShown] = useState(false);
  const router = useRouter();
  const { darkMode } = darkModeStore();
  const { drawId, from, viewType } = router.query;

  const handleBackToList = () => {};
  const handleWinnerCompleted = () => {
    // 모든 당첨자가 소모되었는지 확인
    if (currentWinnerIndex < winners.length - 1) {
      setCurrentWinnerIndex((prev) => prev + 1); // 다음 당첨자로 이동
    } else {
      setShowRoulette(false); // 룰렛 종료
      setIsRouletteFinished(true); // 추첨 완료 상태 설정
      setIsConfettiVisible(true); // 축하 애니메이션 표시

      // 축하 애니메이션 30초 후 종료
      setTimeout(() => {
        setIsConfettiVisible(false);
      }, 30000);
      clearWinners();
      // 추가적인 작업이 있다면 여기서 처리
      console.log("모든 추첨이 완료되었습니다.");
    }
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
          setData(result);

          await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/drawing/${drawId}/increment-view`
          );

          const drawingTime = new Date(result.drawingAt);
          if (drawingTime < new Date()) {
            const filteredWinners = result.participants.filter(
              (participant) => participant.winner
            );
            setWinners(filteredWinners);
            setLottoWinners(["로또 시작", ...filteredWinners]);
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
    if (data && !isDrawNotificationShown) {
      const drawingTime = new Date(data.drawingAt);

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
  }, [data, isDrawNotificationShown]);

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

  if (!data) {
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

  const isDrawingPassed = new Date(data.drawingAt) < new Date();

  return (
    <div
      className={`flex flex-col h-screen items-center ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {isConfettiVisible && <Confetti />}
      {isConfettiVisible && <EmojiRain />}

      <div
        key={data.id}
        className="relative flex w-full max-w-4xl p-6 mt-10 overflow-hidden bg-gray-100 rounded-lg shadow-md dark:bg-gray-800"
        style={{ height: "75vh" }}
      >
        <div className="relative w-1/2 h-full">
          {data.thumbnailUrl ? (
            <Image
              src={data.thumbnailUrl}
              alt={data.title}
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
              {/* <Wheel
                names={data.participants.map(
                  (p) => `${p.name} ${p.phone.slice(-4)}`
                )}
                selectedWinner={`${winners[currentWinnerIndex]?.name} ${winners[
                  currentWinnerIndex
                ]?.phone.slice(-4)}`}
                onSpinEnd={handleSpinEnd}
              /> */}{" "}
              <LottoBox
                names={data.participants.map(
                  (p) => `${p.name} ${p.phone.slice(-4)}`
                )} // 응모자 정보 전달
                selectedWinner={`${winners[currentWinnerIndex]?.name} ${winners[
                  currentWinnerIndex
                ]?.phone.slice(-4)}`} // 당첨자 정보 전달
                onSpinEnd={handleSpinEnd}
              />
            </div>
          ) : (
            <>
              <DrawDetails
                data={data}
                darkMode={darkMode}
                DarkModeToggle={DarkModeToggle}
              />
              <ParticipantList
                isRouletteFinished={isRouletteFinished}
                isDrawingPassed={isDrawingPassed}
                showRoulette={showRoulette}
                winners={winners}
                participants={data.participants}
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
