import {CALL_API} from 'redux-api-middleware'

export const postRequest = (endpoint,types,data,public_request=false,header={"Content-Type": "application/json"})=>
{
    return {
      [CALL_API]: {
        headers:header,
        body: JSON.stringify(data),
        types: types,
        method: 'POST',
        endpoint: endpoint
      }
    }
}

export const putRequest = (endpoint,types,data,header)=>
{
    return {
      [CALL_API]: {
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
        types: types,
        method: 'PUT',
        endpoint: endpoint,
      }
    }
}

export const getRequest = (endpoint,types,public_request=false,send_user=false,header)=>
{
    // console.log("types",types);
    return {
      [CALL_API]: {
        headers: {
          "Content-Type": "application/json"
        },
        types: types,
        method: 'GET',
        endpoint: endpoint,
      }
    }
}

export const deleteRequest = (endpoint,types,public_request,data,header)=>
{
    return {
      [CALL_API]: {
        headers: {
          "Content-Type": "application/json"
        },
        types: types,
        method: 'DELETE',
        public: public_request,
        endpoint: endpoint,
      }
    }
}