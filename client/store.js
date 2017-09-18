/**
 * Create the store with asynchronously loaded reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducers';
/** show_sample_project **/
import { qonsole } from 'qonsole'; //eslint-disable-line
import { createSkeleton, toggleBojangles, alterBone } from './containers/Skeleton/state/actions';

import rootSkeletonSaga from './containers/Skeleton/state/sagas';
/** end_show_sample_project **/

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState, history = {})
{
  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history)
  ];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
  /* eslint-enable */

  const enhancers = [
    applyMiddleware(...middlewares)
  ];

  const store = createStore(
    createReducer(),
    fromJS(initialState),
    composeEnhancers(...enhancers)
  );

  // Sagas
  sagaMiddleware.run(rootSkeletonSaga);

  // Extensions
  store.asyncReducers = {}; // Async reducer registry

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if(module.hot)
  {
    module.hot.accept('./reducers', () =>
    {
      require('./reducers').then((reducerModule) => // eslint-disable-line
      {
        const createReducers = reducerModule.default;
        const nextReducers = createReducers(store.asyncReducers);

        store.replaceReducer(nextReducers);
      });
    });
  }

  /** show_sample_project **/
  qonsole.debug(qonsole.NORM, 'REDUX', '\tMERNSkeleton/client/store.js', '\t\tExporting store object with all reducers included',
    '\t\t\tThis shows an example of dispatching an action straight from the store');
  const unsubscribe = store.subscribe(() =>
    qonsole.debug(qonsole.NORM, 'dispatched action from store changes state to:', store.getState())
  );
  // Dispatch some actions
  store.dispatch(createSkeleton('Boney'));
  store.dispatch(createSkeleton('Frank'));
  store.dispatch(createSkeleton('Freddy'));
  store.dispatch(createSkeleton('Bonez'));
  store.dispatch(toggleBojangles(0));
  store.dispatch(toggleBojangles(2));
  store.dispatch(alterBone('NO_ALTERATIONS'));
  // Stop listening to state updates
  unsubscribe();
  // saga example
  // sagaMiddleware.run(helloSagaSkeleton);
  /** end_show_sample_project **/
  return store;
}
