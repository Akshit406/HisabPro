import React from 'react';
import ListInfocard from '../Cards/ListInfocard';
import { LuDownload, LuPlus } from 'react-icons/lu';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const InventoryOverview = ({ inventory, onAddStocks, onDelete,onDownload }) => {
  
  const navigate = useNavigate();

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg pl-2">All Stock</h5>

        <div className="flex items-center gap-3">
          <button className="card-btn" onClick={onAddStocks}>
          <p className="hidden md:block">Add more</p>
          <LuPlus className="text-lg" />
          </button>

          <button
            className="add-button-fill flex items-center gap-3 text-[12px] font-medium text-gray-700 hover:text-purple-500 bg-gray-50 hover:bg-purple-50 px-4 py-1.5 rounded-lg border border-gray-200/50 cursor-pointer shadow transition duration-200"
            onClick={onDownload}
          >
            <LuDownload className="text-lg" />
            <p className="hidden md:block">Download</p>
          </button>
        </div>
      </div>


      <div className="mt-6">
        {inventory?.map((item) => (
          <ListInfocard
            key={item._id}
            title={item.itemName}
            icon={item.icon}
            date={moment(item.date).format('DD MMM YYYY')}
            amount={item.quantity * item.price}
            quantity={item.quantity}
            onClick={() => navigate(`/inventory/${item._id}`, { state: { inventory: item } })}
            onDelete={() => onDelete(item._id)}
            hideDeletebtn={false}
          />
        ))}
      </div>
    </div>
  );
};

export default InventoryOverview;
