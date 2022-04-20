import React from 'react'
import { Link } from "react-router-dom"

const Error = () => {
    return (
        <div className="error" style={{width:"100%"}}>
           <h1>404 NOT FOUND</h1>
           
           <img style={{}} src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"/>
           <button
          className="btn waves-effect blue"
        >
         <Link to="/" >
          Back Home
        </Link>
        </button>
        </div>
    )
}

export default Error
