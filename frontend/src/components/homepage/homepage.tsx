"use client"
import React from 'react'
import ChartOne from '../Charts/ChartOne'
import ChartTwo from '../Charts/ChartTwo'
import ChartThree from '../Charts/ChartThree'
import TableOne from '../Tables/TableOne'
import ChatCard from '../Chat/ChatCard'
import CategoryCards from '../CategoryCards'

export default function Homepage() {
  return (
    <>
    {/* Sports and Outdoors */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-6 2xl:gap-7.5">
        <CategoryCards title="Exercise Equipment" image='https://res.cloudinary.com/dkoh04jmq/image/upload/v1718628243/exercise_equipment_bgyfxi.jpg'/>
        <CategoryCards title="Outdoor Gear" image='https://res.cloudinary.com/dkoh04jmq/image/upload/v1718627844/Outdoor_gear_pgoh9n.jpg'/>
        <CategoryCards title="Sports Apparel" image='https://res.cloudinary.com/dkoh04jmq/image/upload/v1718627843/sports_apparel_titdxp.jpg'/>
        <CategoryCards title="Cycling Gear" image='https://res.cloudinary.com/dkoh04jmq/image/upload/v1718627843/cycling_gear_v6lu75.jpg'/>
        <CategoryCards title="Fishing Equipment" image='https://res.cloudinary.com/dkoh04jmq/image/upload/v1718627843/fishing_equipment_e56jit.jpg'/>
        <CategoryCards title="Water Sports" image='https://res.cloudinary.com/dkoh04jmq/image/upload/v1718627844/water_sports_sfgnyy.jpg'/>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        {/* <MapOne /> */}
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
      </div>
    </>
)
}
