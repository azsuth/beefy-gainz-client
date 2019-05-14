import React, { Component } from "react";

import EditableExercise from 'component/Exercise/EditableExercise';

import "component/Exercise/style/Exercise.scss";

class Exercise extends Component {

  renderExercises() {
    const { exercises } = this.props;

    if (exercises) {
      return exercises.map(exercise => (
        <EditableExercise key={exercise.id} exercise={exercise} />
      ));
    }
  }

  render() {
    return (
      <div className="Exercise">
        {this.renderExercises()}    
      </div>
    );
  }
}

export default Exercise;
