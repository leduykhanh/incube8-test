import React from 'react';
import {Button, Modal} from 'react-bootstrap'


class BusStopList extends React.Component {
    constructor (props) {
        super(props);
        this.state={ showModal:false };

    }
    close() {
        this.setState({ showModal: false });
      }
    open() {
        this.setState({ showModal: true });
      }

    renderHeader(){

        return (
            <div className="row">
                <div className="col-xs-3">Number</div>
                <div className="col-xs-3">Distance</div>
                <div className="col-xs-6 text-center">Action</div>
            </div>
        );
    }
    render() {
        let {data} = this.props;
        return (
            <div className="bus-stop-list">
                <h3>Nearest Bus stops</h3>
                {this.renderHeader()}
                {for ( var i=0; i<data.length ; i++) {
                    let item = data[i];
                    <div key={i} className="row">
                        <div className="col-xs-3">{item.name}</div>
                        <div className="col-xs-3">{item.lat}</div>
                        <div className="col-xs-6">
                            <Button bsStyle="info" onclick={this.open.bind(this)} >Show buses</Button>
                            <Button bsStyle="success">Add bus</Button>
                            <Button>View map</Button></div>
                    </div>

                }}
                <Modal show={this.state.showModal} onHide={this.close}>
                    23: 23mins
                </Modal>
            </div>
        );
    }

}

export default BusStopList;
