import React from 'react';
import {connect} from 'react-redux';
import Form from '../../components/form/form';
import { login, dispatchItem } from '../../actions/actions';

class LoginPopup extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            userType: '|Standart|',
            formModelStandart: {
                email: {
                    value: '',
                    name: 'email',
                    type: 'text',
                    label: 'E-posta Adresi',
                    placeholder: 'E-posta adresiniz',
                    error: 'Lütfen geçerli bir e-posta adresi girin.',
                    autofocus:true,
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true,
                        email: true
                    }
                },
                password: {
                    value: '',
                    name: 'password',
                    type: 'password',
                    label: 'Şifre',
                    placeholder: 'Şifreniz',
                    error: 'Lütfen şifrenizi girin.',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true
                    }
                }
            },
            formModelXI: {
                email: {
                    value: '',
                    name: 'email',
                    type: 'text',
                    label: 'E-posta Adresi',
                    placeholder: 'E-posta adresiniz',
                    error: 'Lütfen geçerli bir e-posta adresi girin.',
                    autofocus:true,
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true,
                        email: true
                    }
                },
                password: {
                    value: '',
                    name: 'password',
                    type: 'password',
                    label: 'Şifre',
                    placeholder: 'Şifreniz',
                    error: 'Lütfen şifrenizi girin.',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true
                    }
                }
            },
            formModelSales: {
                email: {
                    value: '',
                    name: 'email',
                    type: 'text',
                    label: 'Kullanıcı Adı',
                    placeholder: 'Kullanıcı adınız',
                    error: 'Lütfen kullanıcı adınızı girin.',
                    autofocus:true,
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true
                    }
                },
                password: {
                    value: '',
                    name: 'password',
                    type: 'password',
                    label: 'Şifre',
                    placeholder: 'Şifreniz',
                    error: 'Lütfen şifrenizi girin.',
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
        this.changeUserType =  this.changeUserType.bind(this);
    }

    componentDidMount()
    {
        var accessTokenStored = localStorage.getItem('user');
        var userTypeStored = localStorage.getItem('userType');
        if(accessTokenStored !== null && userTypeStored !== null)
        {
            this.changeActivePopup('');
        }
        else {
            localStorage.removeItem('user');
            localStorage.removeItem('userType');
        }

        var emailInputs = document.getElementsByName('email');
        if(emailInputs.length > 0)
        {
            emailInputs[0].focus();
        }
    }
    
    changeActivePopup(activePopup) {
        this.props.dispatch(dispatchItem('POPUP', activePopup));
    }

    changeUserType(type)
    {
        if(type == '|Standart|')
        {
            this.setState({
                formModelSales: {
                    ...this.state.formModelSales,
                    email: {
                        ...this.state.formModelSales.email,
                        value: '',
                        valid: false,
                        touched: false
                    },
                    password: {
                        ...this.state.formModelSales.password,
                        value: '',
                        valid: false,
                        touched: false
                    }
                } 
            }, () => {
                this.setState({
                    userType: type
                }, () => {
                    var emailInputs = document.getElementsByName('email');
                    if(emailInputs.length > 0)
                    {
                        emailInputs[0].focus();
                    }
                });
            });
        }
        else if (type == '|Sales|') {
            this.setState({
                formModelStandart: {
                    ...this.state.formModelStandart,
                    email: {
                        ...this.state.formModelStandart.email,
                        value: '',
                        valid: false,
                        touched: false
                    },
                    password: {
                        ...this.state.formModelStandart.password,
                        value: '',
                        valid: false,
                        touched: false
                    }
                } 
            }, () => {
                this.setState({
                    userType: type
                }, () => {
                    var emailInputs = document.getElementsByName('email');
                    if(emailInputs.length > 0)
                    {
                        emailInputs[0].focus();
                    }
                });
            });
        }
        else {
            this.setState({
                formModelXI: {
                    ...this.state.formModelXI,
                    email: {
                        ...this.state.formModelXI.email,
                        value: '',
                        valid: false,
                        touched: false
                    },
                    password: {
                        ...this.state.formModelXI.password,
                        value: '',
                        valid: false,
                        touched: false
                    }
                } 
            }, () => {
                this.setState({
                    userType: type
                }, () => {
                    var emailInputs = document.getElementsByName('email');
                    if(emailInputs.length > 0)
                    {
                        emailInputs[0].focus();
                    }
                });
            });
        }
        
    }

    handleSubmit(data)
    {
        localStorage.setItem('userEmail', data.email);
        this.props.dispatch(dispatchItem('USER_EMAIL', data.email));
        
        this.props.dispatch(login(data, (data) => {
            var userType = data.role;
            
            if(this.state.userType.indexOf('|' + userType + '|') < 0)
            {
                var notification = {
                    message: 'Yanlış alandan giriş yaptınız.',
                    isError: true
                }
                this.props.dispatch(dispatchItem('NOTIFICATION', notification))
            }
            else {
                var loginAccessToken = data.token;
                this.props.dispatch(dispatchItem('LOGIN_ACCESS_TOKEN', loginAccessToken));

                this.changeActivePopup('otpSms');
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

                <div className="tabs">
                    <div className="tab-menu">
                        <a className={this.state.userType == "|Standart|" ? "active" :  ""} href="javascript:void(0)" onClick={() => this.changeUserType('|Standart|')}>Kurumsal</a>
                        <a className={this.state.userType == "|Sales|" ? "active" :  ""} href="javascript:void(0)" onClick={() => this.changeUserType('|Sales|')}>Aktivasyon</a>
                        <a className={this.state.userType == "|XIPartner|XIVodafone|XIOtd" ? "active" :  ""} href="javascript:void(0)" onClick={() => this.changeUserType('|XIPartner|XIVodafone|')}>Pazarlama</a>
                    </div>
                    <div className="tab-container">
                        {this.state.userType == "|Sales|" &&
                            <div className="tab-item active">
                                <div className="form-container">
                                    <Form model={this.state.formModelSales} handleSubmit={this.handleSubmit} smallTitle={""} showGoogleRecaptcha={"false"} buttonText={"İlerle"} />
                                </div>
                            </div>
                        }
                        {this.state.userType == "|XIPartner|XIVodafone|" &&
                            <div className="tab-item active">
                                <div className="form-container">
                                    <Form model={this.state.formModelXI} handleSubmit={this.handleSubmit} smallTitle={""} showGoogleRecaptcha={"false"} buttonText={"İlerle"} />
                                </div>
                            </div>
                        }
                        {this.state.userType == "|Standart|" &&
                            <div className="tab-item active">
                                <div className="form-container">
                                    <Form model={this.state.formModelStandart} handleSubmit={this.handleSubmit} smallTitle={""} showGoogleRecaptcha={"false"} buttonText={"İlerle"} />
                                </div>
                                <div className="popup-bottom">
                                    <a href="javascript:void(0)" onClick={() => this.changeActivePopup('forgotPassword')}>
                                        Şifremi Unuttum
                                    </a>
                                </div>
                            </div>
                        }
                    </div>
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

export default connect(mapStateToProps)(LoginPopup)