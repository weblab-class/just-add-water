import React, { Component } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import Designer from "./modules/Designer.js";
import "../utilities.css";

// import { socket } from "../client-socket.js";

import { get, post } from "../utilities";
import Onboarding from "./pages/Onboarding";

/**
 * Define the "App" component as a class.
 */
class App extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
      userId: undefined,
      // to do; sub out for checking whether setup values are not nothing
      showOnboarding:true,
    };
  }

  componentDidMount() {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        this.setState({ userId: user._id });
      }
    });
  }

  handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      this.setState({ userId: user._id });
    });
  };

  handleLogout = () => {
    this.setState({ userId: undefined });
    post("/api/logout");
  };

  render() {
    return (
      <>
        <Router className="router-wrapper">
          <Skeleton
            path="/"
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
            userId={this.state.userId}
          />
          <Onboarding 
            path = "/onboarding" handleLogin={this.handleLogin} handleLogout={this.handleLogout} userId={this.state.userId}/>
          <Designer 
            path = "/design" handleLogin={this.handleLogin} handleLogout={this.handleLogout} userId={this.state.userId}/>
          <NotFound default />
        </Router>

      </>
    );
  }
}

function getAllTiles() {
  get('/api/all_tiles').then(
    (tileArr => {return tileArr})
  );
}
export default App;
export {getAllTiles};
