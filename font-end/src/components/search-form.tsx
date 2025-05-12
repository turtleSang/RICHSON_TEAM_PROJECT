"use client";
import { useProjectNameSearch } from "@/libs/fetching-client";
import { TruncateTxt } from "@/libs/helper";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "./loader";

export default function SearchForm({
  isActive,
  handleClose,
}: {
  isActive: boolean;
  handleClose: () => void;
}) {
  const [txtInput, setTxtInput] = useState("");
  const [txtSearch, setTxtSearch] = useState("");
  const { data, isLoading } = useProjectNameSearch(txtSearch);
  const router = useRouter();
  let idTimeOut: any;

  const handleForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleClose();
    router.push(`/search/${encodeURIComponent(txtSearch)}`);
  };

  const handleInput = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();

    const txtValue = event.currentTarget.value;
    setTxtInput(txtValue);
    if (!idTimeOut) {
      idTimeOut = setTimeout(() => {
        if (txtValue.length > 0) {
          setTxtSearch(txtValue);
          idTimeOut = null;
        }
      }, 700);
    }
  };

  useEffect(() => {
    if (!isActive) {
      setTxtSearch("");
      setTxtInput("");
    }
  }, [isActive]);

  const formVariatant: Variants = {
    open: {
      opacity: 1,
      y: ["-270px", "20px", "0"],
      width: "70%",
      visibility: "visible",
    },
    close: {
      opacity: 0,
      y: ["20px", "-250px"],
      width: "80px",
      visibility: "hidden",
    },
  };

  return (
    <motion.form
      variants={formVariatant}
      initial="close"
      animate={isActive ? "open" : "close"}
      className="text-hero-mobile lg:text-hero-tablet fixed z-30 top-64 left-1/2 -translate-x-1/2"
      onSubmit={handleForm}
    >
      <label className="flex flex-row justify-between py-3 px-4 bg-background-item rounded-4xl">
        <input
          className="w-2/3 focus-visible:outline-0"
          type="text"
          placeholder="Search projects"
          onInput={(e) => handleInput(e)}
          value={txtInput}
        />
        <button className="cursor-pointer pr-3" type="submit">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </label>
      <motion.div layout>
        {isLoading && (
          <motion.div>
            <Loader />
          </motion.div>
        )}
        {data && (
          <motion.ul className="fixed z-30 top-[105%] bg-background-item w-11/12 left-1/2 -translate-x-1/2 overflow-hidden rounded-2xl p-1 ">
            {data.map((val) => {
              return (
                <li
                  className="px-3 duration-200 rounded-xl border-2 border-transparent hover:border-hover"
                  key={val.id}
                >
                  <Link href={`/search/${val.name}`} onClick={handleClose}>
                    {TruncateTxt(val.name, 40)}
                  </Link>
                </li>
              );
            })}
          </motion.ul>
        )}
      </motion.div>
    </motion.form>
  );
}
