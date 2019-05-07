import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';

import { setIdToken } from './service/api/apiConfig';
import { getExercises, createExercise } from './service/api/exercise';

import './App.css';

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
        setIdToken(response.tokenId);

        createExercise({ name: 'Bench Press' })
            .then(() => {
                getExercises()
                    .then(exercises => {
                        console.log(exercises);
                    })
                    .catch(error => {
                        console.log('Error getting exercises', error);
                    });
            })
            .catch(error => {
                console.log('Error creating exercise', error);
            });
    }

    onFailure(response) {
        console.log(response);
    }

    render() {
        return (
            <div className="App">
                <button className="ui button">This is a semantic button</button>

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
