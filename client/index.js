import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware ,compose} from 'redux';
import {Router,IndexRoute,Route,browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux'
import  {apiMiddleware} from 'redux-api-middleware';
import {createLogger} from 'redux-logger'

import {getRoutes} from './routes.jsx'
import reducers from './reducers';
import createActionBuffer from 'redux-action-buffer'
import {  routerMiddleware } from 'react-router-redux'
import {persistStore, autoRehydrate} from 'redux-persist'
import {REHYDRATE} from 'redux-persist/constants'
import endpointMiddleware from './middlewares/endpointMiddleware'
import Moment from 'moment'
import momentLocalizer from 'react-widgets/lib/localizers/moment'
momentLocalizer(Moment);


const createStoreWithMiddleware = applyMiddleware(apiMiddleware)(createStore);
const routingMiddleware = routerMiddleware(browserHistory)
// const store=createStoreWithMiddleware(reducers,{},
//       compose(
//         autoRehydrate({
//           log: true
//         }))
//       );

  const store = createStore(
      reducers,
      {},
      compose(
        autoRehydrate({
          log: true
        }),
        applyMiddleware(endpointMiddleware,thunk,apiMiddleware, createLogger(),routingMiddleware),
          // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

      )
    );
  // if (module.hot) {
  //     // Enable Webpack hot module replacement for reducers
  //     module.hot.accept('../reducers', () => {
  //       const nextRootReducer = require('../reducers').default
  //       store.replaceReducer(nextRootReducer)
  //     })
  //   }
const history = syncHistoryWithStore(browserHistory, store)
export default class AppProvider extends React.Component {

  constructor() {
    super()
    this.state = { rehydrated: false }
  }

  componentWillMount(){
    persistStore(store, {}, () => {
      this.setState({ rehydrated: true })
    })
  }

  render() {
    if(!this.state.rehydrated){
      return <div>Loading...</div>
    }
    return (
      <Provider store={store}>
        <Router history={history} routes={getRoutes(store)} location={React.PropTypes.object} />
      </Provider>
    )
  }
}
ReactDOM.render(
  <AppProvider/>
  , document.querySelector('.container'));
