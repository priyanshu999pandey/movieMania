import Navbar from "./components/Navbar"
import { Routes,Route } from "react-router-dom"
import Home from "./pages/Home"
import DetailsPage from "./pages/DetailsPage"
import ExplorePage from "./pages/ExplorePage"
import SearchPage from "./pages/SearchPage"
import MobileNavigation from "./components/MobileNavigation"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setBannerData,setImageURL } from "./store/movieoSlice"
import Footer from "./components/Footer"


function App() {

  const dispatch =useDispatch();
  // Adding comment
  const fetchTrendingData = async()=>{
    try{

      const response = await axios.get("/trending/all/week");
      dispatch(setBannerData(response?.data?.results))
      // console.log(response.data.results);

    }catch(err){
      console.log("error in fetching : ",err)
    }
  }

  const fetchConfiguration = async()=>{
    try{
        const response = await axios.get("/configuration")
        dispatch(setImageURL(response.data.images.secure_base_url+"original"))
        
    }catch(err){
      console.log("error : ",err)
    }
  }

  useEffect(()=>{
    fetchTrendingData();
    fetchConfiguration();
  })
  

  return (
    <div className="text-white ">
     <div>
       <Navbar></Navbar>
     </div>

      <div className="">
        <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route index element={<Home />} />
        <Route path=":explore/:id" element={<DetailsPage></DetailsPage>} />
        <Route path=":explore" element={<ExplorePage></ExplorePage>} />
        <Route path="/search" element={<SearchPage></SearchPage>} />
        <Route />
      </Routes>
      </div>

      {/* <div className="">
        <Footer></Footer>
      </div> */}

      <div className="lg:hidden">
        
        <MobileNavigation></MobileNavigation>
      </div>

    </div>
  )
}

export default App
