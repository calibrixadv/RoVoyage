import React, { useEffect, useState } from 'react'
import "./CityContext.scss"
import { useParams } from 'react-router-dom'
import City from '../../api/City'
import {IoIosRefresh} from "react-icons/io"

const CityContainer = () => {
    const {id}=useParams()
    const name=City.data[id!]
    const [loading,isLoading]=useState(true)
    const [data,setData]=useState([""])
    const handleGetData=async(name:string) => {
        isLoading(true);
        if(name)
        {

        const response=await fetch("http://localhost:5555/city-post",{
            method:"POST",
            headers: {
                    "Content-Type": "application/json",
            },
            body:JSON.stringify({
                name:name
            })
        })

        let sample=(await response.text()).toString();
        setData(eval(sample))
        }
        else {
            const err=document.createElement("p")
            err.textContent="ERROR:City not found"
            err.className="error"
            document.body.innerHTML=""
            document.body.appendChild(err)
        }
        isLoading(false);

        
    }
    useEffect(()=>{
            handleGetData(name);
    },[])
    useEffect(()=>{
        const target=document.getElementById("target");
        if(target){
        target!.innerHTML='';
        }
        const nameElement=document.createElement("h2")
        nameElement.textContent=name
        nameElement.className="city-h2 shadow"
        target?.appendChild(nameElement)
        data.forEach((index:any)=>{
            Object.keys(index).forEach((key)=>{
                if(key=="excerpt")
                {

                const valueElement=document.createElement("p")
                valueElement.className="value"
                try{
                    valueElement.textContent=index.title!.toString()
                    //.replaceAll('<span class="searchmatch">'," ").replaceAll('</span>'," ")
                }
                catch{
                    valueElement.textContent=index.title!
                    //.replaceAll('<span class="searchmatch">'," ").replaceAll('</span>'," ")
                }

                const container=document.createElement("div")
                const link=document.createElement("a")
                link.href=`https://ro.wikipedia.org/wiki/${index.title}`
                link.className="city-a"
                link.appendChild(valueElement)
                container.className="gen-ctn"
                container.appendChild(link)
                target?.appendChild(container)
                }
            })
        })
    },[data])


  return (
<div className='main-ctn'>
    {
    loading?
    <IoIosRefresh className='loading'/>
    :

    <div id="target" className='flex column'>

    </div>

    }
    </div>
  )
}

export default CityContainer