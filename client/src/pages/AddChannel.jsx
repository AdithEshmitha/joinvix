import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { FaCamera } from "react-icons/fa"
import axios from "axios"
import uploadLogo from "../utils/logoUpload"

const AddChannel = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        url: "",
        category: "",
        logo: "",
        followers: ""
    })

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState({
        type: "",
        text: ""
    })

    const categories = [
        "Technology",
        "News",
        "Entertainment",
        "Education",
        "Sports",
        "Business",
        "Social"
    ]


    const handleChange = (e) => {

        const { name, value } = e.target

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))

        // Clear old message when user edits
        if (message.text) {
            setMessage({
                type: "",
                text: ""
            })
        }
    }

    const handleLogoUpload = async (e) => {

        const file = e.target.files[0]

        if (!file) return

        try {

            setLoading(true)

            const logoUrl = await uploadLogo(file)

            setFormData((prev) => ({
                ...prev,
                logo: logoUrl
            }))

        } catch (error) {

            setMessage({
                type: "error",
                text: error.message || "Failed to upload logo."
            })

        } finally {

            setLoading(false)

        }
    }


    const validateUrl = (url) => {

        try {
            const parsedUrl = new URL(url)

            return (
                parsedUrl.protocol === "https:" &&
                parsedUrl.hostname.includes("whatsapp.com")
            )

        } catch {
            return false
        }
    }


    const handleSubmit = async (e) => {

        e.preventDefault()

        setMessage({
            type: "",
            text: ""
        })


        // Basic validation
        if (
            !formData.name.trim() ||
            !formData.description.trim() ||
            !formData.url.trim() ||
            !formData.category
        ) {
            setMessage({
                type: "error",
                text: "Please fill in all required fields."
            })

            return
        }


        if (!validateUrl(formData.url.trim())) {

            setMessage({
                type: "error",
                text: "Please enter a valid WhatsApp Channel URL."
            })

            return
        }


        try {

            setLoading(true)

            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/channels/add-channel`,
                {
                    name: formData.name.trim(),
                    description: formData.description.trim(),
                    url: formData.url.trim(),
                    category: formData.category,
                    logo: formData.logo.trim(),
                    followers: Number(formData.followers) || 0
                }
            )

            setMessage({
                type: "success",
                text: "Your channel has been submitted successfully!"
            })

            setFormData({
                name: "",
                description: "",
                url: "",
                category: "",
                logo: "",
                followers: ""
            })

            navigate('/explore')


        } catch (error) {
            setMessage({
                type: "error",
                text:
                    error.response?.data?.message ||
                    "Something went wrong. Please try again."
            })
        } finally {
            setLoading(false)
        }
    }


    return (
        <main className="min-h-screen bg-background">

            {/* Header */}
            <section className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-25 pt-25 md:pt-20 pb-8">

                <div className="max-w-4xl mx-auto text-center">

                    <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-green-100 border border-green-700/10 text-green-700 text-xs font-medium uppercase tracking-wider">
                        Grow Your Audience
                    </span>

                    <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-text leading-tight">
                        Add Your
                        <span className="text-green-shade"> WhatsApp Channel</span>
                    </h1>

                    <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-text/60 leading-7">
                        Submit your WhatsApp channel to JOINVIX and let people
                        discover your content.
                    </p>

                </div>

            </section>


            {/* Main Content */}
            <section className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-25 pb-16">

                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-8">


                    {/* LEFT INFO */}
                    <div className="space-y-5">

                        {/* Preview */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">

                            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                                Channel Preview
                            </p>

                            <div className="mt-6 flex items-center gap-4">

                                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-green-50 border border-green-100 shrink-0">

                                    {formData.logo ? (

                                        <img
                                            src={formData.logo}
                                            alt="Channel preview"
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.currentTarget.style.display = "none"
                                            }}
                                        />

                                    ) : (

                                        <div className="w-full h-full flex items-center justify-center text-green-shade text-xl font-bold">
                                            {formData.name
                                                ? formData.name.charAt(0).toUpperCase()
                                                : "J"
                                            }
                                        </div>

                                    )}

                                </div>


                                <div className="min-w-0">

                                    <h2 className="font-semibold text-gray-900 truncate">
                                        {formData.name || "Your Channel Name"}
                                    </h2>

                                    <span className="inline-flex mt-1 px-2.5 py-1 rounded-full bg-green-50 text-green-shade text-[11px] font-medium">
                                        {formData.category || "Category"}
                                    </span>

                                </div>

                            </div>


                            <p className="mt-5 text-sm text-gray-500 leading-6 line-clamp-3">
                                {formData.description ||
                                    "Your channel description will appear here once you start filling out the form."
                                }
                            </p>


                            <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">

                                <span>
                                    {Number(formData.followers || 0).toLocaleString()} followers
                                </span>

                                <span>
                                    WhatsApp Channel
                                </span>

                            </div>

                        </div>


                        {/* Information */}
                        <div className="bg-green-50 border border-green-100 rounded-2xl p-6">

                            <div className="flex items-start gap-3">

                                <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shrink-0 text-green-shade">

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.8"
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 16v-4m0-4h.008M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                        />
                                    </svg>

                                </div>

                                <div>

                                    <h3 className="text-sm font-semibold text-gray-900">
                                        Before submitting
                                    </h3>

                                    <ul className="mt-3 space-y-2 text-sm text-gray-600">

                                        <li className="flex gap-2">
                                            <span className="text-green-shade">✓</span>
                                            Make sure your channel is public.
                                        </li>

                                        <li className="flex gap-2">
                                            <span className="text-green-shade">✓</span>
                                            Provide the correct WhatsApp URL.
                                        </li>

                                        <li className="flex gap-2">
                                            <span className="text-green-shade">✓</span>
                                            Use a clear channel description.
                                        </li>

                                        <li className="flex gap-2">
                                            <span className="text-green-shade">✓</span>
                                            Your submission will be reviewed.
                                        </li>

                                    </ul>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* FORM */}
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 sm:p-7 md:p-8">

                        <div className="mb-7">

                            <h2 className="text-xl font-semibold text-gray-900">
                                Channel Information
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Tell us about the channel you want to list.
                            </p>

                        </div>


                        {/* Message */}
                        {message.text && (

                            <div
                                className={`mb-6 rounded-xl px-4 py-3 text-sm border ${message.type === "success"
                                    ? "bg-green-50 text-green-700 border-green-100"
                                    : "bg-red-50 text-red-600 border-red-100"
                                    }`}
                            >
                                <div className="flex items-start gap-3">

                                    <span className="font-semibold">
                                        {message.type === "success"
                                            ? "Success"
                                            : "Error"
                                        }
                                    </span>

                                    <span>
                                        {message.text}
                                    </span>

                                </div>
                            </div>

                        )}


                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >

                            {/* Channel Name */}
                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Channel Name
                                    <span className="text-red-500 ml-1">*</span>
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Tech World"
                                    maxLength={100}
                                    className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-white outline-none text-sm text-gray-800 placeholder:text-gray-400 focus:border-green-shade focus:ring-4 focus:ring-green-100 transition-all"
                                />

                            </div>


                            {/* Description */}
                            <div>

                                <div className="flex items-center justify-between mb-2">

                                    <label className="text-sm font-medium text-gray-700">
                                        Description
                                        <span className="text-red-500 ml-1">*</span>
                                    </label>

                                    <span className="text-xs text-gray-400">
                                        {formData.description.length}/300
                                    </span>

                                </div>

                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Tell people what your channel is about..."
                                    maxLength={300}
                                    rows={5}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white outline-none resize-none text-sm text-gray-800 placeholder:text-gray-400 focus:border-green-shade focus:ring-4 focus:ring-green-100 transition-all"
                                />

                            </div>


                            {/* URL */}
                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    WhatsApp Channel URL
                                    <span className="text-red-500 ml-1">*</span>
                                </label>

                                <div className="relative">

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.8"
                                        stroke="currentColor"
                                        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M13.19 8.69 15 6.88a3.75 3.75 0 1 1 5.3 5.3l-3.69 3.69a3.75 3.75 0 0 1-5.3 0m-1.62-3.18-1.8 1.81a3.75 3.75 0 1 1-5.3-5.3l3.69-3.69a3.75 3.75 0 0 1 5.3 0"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m8.5 15.5 7-7"
                                        />
                                    </svg>

                                    <input
                                        type="url"
                                        name="url"
                                        value={formData.url}
                                        onChange={handleChange}
                                        placeholder="https://whatsapp.com/channel/..."
                                        className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-200 bg-white outline-none text-sm text-gray-800 placeholder:text-gray-400 focus:border-green-shade focus:ring-4 focus:ring-green-100 transition-all"
                                    />

                                </div>

                            </div>


                            {/* Category + Followers */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                                {/* Category */}
                                <div>

                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Category
                                        <span className="text-red-500 ml-1">*</span>
                                    </label>

                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-white outline-none text-sm text-gray-700 focus:border-green-shade focus:ring-4 focus:ring-green-100 transition-all"
                                    >

                                        <option value="">
                                            Select category
                                        </option>

                                        {categories.map((category) => (
                                            <option
                                                key={category}
                                                value={category}
                                            >
                                                {category}
                                            </option>
                                        ))}

                                    </select>

                                </div>


                                {/* Followers */}
                                <div>

                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Current Followers
                                    </label>

                                    <input
                                        type="number"
                                        name="followers"
                                        value={formData.followers}
                                        onChange={handleChange}
                                        placeholder="e.g. 5000"
                                        min="0"
                                        className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-white outline-none text-sm text-gray-800 placeholder:text-gray-400 focus:border-green-shade focus:ring-4 focus:ring-green-100 transition-all"
                                    />

                                </div>

                            </div>

                            {/* Channel Logo */}
                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Channel Logo
                                </label>

                                <div className="flex items-center gap-4">

                                    {/* Clickable Preview */}
                                    <label
                                        htmlFor="logo"
                                        className="relative w-20 h-20 rounded-2xl overflow-hidden bg-green-50 border border-gray-200 shrink-0 cursor-pointer group"
                                    >

                                        {formData.logo ? (

                                            <img
                                                src={formData.logo}
                                                alt=""
                                                className="w-full h-full object-cover"
                                            />

                                        ) : (

                                            <div className="w-full h-full flex flex-col items-center justify-center text-green-shade">

                                                <FaCamera className="text-xl mb-1" />

                                                <span className="text-[10px] font-medium">
                                                    Add Logo
                                                </span>

                                            </div>

                                        )}

                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">

                                            <FaCamera className="text-white text-lg" />

                                        </div>

                                    </label>


                                    {/* Hidden File Input */}
                                    <input
                                        id="logo"
                                        type="file"
                                        accept="image/png,image/jpeg,image/webp"
                                        onChange={handleLogoUpload}
                                        className="hidden"
                                    />


                                    {/* Information */}
                                    <div className="min-w-0">

                                        <p className="text-sm font-medium text-gray-700">
                                            {formData.logo
                                                ? "Logo uploaded successfully"
                                                : "Choose your channel logo"
                                            }
                                        </p>

                                        <p className="mt-1 text-xs text-gray-400 leading-5">
                                            Click the preview to select an image.
                                            <br />
                                            JPG, PNG or WebP
                                        </p>

                                    </div>

                                </div>

                            </div>


                            {/* Submit */}
                            <div className="pt-3">

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-12 rounded-xl bg-green-shade text-white text-sm font-semibold hover:bg-green-700 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                                >

                                    {loading ? (

                                        <>
                                            <svg
                                                className="animate-spin w-5 h-5"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                />

                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4Z"
                                                />
                                            </svg>

                                            Submitting...

                                        </>

                                    ) : (

                                        <>
                                            Submit Channel

                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="2"
                                                stroke="currentColor"
                                                className="w-4 h-4"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M5 12h14m-6-6 6 6-6 6"
                                                />
                                            </svg>
                                        </>

                                    )}

                                </button>

                            </div>


                            <p className="text-center text-xs text-gray-400 leading-5">
                                By submitting your channel, you confirm that
                                the information provided is accurate.
                            </p>

                        </form>

                    </div>

                </div>

            </section>

        </main>
    )
}

export default AddChannel
