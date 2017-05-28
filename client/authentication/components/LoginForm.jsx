/* @flow-weak */
import React from 'react';
import {render} from 'react-dom'
import {Field, reduxForm,SubmissionError} from 'redux-form'
import {Tooltip, OverlayTrigger} from 'react-bootstrap';
import {renderTextField, renderPasswordField, renderEmailField, FieldFormControl,FieldDateTimeControl,FieldDateControl} from '../../common/components/FormElements'

class LoginForm extends React.Component {

    constructor() {
        super();
        this.state = {
        }
    }

    render() {
    const tooltip = (
          <Tooltip id="tooltip">password</Tooltip>
        );
        const {handleSubmit, handleSignup,handleForgetPassword,error} = this.props;
        try {

            let options = { "time": false, "defaultValue": new Date()};
            return (


                <div className="vcenter col-xs-6 col-xs-offset-3 login-form">
                    <h3 className="text-center header-text-primary">Please log in to access the portal</h3>
                    <hr />
                    <div className="space2x"></div>
                    <div className="horizontal-split-panel text-left">
                        <div className="col-xs-12 vcenter">
                            <div className="col-xs-12">
                                <form onSubmit={handleSubmit} className="auth-form">
                                    <Field name="email" type="text" value="ali@gmail.com"
                                           component={FieldFormControl} label="Email" faIcon="fa fa-user"/>
                                    <Field name="password" type="password"
                                           component={FieldFormControl} label="Password" value="5f4dcc3b5aa765d61d8327deb882cf99"
                                           faIcon="fa fa-lock"
                                           help={<OverlayTrigger placement="right" overlay={tooltip}>
                                                    <span className="forgot-password" >Forgot your password?</span>
                                                </OverlayTrigger>}/>
                                    <div className="form-group text-center">
                                        <button type="submit" className="btn btn-success">Log In</button>
                                    </div>
                                    {error && <div className="alert alert-danger"><strong>{error}</strong></div>}
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
