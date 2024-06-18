"use client"
import React, { useState } from 'react'
import WishList from '@/components/wish-list/WishList'
import Header from '@/components/Header'

export default function page() {
const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>        
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <WishList/>
    </>
    )
}
