import React from 'react';

import EditableSet from 'component/Exercise/EditableSet';

import 'component/Exercise/style/EditableExercise.scss';

const EditableExercise = ({
  exercise,
  onEditSet,
  onSetChanged,
  editingSets,
  onLogNewSet,
  onDeleteSet
}) => (
  <div className="EditableExercise">
    <div className="EditableExercise__header">{exercise.name}</div>

    <div className="EditableExercise__sets">
      {exercise.sets.map(set => (
        <EditableSet
          key={set.id}
          exerciseId={exercise.id}
          set={set}
          onEditSet={onEditSet}
          onSetChanged={onSetChanged}
          editing={editingSets[set.id] || false}
          onDeleteSet={onDeleteSet}
        />
      ))}
    </div>

    <div className="EditableExercise__add-button">
      <button
        className="EditableExercise__add-button circular ui icon button"
        onClick={() => onLogNewSet(exercise.id)}
      >
        <i className="icon add" />
      </button>
    </div>
  </div>
);

export default EditableExercise;
