import React from 'react'

const DeleteModal = ({ content, onDelete}) => {
  return (
    <div>
      <p className='text-sm '>{content}</p>

      <div className="flex justify-end mt-6 ">
        <button 
            type='button'
            className='add-button add-button-fill'
            onClick={onDelete}
        >Delete</button>
      </div>
    </div>
  )
}

export default DeleteModal
