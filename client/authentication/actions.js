import Type from './actionTypes'
import {prepare_url_params} from '../common/util'
import {postRequest,getRequest} from '../middlewares/serverRequest'
import Notification from '../common/notifications'
import { Schema, arrayOf, normalize } from 'normalizr';
import {getJSON} from 'redux-api-middleware'
import { replace,push } from 'react-router-redux'; // Or your redux-router equivalent

export const performLogin = (login_data,dispatch,redirectUrl) =>{
 
  return new Promise((resolve, reject) => {
    let url = prepare_url_params('user/auth',[]);
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

export const performLogout = (logout_data,dispatch) =>{
  return new Promise((resolve, reject) => {
    let url = prepare_url_params('user/auth',logout_data);
    dispatch(getRequest('user/logout',[
          Type.LOGOUT,
          {
            type:Type.LOGOUT_SUCCESS,
            payload: (action, state, res) => {
                return getJSON(res).then((json) => normalize(json, { user: null, token: null}));

            }
          },
          {
             type:Type.LOGOUT_FAIL,
               payload: (action, state, res) => {

                  Notification.notify_error(dispatch,'Error',"error");
                }
          }],logout_data)).then(response=>{
                // console.log(response);
                if (response.error) {
                    reject(response.payload);
                } else {
                    dispatch(push("/"));

                    resolve(response);

                }
          } )
          .catch(error => {
              console.log(error);
            })
  });
}
