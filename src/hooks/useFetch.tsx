import { useEffect, useState } from "react";

interface useFetchI {
  url : string
  method? : string
  body : string
}

interface ErrorI {
  error : string
}
export default function useFetch({url,method,body}:useFetchI) {

  const [data, setData] = useState(null)
  const [isPending, setisPending] = useState(true)
  const [error, setError] = useState<ErrorI | null>(null)
  const interceptor =
  useEffect(() => {
    const fetcher = async(url:string,method='GET')=>{
      try {
        const res = await fetch(url, { 
          method,
          body
        })
      } catch (error:any) {
        console.log(error)
        setisPending(true)
        setError({error:error.message})
      }
    }
    
    fetcher(url,method)

    return () => {
      
    }
  }, [url])
  
  return {data,isPending,error}
}


