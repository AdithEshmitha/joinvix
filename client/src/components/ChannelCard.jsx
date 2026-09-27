import { useState } from "react";
import { FaUsers } from "react-icons/fa"
import { IoMdHeartEmpty } from "react-icons/io";
import { MdArrowRightAlt } from "react-icons/md";

const ChannelCard = ({ channel }) => {

    const [imageError, setImageError] = useState(false)

    return (
        <div className="group bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:border-green-shade/30 transition-all duration-300">

            {/* Channel Header */}
            <div className="flex items-start justify-between gap-4">

                <div className="flex items-center gap-3 min-w-0">

                    {/* Logo */}
                    <div className="w-14 h-14 shrink-0 rounded-xl overflow-hidden bg-green-50 border border-gray-100">

                        {channel.logo && !imageError ? (
                            <img
                                src={channel.logo}
                                alt=""
                                onError={() => setImageError(true)}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-green-shade font-bold text-xl">
                                {channel.name?.charAt(0).toUpperCase()}
                            </div>
                        )}

                    </div>


                    {/* Name */}
                    <div className="min-w-0">

                        <h2 className="text-base font-semibold text-gray-900 truncate">
                            {channel.name}
                        </h2>

                        <span className="inline-flex mt-1 px-2.5 py-1 rounded-full bg-green-50 text-green-shade text-[11px] font-medium">
                            {channel.category}
                        </span>

                    </div>

                </div>

            </div>


            {/* Description */}
            <p className="mt-4 text-sm text-gray-500 leading-6 line-clamp-2 min-h-12">
                {channel.description}
            </p>


            {/* Stats */}
            <div className="flex items-center gap-5 mt-5 text-sm text-gray-500">

                <div className="flex items-center gap-2">
                    <FaUsers className="text-gray-400 text-xl" />
                    <span>
                        {channel.followers?.toLocaleString() || 0}
                    </span>
                </div>


                <div className="flex items-center gap-2">
                    <IoMdHeartEmpty
                        className="text-gray-400 text-xl" />

                    <span>
                        {channel.likes?.toLocaleString() || 0}
                    </span>
                </div>

            </div>


            {/* Bottom */}
            <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">

                <span className="text-xs text-gray-400">
                    WhatsApp Channel
                </span>


                <a
                    href={channel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-shade text-white text-sm font-medium hover:bg-green-700 transition-all duration-200 group-hover:gap-2.5"
                >
                    Join Channel

                    <MdArrowRightAlt className="text-2xl" />
                </a>

            </div>

        </div>
    )
}

export default ChannelCard