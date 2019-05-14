import React from 'react';

import 'component/Exercise/style/EditableSet.scss';

const EditableSet = ({ set }) => {
  return (
    <div className="EditableSet">
      <span>{set.reps} reps</span>
      <span>{set.lbs} sets</span>

      <div className="EditableSet__actions">
        <button className="ui icon button">
          <i className="edit icon" />
        </button>

        <button className="ui icon button">
          <i className="trash icon" />
        </button>
      </div>
    </div>
  );
};

export default EditableSet;
