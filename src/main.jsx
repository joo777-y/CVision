import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from './context/AppContext.jsx';
import { Toaster } from "react-hot-toast";


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppProvider>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#fff",
            color: "#111",
            borderRadius: "12px",
            padding: "12px 16px",
          },
        }}
      />
    </AppProvider>
  </BrowserRouter>,
)
