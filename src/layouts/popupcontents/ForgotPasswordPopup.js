import React from 'react';
import {connect} from 'react-redux';
import Form from '../../components/form/form';
import Button from '../../components/form/button';
import { forgotPassword, dispatchItem } from '../../actions/actions';

class ForgotPasswordPopup extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            formModel: {
                mail: {
                    value: '',
                    name: 'mail',
                    type: 'text',
                    label: 'E-posta Adresi',
                    placeholder: 'E-posta adresiniz',
                    error: 'Lütfen geçerli bir e-posta adresi girin.',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true,
                        email: true
                    }
                }
            }
        }
    
        this.changeActivePopup = this.changeActivePopup.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    changeActivePopup(activePopup) {
        this.props.dispatch(dispatchItem('POPUP', activePopup));
    }

    handleSubmit(data)
    {
        this.props.dispatch(forgotPassword(data, (data) => {
            
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
                Şifreni mi unuttun?
                <br />
                Hiç problem değil!
            </div>
            <div className="popup-text">
                Bize e-posta adresini söyle ve sana atacağımız şifre hatırlatıcıyı kullan.
            </div>
            <div className="form-container">
                <Form model={this.state.formModel} handleSubmit={this.handleSubmit} smallTitle={""} buttonText={"Şifre Hatırlatma"} />
                <Button disabled={true} extraClass={""} onClick={() => this.changeActivePopup('login')} text={"Vazgeç"} />
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

export default connect(mapStateToProps)(ForgotPasswordPopup)