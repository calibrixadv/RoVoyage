import React,{ChangeEvent, FormEvent, useEffect, useState}  from 'react'
import "./FormContainer.scss"


const FormConatiner = () => {
    const [number,setNumber]=useState(0) 
    const [arr,setArr]=useState<Array<string>>([])
    useEffect(() => {
        console.log(number)
    
    }, [number])
    useEffect(() => {
        console.log(arr)
    
    }, [arr])
    const handleChange=(index:number)=> (e:ChangeEvent<HTMLInputElement>) =>{
        let newArr:Array<string>=[...arr]
        newArr[index]=e.target.value;
        setArr(newArr);
    }
    const handleSubmit=(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const form={
            cities:arr,
            vehicle:"tren",
            max_time:20,
            

        }

    }
    
  return (
    <div className='form-main'>
        <form onSubmit={handleSubmit}>
            <input type="number" name="city_number" onChange={(e)=>{
                const sample=parseInt(e!.target.value)
                if(e.target.value.trim().length==0)
                setNumber(0)
                else if(sample>5 || sample<0)
                setNumber(5)
                else setNumber(sample)
            }
                } value={number} min="0" max="5"/>
            {
                Array.from(Array(number).keys()).map((index)=>(
                    <div className='form-div-gen'>
                        <input type="text" name={"city"+index} key={index} onChange={handleChange(index)} />

                    </div>
                ))
            }
            <button type='submit'>Submit</button>
        </form>

    </div>
  )
}

export default FormConatiner