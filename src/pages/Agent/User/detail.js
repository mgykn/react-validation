import React from 'react';
import {connect} from 'react-redux';
import Form from '../../../components/form/form';
import Button from '../../../components/form/button';
import { companies, updateUser, activateUser, deactivateUser, resendUser, dispatchItem } from '../../../actions/actions';
import { scrollToTop } from '../../../actions/utils';

class UserDetail extends React.Component {
    constructor(props)
    {
        super(props);

        this.state = {
            showConfirmDeletePopup: false,
            showConfirmResendInvitationPopup: false,
            isEdit: false,
            formModel: {
                userName: {
                    value: this.props.item.userName,
                    name: 'userName',
                    type: 'text',
                    label: 'İsim Soyisim',
                    placeholder: 'İsim Soyisim',
                    error: 'Lütfen isim soyisim girin.',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true
                    }
                },
                userEmail: {
                    value: this.props.item.userEmail,
                    name: 'userEmail',
                    type: 'text',
                    label: 'E-posta Adresi',
                    placeholder: 'E-posta adresi',
                    error: 'Lütfen geçerli bir e-posta adresi girin.',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true,
                        email: true
                    }
                },
                userGsm: {
                    value: this.props.item.userGSM,
                    name: 'userGsm',
                    type: 'phone',
                    label: 'Telefon Numarası',
                    placeholder: 'Telefon numarası',
                    error: 'Lütfen telefon numarası girin.',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true
                    }
                }
            }
        };

        this.activateEditState = this.activateEditState.bind(this);
        this.activateUser = this.activateUser.bind(this);
        this.resendUser = this.resendUser.bind(this);
        this.getCompanyList = this.getCompanyList.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.confirmDeletePopup = this.confirmDeletePopup.bind(this);
        this.confirmResendInvitationPopup = this.confirmResendInvitationPopup.bind(this);
    }

    confirmDeletePopup(state){
        this.setState({
            showConfirmDeletePopup: state
        });
    }

    confirmResendInvitationPopup(state){
        this.setState({
            showConfirmResendInvitationPopup: state
        });
    }

    handleSubmit(data)
    {
        data["userId"] = this.props.item.userId;
        
        this.props.dispatch(updateUser(data, (data) => {
            this.getCompanyList(() => {    
                this.setState({
                    isEdit: false
                });
                scrollToTop();
            });
        }, (data) => {
            scrollToTop();
        }));
    }

    activateEditState(activate)
    {
        this.setState({
            isEdit: activate
        });
    }

    resendUser(userId)
    {
        this.props.dispatch(resendUser({ userId: userId }, (data) => {
            this.setState({
                showConfirmResendInvitationPopup: false
            });
        }, () => {
            this.setState({
                showConfirmResendInvitationPopup: false
            });
        }));
    }

    activateUser(activate, userId) {
        if(activate)
        {
            this.props.dispatch(activateUser({ userId: userId }, (data) => {
                this.getCompanyList();
            }, () => {
    
            }));
        }
        else {
            this.props.dispatch(deactivateUser({ userId: userId }, (data) => {
                this.getCompanyList();
                this.setState({
                    showConfirmDeletePopup: false
                });
            }, () => {
                this.setState({
                    showConfirmDeletePopup: false
                });
            }));
        }
    }
    
    getCompanyList(successFunc) {
        this.props.dispatch(companies({}, (data) => {
            this.props.dispatch(dispatchItem("COMPANY_LIST", data.customerResponse));
            if(successFunc)
            {
                successFunc();
            }
        }, () => {

        }));
    }

    render() {
        return (
            <div className="items">
                <div className="item-container">
                    <div className="item">
                        <div>Durum</div>
                        <div>
                            {this.props.item.userStatus === "ACTIVE" &&
                                <span className="green">Aktif</span>
                            }
                            {this.props.item.userStatus === "WAITING" &&
                                [
                                    <span className="yellow">Bekliyor</span>,
                                    <a href="javascript:void(0)" onClick={() => this.confirmResendInvitationPopup(true)}>Tekrar davet gönder</a>
                                ]
                            }
                            {this.props.item.userStatus !== "ACTIVE" && this.props.item.userStatus !== "WAITING" &&
                                [
                                <span>Deaktif</span>,
                                ]
                            }
                        </div>
                    </div>
                    {!this.state.isEdit &&
                        [
                            <div className="item">
                                <div>İsim Soyisim</div>
                                <div>{this.props.item.userName}</div>
                            </div>,
                            <div className="item">
                                <div>E-posta adresi</div>
                                <div>{this.props.item.userEmail}</div>
                            </div>,
                            <div className="item">
                                <div>Telefon numarası</div>
                                <div>{this.props.item.userGSM}</div>
                            </div>
                        ]
                    }
                </div>
                {!this.state.isEdit &&    
                    <div className="item-container">
                        <div className="item">
                            <div>
                                <Button disabled={false} extraClass={"tertiary"} onClick={() => this.activateEditState(true)} text={"Bilgileri Düzenle"} />
                            </div>
                            {this.props.item.userStatus === "ACTIVE" || this.props.item.userStatus === "WAITING" &&
                                <div>
                                    <Button disabled={false} extraClass={""} onClick={() => this.confirmDeletePopup(true)} text={"Üyeliği iptal et"} />
                                </div>
                            }
                            {this.props.item.userStatus !== "ACTIVE" && this.props.item.userStatus !== "WAITING" &&
                                <div>
                                    <Button disabled={false} extraClass={""} onClick={() => this.activateUser(true, this.props.item.userId)} text={"Üyeliği aktifleştir"} />
                                </div>
                            }
                        </div>
                    </div>
                }
                {this.state.isEdit &&
                    <div className="form-container">
                        <Form model={this.state.formModel} handleSubmit={this.handleSubmit} smallTitle={""} buttonText={"Kaydet"} />
                        <Button disabled={false} extraClass={"secondary"} onClick={() => this.activateEditState(false)} text={"Vazgeç"} />
                    </div>
                }
                {this.state.showConfirmDeletePopup && 
                    <div className="popup-wrapper active">
                        <div className="popup-container">
                            <div className="popup-title small">
                                Silme işlemini onaylıyor musunuz?
                            </div>
                            <div className="popup-text">
                                Bu işlemi gerçekleştirmek, bu alana ait veri kaybına yol açabilir.
                            </div>
                            <div className="form-container">
                                <a className="btn primary" href="javascript:void(0)" title="Onayla" onClick={() => this.activateUser(false, this.props.item.userId)}>
                                    <span>Onayla</span>
                                </a>
                                <a className="btn" href="javascript:void(0)" title="İptal" onClick={() => this.confirmDeletePopup(false)}>
                                    <span>İptal</span>
                                </a>
                            </div>
                        </div>
                        <a className="popup-close" href="javascript:void(0)" title="Kapat" onClick={() => this.confirmDeletePopup(false)}>
                            <img src={require('../../../assets/icons/icon-popup-close.svg')} alt="Kapat Ikonu" />
                        </a>
                    </div>
                }
                {this.state.showConfirmResendInvitationPopup && 
                    <div className="popup-wrapper active">
                        <div className="popup-container">
                            <div className="popup-title small">
                                Davetiye tekrar gönderilecek
                            </div>
                            <div className="popup-text">
                                Tekrar davetiye göndermek istediğinize emin misiniz?
                            </div>
                            <div className="form-container">
                                <a className="btn primary" href="javascript:void(0)" title="Onayla" onClick={() => this.resendUser(this.props.item.userId)}>
                                    <span>Onayla</span>
                                </a>
                                <a className="btn" href="javascript:void(0)" title="İptal" onClick={() => this.confirmResendInvitationPopup(false)}>
                                    <span>İptal</span>
                                </a>
                            </div>
                        </div>
                        <a className="popup-close" href="javascript:void(0)" title="Kapat" onClick={() => this.confirmResendInvitationPopup(false)}>
                            <img src={require('../../../assets/icons/icon-popup-close.svg')} alt="Kapat Ikonu" />
                        </a>
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

  export default connect(mapStateToProps)(UserDetail)