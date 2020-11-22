import React from 'react';
import {connect} from 'react-redux';
import {
  BrowserRouter as Router,
  Redirect,
  withRouter,
  Route
} from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { setPanelHeight } from "../actions/utils";
import { dispatchItem, removeAllCache } from "../actions/actions";
import ClientList from "../pages/XIVodafone/Client/list";
import QueryList from "../pages/XIVodafone/Query/list";
import QueryCreate from "../pages/XIVodafone/Query/create";
import QuerySend from "../pages/XIVodafone/Query/send";
import QuerySendSuccess from "../pages/XIVodafone/Query/success";
import Report from "../pages/XIVodafone/Report/list";
import PartnerReport from "../pages/XIVodafone/PartnerReport/list";

class XIVodafoneLayout extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        setPanelHeight();
        window.addEventListener('load', setPanelHeight);
        window.addEventListener('resize', setPanelHeight);
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', setPanelHeight);
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        setPanelHeight();
    }

    render() {
        if(localStorage.getItem('user') == null || (localStorage.getItem('userType') != "XIVodafone" && localStorage.getItem('userType') != "XIPartner"))
        {
            localStorage.removeItem('user');
            localStorage.removeItem('userType');
            this.props.dispatch(removeAllCache());
            return (<Redirect
                        to={{
                            pathname: "/",
                            state: { from: this.props.location }
                        }}
                    />
              );
        }

        return (
            <div>
                <Header />
                <Route exact path="/xivodafone/client/list" component={ClientList} />
                <Route exact path="/xivodafone/query/list" component={QueryList} />
                <Route exact path="/xivodafone/query/list/:companyId" component={QueryList} />
                <Route exact path="/xivodafone/query/create" component={QueryCreate} />
                <Route exact path="/xivodafone/query/create/:companyId" component={QueryCreate} />
                <Route exact path="/xivodafone/query/edit/:id" component={QueryCreate} />
                <Route exact path="/xivodafone/query/edit/:id/:companyId" component={QueryCreate} />
                <Route exact path="/xivodafone/query/send/:id/:companyId" component={QuerySend} />
                <Route exact path="/xivodafone/query/send-edit/:sendId" component={QuerySend} />
                <Route exact path="/xivodafone/query/send/success" component={QuerySendSuccess} />
                <Route exact path="/xivodafone/report" component={Report} />
                <Route exact path="/xivodafone/partnerreport" component={PartnerReport} />
                <Footer />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        app: state.app 
    }
}

export default withRouter(connect(mapStateToProps)(XIVodafoneLayout))