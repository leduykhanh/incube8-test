import React, { Component } from 'react';
import {LinkContainer} from 'react-router-bootstrap'
import {Button} from 'react-bootstrap'

import {connect} from 'react-redux'
import LoginForm from '../authentication/components/LoginForm'

import {render} from 'react-dom';
import {handleErrors} from '../common/errors'
import {performLogin} from '../authentication/actions'
import {required, email,addErrorIfFound} from '../common/formValidation'
import {SubmissionError} from 'redux-form'

class Home extends React.Component{


    render(){

        let loginForm = <LoginForm  onSubmit={this.props.actionLogin} handleSignup={this.props.actionShowSignup} handleForgetPassword={this.props.actionShowForgetPassword}/>

        return <div className="authentication-popup padding-horizontal">{loginForm}</div>
    }
}



const mapStateToProps = (state, ownProps) => {

    return {
        redirectUrl: "/bus",
        data : {}
    };
}
const mapDispatchToProps = (dispatch,ownProps) => {
  return {
     actionLoginInternal: (login_data,url) => {
        let errors = validate(login_data);
         console.log(errors);
        if(Object.keys(errors).length>0)
            return Promise.reject(new SubmissionError(errors));
        else
        {
            return  performLogin(login_data,dispatch,url).catch(error=>{
                handleErrors(error);
            });
        }

    },

    actionShowSignup: () => {
        return dispatch(openDialog('signupPopup'));
    },
    actionShowForgetPassword: () => {
        return dispatch(openDialog('forgetPasswordPopup'));
    }

  }
}
const mergeProps= (stateProps,dispatchProps,ownProps)=>{

    return Object.assign(stateProps,dispatchProps,ownProps,{
         actionLogin: (login_data) => {
             console.log(login_data);
                return  dispatchProps.actionLoginInternal(login_data,stateProps.redirectUrl)
            }
    });

}
const validate = values =>{
    let errors = {};
    console.log(values);
    if(!addErrorIfFound(values.email,required,errors,"email"))
        addErrorIfFound(values.email,email,errors,"email");
    addErrorIfFound(values.password,required,errors,"password");

    return errors;
}


export default connect(mapStateToProps,mapDispatchToProps,mergeProps)(Home);