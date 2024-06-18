import React from 'react'
import ProductsDisplayDL from '@/components/Layouts/ProductsDisplayDL'
import ProductsDisplayPage from '@/components/products-display-page/ProductsDisplayPage'
function page() {
  return (
    <ProductsDisplayDL> 
        <ProductsDisplayPage/>
    </ProductsDisplayDL>
  )
}

export default page