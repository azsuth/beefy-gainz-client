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
  editExercise,
  setChanged,
  exerciseChanged,
  logNewSet,
  deleteSet,
  deleteExercise
} from 'action/Exercise';

class ExerciseContainer extends Component {
  constructor(props) {
    super(props);

    this.onExerciseBlur = this.onExerciseBlur.bind(this);
    this.onExerciseFocus = this.onExerciseFocus.bind(this);
    this.onExerciseNameChange = this.onExerciseNameChange.bind(this);
    this.onLogNewExercise = this.onLogNewExercise.bind(this);
    this.onEditSet = this.onEditSet.bind(this);
    this.onEditExercise = this.onEditExercise.bind(this);
    this.onSetChanged = this.onSetChanged.bind(this);
    this.onExerciseChanged = this.onExerciseChanged.bind(this);
    this.onLogNewSet = this.onLogNewSet.bind(this);
    this.onDeleteSet = this.onDeleteSet.bind(this);
    this.onDeleteExercise = this.onDeleteExercise.bind(this);
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

  onEditSet(set, exerciseId, editing) {
    this.props.editSet(set, exerciseId, editing);
  }

  onEditExercise(exercise, editing) {
    this.props.editExercise(exercise, editing);
  }

  onSetChanged(setId, updatedValues, exerciseId, event) {
    if (event.target.validity.valid) {
      const { setChanged, exercises } = this.props;

      setChanged(setId, updatedValues, exerciseId, exercises);
    }
  }

  onExerciseChanged(exerciseId, updatedValues) {
    const { exerciseChanged, exercises } = this.props;

    exerciseChanged(exerciseId, updatedValues, exercises);
  }

  onLogNewSet(exerciseId) {
    this.props.logNewSet(exerciseId);
  }

  onDeleteSet(setId, exerciseId) {
    this.props.deleteSet(setId, exerciseId);
  }

  onDeleteExercise(exerciseId) {
    this.props.deleteExercise(exerciseId);
  }

  render() {
    const {
      onExerciseFocus,
      onExerciseBlur,
      onExerciseNameChange,
      onLogNewExercise,
      onEditSet,
      onEditExercise,
      onSetChanged,
      onExerciseChanged,
      onLogNewSet,
      onDeleteSet,
      onDeleteExercise
    } = this;

    const {
      exercises,
      searching,
      exerciseName,
      cancelExerciseSearch,
      searchExercises,
      loadingSearchResults,
      editingSets,
      editingExercises
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
          onEditExercise,
          onSetChanged,
          onExerciseChanged,
          editingSets,
          editingExercises,
          onLogNewSet,
          onDeleteSet,
          onDeleteExercise
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
  editingSets: Exercise.editingSets,
  editingExercises: Exercise.editingExercises
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
    editExercise,
    setChanged,
    exerciseChanged,
    logNewSet,
    deleteSet,
    deleteExercise
  }
)(ExerciseContainer);
