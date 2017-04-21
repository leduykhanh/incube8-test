import { CALL_API } from 'redux-api-middleware'
let API_ROOT = 'http://localhost:3000/';



const endpoint_middleware = ({getState, dispatch}) => next => action => {

  // Add header
  if (action[CALL_API]) {
      action[CALL_API].endpoint = API_ROOT + action[CALL_API].endpoint;
      action[CALL_API].headers['Content-Type'] = "application/json";
    // console.log(action[CALL_API]);
  }

   return next(action)
}

export default endpoint_middleware
