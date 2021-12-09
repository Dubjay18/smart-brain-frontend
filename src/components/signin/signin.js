import React from "react";

const Signin = ({ onRouteChange, loadUser }) => {
  const [signInEmail, setsignInEmail] = React.useState("");
  const [signInPassword, setsignInPassword] = React.useState("");
  const onEmailChange = (e) => {
    setsignInEmail(e.target.value);
  };
  const onPasswordChange = (e) => {
    setsignInPassword(e.target.value);
  };

  const onSubmitSignIn = () => {
    fetch("https://thawing-stream-96288.herokuapp.com/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          loadUser(user);
          onRouteChange("home");
        }
      });
    console.log(signInEmail, signInPassword);
  };
  return (
    <div>
      <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-1 mw7  center shadow-5">
        <main className="pa4 black-80 center tc ">
          <div className="measure ">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6 " htmlFor="email-address">
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
              <label className="pa0 ma0 lh-copy f6 pointer grow  dib">
                <input type="checkbox" /> Remember me
              </label>
            </fieldset>
            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
                onClick={onSubmitSignIn}
              />
            </div>
            <div className="lh-copy mt3">
              <p
                href="#0"
                class="f6 link dim black db pointer grow  dib"
                onClick={() => onRouteChange("Register")}
              >
                Register
              </p>
            </div>
          </div>
        </main>
      </article>
    </div>
  );
};

export default Signin;
