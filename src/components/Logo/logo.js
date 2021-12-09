import React from "react";
import Tilt from "react-tilt";
import brain from "./brain.png";
const Logo = () => {
  return (
    <div className="ma4 mt0 ">
      <Tilt
        className="Tilt logo br2 shadow-3 grow"
        options={{ max: 26 }}
        style={{ height: 150, width: 150 }}
      >
        <div className="Tilt-inner ">
          <img src={brain} alt="" className="pt3" />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
