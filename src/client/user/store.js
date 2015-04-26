import {Map} from 'immutable';
import {logged} from '../auth/actions';
import {register} from '../dispatcher';
import {userCursor} from '../state';

const getIn = (path) => userCursor().getIn(path);

export const dispatchToken = register(({action, data}) => {

  switch (action) {
    case logged:
      userCursor(user => {
        return user.setIn(['authData'], Map(data));
      });
      break;
  }

});

export function isLoggedIn() {
  // TODO: Use sessionStorage and real redirect to fix Chrome.
  return !!getIn(['authData']);
}
