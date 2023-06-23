import React,{useState,useEffect} from 'react'
import {useLocation, useNavigate}from 'react-router-dom'
import Backdrop from '../component/Backdrop';
import FormInput from '../component/FormInput';
import PopUp from '../component/modal/PopUp';
import { API_URL } from '../constants';
function BookingForm() {
   const{state}=useLocation();
   const navigate=useNavigate();
   
 useEffect(() => {
    if(!state || !state.movieName){
        navigate('/')
  }
  if(state?.movieName!==bookObj.movieName) window.location.reload()
 },[state]);
   const [bookResponse,setBookResponse]=useState({});
   const [bookObj,setBookObj]=useState(
       {
        loginId:JSON.parse(localStorage.getItem('userInfo'))?.username,
        movieName:state?.movieName,
        theatreName:state?.theatreName,
        noOfTickets:"",
        seatNumber:[]
       }
   )
   const bookingFormInputs=[
       {
        id:1,
        type:"text" ,
        name:"loginId",
        placeholder:"loginId",
        label:"Username",
        disabled:true,
        readOnly:true
       },
       {
        id:2,
        type:"text" ,
        name:"movieName",
        placeholder:"movieName",
        label:"Movie Name",
        disabled:true,
        readOnly:true
       },
       {
        id:3,
        type:"text" ,
        name:"theatreName",
        placeholder:"theatreName",
        label:"Theatre Name",
        disabled:true
       },
       {
        id:4,
        type:"number" ,
        name:"noOfTickets",
        placeholder:"noOfTickets",
        label:"noOfTickets",
        errorMessage:"It is mandatory",
        required:true,
        autoFocus:true
       },
       {
        id:5,
        type:"text" ,
        name:"seatNumber",
        placeholder:"seatNumber",
        errorMessage:"It should contain only 'numbers' and 'space'",
        label:"Seat Numbers",
        pattern:"^([0-9 ])+$",
        required:true
       }
   ]
const submitHandler=(e)=>{
    e.preventDefault();
   
    let values=bookObj['seatNumber'].split(" ")
    bookObj['seatNumber']=[...values]

    fetch(`${API_URL}/api/v1.0/moviebooking/${bookObj.movieName}/book`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.accessToken}`,
          },
        body: JSON.stringify(bookObj)
    })
    .then(res=>res.json())
    .then(response=>{
        setBookResponse(response)}).catch(e=>console.log(e))
        setBookObj({
          loginId:JSON.parse(localStorage.getItem('userInfo'))?.username,
          movieName:state?.movieName,
          theatreName:state?.theatreName,
          noOfTickets:"",
          seatNumber:[]
         })
}
const changeHandler=(e)=>{
    setBookObj({...bookObj,[e.target.name]:e.target.value})
}

  return (
    <div className="container form_container">
       <form className="form" onSubmit={submitHandler}>
           {
               bookingFormInputs.map(input=>{
                let dec= (input.name==="loginId"||input.name==="movieName"||input.name==="theatreName");
                if(dec)
                return <FormInput 
                        key={input.id}
                        defaultValue={bookObj[input.name]}
                        {...input}/>
                return <FormInput 
                        key={input.id}   
                        {...input} value={bookObj[input.name]} 
                        onChange={(e)=>changeHandler(e)}/>
               })
           }
           <button type="submit" className='btn btn-primary'>BookTicket</button>
       </form>
       {bookResponse.message?.length>=1&&
       <Backdrop>
         <PopUp color={`${bookResponse.status==="Success"?"green":"red"}`} message={bookResponse.message} closeHandler={()=>setBookResponse({})}></PopUp>
       </Backdrop>
      }
    </div>
  )
}

export default BookingForm