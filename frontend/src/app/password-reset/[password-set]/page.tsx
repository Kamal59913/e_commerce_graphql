"use client";
import React, { useEffect, useState } from "react";
import { setCookie } from "cookies-next";
import PasswordReset from "@/components/password-reset/password-reset";
import { useParams } from "next/navigation";


export default function Page() {
  const params = useParams();
  const slug = params['password-set'];
  const token = slug.toString();

  console.log("here is the token", token)
  useEffect(() => {
    setCookie("tingtoken", token);
    console.log("token", token)
  }, [token]);
  return <PasswordReset/>;
}
