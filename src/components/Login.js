import React from "react";

function Login(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  React.useEffect(() => {
    localStorage.removeItem("token");
  }, []);

  function updateEmail(event) {
    setEmail(event.target.value);
  }

  function updatePassword(event) {
    setPassword(event.target.value);
  }

  return (
    <div className="login">
      <form
        name="register-form"
        className="register__form"
        onSubmit={(event) => {
          event.preventDefault();
          props.handleSubmit(email, password);
        }}
      >
        <label className="login__header">Login</label>
        <input
          type="text"
          placeholder="Email"
          className="login__input"
          onChange={(event) => updateEmail(event)}
        ></input>
        <input
          type="password"
          placeholder="Password"
          className="login__input"
          onChange={(event) => updatePassword(event)}
        ></input>
        <button className="login__button">Log in</button>
        <label className="login__redirect">
          Not a member yet? Sign up <a href="/signup">here!</a>
        </label>
      </form>
    </div>
  );
}

export default Login;
