import React, { useState } from 'react'
import Input from '../Inputs/Input';

const AddSalesform = ({ onAddSales }) => {

  const [salesForm, setSalesForm] = useState({
    itemId: "",
    customerName: "",
    quantitySold: ""
  });

  const handleChange = (key, value) => {
    setSalesForm({ ...salesForm, [key]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // ✅ Prevent page reload
    onAddSales(salesForm);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        value={salesForm.itemId}
        onChange={({ target }) => handleChange("itemId", target.value)}
        label="Item ID"
        placeholder=""
        type="text"
      />
      <Input
        value={salesForm.customerName}
        onChange={({ target }) => handleChange("customerName", target.value)}
        label="Customer name"
        placeholder=""
        type="text"
      />
      <Input
        value={salesForm.quantitySold}
        onChange={({ target }) => handleChange("quantitySold", target.value)}
        label="Quantity sold"
        placeholder=""
        type="text"
      />
      <div className='w-full flex justify-center'>
        <button
          type='submit'
          className='add-button add-button-fill'
        >
          Add Sale
        </button>
      </div>
    </form>
  );
};

export default AddSalesform;
