import React, { useEffect, useState } from 'react'
import DashboardLayout from '../components/Layouts/DashboardLayout'
import SalesOverview from '../components/Sales/SalesOverview'
import axiosInstance from '../utils/axiosInstance'
import { API_PATHS } from '../utils/apiPaths'
import Modal from '../components/Modal/Modal'
import AddSalesform from '../components/Sales/AddSalesform'
import { toast } from 'react-hot-toast';
import DeleteModal from '../components/DeleteModal/DeleteModal'
import { userUserAuth } from '../hooks/userUserAuth'

const Sales = () => {
  
  userUserAuth();

  const [salesData, setSalesData] = useState([]);
  const [loading, setloading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  })
  const [openAddSalesModal, setOpenAddSalesModal] = useState(false);

  // fetch sales data from api
  const fetchSalesData = async () =>{
    if (loading)  return;

    try {
      const response = await axiosInstance.get(API_PATHS.SALES.GET_SALES);
      if(response.data) {
        setSalesData(response.data);
      }
    } catch (error) {
      console.log('Something went wrong', error);
    } finally {
      setloading(false);
    }
  }

  //handles add income
  const handleAddSales = async (salesData) => {
    const {itemId, customerName, quantitySold} = salesData;

    //validation check
   
    if(!itemId || !customerName || quantitySold) {
      toast.error("All fields are required")
    }

    if(!quantitySold || isNaN(quantitySold) || Number(quantitySold) <= 0) {
      toast.error("Quantity sold must be a valid number greater than zero")
    }

    if(loading) return;

    try {
      await axiosInstance.post(API_PATHS.SALES.CREATE, {
        itemId,
        customerName,
        quantitySold
      })

      setOpenAddSalesModal(false);
      toast.success("Sale added successfully. ")
      fetchSalesData();
    } catch(error) {
      console.error("Error adding income: ", error?.response?.data?.message || error.message);
    }
  }

  // handle delete
  const handleDeleteSale = async (itemId) => {
    if (loading) return;
    if (!itemId) {
      toast.error("Invalid sale ID");
      return;
    }
  
    setloading(true);
    try {
      await axiosInstance.delete(API_PATHS.SALES.DELETE(itemId));
      toast.success("Sale deleted successfully");
      fetchSalesData(); 
      setOpenDeleteAlert({ show: false, data: null }); // close modal
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete sale");
    } finally {
      setloading(false);
    }
  };
  
  // handle download sales
  const handleDownloadSales = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SALES.DOWNLOAD_SALES, {
        responseType: "blob", // Receive the file as a Blob
      });
  
      // Use file-saver to trigger download
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      
      saveAs(blob, "sales_details.xlsx");
      toast.success("Sales data downloaded successfully!");
    } catch (error) {
      console.error("Error downloading sales details: ", error);
      toast.error("Failed to download sales details, please try again later.");
    }
  };

  

  useEffect(() => {
    fetchSalesData();
  }, [])
  return (
    <div>
      <DashboardLayout activeMenu="Sales" >
        <div className="my-5 mx-auto">
          <div className="grid grid-cols-1 gap-6">
            <div className=""> 
              <SalesOverview
                sales = {salesData}
                onAddIncome = {() => setOpenAddSalesModal(true)}
                onDelete = {(id) => setOpenDeleteAlert({ show: true, data:id})}
                onDownload={handleDownloadSales}

              />
            </div>
          </div>

          <Modal 
            isOpen = {openAddSalesModal}
            onClose = {() => setOpenAddSalesModal(false)}
            title = "Add Sale" >
              <AddSalesform onAddSales={handleAddSales} />
            </Modal>
        </div>

        <Modal 
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show:false, data: null})}
          title="Delete Sale"
        >
          <DeleteModal
            content="Are you sure you want to delete this sales detail? "
            onDelete={() => handleDeleteSale(openDeleteAlert.data)} />
        </Modal>

        
      </DashboardLayout>
    </div>
  )
}

export default Sales
