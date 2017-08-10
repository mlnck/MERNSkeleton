import { fromJS } from 'immutable';

import { ALTER_BONE, CREATE_SKELETON, TOGGLE_BOJANGLES } from './constants';
import { alterBone } from './actions';

const initialState = fromJS({
  alterBone: alterBone.NO_ALTERATIONS,
  skeletonsById: [],
  skeletons:[]
});

function skeletonReducer(state = initialState, action) {
  switch (action.type) {
    case ALTER_BONE:
      return { ...state, alterBone: action.altered }
    case CREATE_SKELETON:
      return {
                ...state,
                skeletonsById: [ ...state.skeletonsById, action.id ],
                skeletons: [ ...state.skeletons, { id:action.id, name:action.text, bojangles:false } ]
            }
    case TOGGLE_BOJANGLES:
      return {
                ...state,
                skeletons: state.skeletons.map((skel,indx) => {
                  if(indx === action.index){ return {...skel, bojangles:!skel.bojangles} }
                })
              }
    default:
      return state;
  }
}

export default skeletonReducer;


/*
//ok shape
{
  visibilityFilter: 'SHOW_ALL',
  todos: [
    {
      text: 'Consider using Redux',
      completed: true,
    },
    {
      text: 'Keep all state in a single tree',
      completed: false
    }
  ]
}
*/

/*
//better shape
{
  visibilityFilter: 'SHOW_ALL',
  todosById: {1012:1012. 1045:1012 },//allows to asscoiate multiple
  todos:[
    {
      id:1011,
      text: 'Consider using Redux',
      completed: true,
    },
    {
      id:1012,
      text: 'Keep all state in a single tree',
      completed: false
    }
  ]
}
*/

/*
The reducer is a pure function that takes the previous state and an action, and returns the next state.
(previousState, action) => newState
*/
