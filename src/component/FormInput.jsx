import React from 'react'

function FormInput(props) {
  return (
    <div className="inputContainer">
      <label>{props.label}</label>
    <input {...props}/>
    </div>
    )
}

export default FormInput