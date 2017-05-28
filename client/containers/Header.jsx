import React from 'react'
import {Navbar,Nav,NavItem,NavDropdown,MenuItem} from 'react-bootstrap'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import Loader from 'react-loader'
import {Button} from 'react-bootstrap'
import {performLogout} from '../authentication/actions'

class Header extends React.Component {
    constructor(props) {
        super(props);
    }


  logout(){
    this.props.logout(this.props.sessionId);
  }

  render() {
    let {user} = this.props;
    let logoutButton = <span onClick= {this.logout.bind(this)} >Log out</span>
    return (
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">Home</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav className="pull-right">
              <NavItem> Hi <strong>{user&&user.username?user.username.substr(0,user.username.indexOf("@")):"Guest"}</strong></NavItem>
              <NavItem> {user&&user.username?logoutButton:""}</NavItem>
            </Nav>

          </Navbar.Collapse>

        </Navbar>
      );
  }
}
const mapStateToProps = (state, ownProps) => {

    return {
          user:state.auth.user,
          sessionId : state.auth.sessionId
            }

}
const mapDispatchToProps = (dispatch) => {

  return {
    logout : (sessionId) => {return performLogout({sessionId:sessionId},dispatch)}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Header)