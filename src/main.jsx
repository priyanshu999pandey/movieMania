import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import axios from "axios"
import { store } from './store/store.js'
import { Provider } from 'react-redux'

axios.defaults.baseURL = "https://api.themoviedb.org/3"
axios.defaults.headers.common["Authorization"] = `Bearer ${import.meta.env.VITE_APP_ACCESS_TOKEN} `

createRoot(document.getElementById('root')).render(

   <BrowserRouter>
    <Provider store={store} >
      <App></App>
    </Provider>
   </BrowserRouter>
  
)
