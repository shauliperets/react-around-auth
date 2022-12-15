import React from "react";

function Register(props) {
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
    <div className="register">
      <form
        name="register-form"
        className="register__form"
        onSubmit={(event) => {
          event.preventDefault();
          props.handleSubmit(email, password);
        }}
      >
        <label className="register__header">Sign up</label>
        <input
          type="text"
          placeholder="Email"
          className="register__input"
          onChange={(event) => {
            updateEmail(event);
          }}
        ></input>
        <input
          type="password"
          placeholder="Password"
          className="register__input"
          onChange={(event) => {
            updatePassword(event);
          }}
        ></input>
        <button className="register__button" type="submit">
          Sign up
        </button>
        <label className="register__redirect">
          Already a member? Log in <a href="/signin">here!</a>
        </label>
      </form>
    </div>
  );
}
export default Register;
