import React from 'react'

function Backdrop({children}) {
  return (
    <div style={{ position: "fixed", top: "0", left: "0", width: "100%", height: "100vh", backgroundColor: "#4c4848b5" }}>
        {children}
    </div>
  )
}

export default Backdrop