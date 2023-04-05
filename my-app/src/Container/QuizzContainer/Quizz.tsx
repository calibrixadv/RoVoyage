import React, { useState, useEffect, FormEvent } from 'react'
import {useNavigate} from "react-router-dom"
import Cookies from 'universal-cookie';


import "./Quizz.scss";
import formatDate from '../../methods/formatDate';
import {TbTrademark} from "react-icons/tb"
import {IoIosRefresh} from "react-icons/io"

const Quizz = () => {
    const navigate=useNavigate()
    const [loading,isLoading]=useState(false)
    const [form, setForm] = useState({
        vehicle:"none",
        tags:[""],
        city_number:0,
        city_start:"Galati",
        max_time: 0,
        departure_date:formatDate(new Date()),
        city_end:"Bucuresti Nord"
    })
    const handleChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
        const prop=event.target.name
        if(prop==="tags"){
            let data=form["tags"]
            if(event.target.checked)
                data.push(event.target.value)
            else data=data.filter(i=>i!==event.target.value)
            setForm({...form,[event.target.name]:data})
        }
        else setForm({...form,[event.target.name]:event.target.value})
    }
    useEffect(() => {
        console.table(form)
    }, [form])
    const handleSubmit=async (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        isLoading(true);
        const response=await fetch("http://localhost:5555/quizz-response",{
            method:"POST",
            headers: {
                    "Content-Type": "application/json",
                },
            body:JSON.stringify(form)
        })
        isLoading(false)
        if(await response.status==201)
        {
            isLoading(false)
            const data=JSON.parse(await response.text())
            const cookies=new Cookies();
            cookies.remove("data")
            cookies.set('data', data[1])
            navigate("/createdRoute");
        }
        else alert(JSON.stringify(await response.text()))
        

    }
  return (
    <div className='main-ctn flex column'>
        <div className='flex quizz-div'>
            <h3 className='quizz-h3'>TRIPQUIZZ</h3>
            <TbTrademark className='icon'/>
        </div>
       
       <form onSubmit={handleSubmit} className='flex column'>
           <div className='question-ctn'>
               <label  className='label-question'>Cu ce mijloc de transport doriti sa calatoriti?</label>
               <div className='flex column'>
                   <div className='flex radio-ctn'>
                       <label htmlFor="transport-1">Masina personala</label>
                       <input className="quizz-input"  name='vehicle'id="transport-1" type='radio' value="masina" onChange={handleChange}/>
                   </div>
                   <div className='flex radio-ctn'>
                       <label htmlFor="transport-2">Tren</label>
                       <input  className="quizz-input" name='vehicle' id="transport-1" type='radio' value="tren" onChange={handleChange}/>
                   </div>
                   <div className='flex radio-ctn'>
                       <label htmlFor="transport-3">Autocar</label>
                       <input className="quizz-input"  name='vehicle'id="transport-1" type='radio' value="autocar" onChange={handleChange}/>
                   </div>
               </div>
           </div>
           <div className='question-ctn'>
               <label className='label-question'>Ce doriti sa vedeti in calatoria dumneavoastra?</label>
               <div className='flex column'>
                   <div className='flex radio-ctn'>
                       <label htmlFor="choice-1">Peisaje montane</label>
                       <input className="quizz-input"  name='tags'id="choice-1" type='checkbox' value="montan" onChange={handleChange}/>
                   </div>
                   <div className='flex radio-ctn'>
                       <label htmlFor="choice-2">Peisaje maritime</label>
                       <input className="quizz-input"  name='tags' id="choice-2" type='checkbox' value="plaja" onChange={handleChange}/>
                   </div>
                   <div className='flex radio-ctn'>
                       <label htmlFor="choice-3">Centre comerciale</label>
                       <input  className="quizz-input" name='tags'id="choice-3" type='checkbox' value="comercial" onChange={handleChange}/>
                   </div>
                   <div className='flex radio-ctn'>
                       <label htmlFor="choice-4">Orase moderne</label>
                       <input  className="quizz-input" name='tags'id="choice-4" type='checkbox' value="modern" onChange={handleChange}/>
                   </div>
               </div>
           </div>
           <div className='question-ctn'>
               <label className='label-question'>Cum doriti sa va petreceti timpul in calatoria dumneavoastra?</label>
               <div className='flex column'>
                <div className='flex radio-ctn'>
                       <label htmlFor="choice-5">Relaxandu-ma</label>
                       <input  className="quizz-input" name='tags'id="choice-5" type='checkbox' value="relax" onChange={handleChange}/>
                   </div>
                   <div className='flex radio-ctn'>
                       <label htmlFor="choice-6">Practicand sporturi extreme</label>
                       <input  className="quizz-input" name='tags' id="choice-6" type='checkbox' value="sport" onChange={handleChange}/>
                   </div>
                   <div className='flex radio-ctn'>
                       <label htmlFor="choice-7">innotand</label>
                       <input  className="quizz-input" name='tags'id="choice-7" type='checkbox' value="swim" onChange={handleChange}/>
                   </div>
                   <div className='flex radio-ctn'>
                       <label htmlFor="choice-8">Facand cumparaturi</label>
                       <input  className="quizz-input" name='tags'id="choice-8" type='checkbox' value="shopping" onChange={handleChange}/>
                   </div>
               </div>
           </div>
           <div className='question-ctn input-ctn'>
               <label className='label-question' htmlFor='city_number'>Prin cate orase doriti sa calatoriti?</label>
               <input className="little-input quizz-input" type='number' name='city_number' id='city_number' min="1" max="5" onChange={handleChange}/>
           </div>
           <div className='input-ctn question-ctn'>
               <label  className='label-question' htmlFor='city_start'>Din ce oras doriti sa plecati?</label>
               <input type='text' className="quizz-input"  name='city_start' id='city_start' onChange={handleChange}/>
           </div>
           <div className='input-ctn question-ctn'>
               <label className='label-question' htmlFor='max_time'>Care este numarul de ore maxim pe care doriti sa il petreceti pe un drum?</label>
               <input className="little-input quizz-input" type='number'onChange={handleChange} name='max_time' id='max_time'  min="1"/>
            </div>
           <div className='input-ctn question-ctn'>
               <label className='label-question' htmlFor='date'>in ce data doriti sa plecati??</label>
               <input  type='date' className="quizz-input"  onChange={handleChange} name='departure_date' id='date'  min="1"/>
            </div>
                {loading?
                    <button className='button-primary transparent'>
                        <IoIosRefresh className='loading'/>
                    </button>
                :
                    <button className='button-primary'>
                        <p>Submit</p>
                    </button>
            }
        </form>
    </div>
  )
}

export default Quizz