import React, { useState, useEffect, useRef } from "react";
import Blogs from "./components/Blogs";
import Login from "./components/Login";
import Message from "./components/Message";
import Togglable from "./components/Togglable";
import CreateBlog from "./components/CreateBlog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState({
    message: null,
    error: null,
  });
  const [blogInputs, setBlogInputs] = useState({
    title: "",
    author: "",
    url: "",
  });
  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);
  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem("loggedInUser");
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      console.log(user);
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      setUser(user);
      console.log(user.token);
      blogService.setToken(user.token);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setMessage({ message: "wrong username or password", error: true });
      setTimeout(() => {
        setMessage({ message: null, error: null });
      }, 5000);
    }
  };
  const handleLogout = () => {
    window.localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  const blogsInputHandler = (event) => {
    const target = event.target;
    const updatedVals = { ...blogInputs };
    const newVal = target.value;
    updatedVals[`${target.name}`] = newVal;
    setBlogInputs(updatedVals);
  };
  const blogSubmitHandler = async (event) => {
    event.preventDefault();
    blogFormRef.current.toggleVisibility();
    try {
      let savedBlog = await blogService.addBlog(blogInputs);
      setMessage({
        message: `a new blog ${savedBlog.title} by ${savedBlog.author} added`,
        error: false,
      });
      setBlogs(blogs.concat(savedBlog));
      setTimeout(() => {
        setMessage({
          message: null,
          error: null,
        });
      }, 5000);
      setBlogInputs({
        title: "",
        author: "",
        url: "",
      });
    } catch (exception) {
      setMessage({
        message: "Adding Blog failed",
        error: true,
      });
      setTimeout(() => {
        setMessage({
          message: null,
          error: null,
        });
      }, 5000);
    }
  };
  return (
    <div>
      <h2>{user === null ? "Login" : "Blogs"}</h2>
      <Message message={message} />
      <div>
        {user === null ? (
          <Login
            handleLogin={handleLogin}
            username={username}
            password={password}
            usernameHandler={({ target }) => setUsername(target.value)}
            passwordHandler={({ target }) => setPassword(target.value)}
          />
        ) : (
          <div>
            <p>{user.name} logged in</p>
            <button onClick={() => handleLogout()}>logout</button>
            <Togglable buttonLabel="create a new blog" ref={blogFormRef}>
              <CreateBlog
                blogSubmitHandler={blogSubmitHandler}
                blogsInputHandler={blogsInputHandler}
                blogInputs={blogInputs}
              />
            </Togglable>
            <Blogs
              blogSubmitHandler={blogSubmitHandler}
              blogsInputHandler={blogsInputHandler}
              blogsInputs={blogInputs}
              blogs={blogs}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
