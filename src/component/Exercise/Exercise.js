import React, { Component } from 'react';

import ExerciseSearch from 'component/Exercise/ExerciseSearch';
import EditableExercise from 'component/Exercise/EditableExercise';
import ExerciseSearchResult from 'component/Exercise/ExerciseSearchResult';

import 'component/Exercise/style/Exercise.scss';

class Exercise extends Component {
  renderExercises() {
    const { exercises, onEditSet, onSetChanged, editingSets } = this.props;

    return exercises.map(exercise => (
      <EditableExercise
        key={exercise.id}
        exercise={exercise}
        onEditSet={onEditSet}
        onSetChanged={onSetChanged}
        editingSets={editingSets}
      />
    ));
  }

  renderSearchResults() {
    const { searchExercises, onLogNewExercise } = this.props;

    return searchExercises.map(exercise => (
      <ExerciseSearchResult
        key={exercise.id}
        exercise={exercise}
        onLogNewExercise={onLogNewExercise}
      />
    ));
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
      cancelExerciseSearch,
      loadingSearchResults
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
              cancelExerciseSearch,
              loadingSearchResults
            }}
          />
        </div>

        <div className="Exercise-content">
          <div className="Exercise-content__editable-exercises">
            {this.renderExercises()}

            <div className={exerciseBlurClass} />
          </div>
          <div className={searchResultsClass}>{this.renderSearchResults()}</div>
        </div>
      </div>
    );
  }
}

export default Exercise;
