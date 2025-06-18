"use client";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "plyr-react/plyr.css";

import { useDropzone } from "react-dropzone";

export default function InputVideoFile({
  handleUpload,
}: {
  handleUpload: (file: File) => void;
}) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    fileRejections,
    acceptedFiles,
  } = useDropzone({
    multiple: false,
    accept: {
      "video/mp4": [".mp4"],
    },
  });

  return (
    <div className="flex flex-col items-center justify-center ">
      <div
        className="w-2/3 h-30 md:h-36 border-border border-2 flex flex-col justify-center items-center cursor-pointer"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p className="uppercase">
            <span className="block text-center">
              <FontAwesomeIcon icon={faUpload} />
            </span>
            drop file video here
          </p>
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
      <div className="w-full mt-3">
        {acceptedFiles.length === 0 && (
          <p className="text-center">No File chossen</p>
        )}
        {acceptedFiles.length > 0 && (
          <video className="w-full h-auto" controls>
            <source src={URL.createObjectURL(acceptedFiles[0])} />
          </video>
        )}
      </div>
    </div>
  );
}
