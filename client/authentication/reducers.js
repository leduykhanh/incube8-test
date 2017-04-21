import { handleActions } from 'redux-actions';
import Type from './actionTypes'

const handleUserData = (state,action) => {

    let {entities,result} = action.payload;
    let user = entities.userProfile[result.data];
    let _data = Object.assign({}, state, {
        "user": user,
        "company": preprocessCompanyData(entities.company[user.company])
      })
    return _data;
}

const handleCompanyData = (state,action) => {

    let {entities,result} = action.payload;
    let company = preprocessCompanyData(entities.company[result.data]);
    let _data = Object.assign({}, state, {
        "company": company
      })
    return _data;
}
const handleLoginData = (state,action) => {

    let data = Object.assign({}, state, {
        "user":{username:action.payload.result.username},
        "sessionId": action.payload.result.sessionId
      })
    return data;
}
export default handleActions({
    // [Type.LOGIN_FAIL]: (state=[],action) => {
    //     console.log(action);
    //     let error = action.payload.result.non_field_errors[0];
    //     return Object.assign({}, state, {
    //         "form_error":error
    //       })
    //
    // },
    [Type.CLEAR_RESET_PASSWORD_DATA]: (state=[],action) =>{
        return Object.assign({}, state, {"reset_password_token":undefined,"uid":undefined})
    },

    [Type.RESET_PASSWORD_SUCCESS]:(state=[],action) => {
        return Object.assign({}, state, {"reset_password_token":undefined,"uid":undefined})
    },
    [Type.RESET_PASSWORD_DATA]: (state=[],action) => {
        let _data = action.payload;
        return Object.assign({}, state, _data)

    },
    [Type.LOGIN_SUCCESS]: (state,action) => {
        return handleLoginData(state,action);
    },
    [Type.LOGIN_SUCCESS]: (state,action) => {
        state = Object.assign({},state,{"afterLoginURL":undefined});
        return handleLoginData(state,action);
    },
    // [UserType.UPDATE_USER_SUCCESS]: (state,action) => {
    //     return handleUserData(state,action);
    // },

    // [UserType.LOAD_USER_SUCCESS]: (state,action) => {
    //     return handleUserData(state,action);
    // },
    // [UserType.UPDATE_COMPANY_SUCCESS]: (state,action) => {
    //     return handleCompanyData(state,action);
    // },
    [Type.LOGOUT_SUCCESS]: (state,action) => {
        return Object.assign({}, state, {
            "user": undefined,
            "sessionId": undefined
          })
    },
    [Type.LOGOUT_FAIL]: (state,action) => {
        return Object.assign({}, state, {
            "user": undefined,
            "sessionId": undefined
          })
    },
    [Type.FORGET_PASSWORD_SUCCESS]: (state,action) => {
        return  Object.assign({}, state, {
            "forgetPasswordForm":action.payload,
          });

    },
    [Type.TOKEN_REFRESHING_FAILED]: (state, action) => {
        return Object.assign({}, state, {[StoreFields.refreshTokenPromise]: 'failed'});
    },
    [Type.REFRESH_TOKEN_SUCCESS]: (state,action) => {
        c
        return  Object.assign({}, state, {
            "sessionId":action.payload.result.sessionId,
            [StoreFields.refreshTokenPromise]:undefined,
          });

    },
    [Type.NEED_REDIRECT]: (state, action) => {
        return Object.assign({}, state, {"redirect": true} )
    },
    [Type.STORE_AFTER_LOGIN_URL]: (state, action) => {
        return Object.assign({}, state, {"afterLoginURL": action.payload} )
    },
    [Type.REMOVE_REDIRECT]: (state, action) => {
        return Object.assign({}, state, {"redirect": false})
    }
},{

});