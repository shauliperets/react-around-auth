function Register(props) {
  return (
    /* add variable for inputs */
    <div className="register">
      <form name="register-form" className="register__form" onSubmit={props.handleSubmit}>
        <label className="register__header">Sign up</label>
        <input type="text" placeholder="Email" className="register__input"></input>
        <input type="text" placeholder="Password" className="register__input"></input>
        <button className="register__button" onClick={props.handleSubmit}>
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
