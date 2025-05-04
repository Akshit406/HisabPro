import React from 'react'
import HorizontalBarChart from '../Charts/HorizontalBarChart'

const TopItemsSold = ({data}) => {
  return (
    <div className="card lg:col-span-2">
      <h2 className="text-lg mb-4 text-left">Top Items Sold (Last 30 Days)</h2>
      <HorizontalBarChart data={data} />
    </div>
    )
}

export default TopItemsSold
