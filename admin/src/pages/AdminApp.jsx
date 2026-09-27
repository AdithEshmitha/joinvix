import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

const AdminApp = () => {
    return (
        <div className="h-screen bg-background flex overflow-hidden">
            <SideBar />
            <main className="flex-1 min-w-0 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminApp;