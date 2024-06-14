"use client";
import React, { useEffect, useState } from "react";
import PasswordReset from "@/components/password-reset/password-reset";

import IS_VERIFIED from "../../../graphql/mutations/IS_VERIFIED.graphql";
import { useMutation } from "@apollo/client";
import { setCookie } from "cookies-next";

export default function Page() {
  const [createUser, { data, loading, error }] = useMutation(IS_VERIFIED);
  useEffect(() => {
    const currentUrl = window.location.href;

    const token = currentUrl.split("/password-reset/")[1];
    console.log(token)

    setCookie("token", token);
    createUser();
  }, []);
  return <h1>verified</h1>;
}
