import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

class Exercise {
  constructor(exercise) {
    this.exercise = exercise;
  }

  get id() {
    return this.exercise.id;
  }

  get name() {
    return this.exercise.name;
  }

  get sets() {
    return this.exercise.sets;
  }

  lastLogged() {
    if (this.exercise.sets && this.exercise.sets.length > 0) {
      const created = `${
        this.exercise.sets[this.exercise.sets.length - 1].created
      }Z`;
      return `${distanceInWordsToNow(created)} ago`;
    }
  }

  lastSet() {
    if (this.exercise.sets && this.exercise.sets.length > 0) {
      const set = this.exercise.sets[this.exercise.sets.length - 1];
      return `${set.reps}@${set.lbs}`;
    }
  }

  searchResultDescription() {
    if (this.exercise.sets && this.exercise.sets.length > 0) {
      return `${this.lastLogged()}, ${this.lastSet()}`;
    }
  }
}

export default Exercise;
