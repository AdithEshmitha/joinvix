import { useNavigate } from "react-router-dom"
import Title from "../components/Title"
import ChannelCard from "../components/ChannelCard"
import { useContext } from "react"
import { ChannelContext } from "../context/channelContext"

const HomePage = () => {

    const { loading, channels, error } = useContext(ChannelContext)

    const navigate = useNavigate()

    const categories = [
        "Technology",
        "News",
        "Entertainment",
        "Education",
        "Sports",
        "Business",
        "Social"
    ]

    const featuredChannels = channels.slice(0, 4)

    return (
        <main className="min-h-screen">

            {/* HERO */}
            <section className="relative border-b border-text/5 w-full min-h-screen flex flex-col items-center justify-center gap-7 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-25 overflow-hidden">

                <div className="absolute -right-100 -bottom-80 w-200 h-200 bg-green-50 rounded-full"></div>

                <div className="relative z-10 flex justify-center items-center bg-green-100 py-1 px-5 border border-green-700/10 tracking-wide uppercase text-xs text-green-700 rounded-full">
                    Discover something worth following
                </div>

                <h1 className="relative z-10 text-3xl md:text-5xl md:w-170 text-center leading-11 md:leading-15 text-text font-semibold">
                    Discover WhatsApp,{" "}
                    <span className="text-green-shade">Channels</span>{" "}
                    You'll Love
                </h1>

                <p className="relative z-10 md:w-170 text-center tracking-wide text-text/60">
                    Find interesting WhatsApp channels, discover new content,
                    and join the communities that match your interests.
                </p>

                <div className="relative z-10 w-full flex flex-col justify-center md:flex-row items-center gap-2">
                    <button
                        onClick={() => {
                            window.scrollTo({
                                top: 0,
                                behavior: 'smooth',
                            });
                            navigate('/explore')
                        }}
                        className="text-center w-full md:w-60 px-8 py-2 bg-green rounded-full text-white transition-all duration-300 hover:bg-green-shade active:scale-95 cursor-pointer"
                    >
                        Explore Channels
                    </button>

                    <button
                        onClick={() => {
                            window.scrollTo({
                                top: 0,
                                behavior: 'smooth',
                            });
                            navigate('/add-channel')
                        }}
                        className="text-center w-full md:w-60 px-8 py-2 border border-green rounded-full text-green transition-all duration-300 hover:bg-green hover:text-white active:scale-95 cursor-pointer"
                    >
                        + Add Your Channel
                    </button>
                </div>

            </section>

            <section className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-25 w-full mb-10">

                <Title title={'Featured Channels'} subtitle={'Explore more channels with JOINVIX'} />

                <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5">

                    {
                        loading ?
                            <div className="w-full py-10 md:py-15 bg-white rounded-2xl border border-text/10 flex justify-center items-center">
                                <h2 className="text-text/80 text-[16px] tracking-wide">Loading Channels...</h2>
                            </div> :
                            error ?
                                <div className="w-full py-10 md:py-15 bg-white rounded-2xl border border-text/10 flex justify-center items-center">
                                    <h2 className="text-text/80 text-[16px] tracking-wide">An Error with loading Channels!</h2>
                                </div> :
                                featuredChannels.length === 0 ?
                                    <div className="w-full py-10 md:py-15 bg-white rounded-2xl border border-text/10 flex justify-center items-center">
                                        <h2 className="text-text/80 text-[16px] tracking-wide">Oops! No channels found.</h2>
                                    </div> :
                                    featuredChannels.map((channel) => {
                                        return (
                                            <ChannelCard channel={channel} key={channel.id} />
                                        )
                                    })
                    }

                </div>

                <div className="w-full flex justify-center items-center mt-8">
                    <button
                        onClick={() => {
                            window.scrollTo({
                                top: 0,
                                behavior: 'smooth',
                            });
                            navigate('/explore')
                        }}
                        className="text-green-shade font-semibold tracking-wide border-2 border-green-shade rounded transition-all duration-300 hover:bg-green-shade hover:text-white cursor-pointer h-11 px-5">Show All Channels</button>
                </div>

            </section>
        </main>
    )
}

export default HomePage