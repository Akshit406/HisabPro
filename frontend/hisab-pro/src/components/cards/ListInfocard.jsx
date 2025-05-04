import React from 'react';
import { LuUtensils } from 'react-icons/lu';
import { MdDeleteOutline } from 'react-icons/md';

const ListInfocard = ({
  title,
  icon,
  date,
  amount,
  quantity,
  hideDeletebtn,
  onDelete,
  onClick,
}) => {
  return (
    <div
      className="relative flex items-center gap-4 mt-3 p-4 rounded-2xl hover:bg-gray-50 border border-gray-200 shadow-sm cursor-pointer transition-all"
      onClick={onClick}
    >
      <div className="w-12 h-12 flex items-center justify-center text-xl text-white bg-gradient-to-tr from-indigo-500 to-blue-500 rounded-full shadow">
        {icon ? (
          <img src={icon} alt="icon" className="w-6 h-6 object-contain" />
        ) : (
          <LuUtensils />
        )}
      </div>

      <div className="flex flex-col flex-grow text-left">
        <h6 className="text-base font-semibold text-gray-800">{title}</h6>
        <p className="text-xs text-gray-500">{date}</p>
      </div>

      <div className="text-right mr-3">
        <h6 className="text-sm font-bold text-gray-900">x {quantity}</h6>
        <p className="text-sm text-gray-600">₹ {amount}</p>
      </div>

      {!hideDeletebtn && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="text-red-500 hover:text-white hover:bg-red-500 p-2 rounded-md transition-all duration-200"
        >
          <MdDeleteOutline size={20} />
        </button>
      )}
    </div>
  );
};

export default ListInfocard;
