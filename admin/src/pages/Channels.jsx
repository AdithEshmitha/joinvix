import { useState } from "react"
import axios from 'axios'
import { toast } from "react-toastify"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Channels = () => {

    const [loading, setLoading] = useState(false)
    const [channels, setChannels] = useState([])

    const navigate = useNavigate()

    const getAllChannels = async () => {

        const token = localStorage.getItem('admin_token')

        if (!token || token === null) {
            toast.error('Access Denied!')
            navigate('/login')
            return
        }

        try {
            setLoading(true)
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/channels/admin/get-all-channels`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            setChannels(response.data.channels)
            setLoading(false)
        } catch (error) {
            toast.error(error.message)
            setLoading(false)
        }

    }

    useEffect(() => {
        getAllChannels()
    }, [])

    return (
        <div className="flex flex-col h-screen overflow-hidden flex-1 min-w-0">

            <div className="w-full bg-white flex justify-between items-center px-5 md:px-10 py-2.5 border-b border-text/10 shrink-0">
                <div className="flex flex-col">
                    <h1 className="text-text text-xl font-semibold">Channels</h1>
                    <p className="text-text/50 text-[15px]">Manage channels from here.</p>
                </div>
                <span className="py-2 px-5 rounded border border-green bg-gray-100/50 text-text text-[16px]">{channels.length} Channels</span>
            </div>

            <div className="flex-1 min-h-0 mx-5 md:mx-10 my-5 bg-white border border-text/10 rounded-2xl overflow-hidden flex flex-col">

                <div className="flex-1 min-h-0 overflow-auto">

                    <table className="w-full min-w-225">

                        <thead className="bg-gray-50 sticky top-0 z-10">

                            <tr className="border-b border-text/10">
                                <th className="text-left text-text/70 tracking-wide text-[13px] font-semibold uppercase px-6 py-4">Channel</th>
                                <th className="text-left text-text/70 tracking-wide text-[13px] font-semibold uppercase px-6 py-4">Description</th>
                                <th className="text-left text-text/70 tracking-wide text-[13px] font-semibold uppercase px-6 py-4">Category</th>
                                <th className="text-left text-text/70 tracking-wide text-[13px] font-semibold uppercase px-6 py-4">Followers</th>
                                <th className="text-left text-text/70 tracking-wide text-[13px] font-semibold uppercase px-6 py-4">Likes</th>
                                <th className="text-center text-text/70 tracking-wide text-[13px] font-semibold uppercase px-6 py-4">Manage</th>
                            </tr>

                        </thead>

                        <tbody>

                            {loading ? (

                                <tr>
                                    <td colSpan="6" className="text-center py-16 text-text/50 text-sm">
                                        Loading channels...
                                    </td>
                                </tr>

                            ) : channels.length === 0 ? (

                                <tr>
                                    <td colSpan="6" className="text-center py-16 text-text/50 text-sm">
                                        No channels found.
                                    </td>
                                </tr>

                            ) : (

                                channels.map((channel) => {
                                    return (
                                        <tr key={channel.id} className="border-b border-text/5 hover:bg-gray-50/70 transition-colors duration-200">

                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-11 h-11 shrink-0">
                                                        {channel.logo
                                                            ? <img src={channel.logo} alt={channel.name} className="w-11 h-11 rounded-full object-cover" />
                                                            : <div className="w-11 h-11 bg-green-100 flex justify-center items-center uppercase rounded-full text-green-700 font-semibold">{channel.name.charAt(0)}</div>
                                                        }
                                                    </div>
                                                    <div className="flex flex-col min-w-0">
                                                        <h2 className="text-text text-[15px] font-medium truncate">{channel.name}</h2>
                                                        <p className="text-text/40 text-xs truncate">{channel.id}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4">
                                                <p className="text-text/70 text-[14px] line-clamp-2 max-w-70">{channel.description}</p>
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-text/70 text-[13px] font-medium">{channel.category}</span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className="text-text text-[14px] font-medium">{channel.followers}</span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className="text-text text-[14px] font-medium">{channel.likes}</span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="flex justify-center">
                                                    <button className="px-4 py-1.5 rounded-lg border border-text/10 text-text/70 text-[13px] font-medium hover:bg-gray-100 hover:text-text transition-all duration-200">
                                                        Manage
                                                    </button>
                                                </div>
                                            </td>

                                        </tr>
                                    )
                                })

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    )
}

export default Channels