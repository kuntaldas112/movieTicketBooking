import React,{useState} from 'react'

function FormInput(props) {
  const {errorMessage,id,label,...rest}=props;
  const [focused,setFocused]=useState(false);
  const handleFocus=(e)=>{
    setFocused(true)
  }
  return (
    <div className="inputContainer">
      <label htmlFor={id}>{label}</label>
    <input {...rest} onBlur={handleFocus} focused={focused.toString()}/>
    
    <span className='errorSpan' style={{color:'red'}}>
     {errorMessage}
    </span>
    </div>
    )
}

export default FormInput