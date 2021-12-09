import React from "react";

const Register = ({ onRouteChange, loadUser }) => {
  const [Email, setEmail] = React.useState("");
  const [Password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onSubmitRegister = () => {
    fetch("https://thawing-stream-96288.herokuapp.com/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: Email,
        password: Password,
        name: name,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          loadUser(user);
          onRouteChange("home");
        }
      });
    console.log(Email, Password);
  };
  return (
    <div>
      <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-1 mw7  center shadow-5">
        <main className="pa4 black-80 center tc ">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">
                  Name
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 grow  dib"
                  type="text"
                  name="name"
                  id="name"
                  onChange={onNameChange}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 grow  dib"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 grow  dib"
                  type="password"
                  name="password"
                  id="password"
                  onChange={onPasswordChange}
                />
              </div>
              <label className="pa0 ma0 lh-copy f6 pointer  grow  dib ">
                <input type="checkbox" /> Remember me
              </label>
            </fieldset>
            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register"
                onClick={onSubmitRegister}
              />
            </div>
          </div>
        </main>
      </article>
    </div>
  );
};

export default Register;
