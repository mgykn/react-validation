import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import moment from 'moment';
import Paging from '../../../components/paging/index';
import Form from '../../../components/form/form';
import Message from '../../../components/message/index';
import { xiVodafoneReportClientList, partners, xiVodafonePartnerReportMonthly, xiVodafonePartnerReportQuota, xiVodafonePartnerReportSend, xiVodafonePartnerReportSendDownload, dispatchItem } from '../../../actions/actions';

class PartnerReport extends React.Component {
    constructor(props)
    {
        super(props)

        var yearOptions = [ { name: "2020", value: "2020" }, { name: "2019", value: "2019" }, { name: "2018", value: "2018" }];
        var monthOptions = [{ name: "01", value: "01" }, { name: "02", value: "02" }, { name: "03", value: "03" }, { name: "04", value: "04" }, { name: "05", value: "05" }, { name: "06", value: "06" }, { name: "07", value: "07" }, { name: "08", value: "08" }, { name: "09", value: "09" }, { name: "10", value: "10" }, { name: "11", value: "11" }, { name: "12", value: "12" }];

        var partnerOptions = [];
        for(var i = 0; i < this.props.app.xivodafone.partners.length; i++){
            partnerOptions.push({
                name: this.props.app.xivodafone.partners[i].partnerName,
                value: this.props.app.xivodafone.partners[i].partnerId
            });
        }

        var clientOptions = [];
        for(var i = 0; i < this.props.app.xivodafone.clientsForReport.length; i++){
            clientOptions.push({
                name: this.props.app.xivodafone.clientsForReport[i].customerName,
                value: this.props.app.xivodafone.clientsForReport[i].customerId
            });
        }
        
        this.state = {
            reportType: "Monthly",
            monthlyReportFormModel: {
                year: {
                    value: '',
                    name: 'year',
                    type: 'select',
                    label: '',
                    placeholder: 'Yıl seçin',
                    options: yearOptions,
                    error: 'Lütfen yıl seçin.',
                    isSmall: true,
                    valid: false,
                    touched: false,
                    validationRules: {
                    }
                },
                month: {
                    value: '',
                    name: 'month',
                    type: 'select',
                    label: '',
                    placeholder: 'Ay seçin',
                    options: monthOptions,
                    error: 'Lütfen ay seçin.',
                    isSmall: true,
                    valid: false,
                    touched: false,
                    validationRules: {
                    }
                },
                xPartnerId: {
                    value: '',
                    name: 'xPartnerId',
                    type: 'select',
                    label: '',
                    placeholder: 'Partner seçin',
                    options: partnerOptions,
                    error: 'Lütfen partner seçin.',
                    isSmall: true,
                    valid: false,
                    touched: false,
                    validationRules: {
                    }
                },
                xCustomerId: {
                    value: '',
                    name: 'xCustomerId',
                    type: 'select',
                    label: '',
                    placeholder: 'Müşteri seçin',
                    options: clientOptions,
                    error: 'Lütfen müşteri seçin.',
                    isSmall: true,
                    valid: false,
                    touched: false,
                    validationRules: {
                    }
                }
            },
            quotaReportFormModel: {
                xPartnerId: {
                    value: '',
                    name: 'xPartnerId',
                    type: 'select',
                    label: '',
                    placeholder: 'Partner seçin',
                    options: partnerOptions,
                    error: 'Lütfen partner seçin.',
                    isSmall: true,
                    valid: false,
                    touched: false,
                    validationRules: {
                    }
                },
                xCustomerId: {
                    value: '',
                    name: 'xCustomerId',
                    type: 'select',
                    label: '',
                    placeholder: 'Müşteri seçin',
                    options: clientOptions,
                    error: 'Lütfen müşteri seçin.',
                    isSmall: true,
                    valid: false,
                    touched: false,
                    validationRules: {
                    }
                }
            },
            sendReportFormModel: {
                xPartnerId: {
                    value: '',
                    name: 'xPartnerId',
                    type: 'select',
                    label: '',
                    placeholder: 'Partner seçin',
                    options: partnerOptions,
                    error: 'Lütfen partner seçin.',
                    isSmall: true,
                    valid: false,
                    touched: false,
                    validationRules: {
                    }
                },
                xCustomerId: {
                    value: '',
                    name: 'xCustomerId',
                    type: 'select',
                    label: '',
                    placeholder: 'Müşteri seçin',
                    options: clientOptions,
                    error: 'Lütfen müşteri seçin.',
                    isSmall: true,
                    valid: false,
                    touched: false,
                    validationRules: {
                    }
                }
            }
        };

        this.changeReportType = this.changeReportType.bind(this);
        this.onMonthlyFormInputChange = this.onMonthlyFormInputChange.bind(this);
        this.onQuotaFormInputChange = this.onQuotaFormInputChange.bind(this);
        this.onSendFormInputChange = this.onSendFormInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getReport = this.getReport.bind(this);
        this.monthlyReportChangePage = this.monthlyReportChangePage.bind(this);
        this.quotaReportChangePage = this.quotaReportChangePage.bind(this);
        this.sendReportChangePage = this.sendReportChangePage.bind(this);
        this.downloadSendReport = this.downloadSendReport.bind(this);
    }

