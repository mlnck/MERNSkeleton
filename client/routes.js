import React from 'react';
import { matchRoutes, renderRoutes } from 'react-router-config';

//components
import Root from './containers/Root';
console.log('Root:',Root);

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
// const Root = ({ route }) => (
//   <div>
//     <h1>Root</h1>
//     {/* child routes won't render without this */}
//     {renderRoutes(route.routes)}
//   </div>
// )
const Home = ({ route }) => (
  <div>
    <h2>Home</h2>
  </div>
)
const Skeleton = ({ route }) => (
  <div>
    <h2>Skeleton</h2>
    {debugLog(['aa',route])}
    {/* child routes won't render without this */}
    {renderRoutes(addProps(route.routes,{extra:'propyo'}))}
  </div>
)
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

  const allRoutes = [
    {
      component: Root,
      routes: [
        { path: '/',
          exact: true,
          loadData:homeFnc,
          component: Home
        },
        { path: '/skeleton/:id',
          component: Skeleton,
          routes: [
            { path: '/skeleton/:id/closet',
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
