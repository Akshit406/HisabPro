import React, { useState } from 'react'
import Input from '../Inputs/Input';

const AddInventoryForm = ({ onAddStocks }) => {

  const [inventoryForm, setInventoryForm] = useState({
    
    itemName :"", icon:"", quantity:"", price:"", category:""
  });

  const handleChange = (key, value) => {
    setInventoryForm({ ...inventoryForm, [key]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // ✅ Prevent page reload
    onAddStocks(inventoryForm);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        value={inventoryForm.itemId}
        onChange={({ target }) => handleChange("itemName", target.value)}
        label="Item name"
        placeholder=""
        type="text"
      />
      <Input
        value={inventoryForm.customerName}
        onChange={({ target }) => handleChange("icon", target.value)}
        label="Icon"
        placeholder=""
        type="text"
      />
      <Input
        value={inventoryForm.quantitySold}
        onChange={({ target }) => handleChange("price", target.value)}
        label="Price"
        placeholder=""
        type="text"
      />
      <Input
        value={inventoryForm.quantitySold}
        onChange={({ target }) => handleChange("category", target.value)}
        label="Category"
        placeholder=""
        type="text"
      />
      <div className='w-full flex justify-center'>
        <button
          type='submit'
          className='add-button add-button-fill'
        >
          Add Stocks
        </button>
      </div>
    </form>
  );
};

export default AddInventoryForm;
