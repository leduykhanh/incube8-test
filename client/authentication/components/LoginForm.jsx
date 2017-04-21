/* @flow-weak */
import React from 'react';
import {render} from 'react-dom'
import {Field, reduxForm,SubmissionError} from 'redux-form'
import {renderTextField, renderPasswordField, renderEmailField, FieldFormControl,FieldDateTimeControl,FieldDateControl} from '../../common/components/FormElements'

class LoginForm extends React.Component {

    constructor() {
        super();
        this.state = {
        }
    }

    render() {
        const {handleSubmit, handleSignup,handleForgetPassword,error} = this.props;
        console.log("error login form", error);
        try {

            let options = { "time": false, "defaultValue": new Date()};
            return (


                <div className="vcenter col-xs-12 signup-form">
                    <h1 className="text-center header-text-primary">LOGIN</h1>
                    <h2 className="text-center sub-title-text text-blue-color">or <a
                        className="sub-title-text secondary-link-text" onClick={handleSignup}>Sign Up</a></h2>
                    <div className="space2x"></div>
                    <div className="horizontal-split-panel text-left">
                        <div className="col-xs-12 vcenter">
                            <div className="col-xs-12">
                                <form onSubmit={handleSubmit} className="auth-form">
                                    <Field name="email" type="text" value="ali"
                                           component={FieldFormControl} label="Email"/>
                                    <Field name="password" type="password"
                                           component={FieldFormControl} label="Password" value="5f4dcc3b5aa765d61d8327deb882cf99"
                                           help={<a className="forgot-password" onClick={handleForgetPassword}>Forgot your
                                               password?</a>}/>
                                    <div className="form-group text-center">
                                        <button type="submit" className="btn-raised action-button">Log In</button>
                                    </div>
                                    {error && <div className="error"><strong>{error}</strong></div>}
                                </form>

                            </div>
                        </div>

                    </div>

                    <div className="col-xs-12 space">
                    </div>
                </div>
            );
        } catch (error) {
            return <div>{error.stack}</div>
        }
    }

}
const handleSuccess = (result,dispatch)=>{
}


// Decorate the form component
export default reduxForm({
    form: 'loginForm', // a unique name for this form
    returnRejectedSubmitPromise: true,
    onSubmitSuccess:handleSuccess,


})(LoginForm);
