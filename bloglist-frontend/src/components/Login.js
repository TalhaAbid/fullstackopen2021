import React from "react";

const Login = ({
  username,
  password,
  usernameHandler,
  passwordHandler,
  handleLogin,
}) => (
  <div>
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          name="username"
          type="text"
          value={username}
          onChange={usernameHandler}
        />
      </div>
      <div>
        password
        <input
          name="password"
          type="password"
          value={password}
          onChange={passwordHandler}
        />
      </div>
      <button type="submit">login</button>
    </form>
  </div>
);

export default Login;
