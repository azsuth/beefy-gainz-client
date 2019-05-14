import React, { Component } from 'react';
import { GoogleLogin } from 'component/Login/GoogleLogin';

import { LOGIN_STATE } from 'constants/index';

import 'component/Login/style/Login.scss';

class Login extends Component {

  render() {
    const {
      onLoginSuccess,
      onLoginFailure,
      onNotLoggedIn,
      loginState
    } = this.props;

    let titleClass;
    let buttonClass;

    if (loginState === LOGIN_STATE.NOT_LOGGED_IN) {
      titleClass = 'Login__title Login__title--animate-up';
      buttonClass = 'Login__button Login__button--fade-in';
    } else {
      titleClass = 'Login__title';
      buttonClass = 'Login__button';
    }

    return (
      <div className="Login">

        <h1 className={titleClass}>Beefy Gainz</h1>

        <GoogleLogin
          className={buttonClass}
          clientId="54851119520-ioolc277euiajnnqt3vdo2r9r8sqse9g.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={onLoginSuccess}
          onFailure={onLoginFailure}
          onNotLoggedIn={onNotLoggedIn}
          isSignedIn
        />

      </div>
    )
  }
}

export default Login;
