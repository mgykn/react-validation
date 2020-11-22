import React from 'react';
import {connect} from 'react-redux';
import { withRouter } from "react-router-dom";
import { dispatchItem } from "../actions/actions";
import { scrollToTop } from "../actions/utils";
import Popup from "./Popup";
import ForgotPasswordPopup from "./popupcontents/ForgotPasswordPopup";
import LoginPopup from "./popupcontents/LoginPopup";
import OtpSmsPopup from "./popupcontents/OtpSmsPopup";
import ChangePasswordPopup from "./popupcontents/ChangePasswordPopup";
import UpdatePasswordPopup from "./popupcontents/UpdatePasswordPopup";

class MainLayout extends React.Component {
    componentDidMount() {
        var accessTokenStored = localStorage.getItem('user');
        var userTypeStored = localStorage.getItem('userType');
        var userEmailStored = localStorage.getItem('userEmail');
        if(accessTokenStored == null || userTypeStored == null || userEmailStored == null)
        {
            this.props.dispatch(dispatchItem('ACCESS_TOKEN', { accessToken: '', userType: '' }));
            this.props.dispatch(dispatchItem('USER_EMAIL', ''));
        }
        else {
            var accessToken = this.props.app.accessToken;
            var userType = this.props.app.userType;
            var userEmail = this.props.app.userEmail;
            if(accessToken !== accessTokenStored || userType !== userTypeStored)
            {
                this.props.dispatch(dispatchItem('ACCESS_TOKEN', { accessToken: accessTokenStored, userType: userTypeStored }));
            }
            
            if(userEmail != userEmailStored)
            {
                this.props.dispatch(dispatchItem('USER_EMAIL', userEmailStored));
            }
        }
    }
    
    componentWillReceiveProps(nextProps) {
        if (this.props.location !== nextProps.location) {
            scrollToTop();
        }
    }

    render() {
        return (
            <div>
                {this.props.children}
                {this.props.app.activePopup !== '' &&
                    <Popup>
                        {this.props.app.activePopup === 'forgotPassword' &&
                            <ForgotPasswordPopup />
                        }
                        {this.props.app.activePopup === 'login' &&
                            <LoginPopup />
                        }
                        {this.props.app.activePopup === 'otpSms' &&
                            <OtpSmsPopup />
                        }          
                        {this.props.app.activePopup === 'changePassword' &&
                            <ChangePasswordPopup />
                        }          
                        {this.props.app.activePopup === 'updatePassword' &&
                            <UpdatePasswordPopup />
                        }
                    </Popup>
                }
                {this.props.app.loading &&                
                    <div className="loading">
                        <svg className="load" x="0px" y="0px" viewBox="0 0 150 150">
                            <circle className="loading-inner" cx="75" cy="75" r="60" />
                        </svg>
                    </div>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        app: state.app 
    }
}

export default withRouter(connect(mapStateToProps)(MainLayout))