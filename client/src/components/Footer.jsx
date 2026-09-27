import { Link } from "react-router-dom"
import { MdMarkUnreadChatAlt } from "react-icons/md"
import { FaArrowRight, FaWhatsapp } from "react-icons/fa"
import { CiFacebook, CiMail } from "react-icons/ci"

const Footer = () => {

    return (
        <footer className="bg-white border-t border-gray-200">

            {/* Main Footer */}
            <div className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-25 py-10">

                <div className="w-full">

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14">

                        <div className="lg:col-span-2">

                            <Link
                                onClick={() => {
                                    window.scrollTo({
                                        top: 0,
                                        behavior: 'smooth',
                                    });
                                }}
                                to="/"
                                className="inline-flex items-center gap-3" >
                                <div className="w-10 h-10 rounded-xl bg-green-shade flex items-center justify-center">
                                    <MdMarkUnreadChatAlt className="text-white" />
                                </div>
                                <span className="text-xl font-bold tracking-wide text-gray-900">
                                    JOINVIX
                                </span>
                            </Link>

                            <p className="mt-5 max-w-md text-sm text-gray-500 leading-7">
                                Discover interesting WhatsApp channels,
                                explore new communities, and find content
                                that matches your interests.
                            </p>


                            <div className="flex items-center gap-3 mt-6">

                                <Link
                                    to={'/'}
                                    aria-label="WhatsApp"
                                    className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-green-50 hover:text-green-shade hover:border-green-shade/30 transition-all">
                                    <FaWhatsapp className="text-xl" />
                                </Link>


                                <Link
                                    to={'/'}
                                    aria-label="Facebook"
                                    className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-green-50 hover:text-green-shade hover:border-green-shade/30 transition-all">
                                    <CiFacebook className="text-xl" />
                                </Link>


                                <Link
                                    to={'/'}
                                    aria-label="Email"
                                    className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-green-50 hover:text-green-shade hover:border-green-shade/30 transition-all">
                                    <CiMail className="text-xl" />
                                </Link>

                            </div>

                        </div>

                        <div>

                            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                                Explore
                            </h3>

                            <ul className="mt-5 space-y-3">

                                <li>
                                    <Link
                                        onClick={() => {
                                            window.scrollTo({
                                                top: 0,
                                                behavior: 'smooth',
                                            });
                                        }}
                                        to="/"
                                        className="text-sm text-gray-500 hover:text-green-shade transition">
                                        Home
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        onClick={() => {
                                            window.scrollTo({
                                                top: 0,
                                                behavior: 'smooth',
                                            });
                                        }}
                                        to="/explore"
                                        className="text-sm text-gray-500 hover:text-green-shade transition">
                                        Explore Channels
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        onClick={() => {
                                            window.scrollTo({
                                                top: 0,
                                                behavior: 'smooth',
                                            });
                                        }}
                                        to="/add-channel"
                                        className="text-sm text-gray-500 hover:text-green-shade transition">
                                        Add Your Channel
                                    </Link>
                                </li>

                            </ul>

                        </div>

                        <div>

                            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                                JOINVIX
                            </h3>

                            <ul className="mt-5 space-y-3">

                                <li>
                                    <Link
                                        to="/about"
                                        className="text-sm text-gray-500 hover:text-green-shade transition">
                                        About Us
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/contact"
                                        className="text-sm text-gray-500 hover:text-green-shade transition">
                                        Contact
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/privacy"
                                        className="text-sm text-gray-500 hover:text-green-shade transition" >
                                        Privacy Policy
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/terms"
                                        className="text-sm text-gray-500 hover:text-green-shade transition" >
                                        Terms & Conditions
                                    </Link>
                                </li>

                            </ul>

                        </div>

                    </div>

                    <div className="mt-12 p-6 sm:p-7 rounded-2xl bg-green-50 border border-green-100 flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                        <div>

                            <h3 className="text-lg font-semibold text-gray-900">
                                Have a WhatsApp channel?
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                                Add your channel to JOINVIX and reach new
                                audiences.
                            </p>

                        </div>

                        <Link
                            to="/add-channel"
                            className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-green-shade text-white text-sm font-medium hover:bg-green-700 active:scale-95 transition-all">
                            Add Your Channel

                            <FaArrowRight />

                        </Link>

                    </div>

                    <div className="mt-10 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">

                        <p className="text-xs sm:text-sm text-gray-400 text-center sm:text-left">
                            &copy; {new Date().getFullYear()} JOINVIX. All rights reserved.
                        </p>

                        <p className="text-xs sm:text-sm text-gray-400">
                            Discover. Follow. Connect.
                        </p>

                    </div>

                </div>

            </div>

        </footer>
    )
}

export default Footer

