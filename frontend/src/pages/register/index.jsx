import React, { useEffect, useState } from "react";
import { ko } from "date-fns/locale";
import { useRouter } from "next/router";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import Time from "../../components/register/Time";
import ImgUpload from "@/components/register/ImgUpload";
import useAuthStore from "../../store/authStore";
import useDrawingStore from "../../store/drawingStore";
import Button from "@/components/button/Button";
import axios from "axios";
import { registerDrawing } from "@/api/drawingAPI";

export default function Register() {
  const { isLoggedIn, isInitialized, initialize } = useAuthStore();
  const { addNewDrawing } = useDrawingStore();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [calOpen, setCalOpen] = useState(false);
  const [formatDay, setFormatDay] = useState("날짜 선택");
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("15:00");
  const [method, setMethod] = useState("추첨 방법 선택");
  const [winnerCnt, setWinnerCnt] = useState("");
  const [eventName, setEventName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { token } = useAuthStore();

  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, [initialize, isInitialized]);

  useEffect(() => {
    if (isInitialized && !isLoggedIn) {
      alert("로그인 해주세요.");
      router.push("/login");
    }
  }, [isInitialized, isLoggedIn, router]);

  const dropDown = () => setIsOpen(!isOpen);
  const dropCalendar = () => setCalOpen(!calOpen);

  const setDate = (day) => {
    if (!day) {
      setFormatDay(
        `${selectedDay.getFullYear()}년 ${
          selectedDay.getMonth() + 1
        }월 ${selectedDay.getDate()}일`
      );
      setCalOpen(false);
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (day < today) {
      alert("유효하지 않은 날짜입니다.");
      return;
    }

    setSelectedDay(day);
    setFormatDay(
      `${day.getFullYear()}년 ${day.getMonth() + 1}월 ${day.getDate()}일`
    );
    setCalOpen(false);
  };

  const selectMethod = (selectedMethod) => {
    setMethod(selectedMethod);
    setIsOpen(false);
  };

  const handleWinnerCnt = (event) => {
    const value = event.target.value;

    if (isNaN(value) || value < 1) {
      alert("당첨자는 1명 이상이어야 합니다.");
      setWinnerCnt(1);
      return;
    }

    setWinnerCnt(parseInt(value, 10));
  };

  const handleEventName = (event) => setEventName(event.target.value);

  const handleFile = (event) => {
    const file = event.target.files[0];
    if (file.type === "text/csv" || file.type === "application/vnd.ms-excel") {
      setSelectedFile(file);
    } else {
      alert("CSV 파일만 등록할 수 있습니다.");
    }
  };

  const handleImageSelect = (imageDataUrl) => {
    const byteString = atob(imageDataUrl.split(",")[1]);
    const mimeString = imageDataUrl.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });

    setThumbnail(blob);
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      if (!eventName) throw new Error("이벤트명을 입력해주세요.");
      if (!winnerCnt || winnerCnt <= 0)
        throw new Error("당첨자 수를 입력해주세요.");
      if (method === "추첨 방법 선택")
        throw new Error("추첨 방법을 선택해주세요.");
      if (!selectedDay) throw new Error("날짜를 선택해주세요.");
      if (!selectedTime) throw new Error("시간을 선택해주세요.");

      const [hours, minutes] = selectedTime.split(":");
      const combinedDateTime = new Date(
        selectedDay.getFullYear(),
        selectedDay.getMonth(),
        selectedDay.getDate(),
        parseInt(hours, 10),
        parseInt(minutes, 10)
      );
      const formattedDateTime = combinedDateTime.toISOString().slice(0, 16);

      const formData = new FormData();
      formData.append("title", eventName);
      formData.append("drawingAt", formattedDateTime);
      formData.append("drawingType", method);
      formData.append("winner", winnerCnt);

      if (selectedFile) formData.append("participants", selectedFile);
      if (thumbnail) formData.append("thumbnail", thumbnail, "thumbnail.png");
      for (const pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      } // 확인
      const response = await registerDrawing(formData, token);
      addNewDrawing(response.data);
      alert("추첨이 성공적으로 등록되었습니다.");
      router.push("/mypage/mylist");
    } catch (error) {
      alert(error.message || "등록 중 오류가 발생했습니다. 다시 시도해주세요.");
      console.error("Submission Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="mt-20 center1 min-w-[1000px] w-full"
      style={{ height: "calc(100vh - 100px)" }}
    >
      {isSubmitting && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div className="w-16 h-16 border-4 border-white rounded-full border-t-transparent animate-spin"></div>
        </div>
      )}

      <div className="w-1/5 mt-20">
        <ImgUpload onImageSelect={handleImageSelect} />
      </div>

      <div className="w-1/2 center2">
        <div className="text-right mr-2 w-[150px] font-bold">일시 :</div>
        <div className="relative w-3/5 h-[40px]">
          <div
            onClick={dropCalendar}
            className="flex h-full items-center justify-start py-[8px] px-[16px] bg-[#fff] border-[1px] border-solid border-[#e0e0e0] rounded-[8px] cursor-pointer"
          >
            <div className="flex-1 text-[14px] leading-[140%] font-black text-[#828282]">
              {formatDay}
            </div>
            <div className="ml-2">▼</div>
          </div>
          {calOpen && (
            <div className="absolute z-20 mt-2 w-[330px] right-0 center2 bg-white border border-gray-300 rounded shadow-lg">
              <DayPicker
                locale={ko}
                mode="single"
                defaultMonth={selectedDay}
                selected={selectedDay}
                onSelect={setDate}
              />
            </div>
          )}
        </div>

        <Time onTimeChange={setSelectedTime} />
      </div>
      <div className="w-1/2 pl-[130px] pt-2 text-[12px] whitespace-nowrap">
        ※ 5분 단위로 등록해주세요.
      </div>

      <div className="w-1/2 m-4 center2">
        <div className="text-right mr-2 w-[150px] font-bold">이벤트 명 :</div>
        <div className="w-full h-[40px] flex flex-row items-center justify-start py-[8px] px-[16px] bg-[#fff] border-[1px] border-solid border-[#e0e0e0] rounded-[8px]">
          <input
            type="text"
            className="flex-1 text-[14px] leading-[140%] font-black text-[#828282] line-clamp-1"
            placeholder="이벤트명을 입력하세요."
            onChange={handleEventName}
          />
        </div>
      </div>

      <div className="w-1/2 mb-4 center2">
        <div className="text-right mr-2 w-[150px] font-bold">당첨자 수 :</div>
        <div className="w-full h-[40px] flex flex-row items-center justify-start py-[8px] px-[16px] bg-[#fff] border-[1px] border-solid border-[#e0e0e0] rounded-[8px]">
          <input
            type="number"
            className="flex-1 text-[14px] leading-[140%] font-black text-[#828282] line-clamp-1"
            placeholder="당첨자 수를 설정하세요."
            value={winnerCnt}
            min="1"
            onChange={handleWinnerCnt}
            onKeyDown={(e) => {
              if (e.key === "-" || e.key === "e") e.preventDefault();
            }}
          />
        </div>
      </div>

      <div className="relative w-1/2 mb-4 center2 z-1">
        <div className="text-right mr-2 w-[150px] font-bold">추첨 방법 :</div>
        <div
          className="relative w-full h-[40px] flex flex-row items-center justify-start py-[8px] px-[16px] bg-[#fff] border-[1px] border-solid border-[#e0e0e0] rounded-[8px] cursor-pointer"
          onClick={dropDown}
        >
          <div className="flex-1 text-[14px] leading-[140%] font-black text-[#828282]">
            {method}
          </div>
          <div className="ml-2">▼</div>
          {isOpen && (
            <div className="absolute left-0 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg top-full">
              <div
                className="px-4 py-2 hover:bg-gray-100"
                onClick={() => selectMethod("LOTTERY")}
              >
                로또
              </div>

              <div
                className="px-4 py-2 hover:bg-gray-100"
                onClick={() => selectMethod("ROULETTE")}
              >
                룰렛
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="w-1/2 mb-10 center2">
        <div className="text-right mr-2 mt-6 w-[150px] font-bold">명단 :</div>
        <div className="w-full text-[12px] whitespace-nowrap">
          ※ 휴대폰 번호가 있는 명단을 등록해주세요.
          <br />※ csv 파일만 등록할 수 있습니다.
          <br />※ 아직 명단이 완성되지 않았다면 등록이후 수정란에서 명단을
          등록해주세요.
          <div className="flex mt-2 mb-10">
            <div className="w-full h-[40px] flex items-center justify-between py-[8px] px-[16px] bg-[#fff] border-[1px] border-solid border-[#e0e0e0] rounded-[8px]">
              <div className="flex-1 text-[14px] leading-[140%] text-[#828282] line-clamp-1">
                {selectedFile ? selectedFile.name : "파일을 등록해주세요."}
              </div>
            </div>
            <div className="center2 bg-[#d9d9d9] rounded-[5px] px-4 ml-2">
              <label style={{ cursor: "pointer" }} htmlFor="csvFileInput">
                <input
                  type="file"
                  accept=".csv"
                  id="csvFileInput"
                  style={{ display: "none", cursor: "pointer" }}
                  onChange={handleFile}
                />
                파일 찾기
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end w-1/2 z-1">
        <Button
          text="등록"
          onClick={handleSubmit}
          className="w-[96px] mb-10 bg-black text-white"
        />
      </div>
    </div>
  );
}
