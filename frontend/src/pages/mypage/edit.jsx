import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useAuthStore from "../../store/authStore";
import Input from "@/components/login/Input";
import Button from "@/components/button/Button";
import CropProfileImg from "@/components/login/CropProfileImg";
import Modal from "@/components/common/Modal";

export default function Edit() {
  const {
    isLoggedIn,
    token,
    isInitialized,
    initialize,
    logout,
    userInfo,
    setUserInfo,
  } = useAuthStore();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profileImg, setProfileImg] = useState(null);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, [initialize, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      if (!isLoggedIn) {
        setMessage("로그인이 필요합니다.");
        router.push("/login");
        return;
      }

      setUsername(userInfo?.username || "");
      setEmail(userInfo?.email || "");
    }
  }, [isInitialized, isLoggedIn, userInfo, router]);

  const handleUpdateProfile = async () => {
    if (!username) {
      setMessage("사용자 이름을 입력해야 합니다.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", username);
      if (profileImg) {
        formData.append("profileImg", profileImg);
      }

      const response = await fetch("/api/users/profile", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("프로필 업데이트에 실패했습니다.");
      }

      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        setUserInfo({
          username: data.name,
          email: data.email,
          profileImg: data.profileUrl,
        });
      } else {
        const message = await response.text();
        setMessage(message);
      }

      setMessage("프로필이 성공적으로 업데이트되었습니다.");
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error:", error);
      setMessage("프로필 업데이트에 실패했습니다.");
    }
  };

  // 탈퇴
  const handleDeleteAccount = async () => {
    try {
      const response = await fetch("/api/users", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("탈퇴에 실패했습니다.");
      }

      setMessage("탈퇴가 성공적으로 완료되었습니다.");
      logout();
      setIsDeleteModalOpen(false);
      router.push("/");
    } catch (error) {
      console.error("탈퇴 오류:", error);
      setMessage("탈퇴에 실패했습니다.");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    router.push("/mypage");
  };

  return (
    <div className="center1">
      <div className="w-2/3 mb-20 relative max-w-[606px] flex flex-col">
        <div className="relative mb-1 mt-15 left-0 w-[103px] h-[38px] text-[20px] fj flex-col ">
          회원 정보
        </div>
        <div className="w-full mb-3 h-0 border-[1px] border-solid border-[#000]"></div>
        <div className="w-full center1">
          <CropProfileImg onImageSelect={(blob) => setProfileImg(blob)} />
        </div>

        <Input
          title="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder={userInfo?.username || "사용자 이름을 입력하세요"}
        />

        <Input
          title="Email"
          type="text"
          value={email}
          readOnly
          placeholder={userInfo?.email}
          className="placeholder-black"
        />

        <div className="flex gap-2 mt-20 mb-2">
          <Button
            text="회원정보 수정"
            className="bg-[#fb5e67] w-full py-5 text-white"
            onClick={handleUpdateProfile}
          />
          <Button
            text="탈퇴"
            className="py-5 border-[#808080] border w-full"
            onClick={() => setIsDeleteModalOpen(true)}
          />
        </div>
        <Button
          text="취소"
          onClick={() => router.push("/mypage")}
          className="border py-5 border-[#808080]"
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        message={message}
      />

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        message="정말로 탈퇴하시겠습니까?"
      >
        <div className="flex justify-end w-full mt-4">
          <Button
            text="네"
            className="w-full text-gray-500 bg-white border border-gray-500"
            onClick={handleDeleteAccount}
          />
        </div>
      </Modal>
    </div>
  );
}
