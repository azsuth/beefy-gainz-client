import React, { Component } from 'react';

import ExerciseSearch from 'component/Exercise/ExerciseSearch';
import EditableExercise from 'component/Exercise/EditableExercise';

import 'component/Exercise/style/Exercise.scss';

class Exercise extends Component {
  renderExercises() {
    const { exercises } = this.props;

    if (exercises) {
      return exercises.map(exercise => (
        <EditableExercise key={exercise.id} exercise={exercise} />
      ));
    }
  }

  classes() {
    const { searching } = this.props;

    const classes = {};

    if (searching) {
      classes.exerciseBlurClass =
        'Exercise-content__editable-exercises-blur Exercise-content__editable-exercises-blur--in';
      classes.searchResultsClass =
        'Exercise-content__search-results Exercise-content__search-results--searching';
    } else {
      classes.exerciseBlurClass = 'Exercise-content__editable-exercises-blur';
      classes.searchResultsClass = 'Exercise-content__search-results';
    }

    return classes;
  }

  render() {
    const { exerciseBlurClass, searchResultsClass } = this.classes();
    const {
      exerciseName,
      onExerciseFocus,
      onExerciseBlur,
      onExerciseNameChange,
      cancelExerciseSearch
    } = this.props;

    return (
      <div className="Exercise">
        <div className="Exercise__search">
          <ExerciseSearch
            {...{
              exerciseName,
              onExerciseFocus,
              onExerciseBlur,
              onExerciseNameChange,
              cancelExerciseSearch
            }}
          />
        </div>

        <div className="Exercise-content">
          <div className="Exercise-content__editable-exercises">
            {this.renderExercises()}

            <div className={exerciseBlurClass} />
          </div>
          <div className={searchResultsClass} />
        </div>
      </div>
    );
  }
}

export default Exercise;
