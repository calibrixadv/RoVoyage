import City from "../resources/train";
import fetch from "node-fetch";
export default async function(start_city_name:string,end_city_name:string){
    let bodyContent = new URLSearchParams();
    bodyContent.append("action", "route");
    bodyContent.append("search[CodStaOrigine]", City.data[start_city_name]);
    bodyContent.append("search[CodStaDest]", City.data[end_city_name]);
    bodyContent.append("date", "2023-04-04 10:47:30");

    const response = await fetch("https://mersultrenurilor.ro/wp-admin/admin-ajax.php", { 
        method: "POST",
        body: bodyContent,
    });
    const data =await response.text();
    return data
}