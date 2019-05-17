import React, { Component } from "react";
import { connect } from "react-redux";

import Login from "component/Login/Login";

import { notLoggedIn, loggingIn, loggedIn, loginFailure } from "action/Auth";

class LoginContainer extends Component {
  constructor(props) {
    super(props);

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLoginFailure = this.onLoginFailure.bind(this);
    this.onNotLoggedIn = this.onNotLoggedIn.bind(this);
  }

  onLoginSuccess(response) {
    this.props.loggedIn(response, this.props.history);
  }

  onLoginFailure(err) {
    this.props.loginFailure(err);
  }

  onNotLoggedIn() {
    this.props.notLoggedIn();
  }

  render() {
    const { loginState } = this.props;
    const { onLoginSuccess, onLoginFailure, onNotLoggedIn } = this;

    return (
      <Login
        {...{
          onLoginSuccess,
          onLoginFailure,
          onNotLoggedIn,
          loginState
        }}
      />
    );
  }
}

const mapStateToProps = ({ Auth }) => ({
  loginState: Auth.loginState
});

export default connect(
  mapStateToProps,
  { notLoggedIn, loggingIn, loggedIn, loginFailure }
)(LoginContainer);
