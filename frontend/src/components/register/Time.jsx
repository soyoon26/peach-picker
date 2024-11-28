import React, { useState, useEffect, useRef } from "react";

export default function TimePickerDropdown({ onTimeChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState("시간 선택");
  const [hours, setHours] = useState("0");
  const [minutes, setMinutes] = useState("0");
  const dropdownRef = useRef(null);

  const handleTimeChange = () => {
    const formattedTime = `${hours.padStart(2, "0")}:${minutes.padStart(
      2,
      "0"
    )}`;
    setSelectedTime(formattedTime);
    setIsOpen(false);
    if (onTimeChange) {
      onTimeChange(formattedTime);
    }
  };

  const handleHoursChange = (event) => {
    const value = Math.min(Math.max(event.target.value, 0), 23); //시간 제한
    setHours(value.toString());
  };

  const handleMinutesChange = (event) => {
    const value = Math.min(Math.max(event.target.value, 0), 55); // 분 제한
    if (value % 5 === 0) {
      setMinutes(value.toString());
    } else {
      alert("5분 단위로 설정해주세요.");
    }
  };

  const incrementMinutes = () => {
    let newMinutes = parseInt(minutes) + 5;
    if (newMinutes > 55) newMinutes = 0;
    setMinutes(newMinutes.toString());
  };

  const decrementMinutes = () => {
    let newMinutes = parseInt(minutes) - 5;
    if (newMinutes < 0) newMinutes = 55;
    setMinutes(newMinutes.toString());
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-2/5 ml-2" ref={dropdownRef}>
      <div
        className="w-full h-[40px] flex flex-row items-center justify-start py-[8px] px-[16px] bg-[#fff] border-[1px] border-solid border-[#e0e0e0] rounded-[8px] cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex-1 text-[14px] leading-[140%] font-black text-[#828282]">
          {selectedTime}
        </div>
        <div className="ml-2">▼</div>
      </div>

      {isOpen && (
        <div
          className="absolute z-20 w-full p-2 mt-1 bg-white border border-gray-300 rounded shadow-lg"
          style={{ top: "100%", left: 0 }}
        >
          <div className="flex mb-3">
            <input
              type="number"
              className="w-1/2 p-2 text-center border rounded"
              value={hours}
              min="0"
              max="23"
              onChange={handleHoursChange}
            />
            <span className="px-1">:</span>
            <div className="relative w-1/2">
              <input
                type="number"
                className="w-full p-2 text-center border rounded"
                value={minutes}
                min="0"
                max="55"
                step="5"
                onChange={handleMinutesChange}
              />
              <div className="absolute top-0 right-[-30px] flex flex-col">
                <button
                  onClick={incrementMinutes}
                  className="px-1 mb-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  ▲
                </button>
                <button
                  onClick={decrementMinutes}
                  className="px-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  ▼
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-2">
            <button
              className="px-3 py-1 mt-2 text-white rounded bg-rose-400"
              onClick={handleTimeChange}
            >
              Set
            </button>
            <button
              className="px-3 py-1 mt-2 text-black border rounded"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
