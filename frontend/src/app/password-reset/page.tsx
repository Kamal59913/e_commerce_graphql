"use client";
import React, { useEffect, useState } from 'react';
import SendEmail from '@/components/password-reset/send-email';
import { useParams } from 'next/navigation';
import jwt from "jsonwebtoken";

export default function Page() {
  const [tokenAuthenticated, setTokenAuthenticated] = useState(false);
  const params = useParams();
  const slug = params['password-set'];
  const token = slug ? slug.toString() : '';

  return (
    <SendEmail/>
  );
}
