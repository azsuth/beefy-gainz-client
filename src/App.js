import React, { Component } from 'react';
import './App.css';
import { GoogleLogin } from 'react-google-login';

const responseGoogle = (response) => {
  console.log(response);
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <GoogleLogin
            clientId="54851119520-ioolc277euiajnnqt3vdo2r9r8sqse9g.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
      </div>
    );
  }
}

export default App;
