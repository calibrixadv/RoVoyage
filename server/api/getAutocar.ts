import * as fs from "fs"
import fetch from "node-fetch";
export default async function(start_city_name: string,end_city_name: string){
      let start_param,end_param;
      if(start_city_name.includes(" ")){
         start_param=start_city_name.split(" ")[0]
      }
      else start_param=start_city_name
      if(end_city_name.includes(" ")){
        end_param=end_city_name.split(" ")[0]
      }
      else end_param=end_city_name
    const response=await fetch(`https://www.autogari.ro/Transport/${start_param}-${end_param}?lang=ro`,{
        method:"GET",
    })
    const data=await response.text()
    fs.writeFileSync("\output.html",data)
    return data
}