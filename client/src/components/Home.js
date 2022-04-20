import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts} from "../js/action/post";
import Card from "./Card"

const Home = ({}) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducer.posts);
  const current = useSelector((state) => state.userReducer.user);
 
 

  useEffect(() => {
    dispatch(getPosts());
  }, [posts.comments]);

  return (
    <div className="home">
      {posts.map((el) => <Card el={el} key={el._id}/>
       
      )}
    </div>
  );
};

export default Home;
