import {prepare_url_params} from '../common/util'
import Type from './actionTypes'
import {postRequest,getRequest,deleteRequest,putRequest} from '../middlewares/serverRequest'
import { Schema, arrayOf, normalize } from 'normalizr';
import {getJSON} from 'redux-api-middleware'

// import {companySchema} from './schema'

export const fetchData = (ss_data,dispatch) =>{
   let url = prepare_url_params('busStops',ss_data);
   // console.log(dispatch);
   return new Promise((resolve, reject) => {
	  //  console.log( 
	   	 dispatch( getRequest(url,[
		          Type.GET_ALL_DATA,
		          
		          {
		            type:Type.GET_ALL_DATA_SUCCESS,
		            payload: (action, state, res) => {
		                   return getJSON(res).then((json) => normalize(json, {}));
		            }
		          },
		          {
		            type:Type.GET_ALL_DATA_FAIL,
		            payload: (action, state, res) => {
		                   return getJSON(res).then((json) => normalize(json, {}));
		            }
		          }
					],true))
	    .then(response=>{
	    			// console.log("response",response);
	                if (response.error) {
	                   reject(response.payload.result);
	                } else {
	                   resolve(response);

	                }
	          			} )
	    .catch(error => {});
	    });
	}
