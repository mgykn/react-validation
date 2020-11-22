
import React from 'react';
import {connect} from 'react-redux'
import { Link } from "react-router-dom"

class Breadcrumb extends React.Component {
    render() {
      return (
        <section className="breadcrumb">
          <div className="container">
              {this.props.items &&  this.props.items.map((item, i) =>
                  item.link ? (
                    <Link to={item.link} key={"breadcrumb_" + i}>
                      {item.name}
                    </Link>
                  ) : (
                    <span key={"breadcrumb_" + i}>{item.name}</span>
                  )
              )}
              {/*  */}
          </div>
        </section>
      );
    }
  }

  function mapStateToProps(state) {
      return {
          app: state.app 
      }
  }
  
  export default connect(mapStateToProps)(Breadcrumb);