import React from "react";
import "./facerecog.css";
const FaceRecognition = ({ imageUrl, box }) => {
  return (
    <div className="center w-50 ma relative FR">
      <div className="absolute mt2">
        <img
          id="inputimage"
          src={imageUrl}
          alt=""
          width="500px"
          height="auto"
        />
        <div
          className="bounding-box"
          style={{
            top: box.topRow,
            right: box.rightCol,
            bottom: box.bottomRow,
            left: box.leftCol,
          }}
        ></div>
      </div>
    </div>
  );
};

export default FaceRecognition;
