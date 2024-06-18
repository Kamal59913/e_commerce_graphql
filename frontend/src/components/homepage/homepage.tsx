"use client"
import React from 'react'
import CategoryCards from '../CategoryCards'
import Banner from '../Tables/Banner'
import Footer from '../footer/footer'
import SubCategoryCards from '../SubCategoryCards'

export default function Homepage() {
  return (
    <div>
    {/* Sports and Outdoors */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-6 2xl:gap-7.5">
        <CategoryCards title="Exercise Equipment" image='https://res.cloudinary.com/dkoh04jmq/image/upload/v1718628243/exercise_equipment_bgyfxi.jpg'/>
        <CategoryCards title="Outdoor Gear" image='https://res.cloudinary.com/dkoh04jmq/image/upload/v1718627844/Outdoor_gear_pgoh9n.jpg'/>
        <CategoryCards title="Sports Apparel" image='https://res.cloudinary.com/dkoh04jmq/image/upload/v1718627843/sports_apparel_titdxp.jpg'/>
        <CategoryCards title="Cycling Gear" image='https://res.cloudinary.com/dkoh04jmq/image/upload/v1718627843/cycling_gear_v6lu75.jpg'/>
        <CategoryCards title="Fishing Equipment" image='https://res.cloudinary.com/dkoh04jmq/image/upload/v1718627843/fishing_equipment_e56jit.jpg'/>
        <CategoryCards title="Water Sports" image='https://res.cloudinary.com/dkoh04jmq/image/upload/v1718627844/water_sports_sfgnyy.jpg'/>
      </div>
      <div className='mt-8'>
      <Banner/>
      </div>
      <p className="mt-8 max-w-2xl mb-4 text-2xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-4xl dark:text-white">
            Shop By Category 
      </p>   
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-5 2xl:gap-7.5">
        <SubCategoryCards title="Exercise Equipment" image='https://res.cloudinary.com/dkoh04jmq/image/upload/v1718628243/exercise_equipment_bgyfxi.jpg' link='products-page'/>
        <SubCategoryCards title="Outdoor Gear" image='https://res.cloudinary.com/dkoh04jmq/image/upload/v1718627844/Outdoor_gear_pgoh9n.jpg' link='products-page'/>
        <SubCategoryCards title="Sports Apparel" image='https://res.cloudinary.com/dkoh04jmq/image/upload/v1718627843/sports_apparel_titdxp.jpg' link='products-page'/>
        <SubCategoryCards title="Cycling Gear" image='https://res.cloudinary.com/dkoh04jmq/image/upload/v1718627843/cycling_gear_v6lu75.jpg' link='products-page'/>
        <SubCategoryCards title="Fishing Equipment" image='https://res.cloudinary.com/dkoh04jmq/image/upload/v1718627843/fishing_equipment_e56jit.jpg' link='products-page'/>
        <SubCategoryCards title="Water Sports" image='https://res.cloudinary.com/dkoh04jmq/image/upload/v1718627844/water_sports_sfgnyy.jpg' link='products-page'/>
        <SubCategoryCards title="Exercise Equipment" image='https://res.cloudinary.com/dkoh04jmq/image/upload/v1718628243/exercise_equipment_bgyfxi.jpg' link='products-page'/>
        <SubCategoryCards title="Outdoor Gear" image='https://res.cloudinary.com/dkoh04jmq/image/upload/v1718627844/Outdoor_gear_pgoh9n.jpg' link='products-page'/>
        <SubCategoryCards title="Sports Apparel" image='https://res.cloudinary.com/dkoh04jmq/image/upload/v1718627843/sports_apparel_titdxp.jpg' link='products-page'/>
        <SubCategoryCards title="Cycling Gear" image='https://res.cloudinary.com/dkoh04jmq/image/upload/v1718627843/cycling_gear_v6lu75.jpg' link='products-page'/>
        <SubCategoryCards title="Fishing Equipment" image='https://res.cloudinary.com/dkoh04jmq/image/upload/v1718627843/fishing_equipment_e56jit.jpg' link='products-page'/>
        <SubCategoryCards title="Water Sports" image='https://res.cloudinary.com/dkoh04jmq/image/upload/v1718627844/water_sports_sfgnyy.jpg' link='products-page'/>        
        <SubCategoryCards title="Exercise Equipment" image='https://res.cloudinary.com/dkoh04jmq/image/upload/v1718628243/exercise_equipment_bgyfxi.jpg' link='products-page'/>
        <SubCategoryCards title="Outdoor Gear" image='https://res.cloudinary.com/dkoh04jmq/image/upload/v1718627844/Outdoor_gear_pgoh9n.jpg' link='products-page'/>
        <SubCategoryCards title="Sports Apparel" image='https://res.cloudinary.com/dkoh04jmq/image/upload/v1718627843/sports_apparel_titdxp.jpg' link='products-page'/>
        <SubCategoryCards title="Cycling Gear" image='https://res.cloudinary.com/dkoh04jmq/image/upload/v1718627843/cycling_gear_v6lu75.jpg' link='products-page'/>
        <SubCategoryCards title="Fishing Equipment" image='https://res.cloudinary.com/dkoh04jmq/image/upload/v1718627843/fishing_equipment_e56jit.jpg' link='products-page'/>
        <SubCategoryCards title="Water Sports" image='https://res.cloudinary.com/dkoh04jmq/image/upload/v1718627844/water_sports_sfgnyy.jpg' link='products-page'/>
      </div>
      <div className='mt-14 '>
      <Footer/>
      </div>
    </div>
)
}
