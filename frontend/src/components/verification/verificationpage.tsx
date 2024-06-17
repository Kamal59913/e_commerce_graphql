"use client"
import React, { useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

export default function VerificationPage() {

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center p-8 rounded-lg shadow-lg">
        <p className="text-base font-semibold text-black"></p>
        <p className="mt-2 text-md font-bold tracking-tight text-black sm:text-4xl">
          Successfully Verified
        </p>
          <div className="flex items-center justify-center">
            <FaCheckCircle className="text-black-500 text-4xl my-2" />
          </div>
        <div className="mt-4 flex items-center justify-center gap-x-3">
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
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
              className="mr-2"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Go back
          </button>
          <button
            type="button"
            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Contact us
          </button>
        </div>
      </div>
    </div>
  );
}
