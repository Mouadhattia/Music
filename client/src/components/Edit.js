import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { editPost } from '../js/action/post';


const Edit = () => {
    const [toChange, setToChange] = useState({title:"",body:""})
    const dispatch = useDispatch();
    const oldPost = useSelector(state => state.postReducer.tochange)
    useEffect(() => {
        setToChange({title:oldPost.title,body:oldPost.body})
    }, [oldPost])
    console.log(oldPost._id)
    const handleChange=(e)=>{
        e.preventDefault();
        setToChange({...toChange,[e.target.name]:e.target.value})
    }

    
    
    
    return (
        <div>
            <div
      className="card input-filed"
      style={{
        margin: "300px",
        maxWidth: "1000px",
        padding: "20px",
        textAlign: "center",
      }}
    >


      <input
        type="text"
        placeholder="title"
        value={toChange.title}
        name="title"
        onChange={handleChange}

      />
      <input
        type="text"
        placeholder="Body"
        value={toChange.body}
        name="body"
        onChange={handleChange}
      />
    <Link to="/">
      <button
        className="btn waves-effect blue darken-1"
        onClick={()=>dispatch(editPost(oldPost._id,toChange))}
      >
        Save
      </button>
      </Link>
    </div> 
        </div>
    )
}

export default Edit