    componentDidMount() {
        if (this.props.app.xivodafone.partners.length < 1) {
            this.props.dispatch(partners({}, (data) => {
                this.props.dispatch(dispatchItem("PARTNER_LIST", data.Partners));
            }, () => {

            }));
        }

        var serviceData = {
        }
        this.props.dispatch(xiVodafoneReportClientList(serviceData, (data) => {
            this.props.dispatch(dispatchItem("XIVODAFONE_CLIENT_LIST_FOR_REPORT", data.Customers));
        }, () => {

        }));
    
        
    }

    componentWillReceiveProps(nextProps)
    {
        if(this.props.app.xivodafone.partners !== nextProps.app.xivodafone.partners) {
            var partnerOptions = [];
        
            for(var i = 0; i < nextProps.app.xivodafone.partners.length; i++){
                partnerOptions.push({
                    name: nextProps.app.xivodafone.partners[i].partnerName,
                    value: nextProps.app.xivodafone.partners[i].partnerId
                });
            }

            this.setState({
                monthlyReportFormModel: {
                    ...this.state.monthlyReportFormModel,
                    xPartnerId: {
                        ...this.state.monthlyReportFormModel.xPartnerId,
                        options: partnerOptions
                    }
                },
                quotaReportFormModel: {
                    ...this.state.quotaReportFormModel,
                    xPartnerId: {
                        ...this.state.quotaReportFormModel.xPartnerId,
                        options: partnerOptions
                    }
                },
                sendReportFormModel: {
                    ...this.state.sendReportFormModel,
                    xPartnerId: {
                        ...this.state.sendReportFormModel.xPartnerId,
                        options: partnerOptions
                    }
                }
            });
        }

        if(this.props.app.xivodafone.clientsForReport !== nextProps.app.xivodafone.clientsForReport) {
            var clientOptions = [];
        
            for(var i = 0; i < nextProps.app.xivodafone.clientsForReport.length; i++){
                clientOptions.push({
                    name: nextProps.app.xivodafone.clientsForReport[i].customerName,
                    value: nextProps.app.xivodafone.clientsForReport[i].customerId
                });
            }

            if(this.state.reportType == "Monthly") {
                    this.setState({
                        monthlyReportFormModel: {
                            ...this.state.monthlyReportFormModel,
                            xCustomerId: {
                                ...this.state.monthlyReportFormModel.xCustomerId,
                                options: clientOptions
                            }
                        }
                    });
            }

            if(this.state.reportType == "Quota") {
                this.setState({
                    quotaReportFormModel: {
                        ...this.state.quotaReportFormModel,
                        xCustomerId: {
                            ...this.state.quotaReportFormModel.xCustomerId,
                            options: clientOptions
                        }
                    }
                });
            }

            if(this.state.reportType == "Send") {
                this.setState({
                    sendReportFormModel: {
                        ...this.state.sendReportFormModel,
                        xCustomerId: {
                            ...this.state.sendReportFormModel.xCustomerId,
                            options: clientOptions
                        }
                    }
                });
            }  
        }
    }

