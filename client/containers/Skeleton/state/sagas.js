//https://redux-saga.js.org/docs/api/
import { delay } from 'redux-saga'
import { put, call, apply, takeEvery, takeLatest, all } from 'redux-saga/effects';

import {CREATE_SAGA_SKELETON_LOAD, CREATE_SAGA_SKELETON_SUCCESS, CREATE_SAGA_SKELETON_FAILED} from './constants';

//workers
function* helloSagaSkeleton()//no watcher - called directly from store
{
  yield delay(1000)
  console.log('creating saga skeleton from store -');
  console.log('this would then -- important to note: sagaMiddleware.run(rootSkeletonSaga); is what allows all of this to be possible');
  console.log('it kicks off the watch function - which is needed to catch the dispatched constant');
  console.log('After ASYNC I would then call:\n\tyield put({ type: CONSTANT_VARIABLE })//which would then complete the asynch call');
}


function* createSagaSkeleton(payload)
{
  console.log('We have called the route to create the skeleon using this object:',payload);
  console.log('Now we fetch it');

  let skelData = {
        title:payload.skeletonName,
        content:payload.skeletonCaption,
      },
      fetchConf = {
        method: 'POST',
         body: JSON.stringify(skelData),
         headers: {"Content-Type": "application/json"}
      }
  const fetched = yield fetch('http://localhost:8000/api/skeleton',fetchConf)
    .then(response => {
      console.log('we yield the fetched `const`, and return the `json()` response', response);
      return response.json();
    })
  return fetched;
}

function* callCreateSagaSkeleton({obj})
{
  console.log('We handle the success or failure from the `fetch` here.');
  console.log('We call `createSagaSkeleton` first:');
  try {
      const skelSaga = yield call(createSagaSkeleton,obj);
      console.log('After receiving the json() response we now `put` (saga\'s version of dispatch) the action to the store -> reducer');
      yield put({type: CREATE_SAGA_SKELETON_SUCCESS, skelSaga});
   } catch (e) {
      yield put({type: CREATE_SAGA_SKELETON_FAILED, message: e.message});
   }
}

//watchers
function* watchCreateSagaSkeleton() {
  //I think this runs "callCreateSagaSkeleton" -> then that waits for the ajax and dispatches
  console.log('watching for', CREATE_SAGA_SKELETON_LOAD);
  console.log('Using `takeLatest`, Alternatively you may use `takeEvery` which allows for concurrent fetches.');
  console.log('if same action gets dispatched with `takeLatest`, and a fetch is already pending, that pending fetch is cancelled and only the latest one will be run');
  yield takeLatest(CREATE_SAGA_SKELETON_LOAD, callCreateSagaSkeleton)
}


// single entry point to start all Sagas at once
export default function* rootSkeletonSaga() {
  yield all([
    helloSagaSkeleton(),
    watchCreateSagaSkeleton()
  ])
}
