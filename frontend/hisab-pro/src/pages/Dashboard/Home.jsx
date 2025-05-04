
import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/Layouts/DashboardLayout'
import { userUserAuth } from '../../hooks/userUserAuth';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import InfoCard from '../../components/Cards/InfoCard';
import { addThousandSeparator } from '../../utils/helper';
import { LuHouse, LuIndianRupee, LuTrophy } from 'react-icons/lu';
import RecentSales from '../../components/Dashboard/RecentSales';
import OverviewSection from '../../components/Dashboard/OverviewSection';
import RecentStocks from '../../components/Dashboard/RecentStocks';
import RevenueShareChart from '../../components/Charts/RevenueShareChart';
import TopItemsSold from '../../components/Dashboard/TopItemsSold';


const Home = () => {
  userUserAuth();  // Ensures user is authenticated

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUserData = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<LuHouse />}
            label="Total inventory value"
            value={`₹ ${addThousandSeparator(dashboardData?.currentInventoryValue)}`}
            color="bg-primary"
            />

           <InfoCard
            icon={<LuIndianRupee />}
            label="Total sales value"
            value={`₹ ${addThousandSeparator(dashboardData?.totalRevenue)}`}
            color="bg-red-500"
            />

            <InfoCard
            icon={<LuTrophy />}
            label="Best Selling Item"
            value={dashboardData?.bestSellingItem}
            color="bg-yellow-500"
            />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-6'>
          <RecentSales
            sales = {dashboardData?.recentSales}
            onSeeMore={() => navigate("/sales")}
          />

          <OverviewSection 
            stocked30Days = {dashboardData?.stocked30Days}
            sold30Days = {dashboardData?.sold30Days}
            currentStock={dashboardData?.stocked30Days - dashboardData?.sold30Days}
          />

          <RecentStocks 
            stocks = {dashboardData?.recentStocks}
            onSeeMore={() => navigate("/inventory")}
          />

          <RevenueShareChart data={dashboardData?.revenueShare} />

          <TopItemsSold data={dashboardData?.topItemsSold} />
          

        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
