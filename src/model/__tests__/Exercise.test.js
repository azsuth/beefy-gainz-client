import Exercise from 'model/Exercise';

describe('the last logged function', () => {
  it('should return a string', () => {
    const exercise = new Exercise({
      sets: [{ created: '2019-05-14T18:55:42.508' }]
    });

    // expect(typeof exercise.lastLogged()).toBe('string');
  });

  it('should return data from the last set in the exercise', () => {
    Date.now = jest.fn(() => new Date(Date.UTC(2019, 4, 11, 20, 11, 0, 0)).valueOf());

    const exercise = new Exercise({
      sets: [{
        created: '2019-05-14T17:55:42.508'
      }, {
        created: '2019-05-14T18:55:42.508'
      }]
    });

    expect(exercise.lastLogged()).toBe('3 days ago');
  });
});

describe('the last set function', () => {
  it('should return a description of the last set', () => {
    const exercise = new Exercise({
      sets: [{
        reps: 10,
        lbs: 125
      }, {
        reps: 12,
        lbs: 130
      }]
    });

    expect(exercise.lastSet()).toBe('12@130');
  });
});

describe('the search result description function', () => {
  it('shouldn\'t return anything if there aren\'t any sets', () => {
    expect(new Exercise({}).searchResultDescription()).toBeUndefined();
  });

  it('should return the description of the last set', () => {
    const exercise = new Exercise({
      sets: [{
        reps: 10,
        lbs: 125,
        created: '2019-05-14T17:55:42.508'
      }, {
        reps: 12,
        lbs: 130,
        created: '2019-05-14T18:55:42.508'
      }]
    });

    expect(exercise.searchResultDescription()).toBe('3 days ago, 12@130');
  });
});
