"use client";
import { useEffect } from "react";

export default function LoginSuccessFullPage() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      window.localStorage.setItem("token", token);
      // window.location.href = "./";
    }
  }, []);
  return <div>Login Success </div>;
}
