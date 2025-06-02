"use client";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function Login() {
  return (
    <Link
      className="text-body-mobile md:text-body-tablet lg:text-body-desktop text-center border-2 border-textsc rounded-md py-1 px-3 md:py-2 md:px-5 lg:py-4 lg:px-6 hover:drop-shadow-md hover:drop-shadow-btnBorter duration-200"
      href={`${process.env.NEXT_PUBLIC_API_URL}/auth/google`}
    >
      <FontAwesomeIcon
        className="text-body-mobile md:text-body-tablet lg:text-body-desktop"
        icon={faGoogle}
      />
      <span className="inline-block pl-2">Login</span>
    </Link>
  );
}
