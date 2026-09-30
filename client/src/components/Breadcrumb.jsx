import { Link, useLocation } from "react-router-dom"
import { FaChevronRight, FaHome } from "react-icons/fa"

const Breadcrumb = ({ channelName }) => {

    const location = useLocation()

    const pathNames = location.pathname
        .split('/')
        .filter(Boolean)

    const names = pathNames.filter(path => path !== "channel")

    const formatName = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1)
    }

    return (
        <div className="flex items-center gap-2 text-sm pb-5">

            <Link
                to="/"
                className="flex items-center gap-1.5 text-gray-500 hover:text-green-shade"
            >
                <FaHome className="text-xs" />
                <span>Home</span>
            </Link>

            {
                names.map((item, index) => {

                    const isLast = index === names.length - 1

                    const label =
                        isLast && channelName
                            ? channelName
                            : formatName(item)

                    return (
                        <div
                            key={index}
                            className="flex items-center gap-2"
                        >

                            <FaChevronRight className="text-[9px] text-gray-400" />

                            {
                                isLast ? (
                                    <span className="font-medium text-text">
                                        {label}
                                    </span>
                                ) : (
                                    <Link
                                        to={`/${item}`}
                                        className="text-gray-500 hover:text-green-shade"
                                    >
                                        {label}
                                    </Link>
                                )
                            }

                        </div>
                    )
                })
            }

        </div>
    )
}

export default Breadcrumb