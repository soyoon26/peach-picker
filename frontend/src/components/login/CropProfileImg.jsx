import React, { useState, useEffect } from "react";
import Modal from "../register/Modal";
import CropImage from "../register/croppedImg";
import useAuthStore from "@/store/authStore";

export default function CropProfileImg({ onImageSelect }) {
  const { userInfo, setUserInfo } = useAuthStore();
  const [imageSrc, setImageSrc] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [storedProfileImg, setStoredProfileImg] = useState(null);

  useEffect(() => {
    if (userInfo?.profileImg) {
      setCroppedImage(userInfo.profileImg);
    }
  }, [userInfo]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result);
      setIsModalOpen(true);
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = (croppedImageDataUrl) => {
    const blob = base64ToBlob(croppedImageDataUrl, "image/png");
    setCroppedImage(croppedImageDataUrl);
    setIsModalOpen(false);
    onImageSelect(blob);
  };

  const triggerImageUpload = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <div className="mb-10 center1">
      {croppedImage ? (
        <img
          src={croppedImage}
          alt="Profile Image"
          style={{ width: "300px", height: "300px", cursor: "pointer" }}
          onClick={triggerImageUpload}
        />
      ) : (
        <div
          style={{
            width: "100px",
            height: "100px",
            backgroundColor: "#ccc",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={triggerImageUpload}
        >
          프로필 사진 추가
        </div>
      )}

      <button
        onClick={triggerImageUpload}
        className="p-2 font-bold text-white bg-black lounded-lg"
        style={{
          padding: "5px 10px",

          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        프로필 사진 수정
      </button>
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: "none" }}
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {imageSrc && (
          <CropImage imageSrc={imageSrc} onCropComplete={handleCropComplete} />
        )}
      </Modal>
    </div>
  );
}

function base64ToBlob(base64Data, contentType) {
  const byteCharacters = atob(base64Data.split(",")[1]);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
}
