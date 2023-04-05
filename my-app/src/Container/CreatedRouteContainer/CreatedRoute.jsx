import React,{useState,useEffect} from 'react'
import './CreatedRoute.scss'
import Cookies from "universal-cookie"
import {ReactComponent as Image } from "../../images/image 1.svg"
import { BsTrainFreightFront,BsTruckFront,BsCarFront} from "react-icons/bs"


const CreatedRoute = () => {
    const cookie=new Cookies();
    const data=cookie.get("data")
    console.log(data)
    const [student,isStudent]=useState(false);
    const handleChange=(e)=>{
        isStudent(e.target.checked);
    }
    useEffect(() => {
        const prices=data.price?.match(/\d{2,10}/g);
        console.log(prices)
        let arr=[]
        document.getElementById("target-prices").innerText='Preturi:';
        if(student){
            prices.forEach((value)=>{
                arr.push(parseInt(value)/2)
            })
        }
        else arr=prices;
        try{
            arr.forEach((elem,index)=>{
                document.getElementById("target-prices").innerText+=`Clasa ${index+1}: ${elem} RON/`;
            })
        }
        catch(err){
                document.getElementById("target-prices").innerText="EROARE";

        }
        


    }, [student])
    

  return (
    <div className='main-ctn '>
        <header className='flex column justify-start route-header'>
            <h2 className='route-h2'>traseul dumneavoastra este...</h2>
            <h3 className="route-h3" id="route-target">{data.city_start} - {data.city_end}</h3>
        </header>
        <main className='flex'>
            <div className='flex column'>
                <Image className="image"/>
                <h2 className='route-h2' >si veti ajunge in locurile dorite cu...</h2>
                <div className='flex'>
                    {data.vehicle==="tren"?
                    <BsTrainFreightFront className='icon'/>:
                    data.vehicle==="autocar"?
                    <BsTruckFront className='icon'/>
                    :
                    <BsCarFront className='icon'/>

                }
                    <h2 className='route-h2'>{data.vehicle}</h2>
                </div>
                <div className="flex column p-ctn">
                    <p>{data.vehicle}ul ajunge in {data.city_start} la {data.arr_time?.match(/\d\d:\d\d/g)}</p>
                    <p className='-time'>{data.vehicle}ul ajunge in {data.city_end} la {data.dep_time?.match(/\d\d:\d\d/g)}</p>
                    {data.operator?
                    <p className='arrival-time'>Operat de {data.operator}</p>:
                    <></>}
                    {

                        data.vehicle=="tren"?
                    <div className='flex'>
                        <input type="checkbox" onChange={handleChange} value={student} id='student'/>
                        <label htmlFor="student">Student?</label>
                    </div>:
                    <></>
                    }
                    <p id='target-prices'></p>
                </div>

            {
                data.vehicle==="tren"?
                <a className='reservation route-a' href={`https://bilete.cfrcalatori.ro/ro-RO/Tren/${data.train_name.split(" ")[1]}`}><button className='button-primary'><p>Rezerva</p></button></a>:
                data.buy_link!=="Not Found"?
                <a className="reservation route-a" href={data.buy_link} target='_blank'><button className='button-primary'><p>Rezerva</p></button></a>:
                <></>
            }
            </div>
            <div className='flex column ctn'>
                <h4 className='route-h4'>Principalele Atractii</h4>
                <div id="atractii-target" className='flex'>
                    <dl className='flex column'>
                        <dt className='city_name'>{data.city_start}</dt>
                            <dd>Atractia 1</dd>
                            <dd>Atractia 2</dd>
                            <dd>Atractia 3</dd>
                    </dl>
                    <a target="_blank" className='route-a' href={`https://ro.wikipedia.org/wiki/${data.city_start}`}><button className='button-primary'><p>Detalii despre {data.city_start}</p></button></a>
                </div>
                <div className='flex'>
                    <dl className='flex column'>
                        <dt className='city_name'>{data.city_end}</dt>
                            <dd>Atractia 1</dd>
                            <dd>Atractia 2</dd>
                            <dd>Atractia 3</dd>
                    </dl>
                    <a target="_blank" className='route-a'  href={`https://ro.wikipedia.org/wiki/${data.city_end}`}><button className='button-primary'><p>Detalii despre {data.city_end}</p></button></a>
                </div>
            </div>
        </main>
    </div>
  )
}

export default CreatedRoute