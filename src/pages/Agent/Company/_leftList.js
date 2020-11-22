import React from 'react';
import { Link, withRouter } from "react-router-dom";
import { mobileAccordion } from '../../../assets/scripts/custom';
import Button from '../../../components/form/button';

class LeftList extends React.Component {
    constructor(props)
    {
        super(props)

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
                        Müşteriler
                    </div>
                    <Link id={"company-leftlist-addnew"} className="link only-desktop" to={"/agent/company/create"}>
                        <img src={require('../../../assets/icons/icon-plus.svg')} aria-hidden="true" />
                        <span>Yeni Müşteri Ekleme</span>
                    </Link>
                    <Button id={"company-leftlist-addnew-mobile"} disabled={false} extraClass={"secondary only-mobile"} onClick={() => { this.props.history.push('/agent/company/create') }} text={"+ Yeni Müşteri Ekleme"} />
                </div>
                <div className="search">
                    <div className="form-item">
                        <input type="text" placeholder="Müşteriler içinde arama yap" value={this.state.searchText} onChange={this.handleSearch} />
                    </div>
                </div>
                <div className="list" id="company-leftlist">
                    {this.props.items && this.props.items.map((item, i) => {
                        if(item.companyName.toLowerCase().indexOf(this.state.searchText.toLowerCase()) >= 0)
                        {
                            return (
                                <Link className={"status" + (item.status === "ACTIVE" ? " green": "") + (currentRoute === "/agent/company/detail/" + item.companyId ? " active" : "")} to={"/agent/company/detail/" + item.companyId} key={"company_list_" + i}>
                                    {item.companyName}
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

  export default withRouter(LeftList)