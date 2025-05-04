import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import ListInfocard from '../Cards/ListInfocard'
import moment from 'moment'


const RecentStocks = ({stocks, onSeeMore}) => {
  return (
    <div>
      <div className='card'>
            <div className="flex items-center justify-between">
              <h5 className='text-lg'>Recent Stocks</h5>
      
              <button className='card-btn' onClick={onSeeMore}>
                  See All <LuArrowRight className='text-base'/>
              </button>
            </div>
      
            <div className="mt-6">
              {stocks?.slice(0,5)?.map((item) => (
                  <ListInfocard
                      key={item._id}
                      title={item.itemName}
                      icon={item.icon}
                      date={moment(item.date).format("DD MMM YYYY")}
                      amount={item.quantity * item.price}
                      quantity={item.quantity}
                      
                      hideDeletebtn
                  />
              ))}
            </div>
          </div>
    </div>
  )
}

export default RecentStocks
