import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";

import LoginContainer from "component/Login/LoginContainer";
import ExerciseContainer from "component/Exercise/ExerciseContainer";

import { LOGIN_STATE } from "constants/index";

import "component/style/App.css";

class App extends Component {
  renderLoggedInRoutes() {
    if (this.props.loggedIn) {
      return <Route path="/exercises" component={ExerciseContainer} />;
    }

    return <Route render={() => <Redirect to="/login" />} />;
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/login" component={LoginContainer} />

          {this.renderLoggedInRoutes()}
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ Auth }) => ({
  loggedIn: Auth.loginState === LOGIN_STATE.LOGGED_IN
});

export default connect(
  mapStateToProps,
  {}
)(App);
