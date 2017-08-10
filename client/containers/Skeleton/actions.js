/**SHOW_FLOW_LOG**/console.log('REDUX - \n\tMERNSkeleton/client/containers/Skeleton/actions.js\n\t\tCreate actions - logic in this file');/**END_SHOW_FLOW_LOG**///remember path in CLI
import './constants';

/*
 * action creators
 */
export function createSkeleton(text) {
  return { id:btoa(Date.now()).replace(/\W/g,''), type: CREATE_SKELETON, text }
}

export function toggleBojangles(index) {
  return { type: TOGGLE_BOJANGLES, index }
}

export function alterBone(altered) {
  return { type: ALTER_BONE, altered }
}
