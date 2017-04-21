import React from 'react'
import {Navbar,Nav,NavItem,NavDropdown,MenuItem} from 'react-bootstrap'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import Loader from 'react-loader'


class Result extends React.Component {
    constructor(props) {
        super(props);
    }

    renderSearchResult(searchString){
      let inputLength = searchString.length;
      let inputValue = searchString.trim().toLowerCase();
      const {data} = this.props;
      if (data === undefined) {
        return <div>Loading</div>
      }
      let results = data.filter(lang => lang.company.toLowerCase().slice(0, inputLength) === inputValue );
      return(
        results.map(function(item,i){
          return <div key={i}> 
                  <h4>{item.company}</h4>
                  <div>{item.profile}</div>
                  <div>Employees:</div>
                  <ul>
                    {item.employees.map(function(em,k){
                      return <li key={k}>{em.name}({em.title}). Email: {em.email}</li>;
                    })}
                  </ul>
                  <hr />
                  </div>;
        })
        )
    }

    render() {
    var searchString = this.props.location.query.search;
    // console.log(searchString);
    if(searchString !== undefined)
      return (

        <div>
          <h1>Search results of <span className="serch-string">{searchString}</span> </h1>
          {this.renderSearchResult(searchString)}
        </div>

        );
  }
}
const mapStateToProps = (state, ownProps) => {
    console.log("state.dataLoad.data",state);
    return {data: state.dataLoad.data}

}
const mapDispatchToProps = (dispatch) => {

  return {

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Result)