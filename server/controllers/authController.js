import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


export const loginAdmin = async (req, res) => {

    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(404).json({ success: false, message: 'Email and Password required!' })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ success: false, message: 'Invalid Email or Password!' })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            return res.status(404).json({ success: false, message: 'Invalid Email or Password!' })
        }

        if (user.role !== 'admin') {
            return res.status(404).json({ success: false, message: 'Access Denied!' })
        }

        const token = jwt.sign({
            userId: user._id,
            role: user.role
        }, process.env.JWT_SECRET, { expiresIn: '7d' })

        res.status(201).json({ success: true, message: 'Login Successfull!', token, user })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }

}