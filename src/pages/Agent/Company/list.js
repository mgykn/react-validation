import React from 'react';
import {
    BrowserRouter as Router,
    Redirect,
    withRouter,
    Route
  } from "react-router-dom";
import { connect } from 'react-redux';
import Message from '../../../components/message/index';
import Breadcrumb from '../../../components/breadcrumb/index';
import { companies, dispatchItem } from '../../../actions/actions';
import LeftList from './_leftList';

class CompanyList extends React.Component {
    componentDidMount() {
        if (this.props.app.agent.companies.length < 1) {
            this.props.dispatch(companies({}, (data) => {
                this.props.dispatch(dispatchItem("COMPANY_LIST", data.customerResponse));
            }, () => {

            }));
        }
    }

    render() {
        var firstCompany =this.props.app.agent.companies[0];
        if(firstCompany != null)
        {
            return (<Redirect
                        to={{
                            pathname: "/agent/company/detail"
                        }}
                    />
              );
        }

        const breadcrumbItems = [{
            name: "Ana Sayfa",
            link: "/"
        },{
            name: "Müşteriler"
        }];
        return (
        [
          <Breadcrumb items={breadcrumbItems} />,
          <section className="panel">
            <Message />
            <div className="only-mobile dashboard-mobile">
                Başlamak için bir müşteri seçin.
            </div>
            <div className="container">
                <LeftList items={this.props.app.agent.companies} />
                <div className="right only-desktop">
                    <div className="placeholder">
                        Başlamak için soldaki panelden bir müşteri seçin.
                    </div>
                </div>
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

  export default connect(mapStateToProps)(CompanyList)