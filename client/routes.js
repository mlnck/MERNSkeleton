import React from 'react';
import { matchRoutes, renderRoutes } from 'react-router-config';

// route containers
import Root from './containers/Root';
import Home from './containers/Home';
/** START_WITH_SAMPLE**/
import Skeleton from './containers/Skeleton';
import Closet from './components/Closet';
/** END_START_WITH_SAMPLE**/


export default function getRoutes()
{
  const allRoutes = [// when adding these via CLI we will need to give a list of all parents that route could be associated with
    {
      component: Root,
      routes: [
        { path: '/',
          exact: true,
          component: Home
        },
        { path: '/skeletons/', // only add from here down when 'Start with Sample' option is chosen from CLI setup_
          exact: true,
          component: Skeleton,
          loadDataKey: 'allSkeletons',
          loadDataFnc: 'SkeletonController.getSkeletonsByRoute',
          // routes: [
          //   { path: '/skeletons/:id/',
          //     exact: false,
          //     component: Closet,
          //     loadDataKey:'closetKey',
          //     loadDataFnc:'closetFnc'
          //   }
          // ]
        },
        {
          path: '/skeletons/:id', // only add from here down when 'Start with Sample' option is chosen from CLI setup_
          exact: false,
          component: Skeleton,
          loadDataKey: 'allSkeletons',
          loadDataFnc: 'SkeletonController.getSkeletonsByRoute',
        }
      ]
    }
  ];
  return allRoutes;
}
