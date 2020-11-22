import React from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import Breadcrumb from '../../../components/breadcrumb/index';
import Message from '../../../components/message/index';
import Form from '../../../components/form/form';
import Button from '../../../components/form/button';
import { scrollToTop } from '../../../actions/utils';
import { companies, createCompany, partnerInfos, dispatchItem } from '../../../actions/actions';

class CompanyCreate extends React.Component {
    constructor(props)
    {
        super(props);

        var partnerInfoOptions = [];
        
        for(var i = 0; i < this.props.app.partnerInfos.length; i++){
            partnerInfoOptions.push({
                name: this.props.app.partnerInfos[i],
                value: this.props.app.partnerInfos[i]
            });
        }

        this.state = {
            showConfirmBackPopup: false,
            step: 1,
            formModel: {
                contractStartDate: {
                    value: '',
                    type: 'textdate',
                    name: 'contractStartDate',
                    label: 'Sözleşme Başlangıç Tarihi',
                    placeholder: 'Sözleşme başlangıç tarihi',
                    error: 'Lütfen sözleşme başlangıç tarihi girin.',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true,
                        isDate: true
                    }
                },
                companyName: {
                    value: '',
                    name: 'companyName',
                    type: 'text',
                    label: 'Müşteri Ünvanı',
                    placeholder: 'Müşteri ünvanı',
                    error: 'Lütfen müşteri ünvanı girin.',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true
                    }
                },
                duration: {
                    value: '',
                    name: 'duration',
                    type: 'select',
                    label: 'Taahhüt Süresi',
                    placeholder: 'Taahhüt süresi',
                    error: 'Lütfen taahhüt süresi girin.',
                    options: [
                        {
                            name: '6 ay',
                            value: 6
                        },
                        {
                            name: '12 ay',
                            value: 12
                        },
                        {
                            name: '24 ay',
                            value: 24
                        }
                    ],
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true
                    }
                },
                originators: [
                    {
                        addText: '+ Başka bir alfanumerik ekle',
                        value: '',
                        name: 'originators',
                        type: 'text',
                        label: 'Alfanumerik',
                        placeholder: 'Alfanumerik',
                        error: 'Lütfen alfanumerik girin.',
                        valid: false,
                        touched: false,
                        validationRules: {
                            isRequired: true
                        }
                    }
                ],
                partnerInfo: {
                    value: '',
                    name: 'partnerInfo',
                    type: 'select',
                    label: 'Partner Bilgisi',
                    placeholder: 'Partner Bilgisi',
                    options: partnerInfoOptions,
                    error: 'Lütfen partner bilgisi girin.',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true
                    }
                }
            },
            formProductModel: {
                committedAmountOfUnit: {
                    value: '',
                    name: 'committedAmountOfUnit',
                    type: 'text',
                    label: 'Taahhüt Adedi',
                    placeholder: 'Taahhüt adedi',
                    error: 'Lütfen taahhüt Adedi girin.',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true,
                        isDecimal: true
                    }
                },
                productType: {
                    value: '',
                    name: 'productType',
                    type: 'select',
                    label: 'Ürün Detayı',
                    placeholder: 'Ürün detayı',
                    error: 'Lütfen ürün detayı girin.',
                    options: [
                        {
                            name: 'SMS',
                            value: 'SMS'
                        },
                        {
                            name: 'Fast SMS',
                            value: 'Fast SMS'
                        },
                        {
                            name: 'MMS',
                            value: 'MMS'
                        },
                        {
                            name: 'TCKN',
                            value: 'TCKN'
                        },
                        {
                            name: 'WAPPUSH',
                            value: 'WAPPUSH'
                        },
                        {
                            name: 'IVR',
                            value: 'IVR'
                        }
                    ],
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true
                    }
                },
                tariffPlan: {
                    value: '',
                    name: 'tariffPlan',
                    type: 'text',
                    label: 'Tarife Detayı',
                    placeholder: 'Tarife Detayı',
                    error: 'Lütfen tarife detayı girin.',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true
                    }
                },
                unitPrice: {
                    value: '',
                    name: 'unitPrice',
                    type: 'text',
                    label: 'Birim Fiyatı (TL)',
                    placeholder: 'Birim fiyatı (TL)',
                    error: 'Lütfen birim fiyatı girin.',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true,
                        isDecimal: true
                    }
                },
                virtualNumber: {
                    value: '',
                    name: 'virtualNumber',
                    type: 'virtualPhone',
                    label: 'Sanal No',
                    placeholder: 'Sanal no',
                    error: 'Lütfen sanal no girin.',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true
                    }
                }
            },
            formUserModel: {
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
            },
            formPostModel: {

            }
        };

        this.goToState = this.goToState.bind(this);
        this.getCompanyList = this.getCompanyList.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.confirmBackPopup = this.confirmBackPopup.bind(this);
        this.goToBack = this.goToBack.bind(this);
    }

    componentDidMount() {
        if(this.props.app.partnerInfos.length < 1)
        {
            this.props.dispatch(partnerInfos({}, (data) => {
                var partnerInfos = data.partnerInfos;
                var partnerInfoData = partnerInfos.map(function(item){
                    return item;
                });
                this.props.dispatch(dispatchItem("PARTNERINFOS", partnerInfoData));
            }, () => {

            }));
        }
    }
    
    componentWillReceiveProps(nextProps)
    {
      if(this.props.app.partnerInfos !== nextProps.app.partnerInfos) {
        var partnerInfoOptions = [];
        
        for(var i = 0; i < nextProps.app.partnerInfos.length; i++){
            partnerInfoOptions.push({
                name: nextProps.app.partnerInfos[i],
                value: nextProps.app.partnerInfos[i]
            });
        }
        this.setState({
            formModel: {
                ...this.state.formModel,
                partnerInfo: {
                    ...this.state.formModel.partnerInfo,
                    options: partnerInfoOptions
                }
            }
        });
      }
    }

    goToState(state)
    {
        this.setState({
            step: state
        });
        scrollToTop();
    }

    confirmBackPopup(state){
        this.setState({
            showConfirmBackPopup: state
        });
    }

    goToBack()
    {
        this.props.history.push('/agent/company/list');
    }

    handleSubmit(data)
    {
        if(this.state.step == 1)
        {
            this.setState({
                formPostModel: data
            });
            this.goToState(2);
        }
        else if(this.state.step == 2)
        {
            this.setState({
                formPostModel: {
                    ...this.state.formPostModel,
                    productsInfo: [data]
                }
            });
            this.goToState(3);
        }
        else {
            this.setState({
                formPostModel: {
                    ...this.state.formPostModel,
                    usersInfo: [data]
                }
            }, () => {
                this.props.dispatch(createCompany(this.state.formPostModel, (data) => {
                    this.getCompanyList(() => {
                        this.props.history.push('/agent/company/list');
                        scrollToTop();
                    });
                }, (data) => {
                    scrollToTop();
                }));
            });
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
        const breadcrumbItems = [{
            name: 'Ana Sayfa',
            link: '/'
        },{
            name: 'Müşteriler',
            link : '/agent/company/list'
        },{
            name: 'Yeni Müşteri Ekleme'
        }];

        return (
        [
          <Breadcrumb items={breadcrumbItems} />,
          <section className="panel small">
            <Message />
            <div className="container">
                {this.props.app.partnerInfos.length >= 0 && this.state.step == 1 &&    
                    [
                        <div className="title-default">
                            <span className="step">1/3</span>
                            <span>Yeni Müşteri Ekleme</span>
                        </div>,
                        <div className="form-container">
                            <Form model={this.state.formModel} handleSubmit={this.handleSubmit} smallTitle={"Müşteri Bilgileri"} buttonText={"Sonraki Adım"} buttonId={"company-create-next"} />
                            <Button disabled={false} extraClass={"secondary"} onClick={() => { this.confirmBackPopup(true) }} text={"İşlemi iptal et"} id={"company-create-next"} />
                        </div>
                    ]
                }
                {this.state.step == 2 && 
                    [
                        
                    <div className="title-default">
                        <span className="step">2/3</span>
                        <span>Yeni Müşteri Ekleme</span>
                    </div>,
                    <div className="form-container">
                        <Form model={this.state.formProductModel} handleSubmit={this.handleSubmit} smallTitle={"Ürün Bilgileri"} buttonText={"Sonraki Adım"} buttonId={"company-create-second-next"} />
                        <Button disabled={false} extraClass={""} onClick={() => { this.goToState(1) }} text={"Önceki Adım"} id={"company-create-second-back"} />
                        <Button disabled={false} extraClass={"secondary"} onClick={() => { this.confirmBackPopup(true) }} text={"İşlemi iptal et"} id={"company-create-second-cancel"} />
                    </div>
                    ]
                }
                {this.state.step == 3 && 
                    [
                        <div className="title-default">
                            <span className="step">3/3</span>
                            <span>Yeni Müşteri Ekleme</span>
                        </div>,
                        <div className="form-container">
                            <Form model={this.state.formUserModel} handleSubmit={this.handleSubmit} smallTitle={"Müşteri Kullanıcı Bilgileri"} buttonText={"Kaydet"} buttonId={"company-create-third-save"} />
                            <Button disabled={false} extraClass={""} onClick={() => { this.goToState(2) }} text={"Önceki Adım"} id={"company-create-third-back"} />
                            <Button disabled={false} extraClass={"secondary"} onClick={() => { this.confirmBackPopup(true)}} text={"İşlemi iptal et"} id={"company-create-third-cancel"} />
                        </div>
                    ]
                }
            </div>
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
                            <a id={"company-create-back-okey"} className="btn primary" href="javascript:void(0)" title="Onayla" onClick={() => { this.goToBack() }}>
                                <span>Evet</span>
                            </a>
                            <a id={"company-create-back-cancel"} className="btn" href="javascript:void(0)" title="İptal" onClick={() => this.confirmBackPopup(false)}>
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

  export default withRouter(connect(mapStateToProps)(CompanyCreate))