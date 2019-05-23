import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

class Exercise {
  constructor(exercise) {
    this._exercise = exercise;
  }

  get id() {
    return this._exercise.id;
  }

  get name() {
    return this._exercise.name;
  }

  set name(newName) {
    this._exercise.name = newName;
  }

  get sets() {
    return this._exercise.sets;
  }

  get obj() {
    return this._exercise;
  }

  lastLogged() {
    if (this._exercise.sets && this._exercise.sets.length > 0) {
      const created = `${
        this._exercise.sets[this._exercise.sets.length - 1].created
      }Z`;
      return `${distanceInWordsToNow(created)} ago`;
    }
  }

  lastSet() {
    if (this._exercise.sets && this._exercise.sets.length > 0) {
      const set = this._exercise.sets[this._exercise.sets.length - 1];
      return `${set.reps}@${set.lbs}`;
    }
  }

  searchResultDescription() {
    if (this._exercise.sets && this._exercise.sets.length > 0) {
      return `${this.lastLogged()}, ${this.lastSet()}`;
    }
  }
}

export default Exercise;