    componentWillUnmount () {
        this.props.dispatch(dispatchItem("XIVODAFONE_PARTNERREPORT_MONTHLY",[]));
        this.props.dispatch(dispatchItem("XIVODAFONE_PARTNERREPORT_MONTHLY_COUNT", 0));
        this.props.dispatch(dispatchItem("XIVODAFONE_PARTNERREPORT_QUOTA",[]));
        this.props.dispatch(dispatchItem("XIVODAFONE_PARTNERREPORT_QUOTA_COUNT", 0));
        this.props.dispatch(dispatchItem("XIVODAFONE_PARTNERREPORT_SEND",[]));
        this.props.dispatch(dispatchItem("XIVODAFONE_PARTNERREPORT_SEND_COUNT", 0));
    }

    changeReportType(reportType) {
        if(reportType != this.state.reportType)
        {

        }
        this.setState({
            reportType: reportType,
            monthlyReportFormModel: {
                ...this.state.monthlyReportFormModel,
                month: {
                    ...this.state.monthlyReportFormModel.month,
                    value: ""
                },
                year: {
                    ...this.state.monthlyReportFormModel.year,
                    value: ""
                },
                xCustomerId: {
                    ...this.state.monthlyReportFormModel.xCustomerId,
                    value: "",
                    options: []
                },
                xPartnerId: {
                    ...this.state.monthlyReportFormModel.xPartnerId,
                    value: ""
                }
            },
            quotaReportFormModel: {
                ...this.state.quotaReportFormModel,
                xCustomerId: {
                    ...this.state.quotaReportFormModel.xCustomerId,
                    value: "",
                    options: []
                },
                xPartnerId: {
                    ...this.state.quotaReportFormModel.xPartnerId,
                    value: ""
                }
            },
            sendReportFormModel: {
                ...this.state.sendReportFormModel,
                xCustomerId: {
                    ...this.state.sendReportFormModel.xCustomerId,
                    value: "",
                    options: []
                },
                xPartnerId: {
                    ...this.state.sendReportFormModel.xPartnerId,
                    value: ""
                }
            }
        })
    }

    onMonthlyFormInputChange(model, name) {
        if(name == "xPartnerId")
        {
            var serviceData = {
                xPartnerId: model.xPartnerId.value
            };

            this.props.dispatch(xiVodafoneReportClientList(serviceData, (data) => {
                this.props.dispatch(dispatchItem("XIVODAFONE_CLIENT_LIST_FOR_REPORT", data.Customers));
            }, () => {

            }));

            this.setState({
                monthlyReportFormModel: {
                    ...this.state.monthlyReportFormModel,
                    xCustomerId: {
                        ...this.state.monthlyReportFormModel.xCustomerId,
                        value: '',
                        valid: false,
                        touched: false
                    }
                }
            });
        }
    }
    onQuotaFormInputChange(model, name) {
        if(name == "xPartnerId")
        {
            var serviceData = {
                xPartnerId: model.xPartnerId.value
            };

            this.props.dispatch(xiVodafoneReportClientList(serviceData, (data) => {
                this.props.dispatch(dispatchItem("XIVODAFONE_CLIENT_LIST_FOR_REPORT", data.Customers));
            }, () => {

            }));

            this.setState({
                quotaReportFormModel: {
                    ...this.state.quotaReportFormModel,
                    xCustomerId: {
                        ...this.state.quotaReportFormModel.xCustomerId,
                        value: '',
                        valid: false,
                        touched: false
                    }
                }
            });
        }
    }

