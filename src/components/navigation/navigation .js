import React from "react";

function Navigation({ onRouteChange, issignedin }) {
  if (issignedin) {
    return (
      <>
        <nav style={{ display: "flex", justifyContent: "flex-end" }}>
          <p
            onClick={() => onRouteChange("signout")}
            className="f3 link dim black underline pa3 pointer grow  dib"
          >
            Sign out
          </p>
        </nav>
      </>
    );
  } else {
    return (
      <>
        <nav style={{ display: "flex", justifyContent: "flex-end" }}>
          <p
            onClick={() => onRouteChange("signin")}
            className="f3 link dim black underline pa3 pointer grow  dib"
          >
            Signin
          </p>
          <p
            onClick={() => onRouteChange("register")}
            className="f3 link dim black underline pa3 pointer grow  dib"
          >
            Register
          </p>
        </nav>
      </>
    );
  }
}

export default Navigation;
