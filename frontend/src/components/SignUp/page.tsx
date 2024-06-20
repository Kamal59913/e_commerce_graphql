"use client"

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getCookie, setCookie, deleteCookie } from "cookies-next";
import { passwordStrength } from "check-password-strength";
import { useMutation } from '@apollo/client'
import { SubmitHandler, useForm } from "react-hook-form";
import SIGN_UP from "../../graphql/mutations/SIGN_UP_USER.graphql"
import { schema } from "./SchemaValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormValues } from "./types";
import { redirect, useRouter } from "next/navigation";
import { useMeQuery } from "@/graphql/generated/schema";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../Loaders/Loader";
import OtpVerification from "../otp-page/otp_verification";

export default function Signup() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, serIsAuthenticated] = useState(false);

  const { data: userData } = useMeQuery({
    fetchPolicy: "network-only",
    onCompleted: () => {
      setIsLoading(false);
    }, 
    onError: () => {
      setIsLoading(false)
    },
  });

  const authuser = userData?.ME?.user

  useEffect(() => {
    if (authuser) {
      if (authuser.is_verified) {
        if (authuser.role === 'Admin') {
          router.replace('/dashboard');
        } else if (authuser.role === 'User') {
          router.replace('/homepage');
        }
      } else {
        // User is not verified, stay on login page
        router.push('/login');
      }
    } else {
      setIsLoading(false);
    }
  }, [authuser, router]);



  useEffect(() => {
    if(isAuthenticated) {
      setTimeout(() => {
        router.push('/otp-verification')
      }, 2000);
    }
}, [isAuthenticated, router])


  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullname:"",
      email: "",  
      password: "", 
    },
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
  });


    const [createUser, { data, loading, error }] = useMutation(SIGN_UP);


    /*To keep the track of password strength*/
    let [passwordstrength, setpasswordStrength] = useState('');
    const onSubmit: SubmitHandler<FormValues> = async (values) => {     
      try {
        const signupresponse = await createUser({ 
          variables: { 
            input: 
              { 
                fullname: values.fullname,
                email: values.email,
                password: values.password,
              } 
            } 
          });
        
        if(signupresponse.data.addUser.success == true) {
          toast.success("Successfully Signed Up", {
            position: "top-center",
            toastId: "randomId"
          })
        }
        const errors= signupresponse.data.addUser.errors;
        const token = signupresponse.data.addUser.token
        if(token) {
          setCookie('token', token, {
            path: '/',
          });
          console.log("Here is the token", token)
          
          serIsAuthenticated(true)
        }

        if(errors) {
          if(errors.length>0) {
            errors.map((num: any, index: any) => {
                if(num.code == "INVALID_EMAIL") {
                  toast.error(num.message, {
                    position: "top-center",
                    toastId: 'randomId'
                  });
                } 
            })
          } 
        } 
      } catch (e) {
        console.error(e);
      }
    };

    const passwordBlankSpacevalidation = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      let strenth = passwordStrength(value).value
      setpasswordStrength(strenth)
  }

  if(isLoading) {
    return <Loader/>
  }


  if(authuser) {
    return <Loader/>
  }

  
  return (
    <section>
      <ToastContainer/>
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
            Sign up
          </h2>
          <Link href="/login" className="flex flex-col">
          <p className="mt-2 text-base text-gray-600">
            Already have an account?{" "}
            <span
              className="font-medium text-black transition-all duration-200 hover:underline"
            >
              Sign In
            </span>
          </p>
          </Link>
          <form className="mt-8" onSubmit={handleSubmit(onSubmit)}  >
            <div className="space-y-5">
              <div>
              <div className="items-center justify-between">
                <label htmlFor="name" className="text-base font-medium text-gray-900">
                  {" "}
                  Fullname{" "}
                </label>  
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="First Name"
                    id="name"
                    {...register('fullname')} // Register the 'first_name' field here
                  />
                    {errors.fullname && (
                    <p className='text-[#FF5733] text-xs  pt-2'>
                    {errors.fullname.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
              <div className="flex items-center justify-between">
                <label htmlFor="email" className="text-base font-medium text-gray-900">
                  {" "}
                  Email address{" "}
                </label>
                  </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Email"
                    id="email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className='text-[#FF5733] text-xs pt-2'>
                    {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Password{" "}
                  </label>
                
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                    id="password"
                    {...register("password")}
                    // onChange={passwordBlankSpacevalidation}
                  />
                  {errors.password && (
                    <p className='text-[#FF5733] text-xs  pt-2'>
                      {errors.password.message}
                    </p>
                  )} 
                </div>
                {passwordstrength && (
                  <div className="text-sm mt-1 text-gray-500">
                    Password Strength: {passwordstrength}
                  </div>
                  )}
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Create Account{" "}
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
          <div className="mt-3 space-y-3">
            <button
              type="button"
              className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
            >
              <span className="mr-2 inline-block">
                <svg
                  className="h-6 w-6 text-rose-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                </svg>
              </span>
              Sign up with Google
            </button>
            <button
              type="button"
              className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
            >
              <span className="mr-2 inline-block">
                <svg
                  className="h-6 w-6 text-[#2563EB]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
                </svg>
              </span>
              Sign up with Facebook
            </button>
          </div>
        </div>
      </div>
      <div className="h-screen w-full">
        <img
          className="mx-auto h-full w-full rounded-md object-cover"
          src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1742&amp;q=80"
          alt=""
        />
      </div>
    </div>
  </section>
  
  );
}
