import React from 'react';
import {Button, Modal} from 'react-bootstrap'
import AddBusForm from './AddBusForm'
import {getDistanceFromLatLonInKm} from '../../common/util'

class BusStopList extends React.Component {
    constructor (props) {
        super(props);
        this.state={ 
            showBusListModal:false,
            showAddBusModal:false,
            bustopName: ""
             };

    }
    closeBustList() {
        this.setState({ showBusListModal: false });
      }
    openBusList() {
        this.setState({ showBusListModal: true });
      }
    closeAddBus() {
        this.setState({ showAddBusModal: false });
      }
    openAddBus(name) {
        this.setState({ 
            showAddBusModal: true,
            bustopName: name
         });
      }
  

    renderHeader(){

        return (
            <div className="row table-header">
                <div className="col-xs-3">Number</div>
                <div className="col-xs-3">Distance</div>
                <div className="col-xs-6 text-center">Action</div>
            </div>
        );
    }
    render() {
        let {data,currentLat,currentLon} = this.props;
        let busStopGrid = Array();
        for ( let i=0; i < data.length; i++) {
            let item = data[i];
            busStopGrid.push( <div key={i} className="row bus-stop-item">
                <div className="col-xs-3 bus-number">{item.name}</div>
                <div className="col-xs-3">{getDistanceFromLatLonInKm(item.lat,item.lon,currentLat,currentLon)} km</div>
                <div className="col-xs-6">
                    <Button className="btn-raised action-button"bsStyle="info" onClick={this.openBusList.bind(this)} >Show buses</Button>
                    <Button className="btn-raised action-button" bsStyle="success" onClick={this.openAddBus.bind(this, item.name)}>Add bus</Button>
                    <Button className="btn-raised action-button">View map</Button></div>
            </div>);

                }
        return (
            <div className="bus-stop-list">
                <h3>Nearest Bus stops</h3>
                {this.renderHeader()}
                {busStopGrid}
                <Modal show={this.state.showBusListModal} onHide={this.closeBustList.bind(this)}>
                    <span className="bus-number">23</span>: 23mins <br />
                    <span className="bus-number">23</span>: 23mins <br />
                    <span className="bus-number">23</span>: 23mins <br />
                    <span className="bus-number">23</span>: 23mins <br />
                </Modal>
                <Modal show={this.state.showAddBusModal} onHide={this.closeAddBus.bind(this)}>
                    <AddBusForm onSubmit={this.closeAddBus.bind(this)} bustopName={this.state.bustopName}/>
                </Modal>
            </div>
        );
    }

}

export default BusStopList;
