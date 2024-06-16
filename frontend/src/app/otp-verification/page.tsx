"use client"
import React from 'react'
import OtpVerification from '@/components/otp-page/otp_verification'
import Auth from '@/components/AuthWrapper/AuthWrapper'

export default function page() {
  return (
    <Auth>
    <OtpVerification/>
    </Auth>
  )
}
