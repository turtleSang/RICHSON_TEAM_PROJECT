"use client";

import { useCategory } from "@/libs/fetching-client";
import { ErrorMessageType, ProjectDto } from "@/types/define.type";
import { FormEvent, useState } from "react";
import InputTxt from "./input-txt";
import InputTextArea from "./input-text-area";
import InputCheckBox from "./input-check-box";
import Loader from "./loader";
import NotFoundComponent from "./not-found-component";
import { ValidateDescriptionProject, ValidateNameProject } from "@/libs/helper";
import axios from "axios";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useProjectContext } from "@/layout/update-project-layout";

export default function UpdateProjectFormBase() {
  const { handleNofication, project, handleProcess, handleUpload } =
    useProjectContext();
  const [isActive, setActive] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<ErrorMessageType>({});
  const [projectDto, setProjectDto] = useState<ProjectDto>({
    name: project.name,
    description: project.description,
    categoryIdList: project.categoryList.map((val) => val.id),
  });
  const { data, error, isLoading } = useCategory();
  const route = useRouter();

  const handleInputNameChange = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    const name = e.currentTarget.name;

    setProjectDto((prev) => {
      return { ...prev, name: value };
    });

    const error = ValidateNameProject(value);
    if (error) {
      setErrorMessage((prev) => ({ ...prev, [name]: error }));
    } else {
      setErrorMessage((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleTextAreaChange = (e: FormEvent<HTMLTextAreaElement>) => {
    const value = e.currentTarget.value;
    const name = e.currentTarget.name;
    setProjectDto((prev) => {
      return { ...prev, description: value };
    });
    const error = ValidateDescriptionProject(value);
    if (error) {
      setErrorMessage((prev) => ({ ...prev, [name]: error }));
    } else {
      setErrorMessage((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleCheckBoxCategoryChange = (
    e: FormEvent<HTMLInputElement>,
    categoryId: number
  ) => {
    const checked = e.currentTarget.checked;
    if (checked) {
      const categoryListIdNew: number[] = [
        ...projectDto.categoryIdList,
        categoryId,
      ];
      setProjectDto((prev) => {
        return { ...prev, categoryIdList: categoryListIdNew };
      });
      setErrorMessage((prev) => ({ ...prev, categoryIdList: "" }));
    } else {
      const categoryListIdNew: number[] = projectDto.categoryIdList.filter(
        (id) => id !== categoryId
      );
      setProjectDto((prev) => {
        return { ...prev, categoryIdList: categoryListIdNew };
      });
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const url = `${process.env.NEXT_PUBLIC_API_URL}/project/base/${project.id}`;
    handleUpload(true);
    try {
      const res = await axios.put(url, projectDto, {
        withCredentials: true,
        onUploadProgress: (progressEvent) => {
          const { total, loaded } = progressEvent;
          if (typeof total === "number" && total > 0) {
            const percentage = Math.round((loaded * 100) / total);
            handleProcess(percentage);
          }
        },
      });
      const mess = String(res.data);
      setActive(false);
      handleNofication({
        mess,
        type: "success",
      });
      route.refresh();
    } catch (error) {
      console.log(error);

      handleNofication({
        mess: "Server error",
        type: "error",
      });
    }
    handleUpload(false);
  };

  const handleActiveForm = () => {
    setActive(true);
  };

  const handleCloseForm = () => {
    setActive(false);
  };

  return (
    <motion.div className="bg-background-item" layout>
      {isActive ? (
        <motion.form
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          className="block w-full p-4 text-body-mobile md:text-body-tablet lg:text-body-desktop"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="text-right">
            <span
              className="p-3 text-section-title-mobile md:text-section-title-tablet lg:text-section-title-desktop rounded-full hover:text-btnBg cursor-pointer duration-200"
              onClick={handleCloseForm}
            >
              <FontAwesomeIcon icon={faClose} />
            </span>
          </div>
          {errorMessage.serverErr && (
            <p className="w-full h-5 text-red-600">{errorMessage.serverErr}</p>
          )}

          <InputTxt
            errorMessage={errorMessage.name || ""}
            title="Project name"
            onInput={(evnet) => handleInputNameChange(evnet)}
            placeholder="Demo 01 .... "
            value={projectDto.name}
            name="name"
          />
          <InputTextArea
            title="Description"
            placeholder="Write descriptin here"
            name="description"
            onChange={handleTextAreaChange}
            errorMessage={errorMessage.description || ""}
            value={projectDto.description}
          />
          <div className="flex flex-row items-center justify-between w-full mt-4">
            <h1 className="w-3/12">Category</h1>
            <div className="flex flex-row flex-wrap items-center justify-between w-8/12  px-4 py-2 border border-borderColor rounded-xl">
              {errorMessage.categoryIdList && (
                <p className="w-full h-5 text-red-600">
                  {errorMessage.categoryIdList}
                </p>
              )}
              {isLoading && <Loader />}
              {error && <NotFoundComponent name={"Category"} />}
              {data &&
                data.map((item) => {
                  return (
                    <InputCheckBox
                      key={item.id}
                      id={`${item.id}`}
                      name={item.name}
                      checked={projectDto.categoryIdList.includes(item.id)}
                      onChange={(e) => handleCheckBoxCategoryChange(e, item.id)}
                    />
                  );
                })}
            </div>
          </div>

          <button
            className="bg-btnBg text-background px-3 py-2 rounded-xl mx-auto block w-1/2 mt-3 cursor-pointer  duration-200 hover:bg-hover hover:text-text"
            type="submit"
          >
            SAVE
          </button>
        </motion.form>
      ) : (
        <motion.div className="flex flex-col-reverse md:flex-row">
          <div className="px-2 py-3 md:w-1/2">
            <h1 className="mb-3 md:mb-5 lg:mb-6 text-section-title-mobile md:text-section-title-tablet lg:text-section-title-desktop">
              {projectDto.name}
            </h1>
            <h2 className="mb-3 md:mb-5 lg:mb-6 ">
              Description: {projectDto.description}
            </h2>
            <div className="flex flex-row gap-2">
              {data &&
                data
                  .filter((category) =>
                    projectDto.categoryIdList.includes(category.id)
                  )
                  .map((val) => {
                    return (
                      <span
                        className="bg-background px-3 py-1 rounded-md"
                        key={val.id}
                      >
                        {val.name}
                      </span>
                    );
                  })}
            </div>
          </div>
          <div className="text-right p-5 md:w-1/2">
            <span onClick={handleActiveForm}>
              <FontAwesomeIcon
                className="bg-btnBg p-3 rounded-md text-section-title-mobile md:text-section-title-tablet lg:text-section-title-desktop cursor-pointer hover:bg-hover duration-200"
                icon={faEdit}
              />
            </span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
