import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from "react-router-dom";
import { mobileAccordion } from '../../../assets/scripts/custom';
import Button from '../../../components/form/button';

class LeftList extends React.Component {
    constructor(props)
    {
        super(props);

        this.state = {
            searchText: ''
        }

        this.handleSearch = this.handleSearch.bind(this);
    }
    
    componentDidMount() {
        mobileAccordion();
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        mobileAccordion();
    }

    handleSearch(e)
    {
        this.setState({
            searchText: e.target.value
        })
    }

    render() {
        const currentRoute = this.props.location.pathname;
        return (
            <div className="left mobile-accordion">
                <div className="header">
                    <div className="title">
                        Tüm Gruplarım
                    </div>
                    <Link id={"group-leftlist-addnew"} className="link only-desktop" to={"/user/group/create"}>
                        <img src={require('../../../assets/icons/icon-plus.svg')} aria-hidden="true" />
                        <span>Yeni Grup Ekleme</span>
                    </Link>
                    <Button id={"group-leftlist-addnew-mobile"} disabled={false} extraClass={"secondary only-mobile"} onClick={() => { this.props.history.push('/user/group/create') }} text={"+ Yeni Grup Ekleme"} />
                </div>
                <div className="search">
                    <div className="form-item">
                        <input type="text" placeholder="Gruplar içinde arama yap" value={this.state.searchText} onChange={this.handleSearch} />
                    </div>
                </div>
                <div className="list" id="group-leftlist">
                    {this.props.items && this.props.items.map((item, i) => 
                    {
                        if(item.groupName.toLowerCase().indexOf(this.state.searchText.toLowerCase()) >= 0)
                        {
                            return (            
                                <Link className={(currentRoute === "/user/group/detail/" + item.groupId ? "active" : "")} to={"/user/group/detail/" + item.groupId} key={"group_list_" + i}>
                                    {item.groupName}
                                </Link>
                            )
                        }
                    }
                    )}
                </div>
            </div>
      );
    }
  }

  function mapStateToProps(state) {
      return {
          app: state.app 
      }
  }
  
  export default withRouter(connect(mapStateToProps)(LeftList))