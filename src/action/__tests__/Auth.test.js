jest.mock('service/api/apiConfig');
import { setIdToken } from 'service/api/apiConfig';

import { loggedIn } from 'action/Auth';

import { LOGIN_STATE_CHANGED, LOGIN_STATE } from 'constants/index';

describe('the loggedIn function', () => {
  it('should call the setIdToken function with the tokenId argument', () => {
    loggedIn({ tokenId: 'asdf' }, { push: jest.fn() })(jest.fn());

    expect(setIdToken).toHaveBeenCalledTimes(1);
    expect(setIdToken).toHaveBeenCalledWith('asdf');
  });

  it('should dispatch a login state changed action', () => {
    const dispatch = jest.fn();

    loggedIn({ tokenId: 'asdf' }, { push: jest.fn() })(dispatch);
    const dispatchedAction = dispatch.mock.calls[0][0];

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatchedAction.type).toBe(LOGIN_STATE_CHANGED);
    expect(dispatchedAction.payload).toBe(LOGIN_STATE.LOGGED_IN);
  });

  it('should use the history object to navigate to /exercises', () => {
    const push = jest.fn();

    loggedIn({ tokenId: 'asdf' }, { push })(jest.fn());

    expect(push).toHaveBeenCalledTimes(1);
    expect(push).toHaveBeenCalledWith('/exercises');
  });
});
