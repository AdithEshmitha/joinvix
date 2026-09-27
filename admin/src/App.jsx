import { ToastContainer } from 'react-toastify'
import { Routes, Route } from 'react-router-dom'

import Login from './pages/Login'
import Dahsboard from './pages/Dahsboard'
import AdminApp from './pages/AdminApp'
import Channels from './pages/Channels'
import PendingChannels from './pages/PendingChannels'
import ManageChannels from './pages/ManageChannels'

const App = () => {


  return (
    <>
      <ToastContainer />

      <Routes>

        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<AdminApp />}>

          <Route index element={<Dahsboard />} />
          <Route path='channels' element={<Channels />} />
          <Route path='pending-channels' element={<PendingChannels />} />
          <Route path='manage-channels' element={<ManageChannels />} />

        </Route>

      </Routes >
    </>
  )
}

export default App
