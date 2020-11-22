import React from 'react';
import {connect} from 'react-redux';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import moment from 'moment';
import Breadcrumb from '../../../components/breadcrumb/index';
import Message from '../../../components/message/index';
import Form from '../../../components/form/form';
import Button from '../../../components/form/button';
import { scrollToTop, clearFormModel } from '../../../actions/utils';
import { companies, activateCompany, deactivateCompany, updateCompany, partnerInfos, dispatchItem } from '../../../actions/actions';
import LeftList from './_leftList';

class CompanyDetail extends React.Component {
    constructor(props)
    {
        super(props);

        var companyId = "-1";
        if(this.props.match.params.id)
        {
            companyId = this.props.match.params.id;
        }
        
        const filterCompany = this.props.app.agent.companies.filter(function (item) {
                                return companyId == "-1" || item.companyId === companyId;
                            });

        const company = filterCompany.length > 0 ? filterCompany[0] : null;

        var originators = [];
        if(company != null)
        {
            for(var i = 0; i < company.originators.length; i++)
            {
                originators.push({
                    addText: '+ Başka bir alfanumerik ekle',
                    value: (company !== null ? company.originators[i] : ""),
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
                });
            }
        }

        var partnerInfoOptions = [];
        
        for(var i = 0; i < this.props.app.partnerInfos.length; i++){
            partnerInfoOptions.push({
                name: this.props.app.partnerInfos[i],
                value: this.props.app.partnerInfos[i]
            });
        }

        this.state = {
            showConfirmDeletePopup: false,
            company: company,
            isEdit: false,
            formModel: {
                salesAgentEmail: {
                    value: (company !== null ? company.salesAgentEmail : ""),
                    name: 'salesAgentEmail',
                    type: 'text',
                    label: 'Satış Destek',
                    placeholder: 'Satış Destek',
                    error: 'Lütfen satış destek girin.',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true
                    },
                    disabled: true
                },
                contractStartDate: {
                    value: (company !== null ? moment(company.contractStartDate).format('DD.MM.YYYY') : ""),
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
                    value: (company !== null ? company.companyName : ""),
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
                    value: (company !== null ? company.duration : ""),
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
                originators: originators,
                partnerInfo: {
                    value: (company !== null ? company.partnerInfo : ""),
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
            }
        };

        this.activateEditState = this.activateEditState.bind(this);
        this.getCompanyList = this.getCompanyList.bind(this);
        this.activateCompany = this.activateCompany.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.confirmDeletePopup = this.confirmDeletePopup.bind(this);
    }

    componentDidMount() {
        if (this.props.app.agent.companies.length < 1) {
            this.getCompanyList();
        }

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
        if(this.props.app.agent.companies !== nextProps.app.agent.companies || this.props.match.params.id != nextProps.match.params.id)
        {
            if(this.props.match.params.id != nextProps.match.params.id)
            {
                this.activateEditState(false);

                var clearedModel = clearFormModel(this.state.formModel);

                this.setState({
                    formModel: clearedModel
                })
            }

            var companyId = "-1";
            if(this.props.match.params.id)
            {
                companyId = nextProps.match.params.id;
            }
        
            const filterCompany = nextProps.app.agent.companies.filter(function (item) {
                                return companyId == "-1" || item.companyId === companyId;
                            });

            const company = filterCompany.length > 0 ? filterCompany[0] : null;
            
            var originators = [];
            if(company != null)
            {
                for(var i = 0; i < company.originators.length; i++)
                {
                    originators.push({
                        addText: '+ Başka bir alfanumerik ekle',
                        value: (company !== null ? company.originators[i] : ""),
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
                    });
                }
            }

            this.setState({
                company: company,
                formModel: {
                    ...this.state.formModel,
                    salesAgentEmail: {
                        ...this.state.formModel.salesAgentEmail,
                        value: (company !== null ? company.salesAgentEmail : "")
                    },
                    companyName: {
                        ...this.state.formModel.companyName,
                        value: (company !== null ? company.companyName : "")
                    },
                    partnerInfo: {
                        ...this.state.formModel.partnerInfo,
                        value: (company !== null ? company.partnerInfo : "")
                    },
                    duration: {
                        ...this.state.formModel.duration,
                        value: (company !== null ? company.duration : "")
                    },
                    contractStartDate: {
                        ...this.state.formModel.contractStartDate,
                        value: (company !== null ? moment(company.contractStartDate).format('DD.MM.YYYY') : "")
                    },
                    originators: originators
                }
            });
        }

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

    handleSubmit(data)
    {
        //this.props.match.params.id;
        data["companyId"] = this.state.company.companyId;
                
        this.props.dispatch(updateCompany(data, (data) => {
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
        scrollToTop();
    }

    confirmDeletePopup(state){
        this.setState({
            showConfirmDeletePopup: state
        });
    }

    activateCompany(activate, companyId) {
        if(activate)
        {
            this.props.dispatch(activateCompany({ companyId: companyId }, (data) => {
                this.getCompanyList();
            }, () => {
    
            }));
        }
        else {
            this.props.dispatch(deactivateCompany({ companyId: companyId }, (data) => {
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
        const company = this.state.company;

        const breadcrumbItems = [{
            name: 'Ana Sayfa',
            link: '/'
        },{
            name: 'Müşteriler',
            link : '/agent/company/list'
        },{
            name: (company ? company.companyName : "")
        }];

        return (
        [
          <Breadcrumb items={breadcrumbItems} />,
          <section className="panel">
            <Message />
            <div className="container">
                <LeftList items={this.props.app.agent.companies} />
                {company &&
                    <div className="right">
                        <div className="header">
                            <div className="column">
                                <div className="title-default">
                                    <span>{company.companyName}</span>
                                </div>
                            </div>
                            {!this.state.isEdit &&
                                <div className="column only-desktop">
                                    <Button disabled={false} extraClass={"tertiary"} onClick={() => this.activateEditState(true)} text={"Bilgileri Düzenle"} id={"company-edit-edit"} />
                                </div>
                            }
                        </div>
                        <div className="items">
                            <div className="item-container">
                                <div className="column">
                                    <div className="item">
                                        <div>Durum</div>
                                        <div className={company.status == "ACTIVE" ? "green" : ""}>{company.status == "ACTIVE" ? "Aktif" : "Pasif"}</div>
                                    </div>
                                    {!this.state.isEdit &&
                                        [        
                                            <div className="item">
                                                <div>Satış Destek</div>
                                                <div>{company.salesAgentEmail}</div>
                                            </div>,
                                            <div className="item">
                                                <div>Müşteri Ünvanı</div>
                                                <div>{company.companyName}</div>
                                            </div>,
                                            <div className="item">
                                                <div>Alfanumerik</div>
                                                <div>{company.originators.join(', ')}</div>
                                            </div>
                                        ]
                                    }
                                </div>
                                {!this.state.isEdit && 
                                    <div className="column">
                                        <div className="item">
                                            <div>Sözleşme başlangıç tarihi</div>
                                            <div>{moment(company.contractStartDate).format('DD.MM.YYYY')}</div>
                                        </div>
                                        <div className="item">
                                            <div>Sözleşme bitiş tarihi</div>
                                            <div>{moment(company.contractEndDate).format('DD.MM.YYYY')}</div>
                                        </div>
                                        <div className="item">
                                            <div>Taahhüt süresi</div>
                                            <div>{company.duration}</div>
                                        </div>
                                        <div className="item">
                                            <div>Partner Bilgisi</div>
                                            <div>{company.partnerInfo}</div>
                                        </div>
                                    </div>
                                }
                            </div>
                            {!this.state.isEdit &&
                                <div className="item-container agent-links">
                                    <Button disabled={false} extraClass={"tertiary only-mobile"} onClick={() => this.activateEditState(true)} text={"Bilgileri Düzenle"} />
                                    <div className="column">
                                        <div className="item">
                                            <div>
                                                <Link className="arrowed" to={"/agent/company/detail/" + company.companyId + "/users"} id={"company-edit-users"}>
                                                    Kullanıcılar
                                                </Link>
                                            </div>
                                            <div>
                                                <Link className="arrowed" to={"/agent/company/detail/" + company.companyId + "/products"} id={"company-edit-products"}>
                                                    Ürünler
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="column">
                                        <div className="item">
                                            <div></div>
                                            {company.status == "ACTIVE" &&
                                                <div>
                                                    <a id={"company-edit-deactivate"} className="gray" href="javascript:void(0)" onClick={() => this.confirmDeletePopup(true)}>Müşteriyi Sil</a>
                                                </div>
                                            }
                                            {company.status != "ACTIVE" &&
                                                <div>
                                                    <a id={"company-edit-activate"} className="gray" href="javascript:void(0)" onClick={() => this.activateCompany(true, company.companyId)}>Müşteriyi Aktifleştir</a>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            }
                            {this.props.app.partnerInfos.length > 0 && this.state.isEdit &&
                                <div className="form-container">
                                    <Form model={this.state.formModel} handleSubmit={this.handleSubmit} smallTitle={""} buttonText={"Kaydet"} buttonId={"company-edit-save"} multipleColumn={true} />
                                    <Button disabled={false} extraClass={"secondary"} onClick={() => this.activateEditState(false)} text={"Vazgeç"} id={"company-edit-cancel"} />
                                </div>
                            }
                        </div>
                    </div>
                }
            </div>
          </section>,
            <div>
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
                                <a id={"company-edit-delete-okey"} className="btn primary" href="javascript:void(0)" title="Onayla" onClick={() => this.activateCompany(false, company.companyId)}>
                                    <span>Onayla</span>
                                </a>
                                <a id={"company-edit-delete-cancel"} className="btn" href="javascript:void(0)" title="İptal" onClick={() => this.confirmDeletePopup(false)}>
                                    <span>İptal</span>
                                </a>
                            </div>
                        </div>
                        <a className="popup-close" href="javascript:void(0)" onClick={() => this.confirmDeletePopup(false)}>
                            <img src={require('../../../assets/icons/icon-popup-close.svg')} alt="Kapat Ikonu" />
                        </a>
                    </div>
                }
            </div>
        ]
      )
    }
  }

  function mapStateToProps(state) {
      return {
          app: state.app 
      }
  }

  export default connect(mapStateToProps)(CompanyDetail)