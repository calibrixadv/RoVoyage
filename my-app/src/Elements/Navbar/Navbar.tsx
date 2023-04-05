import React, { useState , useEffect} from 'react'
import {  useNavigate } from 'react-router-dom'
import {motion} from "framer-motion"

import {TbTrademark,TbSearch} from "react-icons/tb"
import {IoIosRefresh}from "react-icons/io"
import {HiMenuAlt4, HiX} from "react-icons/hi"

import City from '../../api/City'
import "./Navbar.scss"

const Navbar = () => {
    const [link, setLink] = useState('')
    const [search,setSearch]=useState('')
    const [param,setParam]=useState('/NotFound')
    const [loading,isLoading]=useState(false)
    const [toggle,setToggle]=useState(false)
    const navigate=useNavigate();
    function getRandomInt(max:number) {
        return Math.floor(Math.random() * max);
    }
    function getKeyByValue(object:any, value:any) {
        return Object.keys(object).find((key:any) => object[key] === value);
        }
    function removeDia(str:string){
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    }
    useEffect(() => {
        const random=getRandomInt(42);
        Object.keys(City.data).forEach((elem,index)=>{
            if(index===random)
                setLink("/city/"+elem)
        })
    }, [])
    const handleSearch=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setSearch(e.target.value)
    }
    const handleSubmit=async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        isLoading(true)
        Object.keys(City.data).forEach((key)=>{
            if(key.toLowerCase()===removeDia(search).toLowerCase())
                setParam("/city/"+key)
        })
        Object.values(City.data).forEach((value)=>{
            if(removeDia(value).toLowerCase()==removeDia(search).toLowerCase())
            {
                setParam("/city/"+getKeyByValue(City.data,value))
            }
        })
        isLoading(false)
    }
    useEffect(() => {
        if(param!=="/NotFound")
        {
            navigate(param)
            window.location.reload()
        }
        else{
            isLoading(false)
        }
    }, [param])
    

  return (
    <nav className='flex'>
        <div className='flex dsk'>

        <a className='nav-a flex' href='/quizz'>
            <button className='button-primary flex nav-tm'><p>tripquizz</p><TbTrademark/></button>
        </a>
        <form className='flex nav-ctn' onSubmit={handleSubmit}>
            <input className='nav-input' name='nav-search' onChange={handleSearch} value={search}/>
            <button className='nav-btn-wrap' type="submit">
                <TbSearch className='nav-icon'/>
            </button>
        </form>

        <a className='nav-a flex' href={link}>
        <button className='button-primary nav-qz'><p>exploreaza</p></button>
        {
            loading?
            <IoIosRefresh className='loading'/>:
            <></>
            
        }
        </a>
        </div>
        <div className='nav-menu'>
            {toggle?
            <></>:
            <HiMenuAlt4 onClick={()=>setToggle(true)} />

            }
            {
                toggle &&(
                    <motion.div
                        whileInView={{ x: [300, 0] }}
                        className='nav-menu-ctn'
                        transition={{ duration: 0.85, ease: 'easeOut' }}
                    >
                        <HiX onClick={() => setToggle(false)}  className='nav-close'/>
                        <a className='nav-a flex nav-phn' href='/quizz'>
                            <button className='button-primary flex nav-tm nav-phn'><p>tripquizz</p><TbTrademark/></button>
                        </a>
                        <form className='flex nav-ctn nav-phn' onSubmit={handleSubmit}>
                            <input className='nav-input nav-phn' name='nav-search' onChange={handleSearch} value={search}/>
                            <button className='nav-btn-wrap nah-phn' type="submit">
                            <TbSearch className='nav-icon'/>
                            </button>
                        </form>
                        <a className='nav-a flex nav-phn' href={link}>
                            <button className='button-primary nav-qz nav-phn'><p>exploreaza</p></button>

                        </a>
                            </motion.div>


            )
            }

        </div>
    </nav>
  )
}

export default Navbar