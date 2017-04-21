import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import { handleActions } from 'redux-actions';
import Type from '../actions/actionTypes'
import authenticationReducers from '../authentication/reducers'
import { reducer as formReducer } from 'redux-form'

const dataLoad = (state = [], action) => {
	console.log("action",action);
  switch (action.type) {
    case "data.jsonGET_ALL_DATA_SUCCESS":
      console.log("reducers called",action.payload.result);
      return Object.assign({},state,action.payload.result)
    case "data.jsonGET_ALL_DATA_FAIL":
      // console.log("reducers failed");
    default:
      return state
  }
}
const rootReducer = combineReducers({
  state: (state = {}) => state,
  routing: routerReducer,
  dataLoad,
  auth: authenticationReducers,
  form:formReducer
});

export default rootReducer;
