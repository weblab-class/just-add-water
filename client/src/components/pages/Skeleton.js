import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import ThreeScene from '../modules/ThreeScene';
import { Canvas} from 'react-three-fiber';
import FiberScene from '../modules/FiberScene';
import * as Examples from '../../js-plant-gen/ExampleFlowers';
import * as fc from '../modules/FlowerComponents';

import "../../utilities.css";
import "./Skeleton.css";


//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "121479668229-t5j82jrbi9oejh7c8avada226s75bopn.apps.googleusercontent.com";

class Skeleton extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {};
  }

  componentDidMount() {
    // remember -- api calls go here!
  }

  render() {
    return (
      <>
        {this.props.userId ? (
          <GoogleLogout
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={this.props.handleLogout}
            onFailure={(err) => console.log(err)}
          />
        ) : (
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={this.props.handleLogin}
            onFailure={(err) => console.log(err)}
          />
        )}

      <div className="canvasContainer">
        <Canvas orthographic={true} camera={{zoom:10}}>
          <pointLight position={[10,10,10]} />
          <ambientLight intensity={0.3}/>
          <fc.flowerModel flowerData={Examples.blueSixPetals}/>
          <fc.flowerModel flowerData={Examples.poppy} position={[10,10,0]} />
          <fc.tile/>
        </Canvas>
      </div>
      </>
    );
  }
}

export default Skeleton;
