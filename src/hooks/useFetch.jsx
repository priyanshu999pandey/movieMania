import { useEffect, useState } from "react"
import axios from "axios"

const useFetch=(endpoint)=>{
      const [data,setData] = useState([])
      const [loading,setLoading] = useState(false)

      const fetchData = async()=>{
        try{
            const response =  axios.get(endpoint)
           
             setData((await response).data.results)
        }catch(err){
          console.log(err)
        }
      }
      
      useEffect( ()=>{
        fetchData()
      },[endpoint])


      return{data,loading}
}
export default useFetch