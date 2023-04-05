import { Request,Response } from "express";
import * as cheerio from "cheerio"
import { getWiki } from "../api";
import fs from "fs"
const str=(str1:string)=>{
    return str1.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}
const getData=async(req:Request,res:Response)=>{
    const name:string=str(req.body.name)
    const data=JSON.parse(await getWiki(name));
    let target: any
    data.pages.forEach((result:any)=>{
        if(str(result.key).match(/(t|T)urism/g))
            target=result
    })
    if(!target){
        data.pages.forEach((result:any)=>{
            if(str(result.key).match(/(m|M)uzee/g))
                target=result
        })
    }
    if(!target){
        res.status(201).send(data.pages)
    }
    else{
        res.status(201).send(target)
    }
    

    
}
export default {getData}