import React, { Component } from 'react';
import './App.css';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      idToken: null
    }

    this.onSuccess = this.onSuccess.bind(this);
  }

  onSuccess(response) {
    this.setState({
      loggedIn: true,
      idToken: response.tokenId
    });

    const options = {
      method: 'get',
      headers: { 'idToken': this.state.idToken },
      url: 'http://localhost:3001/api/exercises'
    };

    axios(options)
      .then(res => {
        console.log('Success!!!', res);
      })
      .catch(err => {
        console.log('Error!!!', err);
      });
  }

  onFailure(response) {
    console.log(response);
  }

  render() {
    return (
      <div className="App">
        <GoogleLogin
            clientId="54851119520-ioolc277euiajnnqt3vdo2r9r8sqse9g.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={this.onSuccess}
            onFailure={this.onFailure}
            cookiePolicy={'single_host_origin'}
          />
      </div>
    );
  }
}

export default App;
