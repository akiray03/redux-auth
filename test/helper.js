import React from "react";
import {Provider} from "react-redux";
import {Route, IndexRoute} from "react-router";
import {combineReducers, createStore, compose, applyMiddleware} from "redux";
import {createHistory, createMemoryHistory} from "history";
import {ReduxRouter, routerStateReducer, reduxReactRouter as clientRouter} from "redux-router";
import thunk from "redux-thunk";
import { reduxReactRouter as serverRouter } from "redux-router/server";
import { configure, authStateReducer } from "../src/index";

/* dummy components */
import demoButtons from "../dummy/src/reducers/request-test-buttons";
import Container from "../dummy/src/views/partials/Container";
import Main from "../dummy/src/views/Main";
import Account from "../dummy/src/views/Account";
import SignIn from "../dummy/src/views/SignIn";
import GlobalComponents from "../dummy/src/views/partials/GlobalComponents";


class App extends React.Component {
  render() {
    return (
      <Container>
        <GlobalComponents />
        {this.props.children}
      </Container>
    );
  }
}


export function initialize({cookies, isServer, currentLocation} = {}) {
  var reducer = combineReducers({
    auth:   authStateReducer,
    router: routerStateReducer,
    demoButtons
  });

  var store;

  // access control method, used above in the "account" route
  var requireAuth = (nextState, transition, cb) => {
    console.log("running require auth");
    // the setTimeout is necessary because of this bug:
    // https://github.com/rackt/redux-router/pull/62
    // this will result in a bunch of warnings, but it's not a show stopper
    setTimeout(() => {
      if (!store.getState().auth.getIn(["user", "isSignedIn"])) {
        console.log("failed auth check, transitioning to /login");
        transition(null, "/login");
      }
      console.log("calling requireAuth callback");
      cb();
    }, 0);
  };

  // define app routes
  var routes = (
    <Route path="/" component={App}>
      <IndexRoute component={Main} />
      <Route path="login" component={SignIn} />
      <Route path="account" component={Account} onEnter={requireAuth} />
    </Route>
  );

  // these methods will differ from server to client
  var reduxReactRouter    = clientRouter;
  var createHistoryMethod = createHistory;
  if (isServer || global.__TEST__) {
    reduxReactRouter    = serverRouter;
    createHistoryMethod = createMemoryHistory;
  }

  // create the redux store
  store = compose(
    applyMiddleware(thunk),
    reduxReactRouter({
      createHistory: createHistoryMethod,
      routes
    })
  )(createStore)(reducer);


  /**
   * The React Router 1.0 routes for both the server and the client.
   */
  return store.dispatch(configure({
    apiUrl: "http://api.site.com",
    cookies,
    isServer,
    currentLocation
  })).then(({redirectPath} = {}) => {
    return {
      store,
      redirectPath,
      provider: (
        <Provider store={store} key="provider">
          <ReduxRouter children={routes} />
        </Provider>
      )
    };
  });
}


export function genStore() {
  // merge all relevant reducers
  let reducer = combineReducers({auth: authStateReducer});

  // create the redux store
  return compose(applyMiddleware(thunk))(createStore)(reducer);
}