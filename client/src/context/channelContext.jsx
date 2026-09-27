import { createContext, useEffect, useState } from "react"
import axios from 'axios'

export const ChannelContext = createContext()

const ChannelProvider = ({ children }) => {

    const [loading, setLoading] = useState(false)
    const [channels, setChannels] = useState([])
    const [error, setError] = useState(null)

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

    const getAllChannels = async () => {

        try {
            setLoading(true)
            const response = await axios.get(`${BACKEND_URL}/api/channels/get-channels`)
            setChannels(response?.data?.channels)
        } catch (error) {
            setError(error.message)
            console.log(error)
        } finally {
            setLoading(false)
        }

    }

    useEffect(() => {
        getAllChannels()
    }, [])

    return (
        <ChannelContext.Provider value={{ loading, channels, error }}>
            {children}
        </ChannelContext.Provider>
    )
}

export default ChannelProvider