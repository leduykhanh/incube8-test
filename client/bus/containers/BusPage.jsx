import React from 'react'
import {Navbar,Nav,NavItem,NavDropdown,MenuItem} from 'react-bootstrap'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import Loader from 'react-loader'
import BusStopList from '../components/BusStopList'
import {fetchData} from '../../actions'

class BusPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {lat:0,lon:0};
    }

    componentWillMount(){
      if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition.bind(this));
        } else { 
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
      this.props.fetchBusStops(this.props.sessionId);
    }

    showPosition(position) {
        this.setState({lat: position.coords.latitude,
                      lon: position.coords.longitude});
    }

    render() {
      return (

        <div>
          <h1>Bus page</h1>
          <h5>Your current location: Latitude {this.state.lat}, Longitude {this.state.lon}</h5>
          <hr />
          <BusStopList data={this.props.data} currentLat={this.state.lat} currentLon={this.state.lon} />
        </div>

        );
  }
}
const mapStateToProps = (state, ownProps) => {

    return {
        data: state.dataLoad.data,
        sessionId : state.auth.sessionId
    }

}
const mapDispatchToProps = (dispatch) => {

  return {
      fetchBusStopsI: (sessionId)=>{return fetchData({sessionId:sessionId},dispatch)}
  }
}
const mergeProps= (stateProps,dispatchProps,ownProps)=>{

    return Object.assign(stateProps,dispatchProps,ownProps,{
         fetchBusStops: (sessionId) => {
                return  dispatchProps.fetchBusStopsI(sessionId,dispatchProps)
            }
    });

}

export default connect(mapStateToProps,mapDispatchToProps,mergeProps)(BusPage)