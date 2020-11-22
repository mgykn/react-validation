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
import { xiVodafoneReportQuota, xiVodafoneReportSend, xiVodafoneReportClientList, xiVodafoneReportSendDownload, xiVodafoneReportCancelSend, dispatchItem } from '../../../actions/actions';

class Report extends React.Component {
    constructor(props)
    {
        super(props)

        var clientOptions = [];
        
        for(var i = 0; i < this.props.app.xivodafone.clientsForReport.length; i++){
            clientOptions.push({
                name: this.props.app.xivodafone.clientsForReport[i].customerName,
                value: this.props.app.xivodafone.clientsForReport[i].customerId
            });
        }
        
        this.state = {
            reportType: "Quota",
            pageSize: 50,
            lastSendData: undefined,
            quotaReportFormModel: {
                xCustomerId: {
                    value: '',
                    name: 'xCustomerId',
                    type: 'select',
                    label: '',
                    placeholder: 'Müşteri seçin',
                    options: clientOptions,
                    error: 'Lütfen müşteri seçin.',
                    valid: false,
                    touched: false,
                    validationRules: {
                    }
                }
            },
            sendReportFormModel: {
                xCustomerId: {
                    value: '',
                    name: 'xCustomerId',
                    type: 'select',
                    label: '',
                    placeholder: 'Müşteri seçin',
                    options: clientOptions,
                    error: 'Lütfen müşteri seçin.',
                    valid: false,
                    touched: false,
                    validationRules: {
                    }
                }
            }
        };

        this.changeReportType = this.changeReportType.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getReport = this.getReport.bind(this);
        this.quotaReportChangePage = this.quotaReportChangePage.bind(this);
        this.sendReportChangePage = this.sendReportChangePage.bind(this);
        this.downloadSendReport = this.downloadSendReport.bind(this);
        this.cancelSend = this.cancelSend.bind(this);
    }

    componentDidMount() {
        var serviceData = {
        }
        
        this.props.dispatch(xiVodafoneReportClientList(serviceData, (data) => {
            this.props.dispatch(dispatchItem("XIVODAFONE_CLIENT_LIST_FOR_REPORT", data.Customers));
        }, () => {

        }));
    }

    componentWillUnmount () {
        
        this.props.dispatch(dispatchItem("XIVODAFONE_REPORT_QUOTA",[]));
        this.props.dispatch(dispatchItem("XIVODAFONE_REPORT_QUOTA_COUNT", 0));
        this.props.dispatch(dispatchItem("XIVODAFONE_REPORT_SEND", []));
        this.props.dispatch(dispatchItem("XIVODAFONE_REPORT_SEND_COUNT", 0));
    }

