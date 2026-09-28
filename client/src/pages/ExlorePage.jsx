import { useContext, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { ChannelContext } from '../context/channelContext'
import ChannelCard from '../components/ChannelCard'

const ExlorePage = () => {

    const { channels, loading, error } = useContext(ChannelContext)

    const [searchInput, setSearchInput] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')

    const filteredChannels = channels?.filter((channel) => {

        const search = searchInput.toLowerCase()

        const matchSearch =
            channel.name?.toLowerCase().includes(search) ||
            channel.description?.toLowerCase().includes(search) ||
            channel.category?.toLowerCase().includes(search)

        const matchCategory =
            selectedCategory === "All" ||
            channel.category === selectedCategory

        return matchCategory && matchSearch
    })

    const categories = [
        "All",
        "Technology",
        "News",
        "Entertainment",
        "Education",
        "Sports",
        "Business",
        "Social"
    ]

    return (
        <div className='flex flex-col items-center pt-25 py-15 w-full px-4 sm:px-6 md:px-10 lg:px-20 xl:px-25 gap-10'>

            <div className='flex flex-col w-full items-center mx-auto gap-8 mt-5'>
                <span className='bg-green-50 border w-fit border-green-300 px-8 py-0.5 rounded-full text-xs md:text-sm text-green uppercase'>Discover your favourite channels</span>
                <h1 className='text-4xl text-text font-semibold'>Explore <span className='text-green-shade'>JOINVIX</span></h1>
            </div>

            <div className='w-100 md:w-200 bg-white h-11 md:h-13 rounded-full shadow-md flex items-center px-10 gap-5'>
                <CiSearch className='text-xl font-bold text-text' />
                <input
                    onChange={(e) => setSearchInput(e.target.value)}
                    value={searchInput}
                    type="text"
                    placeholder='Search channels here' className='flex-1 w-full h-full border-none outline-none text-text/80 tracking-wide' />
            </div>

            <div className='max-w-screen w-full overflow-x-auto hide-scrollbar  flex items-center gap-3 py-5 border-t border-b border-text/10'>
                {
                    categories.map((category, index) => {
                        const selectCat = selectedCategory === category
                        return (
                            <span
                                onClick={() => {
                                    setSelectedCategory(category)
                                }}
                                className={`${selectCat ? 'bg-green-shade text-white' : 'bg-white text-text'} px-5 py-2.5 transition-all duration-500 rounded-full text-sm tracking-wide cursor-pointer shadow-2xl`}
                                key={index}>
                                {category}
                            </span>
                        )
                    })
                }
            </div>

            <section className='w-full grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5'>
                {
                    loading ?
                        <div className='col-span-full w-full flex justify-center items-center py-15 md:py-25 bg-white rounded-2xl border border-text/10'>
                            <h2 className='text-text/70 tracking-wide md:text-xl'>Loading Channels...</h2>
                        </div>
                        : error ?
                            <div className='col-span-full w-full flex justify-center items-center py-15 md:py-25 bg-white rounded-2xl border border-red-500/50'>
                                <h2 className='text-red-500/70 tracking-wide md:text-xl'>An Error with Loading Channels...</h2>
                            </div>
                            :
                            channels.length === 0 ?
                                <div className='col-span-full w-full flex justify-center items-center py-15 md:py-25 bg-white rounded-2xl border border-text/10'>
                                    <h2 className='text-text/70 tracking-wide md:text-xl'>No channels available!</h2>
                                </div>
                                : filteredChannels.length === 0 ?
                                    <div className='col-span-full w-full flex justify-center items-center py-15 md:py-25 bg-white rounded-2xl border border-text/10'>
                                        <h2 className='text-text/70 tracking-wide md:text-xl'>
                                            {searchInput ? "No channels match your search!" : "No channels available!"}
                                        </h2>
                                    </div>
                                    : filteredChannels.map((channel) => (
                                        <ChannelCard key={channel._id || channel.id} channel={channel} />
                                    ))

                }
            </section>

        </div>
    )
}

export default ExlorePage
