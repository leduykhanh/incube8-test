import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import { handleActions } from 'redux-actions';
import Type from '../actions/actionTypes'
import authenticationReducers from '../authentication/reducers';
import {reducer as notifications} from 'react-notification-system-redux';
import busReducers from '../bus/reducers'
import { reducer as formReducer } from 'redux-form'

const dataLoad = (state = [], action) => {
	console.log("action",action);
  switch (action.type) {
    case "dataGET_ALL_DATA_SUCCESS":
      return Object.assign({},state,action.payload.result)
    case "dataGET_ALL_DATA_FAIL":
      // console.log("reducers failed");
    default:
      return state
  }
}
const rootReducer = combineReducers({
  state: (state = {}) => state,
  routing: routerReducer,
  notifications,
  dataLoad:busReducers,
  auth: authenticationReducers,
  form:formReducer
});

export default rootReducer;
