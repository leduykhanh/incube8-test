/* @flow-weak */
import React from 'react';
import {render} from 'react-dom'
import {Field, reduxForm,SubmissionError} from 'redux-form'
import {renderTextField, renderPasswordField, renderEmailField, FieldFormControl,FieldDateTimeControl,FieldDateControl} from '../../common/components/FormElements'

class AddBusForm extends React.Component {

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


                <div className="add-bus-form">
                    <h1 className="text-center header-text-primary">Add bus</h1>
                    <h2>bus stop {this.props.bustopName}</h2>
                    <div className="space2x"></div>
                    <div className="horizontal-split-panel text-left">
                        <div className="col-xs-12 add-bus-form">
                            <div className="col-xs-12">
                                <form onSubmit={handleSubmit} className="auth-form">
                                    <Field name="email" type="number"
                                           component={FieldFormControl} label="Bus number"/>
                                    <Field name="password" type="password"
                                           component={FieldFormControl} label="Time start"
                                           help="this is to calculate arrival info"/>
                                    <div className="form-group text-center">
                                        <button type="submit" className="btn-raised action-button">Add</button>
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
    form: 'addBusForm', // a unique name for this form
    returnRejectedSubmitPromise: true,
    onSubmitSuccess:handleSuccess,


})(AddBusForm);
