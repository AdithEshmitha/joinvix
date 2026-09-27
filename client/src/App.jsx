import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import './index.css'
import ExlorePage from './pages/ExlorePage'
import Footer from './components/Footer'
import AddChannel from './pages/AddChannel'
import FourZeroFourPage from './pages/FourZeroFourPage'

const App = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<ExlorePage />} />
        <Route path="/add-channel" element={<AddChannel />} />
        <Route path="*" element={<FourZeroFourPage />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App