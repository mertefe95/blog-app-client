import './App.css';
import React, {useState, useEffect} from "react";
import Axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import Posts from "./components/Posts";
import Post from "./components/Post";
import Footer from "./components/Footer";
import Register from "./components/Register";
import CreatePost from "./components/CreatePost";
import EditPost from "./components/EditPost";

function App() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    Axios
    .get('http://localhost:8080/api/posts')
    .then(res => setPosts(res.data))
    .catch(error => console.log(error));
})

  return (
    <div className="App">
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/" render={() => <Posts posts={posts} />} />
          <Route  exact path="/post/:id" render={(props) => <Post {...props}  posts={posts} />} />
          <Route  exact path="/edit-post/:id" render={(props) => <EditPost {...props}  posts={posts} />} />
          <Route  exact path="/create-post" exact component={CreatePost} />
          <Route  exact path="/register" exact component={Register} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
