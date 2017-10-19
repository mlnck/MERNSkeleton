## Tutorial

---
### A Quick Note on the Level of Difficulty

This is not (nor is it intended to be) a "solve-all" solution for installing and configuring the MERN stack. I have automated many of the features involved, and have put in quite a few fallback procedures, but by no stretch of the imagination have I taken on the task of creating something that will just work out of the box.

Using this assumes that you have at least a fundamental grasp of the main languages & frameworks involved. You can, and I'm sure at some points will, break the build. All of that being said, this should streamline _MUCH_ of the tedium that comes with creating the MERN stack from scratch. Enjoy!

---

## 1) Installing the Package


Before we actually write any functional code we will need to install the _***mlnck-mern-cli***_ node package. We do that by opening a command line  and typing:
`$ npm install -g mlnck-mern-cli`
_OR_
`$ yarn global add mlnck-mern-cli`
(remember, _global_ is not a flag in yarn. It must be the first parameter)

After the package is downloaded and installed let's take a quick look at the commands we will be using in this tutorial by running:
`$ mlnck-mern -h`

There's nothing really important to take from the above command other than that if you ever forget which commands are available, just writing _-h_ or _--help_ will show you the full list.

---

## 2) Creating a New Project


` $ mlnck-mern create PlaneRide`
` $ cd PlaneRide/`
` $ mlnck-mern configure`
 - _author_-> ***<Your Name/Handle/Company>***
 - _Install sample project_ -> ***yes***
 - _Install optional components_ -> ***yes***

> _NOTE:_ Installing dependencies will take a few minutes

