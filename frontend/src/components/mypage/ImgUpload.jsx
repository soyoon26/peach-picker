import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import Modal from "../register/Modal";
import CropImage from "../register/croppedImg";

export default function ImageUploadAndCrop({ onImageSelect }) {
  const { userInfo } = useAuthStore();
  const [imageSrc, setImageSrc] = useState(null);
  const [croppedImage, setCroppedImage] = useState(
    userInfo?.profileImg || null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    setCroppedImage(croppedImageDataUrl);
    setIsModalOpen(false);

    onImageSelect(croppedImageDataUrl);
  };

  return (
    <div className="mb-10 center1">
      {croppedImage ? (
        <img
          src={croppedImage}
          alt="Cropped"
          style={{ width: "100%", height: "auto" }}
          onClick={() => document.getElementById("fileInput").click()}
        />
      ) : (
        <div>
          <FontAwesomeIcon
            icon={faImage}
            className="text-gray-300 cursor-pointer text-9xl"
            onClick={() => document.getElementById("fileInput").click()}
          />
        </div>
      )}

      <button
        onClick={() => document.getElementById("fileInput").click()}
        className="font-bold"
        style={{
          padding: "5px 10px",
          color: "black",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        대표 사진 등록
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
