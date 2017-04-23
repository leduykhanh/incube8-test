import reduxDialog from 'redux-dialog';
import AddBusForm from '../components/AddBusForm'
import React from 'react';
import {render} from 'react-dom';
import { openDialog, closeDialog } from 'redux-dialog'
import { connect } from 'react-redux'


class AddBusPopup extends React.Component{


    render(){
        let addBusForm = <AddBusForm onSubmit={this.props.actionClosePopup}/>

        return <div className="authentication-popup">{addBusForm}</div>
    }
}



const mapStateToProps = (state, ownProps) => {

    return {};
}
const mapDispatchToProps = (dispatch) => {
  return {

    actionClosePopup: () => {

        dispatch(closeDialog("addBusPopup"));
    },

  }
}
export const ConnectedAddBusPopup = connect(mapStateToProps,mapDispatchToProps)(AddBusPopup);
export default reduxDialog({
  name: 'addBusPopup', // unique name - you can't have two dialogs with the same name
  className: 'app-modal app-modal-sm no-scrollbar'

})(ConnectedAddBusPopup)

