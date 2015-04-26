import {authCursor} from '../state';
import {login, loginError, updateFormField} from './actions';
import {register} from '../dispatcher';

export function getForm() {
  return authCursor().get('form');
}

export const dispatchToken = register(({action, data}) => {

  switch (action) {
    case login:
      authCursor(auth => {
        return resetForm(auth);
      });
      break;

    case loginError:
      authCursor(auth => {
        const error = data;
        return auth.setIn(['form', 'error'], error);
      });
      break;

    case updateFormField:
      authCursor(auth => {
        const {name, value} = data;
        return auth.setIn(['form', 'fields', name], value);
      });
      break;
  }

});

function resetForm(auth) {
  return auth
    .setIn(['form', 'error'], null)
    .setIn(['form', 'fields', 'email'], '')
    .setIn(['form', 'fields', 'password'], '');
}
