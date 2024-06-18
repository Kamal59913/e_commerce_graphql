import React from 'react'
import WishListCards from '../WishListCards'

import ProductsCategory from '../ProductCards'

export default function WishList() {
  return (
        <div className="mx-auto grid items-center space-y-4 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4 xl:px-40 dark:bg-slate-800">
        <WishListCards 
        title='Nike Airmax v2' 
        image='https://images.unsplash.com/photo-1588099768523-f4e6a5679d88?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NHwxMTM4MTU1NXx8ZW58MHx8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60' 
        description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, debitis?'
        price='2000'
        url='view-product'
        />
                <WishListCards 
        title='Nike Airmax v2' 
        image='https://images.unsplash.com/photo-1588099768523-f4e6a5679d88?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NHwxMTM4MTU1NXx8ZW58MHx8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60' 
        description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, debitis?'
        price='2000'
        url='view-product'
        />
                <WishListCards 
        title='Nike Airmax v2' 
        image='https://images.unsplash.com/photo-1588099768523-f4e6a5679d88?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NHwxMTM4MTU1NXx8ZW58MHx8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60' 
        description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, debitis?'
        price='2000'
        url='view-product'
        />
                <WishListCards 
        title='Nike Airmax v2' 
        image='https://images.unsplash.com/photo-1588099768523-f4e6a5679d88?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NHwxMTM4MTU1NXx8ZW58MHx8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60' 
        description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, debitis?'
        price='2000'
        url='view-product'
        />
                <WishListCards 
        title='Nike Airmax v2' 
        image='https://images.unsplash.com/photo-1588099768523-f4e6a5679d88?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NHwxMTM4MTU1NXx8ZW58MHx8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60' 
        description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, debitis?'
        price='2000'
        url='view-product'
        />
    </div>
  )
}
