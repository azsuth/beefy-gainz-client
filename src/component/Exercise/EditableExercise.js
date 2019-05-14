import React from 'react';

import EditableSet from 'component/Exercise/EditableSet';

import 'component/Exercise/style/EditableExercise.scss';

const EditableExercise = ({ exercise }) => (
  <div className="EditableExercise">
    <div className="EditableExercise__header">{exercise.name}</div>

    <div className="EditableExercise__sets">
      {exercise.sets.map(set => (
        <EditableSet key={set.id} set={set} />
      ))}
    </div>

    <div className="EditableExercise__add-button">
      <button className="EditableExercise__add-button circular ui icon button">
        <i className="icon add" />
      </button>
    </div>
  </div>
);

export default EditableExercise;
