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
import UserIndex from "../pages/User/Home/index";
import GroupList from "../pages/User/Group/list";
import GroupCreate from "../pages/User/Group/create";
import GroupDetail from '../pages/User/Group/detail';
import ReceiverList from '../pages/User/Receiver/list';
import ReceiverCreate from '../pages/User/Receiver/create';
import ReceiverUpload from '../pages/User/Receiver/upload';
import Blacklist from '../pages/User/Blacklist/list';
import BlacklistCreate from '../pages/User/Blacklist/create';
import BlacklistUpload from '../pages/User/Blacklist/upload';
import Blackhour from  '../pages/User/Blackhour/list';
import SendSms from '../pages/User/Sms/send';
import SendSmsSuccess from '../pages/User/Sms/success';
import Report from '../pages/User/Report/list';

class UserLayout extends React.Component {
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
        if(localStorage.getItem('user') == null || localStorage.getItem('userType') != "Standart")
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
                <Route exact path="/user" component={UserIndex} />
                <Route exact path="/user/group/list" component={GroupList} />
                <Route exact path="/user/group/create" component={GroupCreate} />
                <Route exact path="/user/group/detail/:id" component={GroupDetail} />
                <Route exact path="/user/group/detail/:id/receivers" component={ReceiverList} />
                <Route exact path="/user/group/detail/:id/receivers/create" component={ReceiverCreate} />
                <Route exact path="/user/group/detail/:id/receivers/upload" component={ReceiverUpload} />
                <Route exact path="/user/blacklist" component={Blacklist} />
                <Route exact path="/user/blacklist/create" component={BlacklistCreate} />
                <Route exact path="/user/blacklist/upload" component={BlacklistUpload} />
                <Route exact path="/user/blackhour" component={Blackhour} />
                <Route exact path="/user/sendsms" component={SendSms} />
                <Route exact path="/user/sendsms/success" component={SendSmsSuccess} />
                <Route exact path="/user/report" component={Report} />
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

export default withRouter(connect(mapStateToProps)(UserLayout))