    componentWillReceiveProps(nextProps)
    {
        if(this.props.app.xivodafone.clientsForReport !== nextProps.app.xivodafone.clientsForReport) {
            var clientOptions = [];
        
            for(var i = 0; i < nextProps.app.xivodafone.clientsForReport.length; i++){
                clientOptions.push({
                    name: nextProps.app.xivodafone.clientsForReport[i].customerName,
                    value: nextProps.app.xivodafone.clientsForReport[i].customerId
                });
            }

            this.setState({
                quotaReportFormModel: {
                    ...this.state.quotaReportFormModel,
                    xCustomerId: {
                        ...this.state.quotaReportFormModel.xCustomerId,
                        options: clientOptions
                    }
                },
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

    changeReportType(reportType) {
        if(reportType != this.state.reportType)
        {
            this.setState({
                reportType: reportType,
                quotaReportFormModel: {
                    ...this.state.quotaReportFormModel,
                    xCustomerId: {
                        ...this.state.quotaReportFormModel.xCustomerId,
                        value: ""
                    }
                },
                sendReportFormModel: {
                    ...this.state.sendReportFormModel,
                    xCustomerId: {
                        ...this.state.sendReportFormModel.xCustomerId,
                        value: ""
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

        if(this.state.reportType == "Quota")
        {
            this.props.dispatch(xiVodafoneReportQuota(serviceData, (data) => {
                this.props.dispatch(dispatchItem("XIVODAFONE_REPORT_QUOTA", data.customerQuotaInfos));
                this.props.dispatch(dispatchItem("XIVODAFONE_REPORT_QUOTA_COUNT", data.totalSize));
                if(!serviceData["page"] || serviceData["page"] == 0)
                {
                    this.quotaReportPagingReset();
                }
            }, () => {
    
            }));
        }
        else if(this.state.reportType == "Send")
        {
            this.props.dispatch(xiVodafoneReportSend(serviceData, (data) => {
                this.props.dispatch(dispatchItem("XIVODAFONE_REPORT_SEND", data.partnerDetailReportInfos));
                this.props.dispatch(dispatchItem("XIVODAFONE_REPORT_SEND_COUNT", data.totalSize));
                if(!serviceData["page"] || serviceData["page"] == 0)
                {
                    this.sendReportPagingReset();
                }
            }));
        }
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

    
    downloadSendReport(){
        var xCustomerId = this.state.sendReportFormModel.xCustomerId.value;
        this.props.dispatch(xiVodafoneReportSendDownload(xCustomerId, () => {
        }, () => {

        }));
    }

    cancelSend(reportId) {
        this.props.dispatch(xiVodafoneReportCancelSend(reportId, () => {
            this.getReport();
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
                            <a className={this.state.reportType == "Quota" ? "active" : ""} href="javascript:void(0)" title="Kalan Adet Raporu" onClick={() => this.changeReportType("Quota")}>
                                Kalan Adet Raporu
                            </a>
                            <a className={this.state.reportType == "Send" ? "active" : ""} href="javascript:void(0)" title="Gönderim Raporu" onClick={() => this.changeReportType("Send")}>
                                Gönderim Raporu
                            </a>
                        </div>
                        <div className="tab-items">
                            {this.state.reportType == "Quota" &&
                                <div className="tab-item active">
                                    <div className="table">
                                        <div className="top">
                                            <div className="title-default">
                                                Kalan Adet Raporu
                                            </div>
                                            <div className="actions"></div>
                                            <div className="filter">
                                                <Form model={this.state.quotaReportFormModel} handleSubmit={this.handleSubmit} buttonExtraClass={"tertiary"} buttonText={"Filtrele"} buttonId={"xivodafone-report-quota-list-filter"} />
                                            </div>
                                        </div>
                                        <div className="bottom">
                                            <div className="table-container">
                                                <table className="sortable">
                                                    <thead>
                                                        <tr>
                                                            <th><span>Müşteri adı</span></th>
                                                            <th><span>Durum</span></th>
                                                            <th><span>Gönderilen Adet</span></th>
                                                            <th><span>Kalan Adet</span></th>
                                                            <th><span>Sözleşme Bitiş Tarihi</span></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.props.app.xivodafone.reportQuota && this.props.app.xivodafone.reportQuota.map((item, i) => 
                                                        {
                                                            return (            
                                                                <tr>
                                                                    <td>{item.companyName}</td>
                                                                    <td className={item.customerStatus === "WAITING" ? "yellow" : (item.customerStatus === "ACTIVE" ? "green" : "red")}>
                                                                        {(item.customerStatus === 'ACTIVE' ? 'AKTİF' :
                                                                            (item.customerStatus === 'PASSIVE' ? 'AKTİF DEĞİL' :
                                                                                (item.customerStatus === 'WAITING' ? 'BEKLEMEDE' : '')))}</td>
                                                                    <td>{item.sendCount}</td>
                                                                    <td>{item.limit}</td>
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
                                            <Paging setReset={reset => this.quotaReportPagingReset = reset} totalItemCount={this.props.app.xivodafone.reportQuotaCount} pageSize={this.state.pageSize} changePage={this.quotaReportChangePage}/>
                                        </div>
                                    </div>
                                </div>
                            }
                            {this.state.reportType == "Send" &&
                                <div className="tab-item active">
                                    <div className="table">
                                        <div className="top">
                                            <div className="title-default">
                                                Gönderim Raporu
                                            </div>
                                            <div className="actions"></div>
                                            <div className="filter">
                                                <Form model={this.state.sendReportFormModel} handleSubmit={this.handleSubmit} buttonExtraClass={"tertiary"} buttonText={"Filtrele"} buttonId={"xivodafone-report-quota-list-filter"} />
                                            </div>
                                        </div>
                                        <div className="bottom">
                                            <div className="table-container">
                                                <table className="sortable">
                                                    <thead>
                                                        <tr>
                                                            <th><span>Gönderim Adı</span></th>
                                                            <th><span>Müşteri adı</span></th>
                                                            <th><span>En Erken Gönderim Tarihi</span></th>
                                                            <th><span>En Geç Gönderim Tarihi</span></th>
                                                            <th><span>Gerçekleşen Gönderim Tarihi</span></th>
                                                            <th><span>Durum</span></th>
                                                            <th><span>Maximo Onay Kodu</span></th>
                                                            <th><span>Gönderici Adı</span></th>
                                                            <th><span>Mesaj Metni</span></th>
                                                            <th><span>Gönderilen</span></th>
                                                            <th><span>Başarılı</span></th>
                                                            <th><span></span></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.props.app.xivodafone.reportSend && this.props.app.xivodafone.reportSend.map((item, i) => 
                                                        {
                                                            return (            
                                                                <tr>
                                                                    <td>{item.campaignName}</td>
                                                                    <td>{item.companyName}</td>
                                                                    <td>{item.latestSendDate ? moment(item.earliestSendDate).format('DD.MM.YYYY hh:mm') : ''}</td>
                                                                    <td>{item.latestSendDate ? moment(item.latestSendDate).format('DD.MM.YYYY hh:mm') : ''}</td>
                                                                    <td>{item.sendDate ? moment(item.sendDate).format('DD.MM.YYYY hh:mm'): ''}</td>
                                                                    <td>
                                                                        {(item.sendStatus === 'DRAFT' ? 'ONAYDA' :
                                                                        (item.sendStatus === 'COMPLETED' ? 'BEKLEMEDE' :
                                                                        (item.sendStatus === 'CANCELLED' ? 'İPTAL EDİLDİ' : 
                                                                        (item.sendStatus === 'SEND' ? 'DEVAM EDİYOR' : 
                                                                        (item.sendStatus === 'REJECTED' ? 'DÜZENLENMELİ' : 
                                                                        (item.sendStatus === 'FINISHED' ? 'TAMAMLANDI' :
                                                                        (item.sendStatus === 'READYTOQUOTA' ? 'TAMAMLANDI' : ''
                                                                        )))))))}
                                                                    </td>
                                                                    <td>{item.id}</td>  
                                                                    <td>{item.originator}</td>
                                                                    <td>{item.broadcastMessage && item.broadcastMessage.length > 50 ? item.broadcastMessage.substring(0, 50) : item.broadcastMessage}</td>
                                                                    <td>{item.sendCount}</td>
                                                                    <td>{item.successCount}</td>
                                                                    <td>
                                                                        {(item.sendStatus == 'DRAFT' || item.sendStatus == 'COMPLETED' || item.sendStatus == 'REJECTED') &&
                                                                            <>
                                                                                <br />
                                                                                <a id={"cancel-send-" + item.id} className="btn primary" href="javascript:void(0)" title="İptal Et" onClick={() => this.cancelSend(item.id)}>
                                                                                    <span>İptal Et</span>
                                                                                </a>
                                                                                <br />
                                                                            </>
                                                                        }
                                                                        {item.sendStatus == 'REJECTED' &&
                                                                            <>
                                                                                <br />
                                                                                <Link id={"edit-send-" + item.id} className="btn primary" to={"/xivodafone/query/send-edit/" + item.id}>
                                                                                    <span>Düzenle</span>
                                                                                </Link>
                                                                                <br />
                                                                            </>
                                                                        }
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
                                            <Paging setReset={reset => this.sendReportPagingReset = reset} totalItemCount={this.props.app.xivodafone.reportSendCount} pageSize={this.state.pageSize} />
                                        </div>
                                        {this.props.app.xivodafone.reportSend && this.props.app.xivodafone.reportSend.length > 0 &&
                                            <a id="report-send-download" className="btn tertiary" href="javascript:void(0)" title="Raporu İndir" onClick={() => this.downloadSendReport()}>
                                                <span>Raporu İndir</span>
                                            </a>
                                        }
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

export default connect(mapStateToProps)(Report)