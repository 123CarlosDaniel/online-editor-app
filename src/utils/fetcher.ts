interface fetcherParamsI {
  url : string
  method?: string
  body? : string
}

interface DataI {
  token : string
  user : {contacts:string[], email : string, userName:string, _id : string}
}

interface fetcherResolveI {
  data : DataI
  error : string | null
}

export default async function fetcher({url,method,body}:fetcherParamsI) : Promise<fetcherResolveI> {
  let data = null
  try {
    const res = await fetch(url, {
      method,
      body,
      credentials:'include',
      headers : {
        'Content-Type':'application/json'
      },
    })
    if (!res.ok) {
      throw new Error(res.statusText)
    }
    data = await res.json()
    return {
      data,
      error : null
    }
  } catch (error:any) {
    return {
      data,
      error : error.message
    }
  }
}