import React,{useState} from 'react'
import './Login.scss'

const Login = () => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");


  return (
    <form className="ctn" onSubmit={e=>{
      e.preventDefault();
      console.log("form submitted");
      console.log(email,password);

    }}>
      <input name='email' value={email} placeholder="Email" onChange={e=>{setEmail(e.target.value)}}/>
      <input name='password' value={password} placeholder="Password" type='password' onChange={e=>{setPassword(e.target.value)}}/>
      <button type="submit">
        register

      </button>


    </form>
  )
}

export default Login