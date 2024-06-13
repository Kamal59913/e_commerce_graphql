"use client"
import React from 'react'
import ECommerceDashboard from '@/components/Dashboard/E-commerce';
import Auth from '@/components/AuthWrapper/AuthWrapper';
import DefaultLayout from '@/components/Layouts/DefaultLayout';

const page: React.FC = () => {
  return (
    <Auth>
      <DefaultLayout>
      <ECommerceDashboard/>
      </DefaultLayout>
    </Auth>
)
}

export default page
