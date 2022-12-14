function Login() {
  return (
    <div className="login">
      <label className="login__header">Log on</label>
      <input type="text" placeholder="Email" className="login__input"></input>
      <input type="text" placeholder="Password" className="login__input"></input>
      <button className="login__button">Log in</button>
      <label className="login__redirect">
        Not a member yet? Sign up <a href="/signup">here!</a>
      </label>
    </div>
  );
}

export default Login;
