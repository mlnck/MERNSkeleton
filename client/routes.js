import React from 'react';
import { matchRoutes, renderRoutes } from 'react-router-config';

//route containers
import Root from './containers/Root';
import Home from './containers/Home';
/**SHOW_FLOW_LOG**/
import Skeleton from './containers/Skeleton';
/**END_SHOW_FLOW_LOG**/

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

////TMP
const debugLog = (dbg) => { console.log('dbg:',dbg); }
const addProps = (obj,prp) =>
{
  obj[0].customProps = prp;
  return obj;
}

// const Skeleton = ({ route }) => (
//   <div>
//     <h2>Skeleton</h2>
//     {debugLog(['aa',route])}
//     {/* child routes won't render without this */}
//     {renderRoutes(addProps(route.routes,{extra:'propyo'}))}
//   </div>
// )
const Closet = ({route}) => (
  <div>
    <h3>Closet</h3>
    <div>xyz::{route.customProps.extra}</div>
    <div>{debugLog(['zz',route])}</div>
  </div>
)
///END TMP

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
