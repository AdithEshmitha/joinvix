import mongoose from "mongoose"
import crypto from 'crypto'

const channelSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            default: () => crypto.randomUUID()
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        url: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        category: {
            type: String,
            required: true
        },
        logo: {
            type: String,
            default: ""
        },
        followers: {
            type: Number,
            default: 0,
            min: 0
        },
        likes: {
            type: Number,
            default: 0,
            min: 0
        },
        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending"
        }
    }, { timestamps: true }
)

const Channel = mongoose.model('Channel', channelSchema)

export default Channel