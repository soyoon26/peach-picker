import React, { useEffect, useState } from "react";
import useWinnerStore from "@/store/winnerStore";

const LottoBox = ({ names, selectedWinner, onSpinEnd }) => {
  const [winner, setWinner] = useState(null);
  const [movingNames, setMovingNames] = useState([]);
  const [falling, setFalling] = useState(false);
  const { winners, addWinner } = useWinnerStore();
  const remainingNames = names.filter((name) => !winners.includes(name));

  useEffect(() => {
    setMovingNames(
      remainingNames.map((name) => ({
        name,
        x: Math.random() * 300 + 10,
        y: Math.random() * 200 + 10,
      }))
    );
  }, [names]);

  useEffect(() => {
    setTimeout(() => {
      setWinner(selectedWinner);
      setTimeout(() => {
        setFalling(true);
      }, 500);
    }, 100); //
    if (winners.length > 0) {
      setWinner(null);
      setFalling(false);
      setTimeout(() => {
        setWinner(selectedWinner);
        setTimeout(() => {
          setFalling(true);
        }, 500);
      }, 100);
    }
  }, [selectedWinner]);

  useEffect(() => {
    if (falling && winner) {
      const timeout = setTimeout(() => {
        setMovingNames((prev) => prev.filter((item) => item.name !== winner));
        addWinner(winner);
        onSpinEnd();
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [falling, winner, onSpinEnd, addWinner]);

  useEffect(() => {
    const movementInterval = setInterval(() => {
      setMovingNames((prev) =>
        prev.map((item) => ({
          ...item,
          x: Math.random() * 500 + 10,
          y: Math.random() * 400 + 10,
        }))
      );
    }, 1000);

    return () => clearInterval(movementInterval);
  }, []);

  return (
    <div
      className="relative mx-auto overflow-hidden bg-white border-4 border-blue-300 rounded-full w-80 h-80"
      style={{
        clipPath: "polygon(0% 0%, 100% 0%, 100% 90%, 90% 90%, 0% 90%)",
      }}
    >
      {movingNames.map((item, index) => (
        <div
          key={index}
          className={`absolute w-16 h-16 flex items-center justify-center text-sm font-bold rounded-full bg-pink-300 
          
          ${
            item.name === winner && falling
              ? "transition-all duration-[3000ms] transform translate-y-[400px] opacity-0"
              : ""
          }`}
          style={{
            transform:
              item.name === winner && !falling
                ? `translate(200%, 1500%)`
                : `translate(${item.x}%, ${item.y}%)`,
            transition: "transform 3s ease",
          }}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default LottoBox;
