"use client"
import Link from "next/link";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { getCookie, setCookie, deleteCookie } from "cookies-next";
import { schema } from "./SchemaValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormValues } from "./types";
import { useMutation } from "@apollo/client";
import VERIFY_OTP from '../../graphql/mutations/VERIFY_OTP.graphql'
import { permanentRedirect, redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { MuiOtpInput } from "mui-one-time-password-input";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



const OtpVerification: React.FC = () => {

  const router = useRouter();
  const [iseVerified, setIsVerified] = useState(false)

  useEffect(()=> {
    if(iseVerified) {
        redirect('/dashboard')
    }
  },[iseVerified, router])
  const meData = useSelector((state: { meData: any}) => state.meData)
  console.log(meData, "Here is the user's data")
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
      defaultValues: {
        otp: "",
  },
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(schema)
  })

  const [VerifyOtp, { data, loading, error }] = useMutation(VERIFY_OTP);

  let emailtosend = 'kamallochan.boruah@qualhon.com'
  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    const OtpVerificationResponse = await VerifyOtp({
        variables: {
          input: {
            email: meData?.ME?.email,
            otp: formData.otp ? formData.otp : null 
          }
        }
    })
    if(OtpVerificationResponse.data.verifyOtp.errors) {
      const errors = OtpVerificationResponse.data.verifyOtp.errors;
    if (errors && errors.length > 0) {
        errors.forEach((error: any) => {
            if (error.code =="OTP_EXPIRED") {
                toast.error(error.message, {
                    position: "top-center"
                });
            }
        });
    }
    }
    if(OtpVerificationResponse.data.verifyOtp.success == true) {
        toast.success("OTP verified successfully", {
          position: "top-center"
        })
        setTimeout(() => {
          setIsVerified(true);
        }, 2000);    }
  };
console.log(iseVerified, "has verified or not")
  useEffect(() => {
    if (otp) {
      console.log('OTP:', otp);
    }
  }, [otp]);
  
  return (
    <section className='h-screen'>
      <ToastContainer/>
        <div className="grid grid-cols-1 lg:grid-cols-2"> 
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
            Please Enter The OTP
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Go back to <Link href="/login"> <span className="font-semibold text-black transition-all duration-200 hover:underline">Login Page !{" "}</span></Link>
            </p>

          <p className="mt-2 text-sm text-gray-600">
            An OTP has been sent to <strong>{meData && meData.ME.email}.  </strong>
          </p>

          <form action="#" method="POST" className="mt-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-5">

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="" className="text-base font-medium text-gray-900">
                    {" "}
                    OTP{" "}
                  </label>
                </div>
                <div className="mt-2 flex gap-4 w-[300px]">
                <Controller
                    name="otp"
                    control={control}
                    rules={{ validate: (value) => value.length === 4 }}
                    render={({ field, fieldState }) => (
                      <>
                        <MuiOtpInput sx={{ gap: 1 }} {...field} length={4} />
                      </>
                    )}
                  />
                </div>
                {errors.otp && ( <p className='text-[#FF5733] text-xs  pt-2'>
                      {errors.otp.message}
                    </p>
                  )} 
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
                  Confirm OTP{" "}
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
  </section>
  
  );
}

export default OtpVerification;