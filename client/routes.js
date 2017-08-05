import React from 'react';
import { matchRoutes, renderRoutes } from 'react-router-config';

//route containers
import Root from './containers/Root';
import Home from './containers/Home';
/**SHOW_FLOW_LOG**/
import Skeleton from './containers/Skeleton';
import Closet from './components/Closet';
/**END_SHOW_FLOW_LOG**/

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

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
        { path: '/skeleton/:id',
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
