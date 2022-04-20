
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts} from "../js/action/post";
import {getUsers,deleteUser} from "../js/action/user"
import Card from "./Card"

const ProfileAdmin = () => {
    const dispatch = useDispatch();
  const current = useSelector((state) => state.userReducer.user);
  const posts = useSelector((state) => state.postReducer.posts);
  const users = useSelector((state) => state.userReducer.users);
  const loadUsers = useSelector((state) => state.userReducer.loadUsers);
  const [switches, setSwitches] = useState(true)
  useEffect(() => {
    dispatch(getPosts());
    dispatch(getUsers());

  }, []);
  return (
    <div>
      <div style={{ maxWidth: "550px", margin: "0px auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            margin: "18px 0px",
            borderBottom: "1px solid grey",
          }}
        >
          <div>
            <img
              style={{ width: "160px", height: "160px", borderRadius: "80px" }}
              src={current ? current.url : ""}
            />
          </div>
          <div>
            <h4>{current ? current.name : "loading"}</h4>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "120%",
              }}
            >
              <h6>5 deleted </h6>
              <h6>5 Banned </h6>
              <h6>5 winners</h6>
            </div>
          </div>
        </div>
      </div>
      <nav className="nav-extended">
        <div className="nav-content">
          <ul className="tabs tabs-transparent">
            <li class="tab"><a href="#test1" onClick={()=>setSwitches(!switches)}>{switches?"USERS":"Posts"}</a></li>
            
          </ul>
        </div>
      </nav>

      { switches ? posts.map((el) => <Card el={el} key={el._id}/>) :loadUsers?<h5>loading</h5>:users.response.map(el=>{
          return (
              <div key={el._id} style={{maxWidth:"500px",margin: "50px auto"}}>

<div class="row">
    <div class="col s12 m6">
      <div class="card">
        <div class="card-image">
          <img src={el.url}/>
          <span class="card-title" style={{color:"black"}}>{el.name}</span>
          <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons" onClick={()=>dispatch(deleteUser(el._id))}>delete</i></a>
        </div>
        <div class="card-content">
          <p>{el.email}</p>
        </div>
      </div>
    </div>
  </div>
            

              </div>
          )
      } )}
       
      








      
      
    </div>




  );
};

export default ProfileAdmin;
