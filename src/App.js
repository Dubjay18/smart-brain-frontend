import React, { Component } from "react";
import Logo from "./components/Logo/logo";
import Navigation from "./components/navigation/navigation ";
import "./App.css";
import ImageLinkForm from "./components/imagelink/imagelink";
import Rank from "./components/Rank/rank";
import Signin from "./components/signin/signin";
import Register from "./components/Register/register";


import FaceRecognition from "./components/faceRecognition/faceRecognition";

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};

const intialState = {
  input: "",
  imageUrl: "",
  box: {},
  route: "sigin",
  issignedin: false,
  user: {
    id: "",
    name: "",
    email: "",

    entries: 0,
    joined: "",
  },
};
class App extends Component {
  constructor() {
    super();
    this.state = intialState;
  }
  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };
  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };
  displayFaceBox = (box) => {
    this.setState({ box: box });
  };
  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    fetch("https://thawing-stream-96288.herokuapp.com/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          fetch("https://thawing-stream-96288.herokuapp.com/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              this.setState(
                Object.assign(this.state.user, {
                  entries: count,
                })
              );
            });
        }
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch((err) => console.log(err));
  };
  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState(intialState);
    } else if (route === "home") {
      this.setState({ issignedin: true });
    }
    this.setState({ route: route });
  };
  render() {
    return (
      <div className="App">
       
        <Navigation
          onRouteChange={this.onRouteChange}
          issignedin={this.state.issignedin}
        />

        {this.state.route === "home" ? (
          <>
            <Logo />

            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition
              box={this.state.box}
              imageUrl={this.state.imageUrl}
            />
          </>
        ) : this.state.route === "signin" ? (
          <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            onRouteChange={this.onRouteChange}
            loadUser={this.loadUser}
          />
        )}
      </div>
    );
  }
}
export default App;
