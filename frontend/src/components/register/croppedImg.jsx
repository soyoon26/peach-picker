import React, { useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

export default function CropImage({ imageSrc, onCropComplete }) {
  const cropperRef = useRef(null);

  const getCroppedImage = () => {
    if (cropperRef.current) {
      const cropper = cropperRef.current.cropper;
      const croppedCanvas = cropper.getCroppedCanvas();
      onCropComplete(croppedCanvas.toDataURL());
    }
  };

  return (
    <div>
      <Cropper
        src={imageSrc}
        style={{ height: 400, width: "100%" }}
        aspectRatio={1}
        viewMode={1}
        guides={false}
        ref={cropperRef}
      />
      <div className="flex items-end justify-end w-full">
        <button
          className="p-2 m-2 text-white bg-black rounded-lg"
          onClick={getCroppedImage}
        >
          이미지 크롭하기
        </button>
      </div>
    </div>
  );
}
