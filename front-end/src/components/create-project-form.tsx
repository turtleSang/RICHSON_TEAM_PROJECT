"use client";
import { ValidateDescriptionProject, ValidateNameProject } from "@/libs/helper";
import { FormEvent, useState } from "react";
import InputTxt from "./input-txt";
import { ErrorMessageType, ProjectDto } from "@/types/define.type";
import InputTextArea from "./input-text-area";
import { CreateProject, useCategory } from "@/libs/fetching-client";
import InputCheckBox from "./input-check-box";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import Loader from "./loader";
import NotFoundComponent from "./not-found-component";

export default function CreateProjectForm() {
  const route = useRouter();
  const { data, isLoading, error } = useCategory();
  const [errorMessage, setErrorMessage] = useState<ErrorMessageType>({});
  const [project, setProject] = useState<ProjectDto>({
    name: "",
    description: "",
    categoryIdList: [],
  });

  const [isCreating, setIsCreating] = useState(false);

  const handleInputNameChange = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    const name = e.currentTarget.name;

    setProject((prev) => {
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
    setProject((prev) => {
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
        ...project.categoryIdList,
        categoryId,
      ];
      setProject((prev) => {
        return { ...prev, categoryIdList: categoryListIdNew };
      });
      setErrorMessage((prev) => ({ ...prev, categoryIdList: "" }));
    } else {
      const categoryListIdNew: number[] = project.categoryIdList.filter(
        (id) => id !== categoryId
      );
      setProject((prev) => {
        return { ...prev, categoryIdList: categoryListIdNew };
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = checkVaidateionProject();
    if (!isValid) return;
    setIsCreating(true);
    try {
      const { id } = await CreateProject(project);
      if (id) {
        route.push(`/project/detail/${id}/update`);
      }
    } catch (error) {
      const status = (error as AxiosError).status;
      if (status === 403) {
        setErrorMessage((prev) => {
          return {
            ...prev,
            serverErr:
              "You do not have permission, only member and admin can create project",
          };
        });
        return;
      }
      setErrorMessage((prev) => {
        return { ...prev, serverErr: "can not create project" };
      });
    }
    setIsCreating(false);
  };

  const checkVaidateionProject = () => {
    const err = Object.values(errorMessage).find((error) => error !== "");
    if (err) return false;

    if (!project.name || !project.name.trim()) {
      setErrorMessage((prev) => {
        return { ...prev, name: "Project name is required" };
      });
      return false;
    } else {
      setErrorMessage((prev) => {
        return { ...prev, name: "" };
      });
    }
    if (!project.description || !project.description.trim()) {
      setErrorMessage((prev) => {
        return { ...prev, description: "Project name is required" };
      });
      return false;
    } else {
      setErrorMessage((prev) => {
        return { ...prev, description: "" };
      });
    }
    if (project.categoryIdList.length === 0) {
      setErrorMessage((prev) => {
        return { ...prev, categoryIdList: "Project category is required" };
      });
      return false;
    } else {
      setErrorMessage((prev) => {
        return { ...prev, categoryIdList: "" };
      });
    }
    return true;
  };

  return (
    <form
      className="block w-full p-4 text-body-mobile md:text-body-tablet lg:text-body-desktop relative"
      onSubmit={(e) => handleSubmit(e)}
    >
      {errorMessage.serverErr && (
        <p className="w-full h-5 text-red-600">{errorMessage.serverErr}</p>
      )}
      <InputTxt
        errorMessage={errorMessage.name || ""}
        title="Project name"
        onInput={(evnet) => handleInputNameChange(evnet)}
        placeholder="Demo 01 .... "
        value={project.name}
        name="name"
      />
      <InputTextArea
        title="Description"
        placeholder="Write description here"
        name="description"
        onChange={handleTextAreaChange}
        errorMessage={errorMessage.description || ""}
        value={project.description}
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
                  checked={project.categoryIdList.includes(item.id)}
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
        CREATE PROJECT
      </button>
      {isCreating && (
        <div className="flex justify-center items-center absolute w-full h-full bg-background/50 top-0 left-0">
          <Loader />
        </div>
      )}
    </form>
  );
}
