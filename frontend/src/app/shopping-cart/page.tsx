"use client"
import React, { useState } from 'react'
import ShoppingCart from '@/components/shopping-cart/ShoppingCart'
import Header from '@/components/Header'

export default function page() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className='h-screen dark:bg-slate-800'>
    <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
    <ShoppingCart/>
    </div>
  )
}
