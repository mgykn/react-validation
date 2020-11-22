import React from 'react'
import {
    BrowserRouter as Router,
    Redirect,
    withRouter,
    Route
  } from "react-router-dom";
import Header from "./Header"
import Footer from "./Footer"
import Home from "../pages/Home/index"
import AccountActivated from "../pages/Home/account-activated"
import SmsVerified from "../pages/Home/sms-verified"
import { setPanelHeight } from "../actions/utils";

class LoginLayout extends React.Component {
    constructor(props)
    {
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
        if(this.props.location.pathname.indexOf('/sms-verified/') < 0)
        {
            if(localStorage.getItem('user') != null && localStorage.getItem('userType') == "Sales")
            {
                return (<Redirect
                            to={{
                                pathname: "/agent",
                                state: { from: this.props.location }
                            }}
                        />
                  );
            }
            else if(localStorage.getItem('user') != null && localStorage.getItem('userType') == "Standart")
            {
                return (<Redirect
                            to={{
                                pathname: "/user",
                                state: { from: this.props.location }
                            }}
                        />
                  );
            }
            else if(localStorage.getItem('user') != null && (localStorage.getItem('userType') == "XIVodafone" || localStorage.getItem('userType') == "XIPartner"))
            {
                return (<Redirect
                            to={{
                                pathname: "/xivodafone/client/list",
                                state: { from: this.props.location }
                            }}
                        />
                  );
            }
        }

        return (
            <div>
                <Header />
                <Route exact path="/account-activated/:id" component={AccountActivated} />
                <Route exact path="/sms-verified/:id" component={SmsVerified} />
                <Route exact path="/" component={Home} />
                <Footer />
            </div>
        );
    }
}

export default LoginLayout;