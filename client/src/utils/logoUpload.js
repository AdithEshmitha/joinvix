import axios from "axios"

export default async function uploadLogo(file) {

    const promise = new Promise(

        async (resolve, reject) => {

            try {

                const formData = new FormData()

                formData.append("image", file)

                const response = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
                    formData
                )

                if (response.data.success) {

                    resolve(response.data.data.url)

                } else {

                    reject("Image upload failed!")

                }

            } catch (error) {

                reject(error.response?.data?.error?.message || "Image upload failed!")

            }

        }

    )

    return promise
}