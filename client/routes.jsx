import React from 'react'
import { Route } from 'react-router'
import Layout from './containers/Layout'
import Buspage from './bus/containers/Buspage'
import Home from './containers/Home'
import {fetchData} from './actions'
import { UserAuthWrapper } from 'redux-auth-wrapper'
import authenticationType from './actions/actionTypes';
import { replace } from 'react-router-redux'; 

// Redirects to / by default
const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.auth.user, // how to get the user state
  failureRedirectPath: '/',
  redirectAction: (newLoc) => (dispatch) => {
     dispatch(replace(newLoc));
     dispatch({type: authenticationType.NEED_REDIRECT});
     //dispatch(openDialog("loginPopup"));
  }, // the redux action to dispatch for redirect
  wrapperDisplayName: 'UserIsAuthenticated' // a nice name for this auth check
});

const UserIsNotAuthenticated = UserAuthWrapper({
    authSelector: state => state.auth,
    redirectAction: (newLoc) => (dispatch) => {
        dispatch({type: authenticationType.REMOVE_REDIRECT});
        dispatch(replace(newLoc));
    },
    wrapperDisplayName: 'UserIsNotAuthenticated',
    predicate: auth => {
        return auth.user===undefined || auth.redirect!==true;
    },
    failureRedirectPath: (state, ownProps) => {

        return ownProps.location.query.redirect || '/private/dashboard/';
    },
    allowRedirectBack: false
});

export const getRoutes = (store) => {
    let routeConfig = [

        {
            path: '/',
            component: Layout,
            indexRoute: {
                getComponent: (nextState,cb)=>{
                                        cb(null, UserIsNotAuthenticated(Home));
                                    }
            },
            childRoutes: [
                {
                    path: 'bus',
                    getComponent: (nextState,cb)=>{                                       
                                        cb(null, UserIsAuthenticated(Buspage));
                                    }
                },
                

            ]
        }
    ];

    return routeConfig;
}


