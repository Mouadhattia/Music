import Navbar from "./components/Navbar";
import "./App.css";
import { Route, Routes } from "react-router";
import { BrowserRouter, Switch } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./Screens/Profile";
import ProfileAdmin from "./components/ProfileAdmin";
import Signup from "./components/Signup";
import AddPoste from "./components/AddPoste";
import Error from "./components/Error";
import EditProfile from "./components/EditProfile";
import PrivatRoute from "./components/router/PrivatRoute";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getcurrent } from "./js/action/user";
import Edit from "./components/Edit";
import UserProfile from "./components/UserProfile";
import Navi from "./Screens/Navi";
import Foot from "./Screens/Foot";
import Mains from "./Screens/Mains";
import Artistes from "./Screens/Artistes";
import Categories from "./Screens/Categories";
import About from "./Screens/About";
import Contact from "./Screens/Contact";
import { App as SendBirdApp } from "sendbird-uikit";
import "sendbird-uikit/dist/index.css";
import * as Icon from "react-feather";
import ViewProfile from "./Screens/ViewProfile";
import axios from "axios";

function App() {
  const dispatch = useDispatch();
  let URI = process.env.REACT_APP_API;

  useEffect(() => {
    dispatch(getcurrent());
    axios.get(URI + "/users/geo").then((res) => {
      localStorage.setItem("clients", JSON.stringify(res.data.clients));
    });
  }, []);
  const current = useSelector((state) => state.userReducer.user);
  const [showChat, setshowChat] = useState(false);
  return (
    <div className="layout-column bg-dark">
      <Navi />
      <Routes>
        <Route exact path="/" element={<Mains />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/artistes" element={<Artistes />} />
        <Route path="/category/:type" element={<Categories />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact/:id" element={<Contact />} />
        <Route path="/contact/" exact element={<Contact />} />
        <Route path="/addpost" element={<AddPoste />} />
        <Route path="/user/:id" element={<ViewProfile />} />

        <Route exact path="/profile" element={<PrivatRoute />}>
          <Route exact path="/profile" element={<Profile />} />
        </Route>
        {/* <Route exact path="/chat" element={<PrivatRoute />}>
          <Route exact path="/chat" element={<Chat />} />
        </Route> */}
        <Route exact path="/editprofile" element={<PrivatRoute />}>
          <Route exact path="/editprofile" element={<EditProfile />} />
        </Route>
      </Routes>
      {showChat ? (
        <div className="chatt">
          <Icon.Minimize2 onClick={() => setshowChat(!showChat)} />
          <SendBirdApp
            theme="dark"
            // Add the two lines below.
            appId="5411188A-EF40-4B4D-8A87-1196AF33FC65" // Specify your Sendbird application ID.
            userId={current._id} // Specify your user ID.
          />
        </div>
      ) : (
        <div className="bubble">
          <Icon.MessageCircle
            onClick={() => setshowChat(!showChat)}
            color="white"
            size={64}
          />
        </div>
      )}
      <Foot />
      {/* <Navbar/>
       <Switch>
    <PrivatRoute exact path="/" component={Home}/>
    <Route path="/login" component={Login}/>
    <PrivatRoute exact path={"/profile"} component={Profile}/>
    <PrivatRoute path={"/profile/:userid"} component={UserProfile}/>
    <PrivatRoute path={"/profileadmin"} component={ProfileAdmin}/>
    <Route path="/signup" component={Signup}/>
    <PrivatRoute exact path="/addposte" component={AddPoste}/>
    <PrivatRoute exact path="/edit" component={Edit}/>
    <PrivatRoute exact path="/editprofile" component={EditProfile}/>
    <Route path="/*" component={Error}/>
    </Switch> */}
    </div>
  );
}

export default App;
