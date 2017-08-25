//https://redux-saga.js.org/docs/api/
import { delay } from 'redux-saga'
import { put, takeEvery, all } from 'redux-saga/effects';

import {CREATE_SAGA_SKELETON} from './constants';

//workers
export function* helloSagaSkeleton()//no watcher - called directly from store
{
  yield delay(1000)
  console.log('creating saga skeleton from store -');
  console.log('this would then -- important to note: sagaMiddleware.run(rootSkeletonSaga); is what allows all of this to be possible');
  console.log('it kicks off the watch function - which is needed to catch the dispatched constant');
  console.log('After ASYNC I would then call:\n\tyield put({ type: CONSTANT_VARIABLE })//which would then complete the asynch call');
}

export function* createSagaSkeleton()
{
  console.log('creating saga skeleton');
  //do ajax
  //yield put({ type: 'INCREMENT' })
}

//watchers
export function* watchCreateSagaSkeleton() {
  console.log('watching for', CREATE_SAGA_SKELETON);
  yield takeEvery(CREATE_SAGA_SKELETON, createSagaSkeleton)
}


// single entry point to start all Sagas at once
export default function* rootSkeletonSaga() {
  yield all([
    helloSagaSkeleton(),
    watchCreateSagaSkeleton()
  ])
}
