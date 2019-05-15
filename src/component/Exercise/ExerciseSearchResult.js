import React from 'react';

import 'component/Exercise/style/ExerciseSearchResult.scss';

const ExerciseSearchResult = ({ exercise, onLogNewExercise }) => (
  <div className="Exercise-search-result">
    <div className="Exercise-search-result__add-button">
      <button className="ui basic circular icon button" onClick={() => onLogNewExercise(exercise)}>
        <i className="add icon" />
      </button>
    </div>

    <div className="Exercise-search-result-description">
      <span className="Exercise-search-result-description__name">
        {exercise.name}
      </span>
      <span className="Exercise-search-result-description__info">
        {exercise.searchResultDescription()}
      </span>
    </div>
  </div>
);

export default ExerciseSearchResult;
