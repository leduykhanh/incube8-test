/* @flow-weak */
import React from 'react';
import {render} from 'react-dom'
import {Field, reduxForm,SubmissionError} from 'redux-form'
import {renderTextField, renderPasswordField, renderEmailField, FieldFormControl,FieldDateTimeControl,FieldDateControl} from '../../common/components/FormElements'
import {required,isImage} from '../../common/formValidation'

class AddBusForm extends React.Component {

    constructor() {
        super();
        this.state = {
        }
    }

    render() {
        const {handleSubmit, handleSignup,handleForgetPassword,error} = this.props;
        try {

            let options = { "time": false, "defaultValue": new Date()};
            return (


                <div className="add-bus-form">
                    <h1 className="text-center header-text-primary">Add bus</h1>
                    <h2 className="text-center">bus stop <span className="bus-number">{this.props.bustopName} </span></h2>
                    <div className="space2x"></div>
                    <div className="horizontal-split-panel text-left">
                        <div className="col-xs-12 add-bus-form">
                            <div className="col-xs-12">
                                <form onSubmit={handleSubmit} className="addbus-form">
                                    <Field name="number" type="number" className="required bus-number" validate={[required]}
                                           component={FieldFormControl} label="Bus number"/>
                                    <Field name="time-start" options={{ "time": true, "defaultValue": new Date()}}
                                           component={FieldDateControl} label="Time start" className="required" validate={[required]}
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
