// https://redux-saga.js.org/docs/api/
import { delay } from 'redux-saga';
import { put, call, takeLatest, all } from 'redux-saga/effects';
import { qonsole } from 'qonsole'; //eslint-disable-line

import { CREATE_SAGA_SKELETON_LOAD, CREATE_SAGA_SKELETON_SUCCESS, DELETE_SAGA_SKELETON_INIT, DELETE_SAGA_SKELETON_SUCCESS, FETCH_SAGA_SKELETON_FAILED } from './constants';

// workers
function* helloSagaSkeleton()// no watcher - called directly from store
{
  yield delay(1000);
  qonsole.debug(qonsole.NORM, 'creating saga skeleton from store -',
    'this would then -- important to note: sagaMiddleware.run(rootSkeletonSaga); is what allows all of this to be possible',
    'it kicks off the watch function - which is needed to catch the dispatched constant',
    'After ASYNC I would then call:\n\tyield put({ type: CONSTANT_VARIABLE })//which would then complete the asynch call');
}


function* createSagaSkeleton(payload)
{
  qonsole.debug(qonsole.NORM, 'We have called the route to create the skeleon using this object:', payload, 'Now we fetch it');

  const skelData = {
      title: payload.skeletonName,
      content: payload.skeletonCaption,
    },
    fetchConf = {
      method: 'POST',
      body: JSON.stringify(skelData),
      headers: { 'Content-Type': 'application/json' }
    };
  const fetched = yield fetch('http://localhost:8000/api/skeleton', fetchConf)
    .then((response) =>
    {
      qonsole.debug(qonsole.NORM, 'we yield the fetched `const`, and return the `json()` response', response);
      return response.json();
    });
  return fetched;
}

function* deleteSagaSkeleton()
{
  const fetchConf = {
    method: 'DELETE',
    body: JSON.stringify({ title: 'Tony' }),
    headers: { 'Content-Type': 'application/json' }
  };
  const fetched = yield fetch('http://localhost:8000/api/skeleton', fetchConf)
    .then((response) =>
    {
      qonsole.debug(qonsole.NORM, 'delete fetched::', response);
      return 'tonydeleted';
    });
  return fetched;
}


function* callCreateSagaSkeleton({ obj })
{
  qonsole.debug(qonsole.NORM, 'We handle the success or failure from the `fetch` here.', 'We call `createSagaSkeleton` first:');
  try
  {
    const skelSaga = yield call(createSagaSkeleton, obj);
    qonsole.debug(qonsole.NORM, 'After receiving the json() response we now `put` (saga\'s version of dispatch) the action to the store -> reducer');
    yield put({ type: CREATE_SAGA_SKELETON_SUCCESS, skelSaga });
  }
  catch (e)
  {
    yield put({ type: FETCH_SAGA_SKELETON_FAILED, message: e.message });
  }
}

function* callDeleteSagaSkeleton()
{
  try
  {
    yield call(deleteSagaSkeleton);
    yield put({ type: DELETE_SAGA_SKELETON_SUCCESS });
  }
  catch (e)
  {
    yield put({ type: FETCH_SAGA_SKELETON_FAILED, message: e.message });
  }
}

// watchers
function* watchCreateSagaSkeleton()
{
  qonsole.debug(qonsole.NORM, 'watching for', CREATE_SAGA_SKELETON_LOAD,
    'Using `takeLatest`, Alternatively you may use `takeEvery` which allows for concurrent fetches.',
    'if same action gets dispatched with `takeLatest`, and a fetch is already pending, that pending fetch is cancelled and only the latest one will be run');
  yield takeLatest(CREATE_SAGA_SKELETON_LOAD, callCreateSagaSkeleton);
}

function* watchDeleteSagaSkeleton()
{
  qonsole.debug(qonsole.NORM, 'watching for', DELETE_SAGA_SKELETON_INIT);
  yield takeLatest(DELETE_SAGA_SKELETON_INIT, callDeleteSagaSkeleton);
}


// single entry point to start all Sagas at once
export default function* rootSkeletonSaga()
{
  yield all([
    helloSagaSkeleton(),
    watchCreateSagaSkeleton(),
    watchDeleteSagaSkeleton()
  ]);
}
