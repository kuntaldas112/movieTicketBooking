import React, { useEffect, useState } from 'react';
import Backdrop from '../component/Backdrop';
import { API_URL } from '../constants';

function Profile() {
    const [user, setUser] = useState({});
    const [errorMessage,setErrorMessage]=useState("");
    const [resetPassObj, setResetPassObj] = useState({
        loginId: "",
        password: ""
    })
    const [shouldOpenModal, setShouldOpenModal] = useState(false)
    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('userInfo'));
        setUser(data);
    }, [])
    const modalHandler = () => {
        setShouldOpenModal(prev => !prev);

    }
    const resetPasswordHandler = (e) => {
        e.preventDefault();
        if (e.target.value === "reset") {
            fetch(`${API_URL}/api/v1.0/moviebooking/${user.username}/forgot`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem('userInfo')).accessToken}`,
                },
                body: JSON.stringify(resetPassObj)
            }).then(res => res.json()).then(data => {
              

                setShouldOpenModal(prev => !prev)
                setErrorMessage(data.error)
            }).catch(e=>{
                console.log(e)
            })

        }
        else {
            setShouldOpenModal(prev => !prev)
        }
    }
    const changeHandler = (e) => {
        setResetPassObj({ ...resetPassObj, [e.target.name]: e.target.value })
    }

    return (
        <div className="container form_container">
            {user && 
            <div className=" d-flex justify-content-center align-items-center form">
             <div className="card">
              <div className="mt-5 text-center d-flex flex-column profileCardFieldContainer p-2">
                <div>
                <label >User Id: </label>
                <span>{user.username}</span>
                </div>
                <div>
                <label>Email: </label>
                <span >{user.email}</span>
                </div>


                        <div className="stats">
                    <label>Role: </label>    
                {
                    user.roles?.length >= 1 && user.roles.map((role,index) =>
                        
                    <span key={index} className="rounded p-1" style={{backgroundColor: "#e5e1e1"}}>{role}</span>
                    )
                }
                </div>
                <button className="btn btn-primary btn-sm follow" onClick={modalHandler}>Reset Password</button>

                  
                
              </div>
               
             </div>

           </div>

            }
            {
                shouldOpenModal && <Backdrop>
                    <form className="d-flex flex-column rounded justify-content-around " style={{ maxWidth: "100%", width: "300px", margin: "20% auto", height: "170px", backgroundColor: "#ffff", opacity: "1" }}>
                        <div className="d-flex  flex-column  justify-content-around p-2">
                            <input type="text" name="loginId" onChange={changeHandler} className="mb-2 " placeholder="enter userId" autoFocus />
                            <input type="text" name="password" onChange={changeHandler} placeholder="enter password" />
                        </div>
                        <div className="d-flex justify-content-around">
                            <input type="submit" className=" btn btn-primary" onClick={resetPasswordHandler} value="reset"></input>
                            <input type="submit" className="btn btn-danger" onClick={resetPasswordHandler} value="cancel"></input>
                        </div>
                    </form>
                    </Backdrop>
            }
            {
                errorMessage?.length>=1&&<p>{errorMessage}</p>
            }
        </div>
    )
}

export default Profile;