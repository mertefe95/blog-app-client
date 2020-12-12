import './App.css';
import React, {useState, useEffect} from "react";
import Axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./layouts/Header";
import Posts from "./components/Posts";
import Post from "./components/Post";
import Footer from "./layouts/Footer";
import Register from "./components/Register";
import Login from "./components/Login";
import CreatePost from "./components/CreatePost";
import EditPost from "./components/EditPost";
import UserContext from "./context/UserContext";
import ForgotPassword from "./components/ForgotPassword";

function App() {
  const [posts, setPosts] = useState([])
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    Axios
    .get('http://localhost:8080/api/posts')
    .then(res => setPosts(res.data))
    .catch(error => console.log(error));
  })

useEffect(() => {
  const checkLoggedIn = async () => {
    let token = localStorage.getItem("auth-token");
    if (token === null) {
      localStorage.setItem("auth-token", "");
      token = "";
    }

    const tokenRes = await Axios.post(
      "http://localhost:8080/api/tokenIsValid", 
      null, 
      { headers: {"x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:8080/api/", {
          headers: { "x-auth-token": token },
      });
      setUserData({
        token,
        user: userRes.data,
      });
      }
  };

  checkLoggedIn();
}, []);


  return (
    
      <Router>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Header />
        <Switch>
          <Route exact path="/"  exact render={() => <Posts posts={posts} />} />
          <Route  exact path="/post/:id" exact render={(props) => <Post {...props}  posts={posts} />} />
          <Route  exact path="/edit-post/:id" exact render={(props) => <EditPost {...props}  posts={posts} />} />
          <Route  exact path="/create-post" exact component={CreatePost} />
          <Route  exact path="/register" exact component={Register} />
          <Route  exact path="/login" exact component={Login} />
        </Switch>
        <Footer />
        </UserContext.Provider>
      </Router>
  
  );
}

export default App;
