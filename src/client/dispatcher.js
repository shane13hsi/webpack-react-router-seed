/*eslint-disable no-console */

import {$pendingActionsCursor} from './state';
import {Dispatcher} from 'flux';

const dispatcher = new Dispatcher;
const isDev = 'production' !== process.env.NODE_ENV;

export function register(callback: Function): string {
  return dispatcher.register(callback);
}

export function dispatch(action: Function, data: ?Object, options: ?Object) {
  if (isDev && action.toString === Function.prototype.toString)
    throw new Error(`Action ${action} toString method has to be overridden by setToString.`);

  const looksLikePromise = data && typeof data.then === 'function';
  if (looksLikePromise)
    return dispatchAsync(action, data, options);
  else
    dispatchSync(action, data);
}

export function isPending(actionName) {
  return $pendingActionsCursor().has(actionName);
}

function dispatchAsync(action: Function, promise: Object, options: ?Object) {
  const actionName = action.toString();
  // Pending property is defined lazily.
  if (!action.hasOwnProperty('pending'))
    Object.defineProperty(action, 'pending', {
      get: () => isPending(actionName)
    });

  if (isPending(actionName))
    if (isDev) console.warn(`Warning: Action ${actionName} is already pending.`);

  if (isDev) console.log(`pending ${actionName}`);
  setPending(actionName, true);
  return promise.then(
    (data) => {
      setPending(actionName, false);
      dispatchSync(action, data);
      return data;
    },
    (reason) => {
      if (isDev) console.log(`reject ${actionName}`);
      setPending(actionName, false);
      throw reason;
    }
  );
}

function setPending(actionName: string, pending: boolean) {
  $pendingActionsCursor($pendingActions => pending
    ? $pendingActions.set(actionName, true)
    : $pendingActions.delete(actionName)
  );
}

function dispatchSync(action: Function, data: ?Object) {
  if (isDev) console.log(action);
  dispatcher.dispatch({action, data});
}
