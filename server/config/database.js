// IMPORT MONGOOSE LIBRARY
import mongoose from "mongoose"

export default async function databaseConnection() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log(`[+] MongoDB Connected Successfully!`)
    } catch (error) {
        console.log(`[-] MongoDB Connection Failed!`)
        console.log(`Error : ${error}`)
    }
}