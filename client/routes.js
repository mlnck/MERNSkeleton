// route containers
import Root from './containers/Root';
import Home from './containers/Home';
/** show_sample_project **/
import Skeleton from './containers/Skeleton';
// import Closet from './components/Closet'; // if you were to load a nested component it would be here
/** end_show_sample_project **/


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
        },
        {
          path: '/skeletons/:id', // only add from here down when 'Start with Sample' option is chosen from CLI setup_
          exact: false,
          component: Skeleton,
          loadDataKey: 'allSkeletons',
          loadDataFnc: 'SkeletonController.getSkeletonsByRoute',
          // routes: [ // if you were to load a nested component it would be here
          //   { path: '/skeletons/:id/',
          //     exact: false,
          //     component: Closet,
          //     loadDataKey:'closetKey',
          //     loadDataFnc:'closetFnc'
          //   }
          // ]
        }
      ]// root routes
    }
  ];
  return allRoutes;
}
