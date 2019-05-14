import React, { Component } from 'react';
import { connect } from 'react-redux';

import Exercise from 'component/Exercise/Exercise';

import { getExercises, exerciseChangedFocus, exerciseNameChanged, cancelExerciseSearch } from 'action/Exercise';

class ExerciseContainer extends Component {
  constructor(props) {
    super(props);

    this.onExerciseBlur = this.onExerciseBlur.bind(this);
    this.onExerciseFocus = this.onExerciseFocus.bind(this);
    this.onExerciseNameChange = this.onExerciseNameChange.bind(this);
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

  render() {
    const { onExerciseFocus, onExerciseBlur, onExerciseNameChange } = this;
    const { exercises, searching, exerciseName, cancelExerciseSearch } = this.props;

    return (
      <Exercise
        {...{
          exercises,
          exerciseName,
          searching,
          onExerciseFocus,
          onExerciseBlur,
          onExerciseNameChange,
          cancelExerciseSearch
        }}
      />
    );
  }
}

const mapStateToProps = ({ Exercise }) => ({
  exercises: Exercise.exercises,
  searching: Exercise.exerciseFocussed || Exercise.exerciseName.length > 0,
  exerciseName: Exercise.exerciseName
});

export default connect(
  mapStateToProps,
  { getExercises, exerciseChangedFocus, exerciseNameChanged, cancelExerciseSearch }
)(ExerciseContainer);
