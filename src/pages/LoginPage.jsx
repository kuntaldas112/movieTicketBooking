import React ,{useState,useEffect, useContext} from 'react'
import {useNavigate,useLocation} from 'react-router-dom'
import { LOGGED_IN_ADMIN, LOGGED_IN_USER, userContext } from '../AppContext';
import Backdrop from '../component/Backdrop';
import FormInput from '../component/FormInput';
import PopUp from '../component/modal/PopUp';
import { API_URL } from '../constants';

export default function LoginPage() {
  const{state}=useLocation();
  const {dispatch}=useContext(userContext);
  
  const [stateMessage,setStateMessage]=useState("");
  const [responseMessage,setResponseMessage]=useState("")
  const navigate=useNavigate();
  const [loginObj,setLoginObj]=useState(
    {
     loginId:"",
     password:""
    }
)
  const changeHandler=(e)=>{
    setLoginObj({...loginObj,[e.target.name]:e.target.value})
}
  const loginInputs=[
    {
     type:"text",
     label:"Username",
     name:"loginId" ,
     id:"username" ,
     required:true,
     autoFocus:true,
     errorMessage:"Please enter username"
    },
    {
      type:"password",
      label:"Password",
      name:"password",
       id:"password",
       required:true,
       errorMessage:"Please enter password"
    }

  ]
 useEffect(()=>{
   if(state && state.message)
      setStateMessage(state.message);
 },[])
  const formSubmit=(e)=>{
    e.preventDefault();
    const requestOptions={
      method:'POST',
      headers:{'content-type':'application/json'},
      body:JSON.stringify(loginObj)
    }
   
fetch(`${API_URL}/api/v1.0/moviebooking/login`,requestOptions)
.then(res=>res.json())
.then(token=>{
  if(token.error){
    setResponseMessage(token.message);
    return;
  }
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
          {
            loginInputs.map(input=>{

              return <FormInput 
                            key={input.id}   
                            {...input} value={loginObj[input.name]} 
                            onChange={(e)=>changeHandler(e)}/>
            })
          }
          <button className='loginBtn btn btn-primary' >Login</button>
        </form>
        {
          responseMessage?.length>=1&&
          <Backdrop>
            <PopUp color="red" message={responseMessage} closeHandler={()=>setResponseMessage("")}></PopUp>
          </Backdrop>
        }
      </div>
    
  )
}
