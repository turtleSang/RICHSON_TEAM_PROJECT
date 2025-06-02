"use client";
import axios, { AxiosError } from "axios";
import InputTextArea from "./input-text-area";
import InputTxt from "./input-txt";

import useCategoryPageContext from "@/libs/CategoryPageContext";
import { useState } from "react";
import { CategoryType, ErrorMessageType } from "@/types/define.type";
import { log } from "node:console";
import Loader from "./loader";

export default function CreateCategoryForm() {
  const context = useCategoryPageContext();
  const [errorMessage, setErrorMessage] = useState<ErrorMessageType>({});
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const link = formData.get("link") as string;
    const description = formData.get("description") as string;

    const url = `${process.env.NEXT_PUBLIC_API_URL}/category/create`;
    setErrorMessage({});
    setIsUploading(true);
    try {
      const res = await axios.post(
        url,
        { name, link, description },
        { withCredentials: true }
      );

      const newCaregory = res.data as CategoryType;
      context.handleAddCardType(newCaregory);
      context.handleActiveForm(false);
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.data) {
        const dataErr = axiosError.response?.data as {
          message?: { property: string }[];
        };
        if (dataErr && Array.isArray(dataErr.message)) {
          const listErr = dataErr.message;
          listErr.forEach((err) => {
            setErrorMessage((prev) => ({
              ...prev,
              [err.property]: "invalid " + err.property,
            }));
          });
        } else if (dataErr && typeof dataErr.message === "string") {
          setErrorMessage((prev) => ({
            ...prev,
            server: String(dataErr.message),
          }));
        }
      }
    }
    setIsUploading(false);
  };

  return (
    <form
      className="block bg-background-item p-3 rounded-lg relative"
      onSubmit={(e) => handleSubmit(e)}
    >
      {errorMessage.server && (
        <p className="text-red-600 text-center">{errorMessage.server}</p>
      )}
      {isUploading && (
        <div className="absolute w-full h-full bg-black/50 top-0 left-0 flex justify-center items-center">
          <Loader />
        </div>
      )}
      <InputTxt
        title="Name"
        placeholder="only text and space "
        name="name"
        errorMessage={errorMessage.name}
      />
      <InputTxt
        title="Link"
        placeholder="lowercase text and -  "
        name="link"
        errorMessage={errorMessage.link}
      />
      <InputTextArea
        title="Description"
        name="description"
        errorMessage={errorMessage.description}
      />
      <div className="flex justify-around mt-3">
        <button
          type="submit"
          className="bg-btnBg px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
        >
          Create Category
        </button>
        <button
          type="button"
          className="bg-red-600 px-4 py-2 rounded-md hover:bg-primary/90 transition-colors cursor-pointer"
          onClick={() => {
            context.handleActiveForm(false);
          }}
        >
          Close
        </button>
      </div>
    </form>
  );
}
