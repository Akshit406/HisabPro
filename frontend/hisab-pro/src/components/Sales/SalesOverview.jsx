import React from 'react';
import ListInfocard from '../Cards/ListInfocard';
import { LuDownload, LuPlus } from 'react-icons/lu';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const SalesOverview = ({ sales, onAddIncome, onDelete,onDownload }) => {
  
  const navigate = useNavigate();

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg pl-2">All Sales</h5>

        <div className="flex items-center gap-3">
          <button className="card-btn" onClick={onAddIncome}>
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
        {sales?.map((item) => (
          <ListInfocard
            key={item._id}
            title={item.itemName}
            icon={item.icon}
            date={moment(item.date).format('DD MMM YYYY')}
            amount={item.totalAmount}
            quantity={item.quantitySold}
            onClick={() => navigate(`/sales/${item._id}`, { state: { sale: item } })}
            onDelete={() => onDelete(item._id)}
            hideDeletebtn={false}
          />
        ))}
      </div>
    </div>
  );
};

export default SalesOverview;
