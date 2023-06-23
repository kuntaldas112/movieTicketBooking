import React,{useState} from 'react'
import Backdrop from '../component/Backdrop';
import FormInput from '../component/FormInput'
import PopUp from '../component/modal/PopUp';
import { API_URL } from '../constants';
function AddMovie() {
    const [addResponse,setAddResponse]=useState({});
    const [movieObj,setMovieObj]=useState(
        {
        "movieName": "",
        "theatreName": "",
        "noOfTicketsAvailable": 0,
        "ticketsStatus": ""
        }
        )
    const addMovieFormInputs=[
        {
         id:1,
         type:"text" ,
         name:"movieName",
         placeholder:"Movie name",
         label:"Movie name",
         required:true,
         errorMessage:"Please enter movie name!",
         autoFocus:true
        },
        {
         id:2,
         type:"text" ,
         name:"theatreName",
         placeholder:"Theatre name",
         label:"Theatre name",
         errorMessage:"Please enter theatre name!",
         required:true
        },
        {
         id:3,
         type:"number" ,
         name:"noOfTicketsAvailable",
         placeholder:"Ticket Count",
         label:"Ticket Count",
         errorMessage:"Please enter ticket count!",
         required:true
        },
        {
         id:4,
         type:"text" ,
         name:"ticketsStatus",
         placeholder:"Tickets status",
         label:"Tickets status",
        },
    ]
    const changeHandler=(e)=>{
        setMovieObj({...movieObj,[e.target.name]:e.target.value})
    }
    const submitHandler=async(e)=>{
        e.preventDefault();
        const response=await fetch(`${API_URL}/api/v1.0/moviebooking/addmovie`,
                                    {
                                        method:"POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                            "Authorization":`Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.accessToken}`,
                                        },
                                        body:JSON.stringify({...movieObj})

                                    })
        const data=await response.json();
        setAddResponse(data);
        setMovieObj({
            "movieName": "",
            "theatreName": "",
            "noOfTicketsAvailable": 0,
            "ticketsStatus": ""
            })
    }
  return (
    <div className="container form_container">
        <form className="form" onSubmit={submitHandler}>
            {
            addMovieFormInputs.map(input=>{
                return <FormInput 
                key={input.id}   
                {...input} value={movieObj[input.name]} 
                onChange={(e)=>changeHandler(e)}/>
            })
            }
            <button className="btn btn-primary" >Add</button>
        </form>
        {
            addResponse.message?.length>0&& 
            <Backdrop>
                <PopUp message={addResponse.message} color={`${addResponse.status==="Success"?"green":"red"}`} 
                closeHandler={()=>{
                    setAddResponse({});
                    window.location.reload();
                    }}>
                </PopUp>
            </Backdrop>
        }
    </div>
  )
}

export default AddMovie