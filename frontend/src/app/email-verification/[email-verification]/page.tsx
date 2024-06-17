"use client";
import React, { useEffect, useState } from "react";
import PasswordReset from "@/components/password-reset/password-reset";

import IS_VERIFIED from "../../../graphql/mutations/IS_VERIFIED.graphql"
import Verificationpage from "@/components/verification/verificationpage";
import { useMutation } from "@apollo/client";
import { setCookie } from "cookies-next";
import { useParams } from 'next/navigation';


export default function Page() {
  const params = useParams();
  const slug = params['email-verification'];
  const token = slug.toString();

  const [createUser, { data, loading, error }] = useMutation(IS_VERIFIED);
  console.log("here is the token", token)
  useEffect(() => {
    setCookie("token", token);
    console.log("token", token)
    createUser();
  }, [token]);
  return <Verificationpage/>;
}
