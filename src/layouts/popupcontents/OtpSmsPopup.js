import React from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import Form from '../../components/form/form';
import { otpSms, dispatchItem } from '../../actions/actions';

class OtpSmsPopup extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            timer: 60,
            formModel: {
                otp: {
                    value: '',
                    name: 'otp',
                    type: 'text',
                    label: 'Sms şifresi',
                    placeholder: 'Sms şifresi',
                    error: 'Lütfen telefonunuza gelen sms şifresini girin.',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true
                    }
                }
            }
        }
        
        this.changeActivePopup = this.changeActivePopup.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount()
    {
        this.interval = setInterval(
            () => { this.setState((prevState)=> ({ timer: prevState.timer - 1 })) },
            1000
        );
        
        if(this.props.app.loginAccessToken == '')
        {
            this.changeActivePopup('login');
        }
    }

    componentDidUpdate(){
        if(this.state.timer === 0){ 
            clearInterval(this.interval);
        }
    }
    
    componentWillUnmount(){
        clearInterval(this.interval);
    }
    
    changeActivePopup(activePopup) {
        this.props.dispatch(dispatchItem('POPUP', activePopup));
    }

    handleSubmit(data)
    {
        this.props.dispatch(otpSms(data, (data) => {
            var accessToken = data.token;
            var userType = data.role;
            if(data.statusCode == "0"){
                localStorage.setItem('user', accessToken);
                localStorage.setItem('userType', userType);
                this.props.dispatch(dispatchItem('ACCESS_TOKEN', { accessToken: accessToken, userType: userType }));
                this.props.dispatch(dispatchItem('LOGIN_ACCESS_TOKEN', accessToken));
                this.props.dispatch(dispatchItem('POPUP', ''));

                if(userType ==  'Sales')
                {
                    this.props.history.push('/agent');   
                }
                else if(userType ==  'Standart')
                {
                    this.props.history.push('/user');   
                }
                else if(userType ==  'XIVodafone' || userType == 'XIPartner')
                {
                    this.props.history.push('/xivodafone/client/list');  
                }
            } else if(data.statusCode == "1" || data.statusCode == "2") {
                this.props.dispatch(dispatchItem('LOGIN_ACCESS_TOKEN', accessToken));
                this.props.dispatch(dispatchItem('USER_TYPE', userType));
                this.changeActivePopup('changePassword');
            }
        }, () => {
        }));
    }

    render() {
        return (
            <div className="popup-container">
                <div className="popup-title">
                    Telefonuna Gelen SMS Kodunu Gir
                </div>
                <div className="form-container">
                    <Form model={this.state.formModel} handleSubmit={this.handleSubmit} smallTitle={""} buttonText={"Giriş Yap"} />
                </div>
                <div className="popup-bottom">
                    <div>&nbsp;</div>
                    <div className="popup-bottom-right">Kalan süre: {("0" + Math.floor(this.state.timer / 60)).slice("-2")}:{("0" + (this.state.timer % 60)).slice("-2")}</div>
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

export default withRouter(connect(mapStateToProps)(OtpSmsPopup))