import {BrowserRouter,Route,Routes,Switch} from 'react-router-dom'
import './App.css';
import LoginPage from './pages/LoginPage';
import Movies from './pages/Movies';
import BookingForm from './pages/BookingForm';
import Auth from './component/authguard/Auth';
import RegistrationPage from './pages/RegistrationPage';
import AddMovie from './pages/AddMovie';
import Navbar from './component/Navbar'
import { useContext ,useEffect,useReducer} from 'react';
import { initialState, LOGGED_IN_ADMIN, LOGGED_IN_USER, reducer, userContext } from './AppContext';
import Profile from './pages/Profile';

const Routing=()=>{
  const {state,dispatch}= useContext(userContext);
useEffect(()=>{
  let loggedIn=localStorage.getItem('userInfo') !== null && JSON.parse(localStorage.getItem('userInfo')).accessToken;
  if(loggedIn){
    let admin=JSON.parse(localStorage.getItem('userInfo')).roles.indexOf("ROLE_ADMIN")!==-1;
    if(admin){
      dispatch({type:LOGGED_IN_ADMIN})
    }
    else{
      dispatch({type:LOGGED_IN_USER})
    }
  }
},[])
  return (
    <div className="container">
    <Routes>
    <Route  exact path="/login" element={ <LoginPage/>}/>
    <Route  exact path="/register" element={ <RegistrationPage/>}/>
    <Route  exact path="/" element={ <Movies/>}/>
    <Route  path="admin" element={ <Auth/>}>
    <Route  path="addmovie" element={ <AddMovie/>}/>
    </Route>
    <Route  path="user" element={ <Auth/>}>
    <Route  path="booking/:movie" element={ <BookingForm/>}/>
    <Route  path="profile" element={ <Profile/>}/>
    </Route>
    </Routes>
    </div>
  )
}
function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div className="App">
      <userContext.Provider value={{state,dispatch}}>
      <BrowserRouter>
      <Navbar></Navbar>
     <Routing></Routing>
      </BrowserRouter>     
     </userContext.Provider>
    </div>
  );
}

export default App;
