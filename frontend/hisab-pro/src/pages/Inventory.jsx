import React, { useEffect, useState } from 'react'
import DashboardLayout from '../components/Layouts/DashboardLayout'

import axiosInstance from '../utils/axiosInstance'
import { API_PATHS } from '../utils/apiPaths'
import Modal from '../components/Modal/Modal'
import AddInventoryForm from '../components/Inventory/AddInventoryForm'
import { toast } from 'react-hot-toast';
import DeleteModal from '../components/DeleteModal/DeleteModal'
import { userUserAuth } from '../hooks/userUserAuth'
import { saveAs } from "file-saver";
import InventoryOverview from '../components/Inventory/InventoryOverview'

const Inventory = () => {
  
  userUserAuth();

  const [inventoryData, setInventoryData] = useState([]);
  const [loading, setloading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  })
  const [openAddInventoryModal, setOpenAddInventoryModal] = useState(false);

  // fetch inventory data from api
  const fetchInventoryData = async () =>{
    if (loading)  return;

    try {
      const response = await axiosInstance.get(API_PATHS.INVENTORY.GET_ITEMS);
      if(response.data) {
        setInventoryData(response.data);
      }
    } catch (error) {
      console.log('Something went wrong', error);
    } finally {
      setloading(false);
    }
  }

  //handles add income
  const handleAddInventory = async (inventory) => {
    const {itemName, icon, quantity, price, category} = inventory;

    //validation check
   
    if(!itemName || !quantity || !price) {
      toast.error("Item name, Quantity and Price are required fields.")
    }

    if(!quantity || isNaN(quantity) || Number(quantity) <= 0) {
      toast.error("Quantity must be a valid number greater than zero")
    }

    if(loading) return;

    try {
      await axiosInstance.post(API_PATHS.INVENTORY.CREATE, {
        itemName, icon, quantity, price, category
      })

      setOpenAddInventoryModal(false);
      toast.success("Stock added successfully. ")
      fetchInventoryData();
    } catch(error) {
      console.error("Error adding stocks: ", error?.response?.data?.message || error.message);
    }
  }

  // handle delete
  const handleDeleteInventory= async (itemId) => {
    if (loading) return;
    if (!itemId) {
      toast.error("Invalid Inventory ID");
      return;
    }
  
    setloading(true);
    try {
      await axiosInstance.delete(API_PATHS.INVENTORY.DELETE(itemId));
      toast.success("Inventory item deleted successfully");
      fetchInventoryData(); 
      setOpenDeleteAlert({ show: false, data: null }); // close modal
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete item");
    } finally {
      setloading(false);
    }
  };
  
  // handle download inventory 
  const handleDownloadInventory = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.INVENTORY.DOWNLOAD_INVENTORY, {
        responseType: "blob", // Receive the file as a Blob
      });
  
      // Use file-saver to trigger download
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      
      saveAs(blob, "inventory_details.xlsx");
      toast.success("Inventory data downloaded successfully!");
    } catch (error) {
      console.error("Error downloading inventory details: ", error);
      toast.error("Failed to download inventory details, please try again later.");
    }
  };



  useEffect(() => {
    fetchInventoryData();
  }, [])
  return (
    <div>
      <DashboardLayout activeMenu="Inventory" >
        <div className="my-5 mx-auto">
          <div className="grid grid-cols-1 gap-6">
            <div className=""> 
              <InventoryOverview
                inventory = {inventoryData}
                onAddStocks = {() => setOpenAddInventoryModal(true)}
                onDelete = {(id) => setOpenDeleteAlert({ show: true, data:id})}
                onDownload={handleDownloadInventory}

              />
            </div>
          </div>

          <Modal 
            isOpen = {openAddInventoryModal}
            onClose = {() => setOpenAddInventoryModal(false)}
            title = "Add Inventory" >
              <AddInventoryForm onAddStocks={handleAddInventory} />
            </Modal>
        </div>

        <Modal 
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show:false, data: null})}
          title="Delete Inventory"
        >
          <DeleteModal
            content="Are you sure you want to delete this invenory item? "
            onDelete={() => handleDeleteInventory(openDeleteAlert.data)} />
        </Modal>
        
        
        
      </DashboardLayout>
    </div>
  )
}

export default Inventory;
