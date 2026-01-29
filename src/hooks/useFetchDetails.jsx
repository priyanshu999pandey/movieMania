import { useEffect, useState } from "react"
import axios from "axios"

const useFetchDetails=(endpoint)=>{

      const [data,setData] = useState([])
      const [loading,setLoading] = useState(false)

      const fetchData = async()=>{
        try{
            const response = await axios.get(endpoint)
           
             setData(response.data)
        }catch(err){
          console.log(err)
        }
    }

      useEffect( ()=>{
        fetchData();       
      },[endpoint])

      return{data,loading}
}
export default useFetchDetails