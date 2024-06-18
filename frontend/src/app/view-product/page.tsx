"use client"
import React, { useState } from 'react'
import ViewProduct from '@/components/viewproduct/ViewProduct'
import Header from '@/components/Header'

export default function page() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
    <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
    <ViewProduct/>
    </>
)
}
