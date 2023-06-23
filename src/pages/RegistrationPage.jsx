import React, { useState, useEffect } from 'react'
import Backdrop from '../component/Backdrop';
import FormInput from '../component/FormInput'
import PopUp from '../component/modal/PopUp';
import { API_URL } from '../constants';
function RegistrationPage() {
    const [regResponse, setRegResponse] = useState({});
    const [regObj, setRegObj] = useState({
        "loginId": "",
        "firstName": "",
        "lastName": "",
        "email": "",
        "contactNumber": "",
        "roles": [],
        "password": ""
    })
    const submitHandler = (e) => {
        e.preventDefault();

        let roles = regObj['roles'].split(" ")
        regObj['roles'] = [...roles]

        fetch(`${API_URL}/api/v1.0/moviebooking/register`, {
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
            "contactNumber": "",
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
            autoFocus: true,
            errorMessage:"Only alphabet and numeric values are allowed",
            pattern:"^[A-Za-z][A-Za-z0-9_]*$",
            required:true,
        },
        {
            id: 2,
            type: "text",
            name: "firstName",
            placeholder: "First Name",
            label: "First Name",
            required:true,
            errorMessage:"This field is mandatory and no special character allowed",
            pattern:"^[A-Za-z]*$"
        },
        {
            id: 3,
            type: "text",
            name: "lastName",
            placeholder: "Last Name",
            label: "Last Name",
            required:true,
            errorMessage:"This field is mandatory and no special character allowed",
            pattern:"^[A-Za-z]*$"
        },
        {
            id: 4,
            type: "email",
            name: "email",
            placeholder: "Email",
            label: "Email",
            required:true,
            errorMessage:"please enter a valid email",
            pattern:"^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
        },
        {
            id: 5,
            type: "text",
            name: "contactNumber",
            placeholder: "Contact No.",
            label: "Contact No.",
            required:true,
            errorMessage:"Enter a valid 10 digit phone number",
            pattern:"[0-9]{10}"
        },
        {
            id: 6,
            type: "text",
            name: "roles",
            placeholder: "Roles",
            label: "Roles",
            required:true,
            errorMessage:"It is mandatory and can contain only 'user' and 'admin'",
            pattern:"^(user|admin|user admin|admin user)+$"
        },
        {
            id: 7,
            type: "password",
            name: "password",
            placeholder: "Passsword",
            label: "Password",
            required:true,
            errorMessage:"7 to 15 characters which contain at least one numeric digit and a special character",
            pattern:"^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$"
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
                <button type="submit" className='btn btn-primary'>register</button>
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