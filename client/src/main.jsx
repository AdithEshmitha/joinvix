import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import ChannelProvider from './context/channelContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <ChannelProvider>
        <App />
      </ChannelProvider>
    </StrictMode>
  </BrowserRouter>,
)
