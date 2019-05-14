import React, { Component } from "react";
import { connect } from "react-redux";

import Exercise from "component/Exercise/Exercise";

import { getExercises } from "action/Exercise";

class ExerciseContainer extends Component {
  componentDidMount() {
    this.props.getExercises();
  }

  render() {
    const { exercises } = this.props;

    return (
    <Exercise 
      { ...{
        exercises
      }}
    />
    );
  }
}

const mapStateToProps = ({ Exercise }) => ({
  exercises: Exercise.exercises
});

export default connect(
  mapStateToProps,
  { getExercises }
)(ExerciseContainer);
