import React, { useEffect, useState, useRef } from 'react';

import TextInput from 'component/common/TextInput';

import 'component/Exercise/style/EditableSet.scss';

const EditableSet = ({
  exerciseId,
  set,
  onEditSet,
  onSetChanged,
  editing,
  onDeleteSet
}) => {
  const repsInputRef = useRef(null);
  const [previousEditing, setPreviousEditing] = useState(false);

  useEffect(() => {
    if (editing && !previousEditing) {
      repsInputRef.current.focus();
    }

    setPreviousEditing(editing);
  }, [editing, previousEditing]);

  return (
    <form className="EditableSet" action="javascript:void(0);">
      {editing ? (
        <div className="EditableSet__input">
          <span className="EditableSet__input--first">
            <TextInput
              value={set.reps}
              onFocus={event => event.target.select()}
              onChange={event =>
                onSetChanged(set.id, { reps: event.target.value }, exerciseId)
              }
              repsInputRef={repsInputRef}
              type="number"
            />
          </span>
          reps
        </div>
      ) : (
        <div className="EditableSet__input">
          <span className="EditableSet__input--first">{set.reps}</span>
          reps
        </div>
      )}

      {editing ? (
        <div className="EditableSet__input">
          <span className="EditableSet__input--first">
            <TextInput
              value={set.lbs}
              onFocus={event => event.target.select()}
              onChange={event =>
                onSetChanged(set.id, { lbs: event.target.value }, exerciseId)
              }
              type="number"
            />
          </span>
          lbs
        </div>
      ) : (
        <div className="EditableSet__input">
          <span className="EditableSet__input--first">{set.lbs}</span>
          lbs
        </div>
      )}

      <div className="EditableSet__actions">
        <button
          className="ui icon button"
          onClick={() => onEditSet(set, exerciseId, !editing)}
        >
          <i className={`${editing ? 'check' : 'edit'} icon`} />
        </button>

        <button
          className="ui icon button"
          onClick={() => onDeleteSet(set.id, exerciseId)}
        >
          <i className="trash icon" />
        </button>
      </div>
    </form>
  );
};

export default EditableSet;
