import React from 'react';
import {connect} from 'react-redux'
import {render} from 'react-dom';
import Header from './Header'

class Layout extends React.Component {

	constructor(){
		super();
		this.state = {

		}
	}

  render() {
	  
    return (

      <div className="container">
 		     <div className="header">
              <Header/>
          </div>
          <div className="main-content">
            {this.props.children}
          </div>
	      
      </div>);
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
      data : state.dataLoad.data
    };
}
const mapDispatchToProps = (dispatch) => {
  return {


  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Layout);