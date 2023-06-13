import React from 'react'

function PopUp({message,closeHandler,color}) {
    return (
        <div className='popUp rounded'>
            <div><button type="button" onClick={closeHandler} className="close btn btn-danger" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button></div>
            <p style={{color:color}}>{message}</p>

        </div>
    )
}

export default PopUp