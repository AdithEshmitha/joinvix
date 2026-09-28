// IMPORT LIBRARY
import express from 'express'
import { addNewChannel, approveChannel, deleteChannel, editFollowers, getAllChannels, getChannelsToClients, rejectChannel } from '../controllers/channelController.js'
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const channelRoutes = express.Router()

// REST API's
// PUBLIC
channelRoutes.post('/add-channel', addNewChannel)
channelRoutes.get('/get-channels', getChannelsToClients)
// ADMIN
channelRoutes.get('/admin/get-all-channels', authMiddleware, adminMiddleware, getAllChannels)
channelRoutes.put('/admin/approve-channel/:channelID', authMiddleware, adminMiddleware, approveChannel)
channelRoutes.put('/admin/reject-channel/:channelID', authMiddleware, adminMiddleware, rejectChannel)
channelRoutes.put('/admin/update-followers/:channelID', authMiddleware, adminMiddleware, editFollowers)
channelRoutes.delete('/admin/delete-channel/:channelID', authMiddleware, adminMiddleware, deleteChannel)

// EXPORT FUCTION
export default channelRoutes