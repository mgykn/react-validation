import React from 'react';
import {connect} from 'react-redux';
import Form from '../../components/form/form';
import { changePassword, dispatchItem } from '../../actions/actions';

class ChangePasswordPopup extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            formModel: {
                pwd: {
                    value: '',
                    name: 'pwd',
                    type: 'password',
                    label: 'Güncel Şifreniz',
                    placeholder: 'Güncel şifreniz',
                    error: 'Lütfen güncel şifrenizi girin.',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true
                    }
                },
                newPwd: {
                    value: '',
                    name: 'newPwd',
                    type: 'password',
                    label: 'Yeni Şifreniz',
                    placeholder: 'Yeni şifreniz',
                    error: 'Lütfen yeni şifrenizi girin.',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true
                    }
                },
                newPwdAgain: {
                    value: '',
                    name: 'newPwdAgain',
                    type: 'password',
                    label: 'Yeni Şifreniz Tekrar',
                    placeholder: 'Yeni şifreniz Tekrar',
                    error: 'Lütfen yeni şifrenizi girin.',
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
        if(this.props.app.loginAccessToken == '')
        {
            this.changeActivePopup('login');
        }
    }
    
    changeActivePopup(activePopup) {
        this.props.dispatch(dispatchItem('POPUP', activePopup));
    }

    handleSubmit(data)
    {
        this.props.dispatch(changePassword(data, (data) => {
            var accessToken = this.props.app.loginAccessToken;
            var userType =  this.props.app.userType;
            localStorage.setItem('user', accessToken);
            localStorage.setItem('userType', userType);
            this.props.dispatch(dispatchItem('ACCESS_TOKEN', { accessToken: accessToken, userType: userType }));
            this.props.dispatch(dispatchItem('LOGIN_ACCESS_TOKEN', ''));
            this.props.dispatch(dispatchItem('POPUP', ''));

            if(userType === 'Sales')
            {
                this.props.history.push('/agent/company/detail');   
            }
            else if(userType ===  'Standart')
            {
                this.props.history.push('/user');   
            }
            else if(userType === 'XIVodafone' || userType === 'XIPartner')
            {
                this.props.history.push('/xivodafone/client/list');  
            }
        }, (data) => {
        }));
    }

    render() {
      return (
        <div className="popup-container">
            <div className="popup-title">
                One Messaging'e Giriş Yap
            </div>
            <div className="popup-title small">
                Şifreni güncelle
            </div>
            <div className="popup-text">
                Eski şifreni ve mail adresini girerek, şifreni güncellemelisin.
            </div>
            <div className="form-container">
                <Form model={this.state.formModel} handleSubmit={this.handleSubmit} smallTitle={""} buttonText={"Şifremi Güncelle"} />
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

export default connect(mapStateToProps)(ChangePasswordPopup)