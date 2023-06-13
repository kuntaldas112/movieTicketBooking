import React,{useContext, useEffect} from 'react'
import { Outlet,useNavigate ,Navigate,useLocation,Link} from 'react-router-dom';
import { userContext } from '../../AppContext';

function Auth() {
    const params=useLocation();
    const {state}=useContext(userContext);
    if (localStorage.getItem('userInfo') === null || !JSON.parse(localStorage.getItem('userInfo')).accessToken) {
        
        return <Navigate to="/login" state={{message:"...You have to login for booking movie..."}} />;
    }
    const admin=params.pathname.startsWith("/admin")?(params.pathname.startsWith("/admin")&&JSON.parse(localStorage.getItem('userInfo')).roles.indexOf("ROLE_ADMIN")!==-1):true;
    if(!admin)return<> only admin can access this page <Link to="/">HOME</Link></>;
    
  return  <Outlet/>

  
}

export default Auth