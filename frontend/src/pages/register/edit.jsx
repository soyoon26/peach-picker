import React, { useEffect, useRef, useState } from "react";
import { ko } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function edit() {
  const [isOpen, setIsOpen] = useState(false);
  const dropDown = () => {
    setIsOpen(!isOpen);
  };

  const Today = new Date();
  const [formatDay, setFormatDay] = useState("날짜 선택");
  const [selectedDay, setSelectedDay] = useState(Today);
  const [calOpen, setCalOpen] = useState(false);
  const dropCalendar = () => {
    setCalOpen(!calOpen);
  };
  const setDate = (day) => {
    setSelectedDay(day);
    console.log(selectedDay);
    setFormatDay(
      `${day.getFullYear()}년 ${day.getMonth() + 1}월 ${day.getDate()}일`
    );
  };
  const [method, setMethod] = useState("추첨 방법 선택");
  const selectMethod = (selectedMethod) => {
    setMethod(selectedMethod);
    setIsOpen(false);
  };
  const [winnerCnt, setWinnerCnt] = useState("");
  const handleWinnerCnt = (event) => {
    setWinnerCnt(event.target.value);
  };
  const [eventName, setEventName] = useState("");
  const handleEventName = (event) => {
    setEventName(event.target.value);
  };
  useEffect(() => {
    console.log(winnerCnt);
  }, [winnerCnt]);
  const [selectedFile, setSelectedFile] = useState("파일을 등록해주세요.");
  const handleFile = (event) => {
    const file = event.target.files[0];
    // if (!file) return;
    // if (file.type !== "text/csv") {
    //   alert("CSV 파일만 업로드 가능합니다.");
    //   return;
    // }
    setSelectedFile(file.name);
    console.log("선택된 파일:", file.name);
  };
  const ref = useRef();
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     console.log(event.target);
  //     if (isOpen && ref.current && !ref.current.contains(event.target)) {
  //       setIsOpen(false);
  //     }
  //   };
  //   document.addEventListener("click", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("click", handleClickOutside);
  //   };
  // }, [isOpen]);

  return (
    <div className="relative w-full center1">
      <div className="w-1/2 mt-20 center2 absoulte" onClick={dropCalendar}>
        <div className="text-[20px] text-right mr-2 w-[150px] ">일시 : </div>
        <div className="absoulte left-[110px] w-full h-[40px] flex flex-row items-center justify-start py-[8px] px-[16px] bg-[#fff] border-[1px] border-solid border-[#e0e0e0] rounded-[8px]">
          <div className=" flex-1 w-full text-[14px] leading-[140%] font-black text-[#828282] line-clamp-1">
            {formatDay}
          </div>

          {calOpen && (
            <div className="relative w-1/2">
              <div className="absolute right-0 ">
                <DayPicker
                  locale={ko}
                  mode="single"
                  defaultMonth={Today}
                  selected={selectedDay}
                  onSelect={setDate}
                  styles={{
                    head_cell: {
                      width: "auto",
                      minWidth: " 20px",
                      maxWidth: "200px",
                    },
                    table: {
                      maxWidth: "none",
                    },
                    day: {
                      margin: "auto",
                    },
                  }}
                />
              </div>
            </div>
          )}
          <div className="ml-2">▼</div>
        </div>
      </div>
      <div className="w-1/2 mt-10 center2">
        <div className="z-1 text-[20px] text-right mr-2 w-[150px] ">
          이벤트 명 :{" "}
        </div>
        <div className="absoulte left-[110px] w-full h-[40px] flex flex-row items-center justify-start py-[8px] px-[16px] bg-[#fff] border-[1px] border-solid border-[#e0e0e0] rounded-[8px]">
          <input
            type="text"
            className="flex-1 text-[14px] leading-[140%]  font-black text-[#828282] line-clamp-1"
            placeholder="이벤트명을 입력하세요."
            onChange={handleEventName}
          />
        </div>
      </div>
      <div className="w-1/2 mt-10 center2">
        <div className="z-1 text-[20px] text-right mr-2 w-[150px] ">
          당첨자 수 :{" "}
        </div>
        <div className="absoulte left-[110px] w-full h-[40px] flex flex-row items-center justify-start py-[8px] px-[16px] bg-[#fff] border-[1px] border-solid border-[#e0e0e0] rounded-[8px]">
          <input
            type="number"
            className="flex-1 text-[14px] leading-[140%]  font-black text-[#828282] line-clamp-1"
            placeholder="당첨자 수를 입력하세요."
            onChange={handleWinnerCnt}
          />
        </div>
      </div>
      <div className="w-1/2 mt-10 center2 z-1">
        <div className=" z-1 text-[20px] text-right mr-2 w-[150px] ">
          추첨 방법 :{" "}
        </div>
        <div
          className=" left-[110px] w-full h-[40px] flex flex-row items-center justify-start py-[8px] px-[16px] bg-[#fff] border-[1px] border-solid border-[#e0e0e0] rounded-[8px] "
          onClick={dropDown}
        >
          <div className="flex-1 text-[14px] leading-[140%] font-['Noto_Sans'] font-black text-[#828282] line-clamp-1">
            {method}
            {isOpen && (
              <div className="absolute w-1/3 mt-2 bg-white border border-gray-300 rounded shadow-lg">
                <div
                  className="px-4 py-2 hover:bg-gray-100"
                  onClick={() => selectMethod("사다리 타기")}
                >
                  사다리 타기
                </div>
                <div
                  className="px-4 py-2 hover:bg-gray-100"
                  onClick={() => selectMethod("핀볼")}
                >
                  핀볼
                </div>
                <div
                  className="px-4 py-2 hover:bg-gray-100"
                  onClick={() => selectMethod("공 뽑기")}
                >
                  공 뽑기
                </div>
              </div>
            )}
          </div>
          <div className="ml-2">▼</div>
        </div>
      </div>

      <div className="w-1/2 mt-10 center2 absoulte">
        <div className="text-[20px] text-right mr-2 w-[150px] ">명단 : </div>
        <div className="w-full text-[12px] whitespace-nowrap">
          ※ 휴대폰 번호가 있는 명단을 등록해주세요.
          <br />※ csv 파일만 등록할 수 있습니다.
          <div className="mt-1 absoulte left-[110px] w-full h-[40px] flex flex-row items-center justify-start py-[8px] px-[16px] bg-[#fff] border-[1px] border-solid border-[#e0e0e0] rounded-[8px]">
            <div className=" flex-1 w-full text-[14px] leading-[140%] font-black text-[#828282] line-clamp-1">
              {selectedFile}
            </div>
          </div>
          <div className="absolute center2 mt-2 w-[89px] h-[44px] bg-[#d9d9d9] rounded-[5px]">
            <label style={{ cursor: "pointer" }} htmlFor="fileInput">
              <div>
                <input
                  type="file"
                  accept=".csv,.xlsx"
                  id="fileInput"
                  style={{ display: "none", cursor: "pointer" }}
                  onChange={handleFile}
                />
                파일 찾기
              </div>
            </label>
          </div>
        </div>
      </div>

      <div className="relative flex justify-end w-1/2 z-1">
        <div className="mr-5 mt-20 w-[96px] h-[45px] flex-row center2 py-[6px] px-[16px] bg-[#000] rounded-[8px]">
          <div className="text-[18px] leading-[140%]  font-black text-[#fff] whitespace-nowrap">
            수정 완료
          </div>
        </div>
        <div className=" mt-20 w-[96px] h-[45px] flex-row center2 py-[6px] px-[16px] border-[1px] border-solid border-[#000] bg-[#fff] rounded-[8px]">
          <div className="text-[18px] leading-[140%]  font-black text-[#000] whitespace-nowrap">
            삭제
          </div>
        </div>
      </div>
    </div>
  );
}
