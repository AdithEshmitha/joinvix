import { useState } from "react";
import { HiMenuAlt1, HiX } from "react-icons/hi";
import { MdOutlineAnalytics, MdEditSquare } from "react-icons/md";
import { FaClockRotateLeft } from "react-icons/fa6";
import { IoMdLogOut } from "react-icons/io";
import { SiSimpleanalytics } from "react-icons/si";
import { Link, useLocation, useNavigate } from "react-router-dom";

const SideBar = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const [mobileOpen, setMobileOpen] = useState(false);

    const sideLinks = [
        { name: "Dashboard", path: "/", icon: <MdOutlineAnalytics /> },
        { name: "Channels", path: "/channels", icon: <SiSimpleanalytics /> },
        { name: "Pending Channels", path: "/pending-channels", icon: <FaClockRotateLeft /> },
        { name: "Manage Channels", path: "/manage-channels", icon: <MdEditSquare /> },
    ];

    return (
        <>
            {/* ============ MOBILE SIDEBAR ============ */}
            <div className="flex flex-col w-16 items-center py-10 md:hidden shrink-0 border-r border-text/10 bg-white">
                <HiMenuAlt1
                    onClick={() => setMobileOpen(true)}
                    className="text-text text-2xl font-semibold cursor-pointer"
                />
                <ul className="mt-10 w-full flex flex-col border-t border-text/10">
                    {sideLinks.map((link, index) => {
                        const isActive = location.pathname === link.path;
                        return (
                            <Link
                                to={link.path}
                                className={`py-6 text-xl text-text flex items-center justify-center transition-all duration-300 hover:bg-gray-100 w-full ${isActive ? "bg-gray-100" : ""
                                    }`}
                                key={index}
                            >
                                {link.icon}
                            </Link>
                        );
                    })}
                </ul>
            </div>

            {/* ============ MOBILE OVERLAY ============ */}
            <div
                onClick={() => setMobileOpen(false)}
                className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
            />

            {/* ============ MOBILE SLIDE PANEL ============ */}
            <div
                className={`fixed top-0 left-0 h-screen w-72 bg-white shadow-2xl z-50 md:hidden transform transition-transform duration-300 ease-in-out flex flex-col ${mobileOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex items-center justify-between px-5 py-5 border-b border-text/10 shrink-0">
                    <h1 className="text-text font-semibold tracking-widest text-xl">
                        JOIN<span className="text-green-shade">VIX.</span>
                    </h1>
                    <button
                        onClick={() => setMobileOpen(false)}
                        className="p-2 rounded-lg hover:bg-gray-100"
                    >
                        <HiX className="text-2xl text-gray-700" />
                    </button>
                </div>

                <div className="flex flex-col flex-1 overflow-hidden">

                    <ul className="w-full flex flex-col flex-1 overflow-y-auto border-t border-text/10">
                        {sideLinks.map((link, index) => {
                            const isActive = location.pathname === link.path;
                            return (
                                <Link
                                    to={link.path}
                                    onClick={() => setMobileOpen(false)}
                                    className={`py-5 px-6 text-[16px] text-text flex items-center gap-3 transition-all duration-300 hover:bg-gray-100 w-full ${isActive ? "bg-gray-100" : ""
                                        }`}
                                    key={index}
                                >
                                    <span className="text-xl">{link.icon}</span>
                                    {link.name}
                                </Link>
                            );
                        })}
                    </ul>

                    <div className="w-full shrink-0 px-1 flex flex-col mt-auto gap-0.5 pt-5 border-t border-text/10">
                        <div className="flex items-center gap-2.5 bg-gray-50 w-full rounded border border-text/5 p-3">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex justify-center items-center text-xl text-green-800">
                                A
                            </div>
                            <span className="text-text tracking-wide text-sm">
                                Administrator
                                <p className="line-clamp-1 text-xs text-text/50">
                                    aditheshmitha2008@gmail.com
                                </p>
                            </span>
                        </div>
                        <button className="w-full text-[15px] cursor-pointer text-red-400 hover:text-red-500 hover:bg-red-100/80 tracking-wide gap-1 bg-red-50 transition-all duration-300 flex items-center justify-center py-4 border border-red-100">
                            <IoMdLogOut className="text-xl" />
                            Logout
                        </button>
                    </div>

                </div>
            </div>

            {/* ============ DESKTOP SIDEBAR ============ */}
            <div className="w-80 bg-white hidden md:flex flex-col h-screen border-r border-text/10 shrink-0">
                {/* Logo */}
                <div className="w-full p-5 flex justify-center items-center text-2xl shrink-0">
                    <h1 className="text-text font-semibold tracking-widest">
                        JOIN<span className="text-green-shade">VIX.</span>
                    </h1>
                </div>

                <ul className="w-full flex flex-col flex-1 overflow-y-auto border-t border-text/10">
                    {sideLinks.map((link, index) => {
                        const isActive = location.pathname === link.path;
                        return (
                            <Link
                                to={link.path}
                                className={`py-6 px-10 text-[17px] text-text flex items-center justify-start gap-2 transition-all duration-300 hover:bg-gray-100 w-full ${isActive ? "bg-gray-100" : ""
                                    }`}
                                key={index}
                            >
                                <span className="text-xl">{link.icon}</span>
                                {link.name}
                            </Link>
                        );
                    })}
                </ul>

                <div className="w-full shrink-0 px-1 flex flex-col gap-0.5 pt-5 border-t border-text/10">
                    <div className="flex items-center gap-2.5 bg-gray-50 w-full rounded border border-text/5 p-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex justify-center items-center text-xl text-green-800">
                            A
                        </div>
                        <span className="text-text tracking-wide text-[15px]">
                            Administrator
                            <p className="line-clamp-1 text-xs text-text/50">
                                aditheshmitha2008@gmail.com
                            </p>
                        </span>
                    </div>
                    <button
                        onClick={() => {
                            localStorage.removeItem('admin_token')
                            navigate('/login')
                        }}
                        className="w-full text-[16px] cursor-pointer text-red-400 hover:text-red-500 hover:bg-red-100/80 tracking-wide gap-1 bg-red-50 transition-all duration-300 flex items-center justify-center py-4 border border-red-100">
                        <IoMdLogOut className="text-xl" />
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
};

export default SideBar;