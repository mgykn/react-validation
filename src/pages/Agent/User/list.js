import React from 'react';
import {connect} from 'react-redux';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import Breadcrumb from '../../../components/breadcrumb/index';
import Message from '../../../components/message/index';
import { companies, dispatchItem } from '../../../actions/actions';
import LeftDetail from '../Company/_leftDetail';
import UserDetail from './detail';
import { accordion } from '../../../assets/scripts/custom';

class UserList extends React.Component {
    constructor(props)
    {
        super(props);

        this.state = {
            searchText: ''
        }

        this.getCompanyList = this.getCompanyList.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount() {
        accordion();
        if (this.props.app.agent.companies.length < 1) {
            this.getCompanyList();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        accordion();
    }

    getCompanyList() {
        this.props.dispatch(companies({}, (data) => {
            this.props.dispatch(dispatchItem("COMPANY_LIST", data.customerResponse));
        }, () => {

        }));
    }

    handleSearch(e) {
        this.setState({
            searchText: e.target.value 
        })
    }

    render() {
        var companyId = this.props.match.params.id;
        var filterCompany = this.props.app.agent.companies.filter(function (item) {
                            return item.companyId === companyId;
                        });

        var company = filterCompany.length > 0 ? filterCompany[0] : null;
        
        const breadcrumbItems = [{
            name: 'Ana Sayfa',
            link: '/'
        },{
            name: 'Müşteriler',
            link : '/agent/company/list'
        },{
            name: (company ? company.companyName : ""),
            link : '/agent/company/detail/' + (company ? company.companyId : "")
        },{
            name: "Kullanıcılar"
        }];

        return (
        [
          <Breadcrumb items={breadcrumbItems} />,
          <section className="panel">
            <Message />
            <div className="container">
                <LeftDetail item={company} />
                {company &&
                    <div className="right">
                        <div className="title-default with-close">
                            <Link id={"user-list-userlist"} className="btn-back" to={"/agent/company/detail/" + company.companyId}>
                                Kapat
                            </Link>
                            <span>Kullanıcı Listesi</span>
                        </div>
                        <div className="agent-detail-header">
                            <div className="column">
                                <Link id={"user-list-addnew"} className="form-btn-add" to={"/agent/company/detail/" + company.companyId + "/users/create"}>
                                    + Yeni müşteri ekle
                                </Link>
                            </div>
                            <div className="column">
                                <div className="search">
                                    <div className="form-item">
                                        <input type="text" placeholder="Kullanıcılar içinde ara" value={this.state.searchText} onChange={this.handleSearch} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="accordion agent-customers">
                            {company.userResponse && company.userResponse.map((item, i) => 
                                {if(item.userName.toLowerCase().indexOf(this.state.searchText.toLowerCase()) >= 0) 
                                    return (
                                        <div className="accordion-item" key={"company_user_" + i}>
                                            <div className={("accordion-header status" + (item.userStatus == "ACTIVE" ? " green" : (item.userStatus == "WAITING" ? " yellow" : "")))}>
                                                {item.userName}
                                            </div>
                                            <div className="accordion-body">
                                                <UserDetail item={item} />
                                            </div>
                                        </div>    
                                    )
                                }
                            )}
                        </div>
                    </div>
                }
            </div>
          </section>
        ]
      );
    }
  }

  function mapStateToProps(state) {
      return {
          app: state.app 
      }
  }

  export default connect(mapStateToProps)(UserList)