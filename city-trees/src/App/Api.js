
// import React from 'react'
import { capitalize } from './Shared'


export const apiSearch = srch => {
  // console.log(srch)
   
    const baseURL =
      `https://data.cityofnewyork.us/resource/5rq2-4hqu.json?` +
      `$limit=1000` +
      `&$order=address` +
      `&$where=`

    const params = ["address", "spc_latin", "spc_common", "zipcode", "nta_name"]
    let str = "", orTail
    let cases = params.forEach((e, i) => {
      if ((i === params.length - 1)) {
        orTail = ``
      } else {
        orTail = `or `
      }
      if(e === 'address'){
        str+=`${e}%20like%20%27%25${srch.toUpperCase()}%25%27` +
        orTail
      }else if(e === 'nta_name'){
        str+=`${e}%20like%20%27%25${capitalize(srch)}%25%27` +
        orTail
      }else{
        str +=
        `${e}%20like%20%27%25${srch.toUpperCase()}%25%27` +
        `or ` +
        `${e}%20like%20%27%25${srch.toLowerCase()}%25%27` +
        `or ` +
        `${e}%20like%20%27%25${capitalize(srch)}%25%27` +
         orTail
      }
      
    })
    return baseURL + str

}


export const apiSelection = (srch, type) => {
  const baseURL =
  `https://data.cityofnewyork.us/resource/5rq2-4hqu.json?` +
  `$limit=1000` +
  `&$where=${type}%20like%20%27%25${srch}%25%27`

  return baseURL
}