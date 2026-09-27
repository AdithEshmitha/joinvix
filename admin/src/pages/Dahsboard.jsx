import { useEffect } from "react"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const Dahsboard = () => {

    const navigate = useNavigate()

    const token = localStorage.getItem('admin_token')

    const checkAuth = async () => {

        try {
            if (!token || token === null) {
                toast.error('Access Denied!')
                navigate('/login')
                return
            }
        } catch (error) {
            toast.error(error.message)
        }

    }

    useEffect(() => {
        checkAuth()
    }, [token])


    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    )
}

export default Dahsboard
