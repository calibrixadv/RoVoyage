import fetch from "node-fetch"
import querystring from 'querystring'
import { Headers } from "node-fetch"
export default async function(name:string){
    const url=`https://api.wikimedia.org/core/v1/wikipedia/ro/search/page`
    const obj={"q":name,"limit":100}
    const params="?"+querystring.stringify(obj);
    const header=new Headers()
    header.append('Authorization',`Bearer ${process.env.REACT_APP_WIKI_TOKEN!}`)
    const response=await fetch(url+params,{
        method:"GET",
        headers:header
    })
    const data=await response.text();
    return data


}