import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"

const ChannelDetailsPage = () => {

    const { channelId } = useParams()

    const [channel, setChannel] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const getChannel = async () => {

            try {
                setLoading(true)

                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/channels/get-channel/${channelId}`)

                setChannel(response.data.channel)

                console.log(response.data.channel)

            } catch (error) {

                toast.error(error.response?.data?.message || error.message)

            } finally {
                setLoading(false)
            }
        }

        getChannel()

    }, [channelId])

    return (
        <div className="h-100 w-full">

            <div className="">
                <h1>gtf</h1>
            </div>

        </div>
    )
}

export default ChannelDetailsPage
