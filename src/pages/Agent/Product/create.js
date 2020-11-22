import React from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import Breadcrumb from '../../../components/breadcrumb/index';
import Message from '../../../components/message/index';
import Form from '../../../components/form/form';
import Button from '../../../components/form/button';
import { companies, createProduct, dispatchItem } from '../../../actions/actions';

class ProductCreate extends React.Component {
    constructor(props)
    {
        super(props);

        this.state = {
            showConfirmBackPopup: false,
            formModel: {
                committedAmountOfUnit: {
                    value: '',
                    name: 'committedAmountOfUnit',
                    type: 'text',
                    label: 'Taahhüt Adedi',
                    placeholder: 'Taahhüt adedi',
                    error: 'Lütfen taahhüt adedi girin.',
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
        this.props.history.push('/agent/company/detail/' + companyId + '/products');
    }

    handleSubmit(data)
    {
        const companyId = this.props.match.params.id;
        data["companyId"] = companyId;
        
        this.props.dispatch(createProduct(data, (data) => {
            this.getCompanyList(() => { this.props.history.push('/agent/company/detail/' + companyId + '/products') });
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
            name: "Ürünler",
            link : '/agent/company/detail/' + (company ? company.companyId : "") + '/products'
        },{
            name: 'Yeni Ürün Ekleme'
        }];

        return (
            [
            <Breadcrumb items={breadcrumbItems} />,
            <section className="panel small">
                <Message />
                {company && 
                    <div className="container">
                        <div className="title-default">
                            <span>Yeni Ürün Ekleme</span>
                        </div>
                        <div className="form-container">
                            <Form model={this.state.formModel} handleSubmit={this.handleSubmit} smallTitle={"Ürün Bilgileri"} buttonText={"Ürün Oluştur"} buttonId={"product-create-save"} />
                            <Button disabled={false} extraClass={"secondary"} onClick={() => { this.confirmBackPopup(true) }} text={"İşlemi iptal et"} id={"product-create-cancel"} />
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
                                <a id={"company-product-create-back-okey"} className="btn primary" href="javascript:void(0)" title="Onayla" onClick={() => { this.goToBack() }}>
                                    <span>Evet</span>
                                </a>
                                <a id={"company-product-create-back-cancel"} className="btn" href="javascript:void(0)" title="İptal" onClick={() => this.confirmBackPopup(false)}>
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

  export default withRouter(connect(mapStateToProps)(ProductCreate))