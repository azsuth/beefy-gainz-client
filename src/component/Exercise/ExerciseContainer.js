import React, { Component } from 'react';
import { connect } from 'react-redux';

import Exercise from 'component/Exercise/Exercise';

import {
  getExercises,
  exerciseChangedFocus,
  exerciseNameChanged,
  cancelExerciseSearch,
  logNewExercise,
  editSet,
  setChanged
} from 'action/Exercise';

class ExerciseContainer extends Component {
  constructor(props) {
    super(props);

    this.onExerciseBlur = this.onExerciseBlur.bind(this);
    this.onExerciseFocus = this.onExerciseFocus.bind(this);
    this.onExerciseNameChange = this.onExerciseNameChange.bind(this);
    this.onLogNewExercise = this.onLogNewExercise.bind(this);
    this.onEditSet = this.onEditSet.bind(this);
    this.onSetChanged = this.onSetChanged.bind(this);
  }

  componentDidMount() {
    this.props.getExercises();
  }

  onExerciseBlur() {
    this.props.exerciseChangedFocus(false);
  }

  onExerciseFocus() {
    this.props.exerciseChangedFocus(true);
  }

  onExerciseNameChange(event) {
    this.props.exerciseNameChanged(event.target.value);
  }

  onLogNewExercise(exercise) {
    this.props.logNewExercise(exercise);
  }

  onEditSet(setId, exerciseId, editing) {
    this.props.editSet(setId, exerciseId, editing);
  }

  onSetChanged(setId, updatedValues, exerciseId) {
    const { setChanged, exercises } = this.props;

    setChanged(setId, updatedValues, exerciseId, exercises);
  }

  render() {
    const {
      onExerciseFocus,
      onExerciseBlur,
      onExerciseNameChange,
      onLogNewExercise,
      onEditSet,
      onSetChanged
    } = this;

    const {
      exercises,
      searching,
      exerciseName,
      cancelExerciseSearch,
      searchExercises,
      loadingSearchResults,
      editingSets
    } = this.props;

    return (
      <Exercise
        {...{
          exercises,
          exerciseName,
          searching,
          onExerciseFocus,
          onExerciseBlur,
          onExerciseNameChange,
          cancelExerciseSearch,
          searchExercises,
          loadingSearchResults,
          onLogNewExercise,
          onEditSet,
          onSetChanged,
          editingSets
        }}
      />
    );
  }
}

const mapStateToProps = ({ Exercise }) => ({
  exercises: Exercise.exercises,
  searching: Exercise.exerciseFocussed || Exercise.exerciseName.length > 0,
  exerciseName: Exercise.exerciseName,
  searchExercises: Exercise.searchExercises,
  loadingSearchResults: Exercise.loadingSearchResults,
  editingSets: Exercise.editingSets
});

export default connect(
  mapStateToProps,
  {
    getExercises,
    exerciseChangedFocus,
    exerciseNameChanged,
    cancelExerciseSearch,
    logNewExercise,
    editSet,
    setChanged
  }
)(ExerciseContainer);
