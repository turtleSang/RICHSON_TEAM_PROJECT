"use client";

import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDropzone, FileError, ErrorCode } from "react-dropzone";
import NotFoundComponent from "./not-found-component";

export default function InputSingleImage({
  thumbId,
  handleUpload,
}: {
  thumbId?: number;
  handleUpload: (file: File) => void;
}) {
  const preUrlImg = thumbId
    ? `${process.env.NEXT_PUBLIC_API_URL}/image/${thumbId}`
    : null;
  const [imgUrl, setImgUrl] = useState<string | null>(preUrlImg);
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    multiple: false,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
    },
  });

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      const newImgUrl = URL.createObjectURL(acceptedFiles[0]);
      setImgUrl(newImgUrl);
    } else {
      setImgUrl(preUrlImg);
    }
  }, [acceptedFiles.length]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative aspect-video w-1/3 mb-3 ">
        {imgUrl ? (
          <Image fill src={imgUrl} alt="project-thumb" />
        ) : (
          <NotFoundComponent name="Image Thumbnail" />
        )}
      </div>
      <div
        className="w-2/3 h-30 md:h-36 border-2 border-border flex flex-col justify-center items-center cursor-pointer"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <div>Drop the files here ...</div>
        ) : (
          <div className="text-center">
            <span className="block">
              <FontAwesomeIcon icon={faUpload} />
            </span>
            DROP FILE IMAGE HERE
          </div>
        )}
        {fileRejections[0] && (
          <p className="text-red-600">{fileRejections[0].errors[0].message}</p>
        )}
      </div>
      <button
        className="mt-3 px-5 py-3 block bg-btnBg rounded-md cursor-pointer hover:bg-hover duration-200"
        type="button"
        onClick={() => handleUpload(acceptedFiles[0])}
      >
        Upload
      </button>
    </div>
  );
}
