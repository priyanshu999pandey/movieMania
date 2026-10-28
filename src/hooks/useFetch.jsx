import { useEffect, useState } from "react"
import axios from "axios"

const useFetch=(endpoint)=>{
      const [data,setData] = useState([])
      const [loading,setLoading] = useState(true)
      
      useEffect( ()=>{
        const controller = new AbortController()

        const fetchData = async()=>{
          setLoading(true)
          try{
            const response = await axios.get(endpoint, { signal: controller.signal })
            setData(response.data.results || [])
          }catch(err){
            if (err.name !== "CanceledError") console.log(err)
          }finally{
            if (!controller.signal.aborted) setLoading(false)
          }
        }

        fetchData()
        return () => controller.abort()
      },[endpoint])


      return{data,loading}
}
export default useFetch
