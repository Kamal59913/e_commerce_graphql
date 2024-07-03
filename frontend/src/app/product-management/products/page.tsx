import React from 'react'
import ProductsList from '@/components/Products-Management/Products'
import DefaultLayout from '@/components/Layouts/DefaultLayout'

export default function page() {
  return (
    <DefaultLayout>
        <ProductsList/>
    </DefaultLayout>
  )
}
