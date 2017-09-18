import {
  CREATE_SKELETON,
  CREATE_SAGA_SKELETON_LOAD,
  DELETE_SAGA_SKELETON_INIT,
  TOGGLE_BOJANGLES,
  ALTER_BONE,
  SEARCH_SKELETON } from './constants';

/** show_sample_project **/
import { qonsole } from 'qonsole'; //eslint-disable-line
qonsole.debug(qonsole.NORM, 'SKELETON ACTIONS LOADED:', '\tMERNSkeleton/client/containers/Skeleton/state/actions.js', '\t\tCreate actions - logic in this file');
/** end_show_sample_project **/// remember path in CLI

/*
 * action creators
 */
export function createSagaSkeleton(obj)
{ return { type: CREATE_SAGA_SKELETON_LOAD, obj }; }

export function createSkeleton(text)
{ return { type: CREATE_SKELETON, text }; }

export function deleteSagaSkeleton()
{ return { type: DELETE_SAGA_SKELETON_INIT }; }

export function searchSkeleton(text)
{ return { type: SEARCH_SKELETON, text }; }

export function toggleBojangles(index)
{ return { type: TOGGLE_BOJANGLES, index }; }

export function alterBone(altered)
{ return { type: ALTER_BONE, altered }; }
