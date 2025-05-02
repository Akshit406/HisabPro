import { LuHandCoins, LuHouse, LuLayoutDashboard, LuLogOut } from "react-icons/lu";


// data for sidebar 
export const SIDE_BAR_DATA = [
    {
        id: "01",
        label: "Dashboard",
        icon: LuLayoutDashboard,
        path: "/dashboard"
    },

    {
        id: "02",
        label: "Inventory",
        icon: LuHouse,
        path: "/inventory"
    },

    {
        id: "03",
        label: "Sales",
        icon: LuHandCoins,
        path: "/sales"
    },

    {
        id: "06",
        label: "Logout",
        icon: LuLogOut,
        path: "logout"
    }
]