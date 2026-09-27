import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import axios from 'axios'
import { FaEye, FaCheck, FaTimes } from "react-icons/fa"
import { HiX } from "react-icons/hi"

const PendingChannels = () => {

    const [channels, setChannels] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectedChannel, setSelectedChannel] = useState(null)
    const [actionLoading, setActionLoading] = useState(false)

    const navigate = useNavigate()

    const token = localStorage.getItem('admin_token')

    const getPendingChannels = async () => {

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

            const pendingOnly = response.data.channels.filter(
                (channel) => channel.status === 'pending'
            )

            setChannels(pendingOnly)
            setLoading(false)
        } catch (error) {
            toast.error(error.message)
            setLoading(false)
        }

    }

    const approveChannel = async (id) => {

        if (!id) {
            toast.error('Channel ID is missing!')
            return
        }

        try {
            setActionLoading(true)
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/channels/admin/approve-channel/${id}`, {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            toast.success(response.data.message || 'Channel approved!')
            setSelectedChannel(null)
            getPendingChannels()
        } catch (error) {
            toast.error(error.response?.data?.message || error.message)
        } finally {
            setActionLoading(false)
        }
    }

    const rejectChannel = async (id) => {

        if (!id) {
            toast.error('Channel ID is missing!')
            return
        }

        try {
            setActionLoading(true)
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/channels/admin/reject-channel/${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            toast.success(response.data.message || 'Channel rejected!')
            setSelectedChannel(null)
            getPendingChannels()
        } catch (error) {
            toast.error(error.response?.data?.message || error.message)
        } finally {
            setActionLoading(false)
        }
    }

    useEffect(() => {
        getPendingChannels()
    }, [])

    return (
        <div className="flex flex-col h-screen overflow-hidden flex-1 min-w-0">

            <div className="w-full bg-white flex justify-between items-center px-5 md:px-10 py-2.5 border-b border-text/10 shrink-0">
                <div className="flex flex-col">
                    <h1 className="text-text text-xl font-semibold">Pending Channels</h1>
                    <p className="text-text/50 text-[15px]">Review and manage pending channel requests.</p>
                </div>
                <span className="py-2 px-5 rounded border border-green bg-gray-100/50 text-text text-[16px]">{channels.length} Pending</span>
            </div>

            <div className="flex-1 min-h-0 mx-5 md:mx-10 my-5 bg-white border border-text/10 rounded-2xl overflow-hidden flex flex-col">

                <div className="flex-1 min-h-0 overflow-auto">

                    <table className="w-full min-w-225">

                        <thead className="bg-gray-50 sticky top-0 z-10">

                            <tr className="border-b border-text/10">
                                <th className="text-left text-text/70 tracking-wide text-[13px] font-semibold uppercase px-6 py-4">Channel</th>
                                <th className="text-left text-text/70 tracking-wide text-[13px] font-semibold uppercase px-6 py-4">Category</th>
                                <th className="text-left text-text/70 tracking-wide text-[13px] font-semibold uppercase px-6 py-4">Followers</th>
                                <th className="text-left text-text/70 tracking-wide text-[13px] font-semibold uppercase px-6 py-4">Likes</th>
                                <th className="text-center text-text/70 tracking-wide text-[13px] font-semibold uppercase px-6 py-4">Actions</th>
                            </tr>

                        </thead>

                        <tbody>

                            {loading ? (

                                <tr>
                                    <td colSpan="5" className="text-center py-16 text-text/50 text-sm">
                                        Loading channels...
                                    </td>
                                </tr>

                            ) : channels.length === 0 ? (

                                <tr>
                                    <td colSpan="5" className="text-center py-16 text-text/50 text-sm">
                                        No pending channels found.
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
                                                <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-text/70 text-[13px] font-medium">{channel.category}</span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className="text-text text-[14px] font-medium">{channel.followers}</span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className="text-text text-[14px] font-medium">{channel.likes}</span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-center gap-2">

                                                    <button
                                                        title="View"
                                                        onClick={() => setSelectedChannel(channel)}
                                                        className="w-9 h-9 flex items-center justify-center rounded-lg border border-text/10 text-text/70 hover:bg-gray-100 hover:text-text transition-all duration-200"
                                                    >
                                                        <FaEye className="text-[15px]" />
                                                    </button>

                                                    <button
                                                        title="Approve"
                                                        disabled={actionLoading}
                                                        onClick={() => approveChannel(channel._id)}
                                                        className="w-9 h-9 flex items-center justify-center rounded-lg border border-green-200 bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        <FaCheck className="text-[14px]" />
                                                    </button>

                                                    <button
                                                        title="Reject"
                                                        disabled={actionLoading}
                                                        onClick={() => rejectChannel(channel._id)}
                                                        className="w-9 h-9 flex items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        <FaTimes className="text-[14px]" />
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

            {selectedChannel && (

                <div className="fixed inset-0 z-100 flex items-center justify-center p-4">

                    <div
                        onClick={() => setSelectedChannel(null)}
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    />

                    <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">

                        <div className="flex items-center justify-between px-6 py-4 border-b border-text/10 shrink-0">

                            <h2 className="text-text text-lg font-semibold">
                                Channel Details
                            </h2>

                            <button
                                onClick={() => setSelectedChannel(null)}
                                className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors duration-200"
                            >
                                <HiX className="text-xl text-text/70" />
                            </button>

                        </div>

                        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5">

                            <div className="flex items-center gap-4">

                                <div className="w-16 h-16 shrink-0">
                                    {selectedChannel.logo
                                        ? <img src={selectedChannel.logo} alt={selectedChannel.name} className="w-16 h-16 rounded-full object-cover" />
                                        : <div className="w-16 h-16 bg-green-100 flex justify-center items-center uppercase rounded-full text-green-700 font-semibold text-2xl">{selectedChannel.name.charAt(0)}</div>
                                    }
                                </div>

                                <div className="flex flex-col min-w-0">
                                    <h3 className="text-text text-lg font-semibold truncate">{selectedChannel.name}</h3>
                                    <p className="text-text/40 text-xs truncate">{selectedChannel.id}</p>
                                </div>

                            </div>

                            <div className="grid grid-cols-2 gap-3">

                                <div className="flex flex-col gap-1 p-3 rounded-lg bg-gray-50 border border-text/5">
                                    <span className="text-text/50 text-xs uppercase tracking-wide font-semibold">Category</span>
                                    <span className="text-text text-sm font-medium">{selectedChannel.category}</span>
                                </div>

                                <div className="flex flex-col gap-1 p-3 rounded-lg bg-gray-50 border border-text/5">
                                    <span className="text-text/50 text-xs uppercase tracking-wide font-semibold">Followers</span>
                                    <span className="text-text text-sm font-medium">{selectedChannel.followers}</span>
                                </div>

                                <div className="flex flex-col gap-1 p-3 rounded-lg bg-gray-50 border border-text/5">
                                    <span className="text-text/50 text-xs uppercase tracking-wide font-semibold">Likes</span>
                                    <span className="text-text text-sm font-medium">{selectedChannel.likes}</span>
                                </div>

                                <div className="flex flex-col gap-1 p-3 rounded-lg bg-gray-50 border border-text/5">
                                    <span className="text-text/50 text-xs uppercase tracking-wide font-semibold">Status</span>
                                    <span className="text-amber-600 text-sm font-medium">Pending</span>
                                </div>

                            </div>

                            <div className="flex flex-col gap-1 p-3 rounded-lg bg-gray-50 border border-text/5">
                                <span className="text-text/50 text-xs uppercase tracking-wide font-semibold">Description</span>
                                <p className="text-text/80 text-sm leading-relaxed">{selectedChannel.description || "No description provided."}</p>
                            </div>

                        </div>

                        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-text/10 shrink-0">

                            <button
                                onClick={() => setSelectedChannel(null)}
                                className="px-4 py-2 rounded-lg border border-text/10 text-text/70 text-sm font-medium hover:bg-gray-100 transition-all duration-200"
                            >
                                Close
                            </button>

                            <button
                                disabled={actionLoading}
                                onClick={() => rejectChannel(selectedChannel._id)}
                                className="px-4 py-2 rounded-lg border border-red-200 bg-red-50 text-red-500 text-sm font-medium hover:bg-red-100 hover:text-red-600 transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <FaTimes className="text-[13px]" />
                                Reject
                            </button>

                            <button
                                disabled={actionLoading}
                                onClick={() => approveChannel(selectedChannel._id)}
                                className="px-4 py-2 rounded-lg border border-green-200 bg-green-50 text-green-600 text-sm font-medium hover:bg-green-100 hover:text-green-700 transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <FaCheck className="text-[13px]" />
                                Approve
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    )
}

export default PendingChannels