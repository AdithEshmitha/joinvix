import Channel from "../models/channelModel.js"

// CREATE NEW CHANNEL
export async function addNewChannel(req, res) {

    try {
        // GET DETAILS ABOUT CHANNEL
        const { name, description, url, category, logo, followers } = req.body
        // CHECK ALL FILEDS ARE FILLED
        if (!name || !description || !url || !category || !followers) {
            return res.status(404).json({ success: false, message: 'All fileds are required!' })
        }
        // VALIDATE FOLLOWERS
        const followerCount = Number(followers)

        if (!Number.isInteger(followerCount) || followerCount < 0) {
            return res.status(400).json({ success: false, message: "Invalid follower count!" })
        }
        // EXISTING CHANNEL
        const existingChannel = await Channel.findOne({ url })
        if (existingChannel) {
            return res.status(404).json({ success: false, message: 'Channel already exists!' })
        }
        // CREATE CHANNEL
        const channel = await Channel.create(
            {
                name,
                description,
                url,
                category,
                logo,
                followers
            }
        )
        // RESPONSE SEND
        res.status(201).json({ success: true, message: 'Channel created successfully!', channel })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }

}

// GET CHANNELS
export async function getChannelsToClients(req, res) {

    try {
        // FIND ALL CHANNELS
        const channels = await Channel.find({ status: 'approved' }).sort({ cretedAt: -1 })
        // RESPONSE SEND
        res.status(201).json({ success: true, message: 'Channels fetched successfully!', channels })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }

}

// GET ALL CHANNELS
export async function getAllChannels(req, res) {

    try {
        // FIND ALL CHANNELS
        const channels = await Channel.find().sort({ cretedAt: -1 })
        // RESPONSE SEND
        res.status(201).json({ success: true, message: 'Channels fetched successfully!', channels })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }

}

// CHANNEL UPDATE TO APPROVED
export async function approveChannel(req, res) {

    try {
        // GET CHANNEL ID FROM URL
        const { channelID } = req.params
        // FIND AND UPDATE CHANNEL
        const channel = await Channel.findByIdAndUpdate(
            channelID,
            { status: 'approved' },
            { returnDocument: 'after' }
        )
        // IF CHANNEL NOT FOUND
        if (!channel) {
            return res.status(404).json({ success: false, message: 'Channel not found!' })
        }
        // SUCCESS
        res.status(200).json({ success: true, message: 'Channel approved successfully!', channel })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }

}

// CHANNEL UPDATE TO REJECT
export async function rejectChannel(req, res) {

    try {
        // GET CHANNEL ID FROM URL
        const { channelID } = req.params
        // FIND AND UPDATE CHANNEL
        const channel = await Channel.findByIdAndUpdate(
            channelID,
            { status: 'rejected' },
            { returnDocument: 'after' }
        )
        // IF CHANNEL NOT FOUND
        if (!channel) {
            return res.status(404).json({ success: false, message: 'Channel not found!' })
        }
        // SUCCESS
        res.status(200).json({ success: true, message: 'Channel rejected successfully!', channel })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }

}

// CHANNEL DELETE
export async function deleteChannel(req, res) {

    try {
        const { channelID } = req.params
        const channel = await Channel.findByIdAndDelete(channelID)
        if (!channel) {
            return res.status(404).json({ success: false, message: 'Channel not found!' })
        }
        res.status(200).json({ success: true, message: 'Channel deleted successfully!' })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }

}

// UPDATE FOLLOWERS
export async function editFollowers(req, res) {

    try {
        const { channelID } = req.params
        const { followers } = req.body
        if (followers === undefined || followers === null || followers === "") {
            return res.status(400).json({ success: false, message: "Followers value is required!" })
        }

        const followersNumber = Number(followers)

        if (!Number.isInteger(followersNumber) || followersNumber < 0) {
            return res.status(400).json({ success: false, message: "Followers must be a valid positive number!" })
        }

        const channel = await Channel.findByIdAndUpdate(
            channelID,
            { followers: followersNumber },
            { returnDocument: "after" }
        )

        if (!channel) {
            return res.status(404).json({ success: false, message: "Channel not found!" })
        }

        res.status(200).json({ success: true, message: "Followers updated successfully!", channel })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}