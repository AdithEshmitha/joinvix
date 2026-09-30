import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import Breadcrumb from "../components/Breadcrumb"

const ChannelDetailsPage = () => {

    const { channelId } = useParams()

    const [channel, setChannel] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const getChannel = async () => {

            try {
                setLoading(true)

                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/channels/get-channel/${channelId}`
                )

                setChannel(response.data.channel)

            } catch (error) {

                toast.error(
                    error.response?.data?.message ||
                    "Failed to load channel!"
                )

            } finally {
                setLoading(false)
            }
        }

        getChannel()

    }, [channelId])

    if (loading) {
        return (
            <div className="w-full min-h-[60vh] flex items-center justify-center px-4">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-3 border-gray-200 border-t-green-shade rounded-full animate-spin"></div>

                    <p className="text-sm text-gray-500">
                        Loading channel...
                    </p>
                </div>
            </div>
        )
    }

    if (!channel) {
        return (
            <div className="w-full min-h-[60vh] flex items-center justify-center px-4">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-text">
                        Channel not found
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        This channel may have been removed or is no longer available.
                    </p>
                </div>
            </div>
        )
    }


    const firstLetter = channel.name?.charAt(0)?.toUpperCase() || "?"


    return (
        <div className="w-full pt-25 pb-15 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-25">

            <Breadcrumb channelName={channel.name} />

            <div className="w-full max-w-5xl mx-auto mt-8">

                <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-7 md:p-10 shadow-sm">

                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-7">

                        <div className="shrink-0">

                            {channel.logo ? (

                                <img
                                    src={channel.logo}
                                    alt={channel.name}
                                    className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-2xl object-cover border border-gray-200"
                                />

                            ) : (

                                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-2xl bg-green-shade flex items-center justify-center">

                                    <span className="text-4xl sm:text-5xl font-bold text-white">
                                        {firstLetter}
                                    </span>

                                </div>

                            )}

                        </div>

                        <div className="flex-1 min-w-0 text-center sm:text-left">

                            <h1 className="text-2xl sm:text-3xl font-bold tracking-wide text-text wrap-break-words">
                                {channel.name}
                            </h1>

                            <p className="mt-3 text-sm sm:text-base text-gray-500 leading-7 max-w-2xl">
                                {channel.description || "No description available."}
                            </p>

                            <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-5">

                                <div className="px-4 py-2 rounded-lg bg-gray-100">
                                    <p className="text-xs text-gray-500">
                                        Followers
                                    </p>

                                    <p className="text-sm font-semibold text-text">
                                        {channel.followers?.toLocaleString() || "0"}
                                    </p>
                                </div>


                                <div className="px-4 py-2 rounded-lg bg-gray-100">
                                    <p className="text-xs text-gray-500">
                                        Likes
                                    </p>

                                    <p className="text-sm font-semibold text-text">
                                        {channel.likes?.toLocaleString() || "0"}
                                    </p>
                                </div>


                                <div className="px-4 py-2 rounded-lg bg-gray-100">
                                    <p className="text-xs text-gray-500">
                                        Category
                                    </p>

                                    <p className="text-sm font-semibold text-text">
                                        {channel.category}
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>


                    <div className="w-full h-px bg-gray-200 my-7" />

                    <div className="flex justify-center sm:justify-end">

                        <a
                            href={channel.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto px-7 py-3 rounded-xl bg-green-shade text-white text-sm font-semibold text-center hover:opacity-90 transition-all duration-300"
                        >
                            Join WhatsApp Channel
                        </a>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default ChannelDetailsPage