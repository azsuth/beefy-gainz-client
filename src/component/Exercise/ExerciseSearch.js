import React from 'react';

import 'component/Exercise/style/ExerciseSearch.scss';

const ExerciseSearch = ({
  exerciseName,
  onExerciseFocus,
  onExerciseBlur,
  onExerciseNameChange,
  cancelExerciseSearch,
  loadingSearchResults
}) => {
  const inputClass = `Exercise-search__input ui action left icon ${
    loadingSearchResults ? 'loading' : ''
  } input`;

  return (
    <div className="Exercise-search">
      <span className="Exercise-search__label">Log new</span>
      <div className={inputClass}>
        <input
          type="text"
          placeholder="Exercise..."
          value={exerciseName}
          onFocus={onExerciseFocus}
          onBlur={onExerciseBlur}
          onChange={onExerciseNameChange}
        />
        <i className="search icon" />
        <button className="ui icon button" onClick={cancelExerciseSearch}>
          <i className="cancel icon" />
        </button>
      </div>
    </div>
  );
};

export default ExerciseSearch;
