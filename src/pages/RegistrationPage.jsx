import React, { useState, useEffect } from 'react'
import Backdrop from '../component/Backdrop';
import FormInput from '../component/FormInput'
import PopUp from '../component/modal/PopUp';

function RegistrationPage() {
    const [regResponse, setRegResponse] = useState({});
    const [regObj, setRegObj] = useState({
        "loginId": "",
        "firstName": "",
        "lastName": "",
        "email": "",
        "contactNumber": 0,
        "roles": [],
        "password": ""
    })
    const submitHandler = (e) => {
        e.preventDefault();

        let roles = regObj['roles'].split(",")
        regObj['roles'] = [...roles]

        fetch(`http://localhost:8081/api/v1.0/moviebooking/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(regObj)
        })
            .then(res => res.json())
            .then(data => setRegResponse(data))
            .catch(e => console.log(e))
        setRegObj({
            "loginId": "",
            "firstName": "",
            "lastName": "",
            "email": "",
            "contactNumber": 0,
            "roles": [],
            "password": ""
        });
    }
    const changeHandler = (e) => {
        setRegObj({ ...regObj, [e.target.name]: e.target.value })
    }
    const regFormInputs = [
        {
            id: 1,
            type: "text",
            name: "loginId",
            placeholder: "loginId",
            label: "Username",
            autoFocus: true
        },
        {
            id: 2,
            type: "text",
            name: "firstName",
            placeholder: "First Name",
            label: "first name",
        },
        {
            id: 3,
            type: "text",
            name: "lastName",
            placeholder: "Last Name",
            label: "Last Name",
        },
        {
            id: 4,
            type: "email",
            name: "email",
            placeholder: "Email",
            label: "Email",
        },
        {
            id: 5,
            type: "text",
            name: "contactNumber",
            placeholder: "Contact No.",
            label: "Contact No."
        },
        {
            id: 6,
            type: "text",
            name: "roles",
            placeholder: "Roles",
            label: "Roles"
        },
        {
            id: 7,
            type: "password",
            name: "password",
            placeholder: "Passsword",
            label: "Password"
        }
    ]
    return (
        <div className="container form_container">
            <form className="form" onSubmit={submitHandler}>
                {
                    regFormInputs.map(input => {
                        return <FormInput
                            key={input.id}
                            value={regObj[input.name]}
                            {...input}
                            onChange={changeHandler}
                        />
                    })
                }
                <button type="submit">register</button>
            </form>
            {
                regResponse.message?.length>=1 &&
                <Backdrop>
                    <PopUp color={`${regResponse.status==="Success"?"green":"red"}`} message={regResponse.message} closeHandler={()=>setRegResponse({})}> </PopUp>
                </Backdrop>
            }
        </div>
    )
}

export default RegistrationPage