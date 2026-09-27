import { Link, useNavigate } from "react-router-dom"

const Navbar = () => {

    const navigate = useNavigate()

    return (
        <nav className="w-full bg-white border-b border-gray-200 fixed top-0 left-0 z-999">
            <div className="w-full px-4 sm:px-6 md:px-10 lg:px-20 xl:px-25 py-3 flex items-center justify-between">

                {/* LOGO */}
                <button
                    onClick={() => {
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth',
                        });
                        navigate('/');
                    }}
                    className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 cursor-pointer"
                >
                    JOIN
                    <span className="text-green-shade">VIX</span>
                </button>

                {/* RIGHT SIDE */}
                <div className="flex items-center gap-3">

                    {/* EXPLORE */}
                    <Link
                        onClick={() => {
                            window.scrollTo({
                                top: 0,
                                behavior: 'smooth',
                            });
                        }}
                        to="/explore"
                        className="hidden sm:block px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        Explore
                    </Link>

                    {/* ADD CHANNEL */}
                    <Link
                        onClick={() => {
                            window.scrollTo({
                                top: 0,
                                behavior: 'smooth',
                            });
                        }}
                        to="/add-channel"
                        className="inline-flex items-center gap-2 rounded-xl bg-green-shade px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green transition-all duration-200 hover:shadow-md active:scale-95"
                    >
                        <span className="text-lg leading-none">+</span>
                        Add Your Channel
                    </Link>

                </div>
            </div>
        </nav>
    )
}

export default Navbar
