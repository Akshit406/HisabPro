import React from 'react'
import { RiSeparator } from 'react-icons/ri'

const SalesColumn = ({label, field}) => {
  return (
    <div>
      <div className=" relative flex-row items-center gap-4 mt-2 p-4 rounded-lg hover:bg-gray-100/60 border border-gray-200">

                <div className="flex flex-row flex-grow justify-between w-full px-4 ">
                      <h6 className="text-base  text-left block  text-gray-800">{label}</h6>
                      <div className="absolute left-1/2 transform -translate-x-1/2">
                        <RiSeparator className="text-gray-400" />
                    </div>
                      <h6 className="text-base  text-right font-medium text-gray-800">{field}</h6>
                </div>
                    
        </div>
    </div>
  )
}

export default SalesColumn
