
import React from 'react'
import { useContext ,useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { userContext } from '../AppContext';
import { API_URL } from '../constants';


function MovieCard(props) {
  const { movieName, noOfTicketsAvailable, ticketsStatus, theatreName } = props;
  const navigate = useNavigate();
  const {state}=useContext(userContext);
  const [deleteMessage,setDeleteMessage]=useState("");
  const deleteMovieHandler=async(movieName)=>{
   const response=await fetch(`${API_URL}/api/v1.0/moviebooking/${movieName}/delete`,{
      method:"DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization":`Bearer ${JSON.parse(localStorage.getItem('userInfo')).accessToken}`,
      }
    });
    const data=await response.json();
    setDeleteMessage(data.message)
  }
  return (
    <div className='m-2 movieCard'>
      <div className="card min" >
        <div className="card-body">
          <h4 className="card-title text-primary">{movieName.toUpperCase()}</h4>
          {/* <h6 className="card-subtitle mb-2 text-body-secondary">{ticketsStatus}</h6> */}
          <div className="card-text my-4">{noOfTicketsAvailable>0 ?
          <>
           Hey,the movie <b>{movieName}</b> 
          &nbsp; is running at <b>{theatreName}</b>.
            Hurry up! <b>{noOfTicketsAvailable}</b> Tickets available.
          </>:
          <b className='text-danger'>
            Sorry Ticket not available
            
            </b>
            } </div>
            <div className="d-flex justify-content-around">
            {
              noOfTicketsAvailable>0?
          <Link  to={`/user/booking/${movieName}`} state={{ ...props }} ><button className="btn btn-primary">Book</button></Link>
          :
          <button className="btn btn-primary" disabled>Book</button>

            }
        {state.isAdmin&& <button className="btn btn-danger" onClick={()=>deleteMovieHandler(movieName)}>Delete</button> }
        </div>
      </div>
    </div>
    {deleteMessage.length>=1&& <p>{deleteMessage}</p>}
    </div>
  )
}

export default MovieCard