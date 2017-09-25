// https://redux-saga.js.org/docs/api/
import { delay } from 'redux-saga';
import { put, call, takeLatest, all } from 'redux-saga/effects';

// import {  } from './constants';


// single entry point to start all Sagas at once
export default function* xxxSaga()
{
  yield all([
    //arrayOfSagaFunctions()
  ]);
}
