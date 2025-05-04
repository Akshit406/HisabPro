import React from 'react'
import DashboardLayout from '../Layouts/DashboardLayout'
import { IoMdArrowRoundBack } from "react-icons/io";


import { useLocation, useNavigate } from 'react-router-dom';

import moment from 'moment';
import InventoryColumn from './InventoryColumn';

const InventoryDetailed = () => {
    const location = useLocation();
    const { inventory } = location.state || {};
    const navigate = useNavigate();


  return (
    <DashboardLayout activeMenu="Inventory">
        <div className='card mt-4'>

            <div className='flex items-center  '>
                <button onClick={() => navigate("/inventory")} className='  text-sm font-medium text-white text-left bg-violet-500 shadow-lg shadow-purple-600/5 p-[10px] mb-0 rounded-full my-1 hover:bg-purple-600/15 hover:text-purple-600;'><IoMdArrowRoundBack /></button>

                <h6 className='self-center text-lg  ml-[4%] '>Detailed Inventory info</h6>
                
            </div>

            <div className='mt-6'>
                <InventoryColumn
                    label="Item name"
                    field={inventory.itemName}
                />

                <InventoryColumn
                    label="Item Id"
                    field={inventory._Id}
                />

                <InventoryColumn
                    label="Quanity present"
                    field={inventory.quantity}
                />
              
                <InventoryColumn
                    label="Price per unit"
                    field={inventory.price}
                />
               
                <InventoryColumn
                    label="Date of inventory"
                    field={moment(inventory.createdAt).format("DD MMM YYYY")}
                    
                />


                    
            </div>

        </div>
    </DashboardLayout>
  )
}

export default InventoryDetailed;
