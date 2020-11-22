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
import AgentIndex from "../pages/Agent/Home/index";
import CompanyList from "../pages/Agent/Company/list";
import CompanyDetail from "../pages/Agent/Company/detail";
import CompanyCreate from "../pages/Agent/Company/create";
import UserList from "../pages/Agent/User/list";
import UserCreate from "../pages/Agent/User/create";
import ProductList from "../pages/Agent/Product/list";
import ProductCreate from "../pages/Agent/Product/create";
import PartnerCreate from "../pages/Agent/Partner/create";
import ClientCreate from "../pages/Agent/Client/create";

class AgentLayout extends React.Component {
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
        if(localStorage.getItem('user') == null || localStorage.getItem('userType') != "Sales")
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
                <Route exact path="/agent" component={AgentIndex} />
                <Route exact path="/agent/company/list" component={CompanyList} />
                <Route exact path="/agent/company/create" component={CompanyCreate} />
                <Route exact path="/agent/company/detail" component={CompanyDetail} />
                <Route exact path="/agent/company/detail/:id" component={CompanyDetail} />
                <Route exact path="/agent/company/detail/:id/products" component={ProductList} />
                <Route exact path="/agent/company/detail/:id/products/create" component={ProductCreate} />
                <Route exact path="/agent/company/detail/:id/users" component={UserList} />
                <Route exact path="/agent/company/detail/:id/users/create" component={UserCreate} />
                <Route exact path="/agent/partner/create" component={PartnerCreate} />
                <Route exact path="/agent/client/create" component={ClientCreate} />
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

export default withRouter(connect(mapStateToProps)(AgentLayout))