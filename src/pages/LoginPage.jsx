import React ,{useState,useEffect, useContext} from 'react'
import {useNavigate,useLocation} from 'react-router-dom'
import { LOGGED_IN_ADMIN, LOGGED_IN_USER, userContext } from '../AppContext';

export default function LoginPage() {
  const{state}=useLocation();
  const {dispatch}=useContext(userContext);
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const [stateMessage,setStateMessage]=useState("");

  const navigate=useNavigate();
 useEffect(()=>{
   if(state && state.message)
      setStateMessage(state.message);
 },[])
  const formSubmit=(e)=>{
    e.preventDefault();
    const requestOptions={
      method:'POST',
      headers:{'content-type':'application/json'},
      body:JSON.stringify({
        loginId:username,
        password:password
      })
    }
   
fetch("http://localhost:8081/api/v1.0/moviebooking/login",requestOptions)
.then(res=>res.json())
.then(token=>{
  localStorage.setItem('userInfo',JSON.stringify(token));
  if(token.roles.indexOf("ROLE_ADMIN")!==-1)
  dispatch({type:LOGGED_IN_ADMIN})
  else
  dispatch({type:LOGGED_IN_USER})
  navigate('/')
})
  }
  return (
 
      <div className="container form_container">
        <form className="form" onSubmit={formSubmit}>
          {stateMessage!=="" && <h6 style={{color:"red"}}>{stateMessage}</h6>}
          <div className="inputContainer">
            <label htmlFor="username">Username</label>
            <input
             type="text"
              name="username" 
              id="username" 
              value={username}
              onChange={e=>setUsername(e.target.value)}
              required
              autoFocus
              />
          </div>
          <div className="inputContainer">
            <label htmlFor="password">Password</label>
            <input
             type="password"
              name="password"
               id="password"
               value={password}
               onChange={e=>setPassword(e.target.value)}
               required
                />
          </div>
          <button className='loginBtn' >Login</button>
        </form>
      </div>
    
  )
}