Since the app uses mongo, we need to [install it](https://docs.mongodb.com/manual/installation/) and run this in a new tab:
-  `$ mongod`

Update .env.example
  - rename from _.env.example_ to _***.env***_
  - We'll go ahead and stub out the local paths as well
```
   MONGO_USE_LOCAL='true'
   MONGO_LOCAL_URL='mongodb://127.0.0.1:27017/mern-skeleton'
   MONGO_TESTING_URL='mongodb://127.0.0.1:27017/mern-skeleton-test'
   MONGO_USER=‘username’
   MONGO_PW=‘password’
   MONGO_DB=‘livedb’
   MONGO_WEB_URL=‘livedatabaseurl:livedatabaesport/‘
   MONGO_AUTH='?ssl=true&replicaSet=mongodb-shard-0&authSource=admin'
   MONGO_SEED='false'
```
Back in your original tab we sould run:
- `$ yarn start`
_OR_
- `$ npm start`

Navigate to: [http://localhost:8000](http://localhost:8000)

---
> ***Open Console***, click buttons, look around, watch the entire lifecycle, the copious amounts of comments. Make sure to look into the ***command line*** as well to see what happens on the backend.
>
> With the starter project, _the database has been seeded_, that is where the skeleton information is coming from. Take a look at the difference between the pre-processed, out of state, information and the ajax’ed, in state, information.
>
> Now would also be a good time to install the [React Developer Tools](https://github.com/facebook/react-devtools) as well as the [Redux DevTools](https://github.com/zalmoxisus/redux-devtools-extension) if you do not currently have them.

---
## 3) Set Up the Basics

When you are finished browsing, remove the sample files with:
- `$ mlnck-mern remove`

Then:
- `$ yarn start`
_OR_
- `$ npm start`
Navigate to: http://localhost:8000/
  - You are now at the base, blank, skeleton file

For this walkthrough we are going to create a very simple app that will introduce the functionality contained within the CLI and show how to integrate it with the MERN stack.

To get started let's update our project's header text.

- within _PlaneRide/client/components/Header/index.js_ let's change line ***20*** to read `navTitle: 'Plane Ride',`
We also want to give our app some base styles.
- within _PlaneRide/client/\_scss/main.scss_ let's add the following:
```
body,html{ height:100%; }
body
{
  @extend .land-and-sky;

  &:takeoff{ @extend .pure-sky; }
}
footer{ bottom:0; position: fixed; right:0; }
```
- and within _PlaneRide/client/\_scss/base/\_main-settings.scss_ we'll add the following:
```
.land-and-sky
{
  background: #e4f5fc; /* Old browsers */
  background: -moz-linear-gradient(top, #e4f5fc 0%, #bfe8f9 24%, #bfe8f9 24%, #9fd8ef 51%, #bfe8f9 79%, #ed9017 82%, #ed9017 100%); /* FF3.6-15 */
  background: -webkit-linear-gradient(top, #e4f5fc 0%,#bfe8f9 24%,#bfe8f9 24%,#9fd8ef 51%,#bfe8f9 79%,#ed9017 82%,#ed9017 100%); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(to bottom, #e4f5fc 0%,#bfe8f9 24%,#bfe8f9 24%,#9fd8ef 51%,#bfe8f9 79%,#ed9017 82%,#ed9017 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#e4f5fc', endColorstr='#ed9017',GradientType=0 ); /* IE6-9 */
}

.pure-sky
{
  background: #166de0; /* Old browsers */
  background: -moz-linear-gradient(top, #166de0 0%, #72bff9 60%, #6393c1 100%); /* FF3.6-15 */
  background: -webkit-linear-gradient(top, #166de0 0%,#72bff9 60%,#6393c1 100%); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(to bottom, #166de0 0%,#72bff9 60%,#6393c1 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#166de0', endColorstr='#6393c1',GradientType=0 ); /* IE6-9 */
}
```

Now, if we refresh the page, we should see a new view with a background somewhat resembling a landscape.

So, how can we take a plane ride without any planes?
We can't. Let's take a look at where to store the static assets that your app may use.

Within the _PlaneRide/_build/assets/_ folder, add a new directory called "_imgs_".

You can download [these](https://gallery.yopriceville.com/var/resizes/Free-Clipart-Pictures/Airplanes-PNG-Clipart/Plane_Transparent_PNG_Clipart.png?m=1434276589) [airplanes](https://gallery.yopriceville.com/var/resizes/Free-Clipart-Pictures/Airplanes-PNG-Clipart/Red_Plane_Transparent_PNG_Clipart.png?m=1434276589) (which I will be using in the tutorial) and place them into the newly created _PlaneRide/_build/assets/imgs_ folder; renaming them `plane1.png` and `plane2.png` respectively.

Now, to access these files from anywhere in the app we can do so by referencing the items starting from the _assets/_ path. (e.g. `<img src='imgs/plane1.png' alt="plane1" />`).

After the planes are placed into the folder, we are going to allow the database to store some information about them that we are going to use on startup.


Inside of _PlaneRide/config/utils/server/seed.db.js_
Paste the following:
```
import Plane from '../../../server/models/plane.model';

export default function () {
  Plane.count().exec((err, count) => {
    if (count > 0) {
      console.log('Plane(s) Already Exist Within Mongo - no new seeds added');
      return;
    }

    const content1 = `My fear of planes has taken off.`;
    const content2 = `He became a sky diver out of the blue.`;

    const plane1 = new Plane({ img:'plane1.png', name: 'Air Ufthedog', content: content1, confirmation:'What\s our vector Victor?' });
    const plane2 = new Plane({ img:'plane2.png', name: 'Aluminum Falcon', content: content2 , confirmation:'That\'s a rodger Roger!'});

    Plane.create([plane1, plane2], (error) => {
      if (!error) {
        console.log('Plane Successfully Seeded');
      }
    });
  });
}

```

Now that the database has the initial information. And if your server is still running you will notice tht an error is thrown. That is because the plane's schema file has not been created yet. Now, we could add the schema by itself through the CLI using `$ mlnck-mern create-schema plane`, but first things first.

One of the benefits of using the CLI is that by answering just a few questions a customized component will be created, and all associated files and paths will be incorporated into the app.

---
## 4) Create the Plane Component

When you're making a new React Component (regardless of if it will be treated as a container or component) you need to run the _new_ command. So for this case, run:
`$ mlnck-mern new Plane`
 - _type?_ -> ***component***
 - _will this be a stateful component?_ -> ***no***
 - _create route?_ -> ***no***
 - _will this component dispatch actions?_ -> ***no***
 - _will this component have side-effects?_ -> ***no***
 - _will this component need javascript styling?_ -> ***yes***

> _Note:_ This boilerplate doesn't attempt to solve the arguments between whether or not it's better to use js styling vs css. Both ways are available, so the purpose now is just to show how they are utilized.


If we take a look we will now have a new _Plane_ folder inside of our _PlaneRide/client/components/_ directory. The options that were chosen also:
- added the files that will be used for the:
  - [js styling](https://www.styled-components.com/)

While we're at it. Let's add the styling now.
Overwrite the constant in _PlaneRide/client/components/Plane/StyledPlane.js_ to read:
```
const StyledPlane = styled.div`
  background-color:rgba(255,255,255,.3);
  background-position: center center;
  background-repeat:no-repeat;
  background-size:contain;
  border:3px solid white;
  border-radius:5px;
  cursor:pointer;
  float:left;
  height:300px;
  margin:0 9.5%;
  position:relative;
  text-align:center;
  width:30%;

  h2{ font-size:16px; font-weight:600; }
  p
  {
    background-color: rgba(255,255,255,.5);
    bottom:20px;
    padding:5px 0;
    position:absolute;
    width:100%;
  }
`;
```

And within _PlaneRide/client/components/Plane/index.js_ we will need to update:
```
return (
    <StyledPlane style={{'backgroundImage':`url('/imgs/${props.img}')`}}>
    <br/><br/>
      <h2>{props.name}</h2>
      <p>{props.content}</p>
      <button onClick={props.cloneMe} data-id={props._id}>Clone</button>
    </StyledPlane>
  );
```

Even though we have now created the component we still receive an error when we attempt to seed the database.

---
## 5) Create the Plane Schema

We need to add the structure of the plane component as it will be stored within Mongo. We can do this by running:
`$ mlnck-mern create-schema plane`

Check it out. No more error!
But we still have some work to do.

Let's start by populating our new model.
Overwirte the constant in _PlaneRide/server/models/plane.model.js_ to be:
```
const planeSchema = new Schema({
  img: { type: 'String', required: true },
  name: { type: 'String', required: true },
  content: 'String',
  confirmation: 'String',
  dateAdded: { type: 'Date', default: Date.now, required: true },
});
```
If we start the server, launch mongo, and do a quick query, we will see that the database has not changed. It is still empty. That is because we have not told our app to seed the database.

Within `PlaneRide/.env` we need to update the *MONGO_SEED* variable.
```
MONGO_SEED='true'
```
If you run the query again, you will now see the data from the seed file has successfully been saved.
```
> db.planes.find()
{ "_id" : ObjectId("59e3bf7726dd5319781b1354"), "img" : "plane1.png", "name" : "Air Ufthedog", "content" : "My fear of planes has taken off.", "confirmation" : "Whats our vector Victor?", "dateAdded" : ISODate("2017-10-15T20:05:11.195Z"), "__v" : 0 }
{ "_id" : ObjectId("59e3bf7726dd5319781b1355"), "img" : "plane2.png", "name" : "Aluminum Falcon", "content" : "He became a sky diver out of the blue.", "confirmation" : "That's a rodger Roger!", "dateAdded" : ISODate("2017-10-15T20:05:11.198Z"), "__v" : 0 }
```

So, what have we done to this point?
Basically, we have created all of the content that will be rendered in our final page. Let's make that now.

---
## 6) Create the Hanger Container

As when you created the ***Plane Component*** you need to run the _new_ command. So for this case, run:
`$ mlnck-mern new Hanger`
 - _type?_ -> ***container***
 - _will this be a stateful component?_ -> ***yes***
 - _create route?_ -> ***yes***
 - _will this component dispatch actions?_ -> ***yes***
 - _will this component have side-effects?_ -> ***yes***
 - _will this component need javascript styling?_ -> ***no***

If we take a look we will now have a new _Hanger_ folder inside of our _PlaneRide/client/containers/_ directory. The options that were chosen also:
- created the _state_ directory
- added the files that will be used for the:
  - [actions](http://redux.js.org/docs/basics/Actions.html)
  - [reducers](http://redux.js.org/docs/basics/Reducers.html)
  - [side effects](https://goshakkk.name/redux-side-effect-approaches/)
  - [memoizations](http://redux.js.org/docs/recipes/ComputingDerivedData.html)
- updated the store to create and handle the Hanger Saga_
- updated _PlaneRide/client/reducers.js_ to include the hanger reducer

> _Note:_ This boilerplate doesn't attempt to solve the discussions/disputes between using sagas,thunk,etc. By default, sagas are available and this will show you how they are utilized. If you would prefer thunks, by all means add them.

Anytime that you create a component that needs to use a route, the command line will remind you that you need to add the routes themselves. We'll do that next.

---
## 7) Create the Hanger Route

Let's run:
`$ mlnck-mern create-client-route /Hanger`
 - _Path Endpoint is /Hanger:_ -> ***yes***
 - _component/container name is: Hanger?_ -> ***yes*** [see Note2 below]
 - _Is this a nested component/container?_ -> ***no***
 - _Path is exact?_ -> ***yes***
 - _pre-processed server side controller:_ -> ***hanger.controller.js***  [see Note3 below]
 - _pre-processed server side method:_ -> ***other***  [see Note3 below]
 - _enter custom pre-processed server side method:_ -> ***getAllPlanes*** [see Note3 below]
 - _enter the object key that will be used to access information on page render:_ -> ***allPlanes***  [see Note3 below]
 - _create Hanger schema if it does not exist?_ -> ***no***

> _Note1:_ `croute` is the alias for `create-client-route`.
  You can view all commandline aliases by running `mlnck-mern -h`
>
> _Note2:_ For the route to work, you ***_MUST_*** reference a pre-existing component or container element. Mutliple routes can reference the same element, as long as the element is created first.
>
> _Note3:_ Using [Static Routing](https://reacttraining.com/react-router/web/guides/static-routes) we can request information from a resource and keep it out of the state. That is what we are using this information for.

In a nutshell, what we have just done, is created the client side route that will link our _Hanger_ component to it's respective url _"/Hanger"_. We have also told the route that it will be pulling in information on load by accessing the server side _hanger.controller.js_ file (which doesn't exist yet) and running the _getAllHangers_ function.

(If you would like to see how the paths are structured you can do so by looking in this file: _PlaneRide/client/routes.js_)

Let's follow the prompt and add the remaining files that are needed now.

---
## 8) Create the Server Side Files

`$ mlnck-mern create-server-route Hanger`
 - _Create controller if it does not exist?_ -> ***no***
 - _Create schema if it does not exist?_ -> ***no***

> _Note:_ `sroute` is the alias for `create-server-route`.
> You can view all commandline aliases by running `mlnck-mern -h`

Since we know that our controller file is created and we do not need a schema file for the Hanger, we can set both of these to _no_.

However, if we check our files, we will notice that we have a few new ones on the server side.
- _PlaneRide/server/routes/hanger.routes.js_: A stub file to handle the routing of the hanger (that would be defined in _PlaneRide/server/server.js_)
- _PlaneRide/server/controllers/hanger.controller.js_: Here is the file where you will handle your Mongo calls and data returns/responses.

Inside of _PlaneRide/server/server.js_ we have also included our server side route and controller:
```
// Server Side Routes:
import hangerRoutes from './routes/hanger.routes';
import * as HangerController from './controllers/hanger.controller'; // eslint-disable-line
```

Now we have told the server that we want to run the query to get all of the planes from the database and use those to populate info on our page. This will keep them out of the state and more closely resemble what you would typically use a CMS for...but hey, this is just a "how to" tutorial; so it's good to know.

---
## 9) Setting up the routes

Before we actually include our populated data let's make sure we have a place for it to go.

Inside of: _PlaneRide/client/containers/Home/index.js_ We want to add a way for the user to get to the hanger. And since we are not worried about state persistence at this time we can get away with using a normal _a_ element.
```
render()
  {
    return (
      <StyledHome>
        Welcome, please continue to <a href='/hanger'>select a plane</a>!
      </StyledHome>
    );
  }
```

Clicking the url will direct us to the rendered ***Hanger*** component. But to suppress an error we need to update the code in _PlaneRide/client/containers/Hanger/index.js_ to include the ***Plane*** Component:

```
//import Components
import Plane from '../../components/Plane';
```
 Errorless, we can now proceed to obtain and use data stored in Mongo.

---
## 10) Stateless Population from the Server

To begin, let's query Mongo and pull our plane info that we originally seeded. To do so, we need to overwrite the function that we defined in the path _PlaneRide/server/controllers/hanger.controller.js_:
```
import Plane from '../models/plane.model';

export function getAllPlanes(o){
  return Plane.find().sort('name').exec((err, planes) =>
  {
    if(err){ return { error: err }; }
    return { planes };
  })
  .then((obj) =>
  {
    let routeObj = {};
        routeObj[o['dataKey']] = obj;
    return routeObj;
  });
}

```

> _NOTE:_ The important about the above, is that you make sure you return the queried/parsed data on the key of `o['dataKey]` because that is what maps to the ***object key*** you defined when setting the route in step 7 above

Which will return our planes. And which we can access in the ***Hanger*** Component like so.
Inside of _PlaneRide/client/containers/Hanger/index.js_ we need to do two things.
- Import the ***Plane*** Component url
```
//import Components
import Plane from '../../components/Plane';
```
- Update our render function to map through our static data and add to the stage

```
render()
  {
    //all pre-processed information is stored within this "routingData" variable;
    const allPlanesMap = routingData.allPlanes.map((itm,indx) => {
      return <Plane key={itm._id} {...itm} btnTitle='Clone Me' clickAction={this.props.clonePlane} />
    })

    return (
      <div>
        <p style={{textAlign:'center'}}>Click a Plane to clone it.<br/><br/></p>
        {allPlanesMap}
        <p>&nbsp;</p>
        {
          (this.props.newPlane)
          ? <Plane
              key={this.props.newPlane._id}
              {...this.props.newPlane}
              btnTitle='Save Me'
              clickAction={(e)=>{this.props.savePlane(this.props.newPlane)}} />
          : ''
        }
        {
          (this.props.newPlane && this.props.newPlane.name !== 'New Plane')
          ? <p style={{textAlign:'center',fontWeight:'800'}}><br/><br/><br/><br/>Success!<br/> {this.props.newPlane.confirmation}</p>
          : ''
        }
        {this.props.newPlaneErr}
      </div>
    );
  }
```

If you start the server and navigate to the homepage you should be able to click the link to see the ***Hanger*** component that contains your mapped ***Plane*** Components.

---
## 11) Create New State Variable and Update Name

The main point of this walkthrough was to get you familiar with the CLI and those options. However, let's not leave a half finished app here (even though it will be sort of pointless). At the very least it probably isn't a bad idea to at least give an example of how some of the more _interesting_ parts of react action dispatching works.

I won't break everything down for you in the following part, but will try to touch on some of the more nuanced points, and leave links to where you can find out more info. So, for a quick runthrough of the sagas, selectors, actions, and reducers we are going to:

1) _***Clone a plane***_
- In _PlaneRide/client/containers/Hanger/index.js_
  - `mapDispatchToProps` add:
```
const mapDispatchToProps = (dispatch) =>
{
  return {
    clonePlane:(o)=>{ dispatch(onClonePlane(o.currentTarget.getAttribute('data-id'))) },
    savePlane:(o)=>{
      let newPlaneName = prompt("Name your plane : ");
      o.name = newPlaneName;
      return dispatch(onSavePlane( o ));
    }
  };
}
```
Here we are adding our dispatch function to 2 methods (which we will build out below). The first is to clone a pre-existing plane, and the second is to save the cloned plane as a new object in Mongo using a name that the user will input.


- In _PlaneRide/client/containers/Hanger/state/constants.js_
```
export const ON_CLONE_PLANE_INIT = 'planeride.Hanger.ON_CLONE_PLANE_INIT';
export const ON_CLONE_PLANE_SUCCESS = 'planeride.Hanger.ON_CLONE_PLANE_SUCCESS';
export const ON_CLONE_PLANE_FAIL = 'planeride.Hanger.ON_CLONE_PLANE_FAIL';

export const ON_SAVE_PLANE_INIT = 'planeride.Hanger.ON_SAVE_PLANE_INIT';
export const ON_SAVE_PLANE_SUCCESS = 'planeride.Hanger.ON_SAVE_PLANE_SUCCESS';
export const ON_SAVE_PLANE_FAIL = 'planeride.Hanger.ON_SAVE_PLANE_FAIL';

```
This holds all of our identifying constants using the template:
- `export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';`
- It allows us to have long unique strings that can be accessed by a much more simple constant name


- _PlaneRide/client/containers/Hanger/state/actions.js_
```
import {
  ON_CLONE_PLANE_INIT,
  ON_SAVE_PLANE_INIT
} from './constants';

export function onClonePlane(obj)
{ return { type: ON_CLONE_PLANE_INIT, obj }; }

export function onSavePlane(obj)
{ return {type: ON_SAVE_PLANE_INIT, obj }; }

```
One thing you may notice here is that we are only pulling in 2 out of the 6 constants we defined above. This is because we are only using these to trigger the constants, which will handle the rest of the logic.
- Note, this is not something that I would recommend for a project of this size. Just another instance of the boilerplate supports it, so here's how to integrate it.

If you look into _PlaneRide/client/store.js_ you will notice that the CLI has already set up the listeners for the saga file(s).
- It imports them:
  - `import hangerSaga from './containers/Hanger/state/sagas';`
- And runs it
  - `sagaMiddleware.run(hangerSaga);`

- _PlaneRide/client/containers/Hanger/state/sagas.js_
```
// https://redux-saga.js.org/docs/api/
import { delay } from 'redux-saga';
import { put, call, takeLatest, all } from 'redux-saga/effects';

import {
  ON_CLONE_PLANE_INIT, ON_CLONE_PLANE_SUCCESS, ON_CLONE_PLANE_FAIL,
  ON_SAVE_PLANE_INIT, ON_SAVE_PLANE_SUCCESS, ON_SAVE_PLANE_FAIL } from './constants';

function* runClonePlane(payload)
{
  const cloneData = { payload },
  fetchConf = {
    method: 'POST',
    body: JSON.stringify(cloneData),
    headers: { 'Content-Type': 'application/json' }
  };
  const fetched = yield fetch('/api/clone', fetchConf)
    .then((response) =>
    { return response.json(); });
  return fetched;
}

function* runSavePlane(payload)
{
  const saveData = { payload },
  fetchConf = {
    method: 'POST',
    body: JSON.stringify(saveData),
    headers: { 'Content-Type': 'application/json' }
  };
  const fetched = yield fetch('/api/save', fetchConf)
    .then((response) =>
    {
       return response.json(); })
    .catch((err)=>{console.log('save err',err)});
  return fetched;
}

function* callClonePlane({ obj })
{
  try
  {
    const clonedPlane = yield call(runClonePlane, obj);
    yield put({ type: ON_CLONE_PLANE_SUCCESS, clonedPlane });
  }
  catch (e)
  { yield put({ type: ON_CLONE_PLANE_FAIL, status: e }); }
}

function* callSavePlane({ obj })
{
  try
  {
    const savedPlane = yield call(runSavePlane, obj);
    yield put({ type: ON_SAVE_PLANE_SUCCESS, savedPlane });
  }
  catch (e)
  { yield put({ type: ON_SAVE_PLANE_FAIL, status: e }); }
}

function* watchClonePlane()
{ yield takeLatest(ON_CLONE_PLANE_INIT, callClonePlane); }

function* watchSavePlane()
{ yield takeLatest(ON_SAVE_PLANE_INIT, callSavePlane); }

// single entry point to start all Sagas at once
export default function* hangerSaga()
{
  yield all([
    watchSavePlane(),
    watchClonePlane()
  ]);
}
```
Basically, a saga is just a piece of middleware that works with the store. It catches the action(s) that it is watching for (defined in the
`hangerSaga` function and runs [ES6 Generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*) functions to ensure the information has fully populated before updating the `action.type` that the reducer is looking to match on, and stepping out of the way.

In a nutshell:
- `hangerSaga` sets up the watchers.
- When a watcher is matched from a dispatched action it intercepts the action and runs the second argument in the `watch<...>Plane()` function
- This function sets up the conditions needed to update the action type and allow the dispatch to continue. The conditions are checked by the function instantiated on `const <...> = yield call(<...>)`
- The `run<...>Plane` function is where the async call is made, and where the returned data is vetted. Once we have this information we send it back up the chain where it allows the `try catch` to update the `action.type` (by using `yield put`)
- Once again, there are many ways to tighten up the code that I used here, but I thought it would be better to expand everything so that each step of the way would be noticed.

After the saga completes, the reducer will step in and do it's normal operations, only now based on a new `action.type`

_PlaneRide/client/containers/Root/reducer.js_
```
import { fromJS } from 'immutable';

import {
  ON_CLONE_PLANE_SUCCESS, ON_CLONE_PLANE_FAIL,
  ON_SAVE_PLANE_SUCCESS, ON_SAVE_PLANE_FAIL
} from './constants';
import { onClonePlane, onSavePlane } from './actions';

const initialState = fromJS({
  err:null,
  newPlane:null
});

function modifyPlanes(state = [], action)
{
  console.log('state,action:',state,action);
  switch (action.type) {
    case ON_CLONE_PLANE_SUCCESS:
    case ON_SAVE_PLANE_SUCCESS:
      let newP = (action.savedPlane) ? action.savedPlane : action.clonedPlane;
      if(action.clonedPlane){ newP.name = 'New Plane'; }
      return { newPlane:newP, err:null }
    case ON_CLONE_PLANE_FAIL:
    case ON_SAVE_PLANE_FAIL:
      return{ newPlane:null, err:'There was an error with your request' }
    default:
      return state;
  }
}

function hangerReducer(state = initialState, action)
{
  return {
    onClonePlane: modifyPlanes(state.planes, action),
    onSavePlane: modifyPlanes(state.planes, action)
  };
}

export default hangerReducer;
```

The above will update the state, allowing the DOM to show the most recent planes.

Go ahead and try it out.
- Load the page
- Click `Clone Me`
- Notice the new plane on the screen
  - At this point nothing has been saved to Mongo.
- To save it:
- Click `Save Me`
  - Fill out a new name and `Continue`
- Notice the new name on stage as well as the ***Success*** message
- Refresh the page to prove that the plane has saved in Mongo

Congrats!
You now have a pretty useless app, but hopefully a bit of an understanding about how the CLI works.