    onSendFormInputChange(model, name) {
        if(name == "xPartnerId")
        {
            var serviceData = {
                xPartnerId: model.xPartnerId.value
            };

            this.props.dispatch(xiVodafoneReportClientList(serviceData, (data) => {
                this.props.dispatch(dispatchItem("XIVODAFONE_CLIENT_LIST_FOR_REPORT", data.Customers));
            }, () => {

            }));

            this.setState({
                sendReportFormModel: {
                    ...this.state.sendReportFormModel,
                    xCustomerId: {
                        ...this.state.sendReportFormModel.xCustomerId,
                        value: '',
                        valid: false,
                        touched: false
                    }
                }
            });
        }
    }

    handleSubmit(data)
    {
        this.getReport(data);
    }
    
    getReport(data)
    {
        var serviceData = data;

        if(!serviceData)
        {
            serviceData = {};
        }

        this.setState({
            lastSendData: serviceData
        });

        if(this.state.reportType == "Monthly")
        {
            this.props.dispatch(xiVodafonePartnerReportMonthly(serviceData, (data) => {
                this.props.dispatch(dispatchItem("XIVODAFONE_PARTNERREPORT_MONTHLY", data.monthlyReportInfos));
                this.props.dispatch(dispatchItem("XIVODAFONE_PARTNERREPORT_MONTHLY_COUNT", data.totalSize));
                if(!serviceData["page"] || serviceData["page"] == 0)
                {
                    this.monthlyReportPagingReset();
                }
            }, () => {
    
            }));
        }
        else if(this.state.reportType == "Quota")
        {
            this.props.dispatch(xiVodafonePartnerReportQuota(serviceData, (data) => {
                this.props.dispatch(dispatchItem("XIVODAFONE_PARTNERREPORT_QUOTA", data.customerQuotaInfos));
                this.props.dispatch(dispatchItem("XIVODAFONE_PARTNERREPORT_QUOTA_COUNT", data.totalSize));
                if(!serviceData["page"] || serviceData["page"] == 0)
                {
                    this.quotaReportPagingReset();
                }
            }, () => {
    
            }));
        }
        else if(this.state.reportType == "Send")
        {
            this.props.dispatch(xiVodafonePartnerReportSend(serviceData, (data) => {
                this.props.dispatch(dispatchItem("XIVODAFONE_PARTNERREPORT_SEND", data.sendSmsInfos));
                this.props.dispatch(dispatchItem("XIVODAFONE_PARTNERREPORT_SEND_COUNT", data.totalSize));
                if(!serviceData["page"] || serviceData["page"] == 0)
                {
                    this.sendReportPagingReset();
                }
            }, () => {
    
            }));
        }
    }

    monthlyReportChangePage(pageNumber, pageSize) {
        var model = this.state.lastSendData
        model["page"] = pageNumber;
        model["size"] = pageSize;
            
        this.getReport(model);
    }

    quotaReportChangePage(pageNumber, pageSize) {
        var model = this.state.lastSendData
        model["page"] = pageNumber;
        model["size"] = pageSize;
            
        this.getReport(model);
    }

    sendReportChangePage(pageNumber, pageSize) {
        var model = this.state.lastSendData
        model["page"] = pageNumber;
        model["size"] = pageSize;
            
        this.getReport(model);
    }

    downloadSendReport(xCustomerId){
        this.props.dispatch(xiVodafonePartnerReportSendDownload(xCustomerId, () => {
        }, () => {

        }));
    }
    
