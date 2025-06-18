"use client";

import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import NotFoundComponent from "./not-found-component";
import Image from "next/image";

export default function InputMultipleImage({
  handleUpload,
  listImgId,
}: {
  handleUpload: (file: any) => void;
  listImgId?: { id: number }[];
}) {
  const listLinkDefault = listImgId
    ? listImgId.map(
        (val) => `${process.env.NEXT_PUBLIC_API_URL}/image/${val.id}`
      )
    : null;
  const [listLinkImg, setLinkImg] = useState<string[] | null>(listLinkDefault);
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    fileRejections,
  } = useDropzone({
    multiple: true,
    maxFiles: 8,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
    },
  });

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      const newListImg = acceptedFiles.map((val) => URL.createObjectURL(val));
      setLinkImg(newListImg);
    } else {
      setLinkImg(listLinkDefault);
    }
  }, [acceptedFiles.length]);

  return (
    <div className="flex flex-col items-center">
      {listLinkImg ? (
        <div className="w-full grid grid-cols-4 gap-2">
          {listLinkImg.map((val, index) => {
            return (
              <div className="col-span-1 aspect-video relative" key={index}>
                <Image src={val} fill alt="project images" />
              </div>
            );
          })}
        </div>
      ) : (
        <NotFoundComponent name={"Images of project"} />
      )}
      <div
        className="mt-3 w-2/3 h-30 md:h-36 border-2 border-border flex flex-col justify-center items-center cursor-pointer"
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
        onClick={() => handleUpload(acceptedFiles)}
      >
        Upload
      </button>
    </div>
  );
}
