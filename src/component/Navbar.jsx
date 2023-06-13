import React,{useState,useEffect, useContext, useCallback} from 'react'
import { Link,useNavigate ,} from 'react-router-dom'
import { LOGGED_OUT, userContext } from '../AppContext';

function Navbar() {
    const navigate=useNavigate();
    const [search,setSearch]=useState([]);
    const [isLoggedIn,setIsLoggedIn]=useState(false);
    const {state,dispatch}=useContext(userContext);
    useEffect(()=>{
        if(state.isLoggedIn)
        setIsLoggedIn(true)
        else setIsLoggedIn(false)
    },[state])
    const logoutHandler=()=>{
        
        localStorage.removeItem('userInfo');
        setIsLoggedIn(false)
        dispatch({type:LOGGED_OUT})
        navigate("/");
    }
    const changeHandler=(e)=>{
      
      const {value}=e.target;
      if(value.length<=0) {setSearch([]);
      return;
      }

      fetch(`http://localhost:8081/api/v1.0/moviebooking/movies/search/${value}`,{
        headers: {
          "Content-Type": "application/json",
          "Authorization":`Bearer ${JSON.parse(localStorage.getItem('userInfo')).accessToken}`,
        },
      }).then(res=>res.json()).then(data=>{
        setSearch(data)
      })
    }
    const debounce=(func)=>{
      let timer;
      return (...args)=>{
        let context=this;
        if(timer) clearTimeout(timer);
        timer=setTimeout(()=>{
          timer=null;
          func.apply(context,args)  
        },500)
      }
    }
    const optimizedChangeHandler=useCallback(debounce(changeHandler),[])
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand bg-primary p-2 rounded text-light" to='/'><b>MovieBooking</b></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
       
        {
          state.isAdmin&&(
            <li className="nav-item">
          <Link className="nav-link" to="/admin/addmovie">Add Movie</Link>
        </li>
          )
        }
        {isLoggedIn && <li className="nav-item">
          <Link className="nav-link" to="/user/profile">Profile</Link>
        </li>}
      </ul>
      
      {isLoggedIn?
       ( 
          <button className='nav-link bg-danger p-1 text-white rounded' onClick={logoutHandler}>Logout</button>
        )
        :
        (
          <>
          <Link className="nav-link bg-primary p-1 text-white rounded" to="/login">Login</Link>
          <Link className="nav-link bg-primary p-1 text-white rounded mx-1" to="/register">register</Link>
          </>
        )
        }
      <div className="d-flex mx-2 relative" role="search">
        <input className="form-control me-2 search"  onChange={optimizedChangeHandler} placeholder={isLoggedIn?"Search Here":"please login to search"} disabled={!isLoggedIn}/>
        {
          search?.length>0 &&
          <div className='autocomplete'>
            {
              search?.map((elem,i)=>{
                return <Link  to={`/user/booking/${elem.movieName}`} state={{ ...elem}} key={i} className='nav-link autocompleteitems' onClick={()=>setSearch([])}>
                  <span>{elem.movieName}</span>
                  </Link>
              })
            }

          </div>
        }
        {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
      </div>
      
    </div>
  </div>
</nav>
  )
}

export default Navbar