    render() {

        return (
            <section className="panel">
                <Message />
                <div className="container">
                    <div className="tabs">
                    <div className="tab-menu">
                            <a className={this.state.reportType == "Monthly" ? "active" : ""} href="javascript:void(0)" title="Aylık Gönderim Raporu" onClick={() => this.changeReportType("Monthly")}>
                                Aylık Gönderim Raporu
                            </a>
                            <a className={this.state.reportType == "Quota" ? "active" : ""} href="javascript:void(0)" title="Partner Kalan Adet Raporu" onClick={() => this.changeReportType("Quota")}>
                                Partner Kalan Adet Raporu
                            </a>
                            <a className={this.state.reportType == "Send" ? "active" : ""} href="javascript:void(0)" title="Partner Gönderim Raporu" onClick={() => this.changeReportType("Send")}>
                                Partner Gönderim Raporu
                            </a>
                        </div>
                        <div className="tab-items">
                            {this.state.reportType == "Monthly" &&
                                <div className="tab-item active">
                                    <div className="table">
                                        <div className="top">
                                            <div className="title-default">
                                                Aylık Gönderim Raporu
                                            </div>
                                            <div className="actions"></div>
                                            <div className="filter">
                                                <Form model={this.state.monthlyReportFormModel} handleSubmit={this.handleSubmit} onInputChange={this.onMonthlyFormInputChange} buttonExtraClass={"tertiary"} buttonText={"Filtrele"} buttonId={"xivodafone-report-quota-list-filter"} />
                                            </div>
                                        </div>
                                        <div className="bottom">
                                            <div className="table-container">
                                                <table className="sortable">
                                                    <thead>
                                                        <tr>
                                                            <th><span>Yıl</span></th>
                                                            <th><span>Ay</span></th>
                                                            <th><span>Partner</span></th>
                                                            <th><span>Müşteri</span></th>
                                                            <th><span>Toplam Gönderim Adedi</span></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.props.app.xivodafone.partnerReportMonthly && this.props.app.xivodafone.partnerReportMonthly.map((item, i) => 
                                                            {
                                                                return (            
                                                                    <tr>
                                                                        <td>{item.year}</td>
                                                                        <td>{item.month}</td>
                                                                        <td>{item.partnerName}</td>
                                                                        <td>{item.companyName}</td>
                                                                        <td>{item.totalSendCount}</td>
                                                                    </tr>
                                                                )
                                                            }
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>                
                                        <div className="paging-container">
                                            <Paging setReset={reset => this.monthlyReportPagingReset = reset} totalItemCount={this.props.app.xivodafone.partnerReportMonthlyCount} pageSize={this.state.pageSize} changePage={this.monthlyReportChangePage} />
                                        </div>
                                    </div>
                                </div>
                            }
                            {this.state.reportType == "Quota" &&
                                <div className="tab-item active">
                                    <div className="table">
                                        <div className="top">
                                            <div className="title-default">
                                                Partner Kalan Adet Raporu
                                            </div>
                                            <div className="actions"></div>
                                            <div className="filter">
                                                <Form model={this.state.quotaReportFormModel} handleSubmit={this.handleSubmit} onInputChange={this.onQuotaFormInputChange} buttonExtraClass={"tertiary"} buttonText={"Filtrele"} buttonId={"xivodafone-report-quota-list-filter"} />
                                            </div>
                                        </div>
                                        <div className="bottom">
                                            <div className="table-container">
                                                <table className="sortable">
                                                    <thead>
                                                        <tr>
                                                            <th><span>Müşteri Adı</span></th>
                                                            <th><span>Durumu</span></th>
                                                            <th><span>Toplam Alınan Adet</span></th>
                                                            <th><span>Kalan Adet</span></th>
                                                            <th><span>Sözleşme Başlangıç</span></th>
                                                            <th><span>Sözleşme Bitiş</span></th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.props.app.xivodafone.partnerReportQuota && this.props.app.xivodafone.partnerReportQuota.map((item, i) => 
                                                            {
                                                                return (            
                                                                    <tr>
                                                                        <td>{item.companyName}</td>
                                                                        <td className={(item.customerStatus == "ACTIVE" ? "green" : (item.customerStatus == "PASSIVE" ? "red" : ""))}>{(item.customerStatus == "ACTIVE" ? "Aktif" : (item.customerStatus == "PASSIVE" ? "Aktif değil" : ""))}</td>
                                                                        <td>{item.limit}</td>
                                                                        <td>{item.sendCount}</td>
                                                                        <td>{moment(item.contractStartDate).format('DD.MM.YYYY')}</td>
                                                                        <td>{moment(item.contractEndDate).format('DD.MM.YYYY')}</td>
                                                                        <td>
                                                                            <a id={"download-report-send-excel-" + i} className="btn primary" href="javascript:void(0)" title="Excel Olarak İndir" onClick={() => this.downloadSendReport(item.id)}>
                                                                                <span>Excel Olarak İndir</span>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            }
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="paging-container">
                                            <Paging setReset={reset => this.quotaReportPagingReset = reset} totalItemCount={this.props.app.xivodafone.partnerReportQuotaCount} pageSize={this.state.pageSize} changePage={this.quotaReportChangePage} />
                                        </div>
                                    </div>
                                </div>
                            }
                            
                            {this.state.reportType == "Send" &&
                                <div className="tab-item active">
                                    <div className="table">
                                        <div className="top">
                                            <div className="title-default">
                                                Partner Gönderim Raporu
                                            </div>
                                            <div className="actions"></div>
                                            <div className="filter">
                                                <Form model={this.state.sendReportFormModel} handleSubmit={this.handleSubmit} onInputChange={this.onSendFormInputChange} buttonExtraClass={"tertiary"} buttonText={"Filtrele"} buttonId={"xivodafone-report-quota-list-filter"} />
                                            </div>
                                        </div>
                                        <div className="bottom">
                                            <div className="table-container">
                                                <table className="sortable">
                                                    <thead>
                                                        <tr>
                                                            <th><span>Partner</span></th>
                                                            <th><span>Kullanıcı Adı</span></th>
                                                            <th><span>Gönderim Durumu</span></th>
                                                            <th><span>Gönderilen Adet</span></th>
                                                            <th><span>Kalan Adet</span></th>
                                                            <th><span>Sözleşme Bitiş</span></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.props.app.xivodafone.partnerReportSend && this.props.app.xivodafone.partnerReportSend.map((item, i) => 
                                                            {
                                                                return (            
                                                                    <tr>
                                                                        <td>{item.partnerName}</td>
                                                                        <td>{item.campaignName}</td>
                                                                        <td>                                                                       
                                                                        {(item.sendingStatus === 'DRAFT' ? 'ONAYDA' :
                                                                        (item.sendingStatus === 'COMPLETED' ? 'BEKLEMEDE' :
                                                                        (item.sendingStatus === 'CANCELLED' ? 'İPTAL EDİLDİ' : 
                                                                        (item.sendingStatus === 'SEND' ? 'DEVAM EDİYOR' : 
                                                                        (item.sendingStatus === 'REJECTED' ? 'DÜZENLENMELİ' : 
                                                                        (item.sendingStatus === 'FINISHED' ? 'TAMAMLANDI' :
                                                                        (item.sendingStatus === 'READYTOQUOTA' ? 'TAMAMLANDI' : ''
                                                                        )))))))}</td>
                                                                        <td>{item.sendCount}</td>
                                                                        <td>{item.remainingCount}</td>
                                                                        <td>{moment(item.contractEndDate).format('DD.MM.YYYY')}</td>
                                                                    </tr>
                                                                )
                                                            }
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="paging-container">
                                            <Paging setReset={reset => this.sendReportPagingReset = reset} totalItemCount={this.props.app.xivodafone.partnerReportSendCount} pageSize={this.state.pageSize} changePage={this.sendReportChangePage} />
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </section>
      );
    }
}

function mapStateToProps(state) {
    return {
        app: state.app 
    }
}

export default connect(mapStateToProps)(PartnerReport)