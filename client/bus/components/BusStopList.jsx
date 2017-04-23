import React from 'react';
import {Button, Modal} from 'react-bootstrap'
import AddBusForm from './AddBusForm'
import {getDistanceFromLatLonInKm} from '../../common/util'
import Map,{Marker} from 'google-maps-react'

class BusStopList extends React.Component {
    constructor (props) {
        super(props);
        this.state={ 
            showBusListModal:false,
            showAddBusModal:false,
            showMapModal:false,
            bustopName: "",
            bus_data: {busStopId:0,number:0, time_start:""}
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
        console.log("this.props.addBus", this.props.addBus);
        this.props.addBus(this.props.sessionId,this.state.bus_data);
      }
    openAddBus(name,id) {
        this.setState({ 
            showAddBusModal: true,
            bustopName: name,
            bus_data: {busStopId:id,number:1, time_start:""}
         });
      }
    closeMap() {
        this.setState({ showMapModal: false });
      }
    openMap() {
        this.setState({ showMapModal: true });
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
                    <Button className="btn-raised action-button" bsStyle="success" onClick={this.openAddBus.bind(this, item.name, item._id)}>Add bus</Button>
                    <Button className="btn-raised action-button" onClick={this.openMap.bind(this)}>View map</Button></div>
            </div>);

                }
        return (
            <div className="bus-stop-list">
                <h3>Nearest Bus stops</h3>
                {this.renderHeader()}
                {busStopGrid}
                <Modal className="bus-list" show={this.state.showBusListModal} onHide={this.closeBustList.bind(this)}>
                    <span className="bus-number">23</span>: 23mins <br />
                    <span className="bus-number">23</span>: 23mins <br />
                    <span className="bus-number">23</span>: 23mins <br />
                    <span className="bus-number">23</span>: 23mins <br />
                </Modal>
                <Modal show={this.state.showAddBusModal} onHide={this.closeAddBus.bind(this)}>
                    <AddBusForm onSubmit={this.closeAddBus.bind(this)} bustopName={this.state.bustopName}/>
                </Modal>
                <Modal show={this.state.showMapModal} onHide={this.closeMap.bind(this)}>
                    <Map google={window.google} style={{width: '100%', height: '100%', position: 'relative'}}>
                          <Marker
                            name={'You are here'}
                            position={{lat: currentLat, lng: currentLon}} />
                          <Marker />
                    </Map>
                </Modal>
            </div>
        );
    }

}

export default BusStopList;
