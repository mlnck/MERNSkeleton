import React from 'react';
import { matchRoutes, renderRoutes } from 'react-router-config';

//route containers
import Root from './containers/Root';
import Home from './containers/Home';
/**SHOW_FLOW_LOG**/
import Skeleton from './containers/Skeleton';
import Closet from './components/Closet';
/**END_SHOW_FLOW_LOG**/



//these should come from server/controllers - accessing mongo and returning data
const homeFnc = ()=>{ return 'backend (mongo) home fnc called'; }
const closetFnc = (obj)=>{ console.log('p0obj:',obj); return 'backend (mongo) closet fnc called with param' + obj + ', ' + obj.params.id; }

export default function getRoutes() {

  const allRoutes = [//when adding these via CLI we will need to give a list of all parents that route could be associated with
    {
      component: Root,
      routes: [
        { path: '/',
          exact: true,
          loadData:homeFnc,
          component: Home
        },
        { path: '/skeleton/:id',//only add from here down when 'Start with Sample' option is chosen from CLI setup_
          exact: false,
          component: Skeleton,
          routes: [
            { path: '/skeleton/:id/closet',
              exact: false,
              loadData:closetFnc,
              component: Closet
            }
          ]
        }
      ]
    }
  ];
  return allRoutes;

}
