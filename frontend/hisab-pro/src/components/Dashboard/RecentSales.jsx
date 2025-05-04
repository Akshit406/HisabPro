import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import ListInfocard from '../Cards/ListInfocard'
import moment from "moment";

const RecentSales = ({sales, onSeeMore}) => {
  return (
    <div className='card'>
      <div className="flex items-center justify-between">
        <h5 className='text-lg'>Recent Sales</h5>

        <button className='card-btn' onClick={onSeeMore}>
            See All <LuArrowRight className='text-base'/>
        </button>
      </div>

      <div className="mt-6">
        {sales?.slice(0,5)?.map((item) => (
            <ListInfocard
                key={item._id}
                title={item.itemName}
                icon={item.icon}
                date={moment(item.date).format("DD MMM YYYY")}
                amount={item.totalAmount}
                quantity={item.quantitySold}
                hideDeletebtn
            />
        ))}
      </div>
    </div>
  )
}

export default RecentSales
