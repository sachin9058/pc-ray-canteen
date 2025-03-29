"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

const RegisterUser = () => {
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn) {
      fetch("/api/user/register", { method: "POST" });
    }
  }, [isSignedIn]);

  return null;
};

export default RegisterUser;
