import React, { useEffect, useState, useRef } from 'react';

import EditableSet from 'component/Exercise/EditableSet';
import TextInput from 'component/common/TextInput';

import 'component/Exercise/style/EditableExercise.scss';

const EditableExercise = ({
  exercise,
  onEditSet,
  onSetChanged,
  editingSets,
  onLogNewSet,
  onDeleteSet,
  onEditExercise,
  editing,
  onExerciseChanged,
  onDeleteExercise
}) => {
  const exerciseInputRef = useRef(null);
  const [previousEditing, setPreviousEditing] = useState(false);

  useEffect(() => {
    if (editing && !previousEditing) {
      exerciseInputRef.current.focus();
    }

    setPreviousEditing(editing);
  }, [editing, previousEditing]);

  return (
    <div className="EditableExercise">
      <div className="EditableExercise__header">
        <span className="EditableExercise__header-input">
          {editing ? (
            <TextInput
              value={exercise.name}
              onFocus={event => event.target.select()}
              onChange={event =>
                onExerciseChanged(exercise.id, { name: event.target.value })
              }
              inputRef={exerciseInputRef}
              theme="dark"
              align="left"
            />
          ) : (
            <>{exercise.name}</>
          )}
        </span>

        <div className="EditableExercise__header-actions">
          <button
            className="ui basic icon button"
            onClick={() => onEditExercise(exercise, !editing)}
          >
            <i className={`${editing ? 'check' : 'edit'} icon`} />
          </button>

          <button
            className="ui basic icon button"
            onClick={() => onDeleteExercise(exercise.id)}
          >
            <i className="trash icon" />
          </button>
        </div>
      </div>

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
};

export default EditableExercise;
