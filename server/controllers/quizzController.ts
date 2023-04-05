import {Request,Response} from "express"
import * as fs from "fs"
import * as cheerio from "cheerio"
import { formatDate, getTren, getAutocar } from "../api";
interface ITrain{
  [key:string]:string
}
interface IAutocar{
      vehicle:string,
      city_start:string,
      city_end:string,
      dep_time:string,
      arr_time:string,
      tr_time:string,
      operator:string,
      price:string,
      buy_link?:string,
      dep_location:string,
      arr_location:string,
      route:string,
}

const quizz_response=async(req:Request,res:Response)=>{
  const arr=req.body.cities
  const vehicle=req.body.vehicle;
  let exp:Array<Array<ITrain> | Array<IAutocar>>=[];
  for(var i=0;i<arr.length-1;i++){

    const start_city_name=arr[i]
    const end_city_name=arr[i+1]
    if(vehicle=="tren"){
      const data=await getTren(start_city_name,end_city_name)
      if(data=="Nu sunt trenuri directe.")
      {
        res.status(404).send("Nu sunt trenuri direct")
        return false;
        

      }
      else{
        let found=false

      const json:Array<ITrain>=[]
      const $=cheerio.load(data);
      $("body>table>tbody").find("tr:not(.too_late)").each((index,element)=>{
        const arrival=$(element).find("td.travel_hours>span").text().split("-")[0]
        const dep=$(element).find("td.travel_hours>span").text().split("-")[1]
        const time=parseInt($(element).find("td:nth-child(2)").text().match(/\d\dh/g)![0].replace('h',''));
        const max_time=req.body.max_time;
        if(time<=max_time)
        {
          found=true;
        json.push({
            vehicle:"tren",
            city_start:start_city_name,
            city_end:end_city_name,
            train_name:$(element).find("td.train_name").text(),
            dep_time:dep,
            arr_time:arrival,
            tr_time:$(element).find("td:nth-child(2)").text(),
            operator:$(element).find("td:nth-child(7)").text(),
            price:$(element).find("td:nth-child(6)").text()
        }
        )

        let aux=json[index].price;
        json[index].price=aux.match(/Clasa \d: \d+/g)!.toString()
        if(found)
        {
        exp.push(json)
        return false;
        }
      }
      })
      }
    }
    else if(vehicle=="autocar"){
      const data=await getAutocar(start_city_name,end_city_name)
      const $=cheerio.load(data)
      if( $("#rezultate").length===0)
      {
        res.status(404).send("Nu exista ruta directa!");
        return false;
      }
      else{
      let found=false;

      const json:Array<IAutocar>=[]
      $("#rezultate > div.col-lg-9.results.order-lg-1 > div.parteneri>.result:not(.inactive)").each((index,element)=>{

        let pret=$(element).find(".result-wrap>div.pret>div>span.pretIntreg").text()
        if($(element).find("div.details>div.route>div.info-transportator>div.col-6>h3").text()==="Mirtrans Express")
          pret=$(element).find(".result-wrap>div.pret>div").text()
        let link="Not Found"
        if($(element).find(".result-wrap>.pret>a").attr()!=null)
        {
        Object.values($(element).find(".result-wrap>.pret>a").attr()!).forEach((value)=>{
          if(value.includes("transfer"))
            value=value.split("('")[1];
            value=value.split("')")[0];
            link=value
        })
        }
        const max_time=req.body.max_time;
        const time=parseInt($(element).find(".result-wrap>div.pachet>div.separator>div.durata2").text().match(/\d+h/g)![0])
        if(time<=max_time)
        {
          found=true;
          
         let arrtime="00:00",deptime="00:00"
         try{
          const a=$(element).find(".result-wrap>div.pachet>.ora").text().replaceAll(/(\n|\t)+)/g,"")
          const b=$(element).find(".result-wrap>div.ora-s").text().replaceAll(/(\n|\t)+/g,"")
          if(a!=="")
          arrtime=a;
          if(b!=="")
          deptime=b;
         }
         catch{

         }
         
        json.push({
            vehicle:"autocar",
            city_start:start_city_name,
            city_end:end_city_name,
            arr_time:arrtime,
            dep_time:deptime,
            tr_time:$(element).find(".result-wrap>div.pachet>div.separator>div.durata2").text(),
            operator:$(element).find("div.details>div.route>div.info-transportator>div.col-6>h3").text(),
            price:pret,
            buy_link:link,
            dep_location:$(element).find(".details>.route>ol>li:nth-child(1)>.timeline-content>span").text(),
            route:$(element).find(".details>.route>ol>li:nth-child(2)>.timeline-content>div").text().replaceAll(/(\n|\t)+/g,""),
            arr_location:$(element).find(".details>.route>ol>li:nth-child(3)>.timeline-content>span").text()
        })
        if(found){
          exp.push(json);
        return false;
        }
        }
      })

      }
    }
    else if(req.body.vehicle=="none")
    {
      res.status(404).send("Vehicle not specified!")
    }
    else
      res.status(404).send("Car route not yet implemented!")
    console.log(exp)
    res.status(201).send(exp)


  }
  }
export default {quizz_response};