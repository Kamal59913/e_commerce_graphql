"use client"
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { getCookie, setCookie, deleteCookie } from "cookies-next";
import { schema } from "./SchemaValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormValues } from "./types";
import { useMutation } from "@apollo/client";
import LOG_IN from '../.././graphql/mutations/LOG_IN.graphql'
import { permanentRedirect, redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface PasswordResetProps {
  tokenAuthentication: boolean;
}

const PasswordReset: React.FC<PasswordResetProps> = ({tokenAuthentication}) => {

  const [isUserExist, serisUserExist] = useState(false);

  useEffect(()=> {
    if(tokenAuthentication) {
      serisUserExist(true)
    } else {
      serisUserExist(false)
    }
  })

  // const router = useRouter();
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({
      defaultValues: {
      password: "",
      confirm_password: ""
    },
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(schema)
  })

  const [PasswordResetUser, { data, loading, error }] = useMutation(LOG_IN);
  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      const PasswordResetresponse = await PasswordResetUser({
        variables: {
          input: 
            {
              password: values.password,
              confirm_password: values.confirm_password
            }
        }
      });

      console.log(PasswordResetresponse)
      const token = PasswordResetresponse.data.PasswordReset.token
      console.log(token, "here is the PasswordReset page token")
      if(token) {
        setCookie('AccessToken', token, {
          path: '/',
        });
        console.log("Here is the token", token)
              } 
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <section className='h-screen'>
      { isUserExist? (<>
        <div className="grid grid-cols-1 lg:grid-cols-2"> 
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
            Reset Password
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Go back to <Link href="/login"> <span className="font-semibold text-black transition-all duration-200 hover:underline">Login Page !{" "}</span></Link>
            </p>

          <form action="#" method="POST" className="mt-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-5">

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="" className="text-base font-medium text-gray-900">
                    {" "}
                    Password{" "}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className='text-[#FF5733] text-xs  pt-2'>
                      {errors.password.message}
                    </p>
                  )} 
                </div>
              </div>
              <div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="" className="text-base font-medium text-gray-900">
                    {" "}
                    Confirm Password{" "}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                    {...register("confirm_password")}
                  />
                  {errors.confirm_password&& (
                    <p className='text-[#FF5733] text-xs  pt-2'>
                      {errors.confirm_password.message}
                    </p>
                  )} 
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Don&#x27;t have an account?{" "} 
                <span className="font-semibold text-black transition-all duration-200 hover:underline">
                <Link href="/signup">
                  Sign-up Page
                  </Link>
                </span>
                </p>

                <button
                  type="submit"
                  className="mt-4 inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Confirm Reset{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-2"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="h-screen w-full">
        <img
          className="mx-auto h-full w-full rounded-md object-cover"
          src="https://images.unsplash.com/photo-1630673245362-f69d2b93880e?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1740&amp;q=80"
          alt=""
        />
      </div>
    </div>
      </>): (<>
        <div className="grid grid-cols-1 lg:grid-cols-2"> 
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
            Please insert your Email
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Go back to <Link href="/login"> <span className="font-semibold text-black transition-all duration-200 hover:underline">Login Page !{" "}</span></Link>
            </p>

          <form action="#" method="POST" className="mt-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-5">

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="" className="text-base font-medium text-gray-900">
                    {" "}
                    Email{" "}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className='text-[#FF5733] text-xs  pt-2'>
                      {errors.email.message}
                    </p>
                  )} 
                </div>
              </div>
              <div>
              <p className="mt-2 text-sm text-gray-600">
                Don&#x27;t have an account?{" "} 
                <span className="font-semibold text-black transition-all duration-200 hover:underline">
                <Link href="/signup">
                  Sign-up Page
                  </Link>
                </span>
                </p>

                <button
                  type="submit"
                  className="mt-4 inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Send Email Verification{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-2"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="h-screen w-full">
        <img
          className="mx-auto h-full w-full rounded-md object-cover"
          src="https://images.unsplash.com/photo-1630673245362-f69d2b93880e?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1740&amp;q=80"
          alt=""
        />
      </div>
    </div>
      </>)}

  </section>
  
  );
}

export default PasswordReset;