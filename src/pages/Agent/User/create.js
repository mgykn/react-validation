import React from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import Breadcrumb from '../../../components/breadcrumb/index';
import Message from '../../../components/message/index';
import Form from '../../../components/form/form';
import Button from '../../../components/form/button';
import { companies, createUser, dispatchItem } from '../../../actions/actions';

class UserCreate extends React.Component {
    constructor(props)
    {
        super(props);

        this.state = {
            showConfirmBackPopup: false,
            formModel: {
                userName: {
                    value: '',
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
                    value: '',
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
                    value: '',
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

        this.getCompanyList = this.getCompanyList.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.confirmBackPopup = this.confirmBackPopup.bind(this);
        this.goToBack = this.goToBack.bind(this);
    }

    componentDidMount() {
        if (this.props.app.agent.companies.length < 1) {
            this.getCompanyList();
        }
    }

    confirmBackPopup(state){
        this.setState({
            showConfirmBackPopup: state
        });
    }

    goToBack()
    {
        var companyId = this.props.match.params.id;
        this.props.history.push('/agent/company/detail/' + companyId + '/users');
    }
    
    handleSubmit(data)
    {
        const companyId = this.props.match.params.id;
        data["companyId"] = companyId;
        
        this.props.dispatch(createUser(data, (data) => {
            this.getCompanyList(() => { this.props.history.push('/agent/company/detail/' + companyId + '/users'); });
        }, (data) => {
        }));
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
        var companyId = this.props.match.params.id;
        var filterCompany = this.props.app.agent.companies.filter(function (item) {
                            return item.companyId === companyId;
                        });

        var company = filterCompany.length > 0 ? filterCompany[0] : null;

        const breadcrumbItems = [{
            name: 'Ana Sayfa',
            link: '/'
        },{
            name: 'Müşteriler',
            link : '/agent/company/list'
        },{
            name: (company ? company.companyName : ""),
            link : '/agent/company/detail/' + (company ? company.companyId : "")
        },{
            name: "Kullanıcılar",
            link : '/agent/company/detail/' + (company ? company.companyId : "") + '/users'
        },{
            name: 'Yeni Kullanıcı Ekleme'
        }];

        return (
            [
            <Breadcrumb items={breadcrumbItems} />,
            <section className="panel small">
                <Message />
                {company && 
                    <div className="container">
                        <div className="title-default">
                            <span>Yeni Müşteri Ekleme</span>
                        </div>
                        <div className="form-container">
                            <Form model={this.state.formModel} handleSubmit={this.handleSubmit} smallTitle={"Müşteri Kullanıcı Bilgileri"} buttonText={"Kullanıcı Oluştur"} buttonId={"user-create-save"} />
                            <Button disabled={false} extraClass={"secondary"} onClick={() => { this.confirmBackPopup(true) }} text={"İşlemi iptal et"} id={"user-create-cancel"} />
                        </div>
                    </div>
                }
            </section>,
            <div>
                {this.state.showConfirmBackPopup && 
                    <div className="popup-wrapper active">
                        <div className="popup-container">
                            <div className="popup-title small">
                                Geri dönmek istiyor musunuz?
                            </div>
                            <div className="popup-text">
                                Bu işlemi gerçekleştirmek, bu alana ait veri kaybına yol açabilir.
                            </div>
                            <div className="form-container">
                                <a id={"company-user-create-back-okey"} className="btn primary" href="javascript:void(0)" title="Onayla" onClick={() => { this.goToBack() }}>
                                    <span>Evet</span>
                                </a>
                                <a id={"company-user-create-back-cancel"} className="btn" href="javascript:void(0)" title="İptal" onClick={() => this.confirmBackPopup(false)}>
                                    <span>İptal</span>
                                </a>
                            </div>
                        </div>
                        <a className="popup-close" href="javascript:void(0)" onClick={() => this.confirmBackPopup(false)}>
                            <img src={require('../../../assets/icons/icon-popup-close.svg')} alt="Kapat Ikonu" />
                        </a>
                    </div>
                }
            </div>
            ]
        );
    }
  }

  function mapStateToProps(state) {
      return {
          app: state.app 
      }
  }

  export default withRouter(connect(mapStateToProps)(UserCreate))