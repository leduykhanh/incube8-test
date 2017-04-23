import Type from './actionTypes'
import {prepare_url_params} from '../common/util'
import {postRequest,getRequest} from '../middlewares/serverRequest'
import Notification from '../common/notifications'
import { Schema, arrayOf, normalize } from 'normalizr';
import {getJSON} from 'redux-api-middleware'
import { replace,push } from 'react-router-redux'; // Or your redux-router equivalent

export const addBus = (login_data,dispatch) =>{
 
  return new Promise((resolve, reject) => {
    let url = prepare_url_params('bus/add',[]);
    dispatch(postRequest(url,[
        Type.LOGIN,
          {
            type:Type.LOGIN_SUCCESS,

            payload: (action, state, res) => {

                return getJSON(res).then((json) => normalize(json, { }));

            }
          },

          {
             type:Type.LOGIN_FAIL,
               payload: (action, state, res) => {
                   
                   return getJSON(res).then((json) => normalize(json, { }));

                }
          }],login_data,true))
    .then(response=>{
                // console.log(response);
                if (response.payload.result.status =="error") {

                   reject(response.payload.result);
                } else {
                    let current_user = response.payload.result.username;
                    Notification.notify_success(dispatch,'Success',"Welcome");
                    if(redirectUrl)
                    {
                        dispatch(replace(redirectUrl));
                    }
                    else
                    {
                        if(current_user && current_user.is_superuser)
                            dispatch(replace("/private/"));
                    }

                    resolve(response);
                }
          } )
    .catch(error => {
      // console.log(error);
      reject(response.payload.result);
    })
  });
}
