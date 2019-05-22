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
  setChanged,
  logNewSet,
  deleteSet
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
    this.onLogNewSet = this.onLogNewSet.bind(this);
    this.onDeleteSet = this.onDeleteSet.bind(this);
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

  onLogNewSet(exerciseId) {
    this.props.logNewSet(exerciseId);
  }

  onDeleteSet(setId, exerciseId) {
    this.props.deleteSet(setId, exerciseId);
  }

  render() {
    const {
      onExerciseFocus,
      onExerciseBlur,
      onExerciseNameChange,
      onLogNewExercise,
      onEditSet,
      onSetChanged,
      onLogNewSet,
      onDeleteSet
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
          editingSets,
          onLogNewSet,
          onDeleteSet
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
    setChanged,
    logNewSet,
    deleteSet
  }
)(ExerciseContainer);
