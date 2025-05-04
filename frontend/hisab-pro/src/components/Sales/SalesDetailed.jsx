import React from 'react'
import DashboardLayout from '../Layouts/DashboardLayout'
import { IoMdArrowRoundBack } from "react-icons/io";


import { useLocation, useNavigate } from 'react-router-dom';
import SalesColumn from './SalesColumn';
import moment from 'moment';

const SalesDetailed = () => {
    const location = useLocation();
    const { sale } = location.state || {};
    const navigate = useNavigate();


  return (
    <DashboardLayout activeMenu="Sales">
        <div className='card mt-4'>

            <div className='flex items-center  '>
                <button onClick={() => navigate("/sales")} className='  text-sm font-medium text-white text-left bg-violet-500 shadow-lg shadow-purple-600/5 p-[10px] mb-0 rounded-full my-1 hover:bg-purple-600/15 hover:text-purple-600;'><IoMdArrowRoundBack /></button>

                <h6 className='self-center text-lg  ml-[4%] '>Detailed Sales info</h6>
                
            </div>

            <div className='mt-6'>
                <SalesColumn 
                    label="Item name"
                    field={sale.itemName}
                />

                <SalesColumn 
                    label="Item Id"
                    field={sale.itemId}
                />

                <SalesColumn 
                    label="Bought By"
                    field={sale.customerName}
                />
                <SalesColumn 
                    label="Amount bought"
                    field={sale.quantitySold}
                />
                <SalesColumn 
                    label="Price per unit"
                    field={sale.pricePerUnit}
                />
                <SalesColumn 
                    label="Total Revenue"
                    field={sale.totalAmount}
                />


                <SalesColumn 
                    label="Category"
                    field={sale.category}
                />

                <SalesColumn 
                    label="Date of sale"
                    field={moment(sale.dateOfSale).format("DD MMM YYYY")}
                    
                />


                    
            </div>

        </div>
    </DashboardLayout>
  )
}

export default SalesDetailed
