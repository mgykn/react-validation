import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import moment from 'moment';
import Form from '../../../components/form/form';
import ReportDetail from './detail';
import Message from '../../../components/message/index';
import Breadcrumb from '../../../components/breadcrumb/index';
import { userReport, userLastReport, groups, originators, dispatchItem } from '../../../actions/actions';
import { scrollToTop } from '../../../actions/utils';

class Report extends React.Component {
    constructor(props)
    {
        super(props)

        var originatorOptions = [];
        
        for(var i = 0; i < this.props.app.originators.length; i++){
            originatorOptions.push({
                name: this.props.app.originators[i],
                value: this.props.app.originators[i]
            });
        }
        
        var groupOptions = [];
        
        for(var i = 0; i < this.props.app.user.groups.length; i++){
            groupOptions.push({
                name: this.props.app.user.groups[i].groupName,
                value: this.props.app.user.groups[i].groupId
            });
        }
        
        this.state = {
            itemDetailsToShow: [],
            formModel: {
                alfanumeric: {
                    value: '',
                    name: 'Gönderici Adı',
                    type: 'select',
                    label: 'Gönderici Adı',
                    placeholder: 'Gönderici Adı',
                    options: originatorOptions,
                    error: 'Lütfen Gönderici Adı seçin.',
                    valid: false,
                    touched: false,
                    validationRules: {
                    }
                },
                startDate: {
                    value: '',
                    name: 'startDate',
                    type: 'textdate',
                    label: 'Başlangıç Tarihi',
                    placeholder: 'Başlangıç Tarihi',
                    error: 'Lütfen başlangıç tarihi girin.',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isDate: true
                    }
                },
                phoneDirectoryGroupName: {
                    value: '',
                    name: 'phoneDirectoryGroupName',
                    type: 'select',
                    label: 'Grup İsmi',
                    placeholder: 'Grup İsmi',
                    options: groupOptions,
                    error: 'Lütfen grup ismi girin.',
                    valid: false,
                    touched: false,
                    validationRules: {
                    }
                },
                endDate: {
                    value: '',
                    name: 'endDate',
                    type: 'textdate',
                    label: 'Bitiş Tarihi',
                    placeholder: 'Bitiş Tarihi',
                    error: 'Lütfen bitiş tarihi girin.',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isDate: true
                    }
                },
                requestName: {
                    value: '',
                    name: 'requestName',
                    type: 'text',
                    label: 'İsim',
                    placeholder: 'İsim',
                    error: 'Lütfen isim girin.',
                    valid: false,
                    touched: false,
                    validationRules: {
                    }
                },
                status: {
                    value: '',
                    name: 'status',
                    type: 'text',
                    label: 'Statü',
                    placeholder: 'Statü',
                    error: 'Lütfen statü girin.',
                    valid: false,
                    touched: false,
                    validationRules: {
                    }
                },
                user: {
                    value: '',
                    name: 'user',
                    type: 'text',
                    label: 'Kullanıcı',
                    placeholder: 'Kullanıcı',
                    error: 'Lütfen kullanıcı girin.',
                    valid: false,
                    touched: false,
                    validationRules: {
                    }
                }
            }
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleItemClick = this.handleItemClick.bind(this);
        this.getLastReport = this.getLastReport.bind(this);
    }

    componentDidMount() {
        if (this.props.app.user.groups.length < 1) {
            this.props.dispatch(groups({}, (data) => {
                this.props.dispatch(dispatchItem("GROUP_LIST", data.listGroup));
            }, () => {

            }));
        }
        
        if(this.props.app.originators.length < 1)
        {
            this.props.dispatch(originators({}, (data) => {
                var originators = data.originators;
                var originatorData = originators.map(function(item){
                    return item;
                });
                this.props.dispatch(dispatchItem("ORIGINATORS", originatorData));
            }, () => {

            }));
        }
    
        this.getLastReport();
    }

    componentWillReceiveProps(nextProps)
    {
        if(this.props.app.originators !== nextProps.app.originators) {
            var originatorOptions = [];
        
            for(var i = 0; i < nextProps.app.originators.length; i++){
                originatorOptions.push({
                    name: nextProps.app.originators[i],
                    value: nextProps.app.originators[i]
                });
            }

            this.setState({
                formModel: {
                    ...this.state.formModel,
                    alfanumeric: {
                        ...this.state.formModel.alfanumeric,
                        options: originatorOptions
                    }
                }
            });
        }
        
        if(this.props.app.user.groups !== nextProps.app.user.groups) {
            var groupOptions = [];
        
            for(var i = 0; i < nextProps.app.user.groups.length; i++){
                groupOptions.push({
                    name: nextProps.app.user.groups[i].groupName,
                    value: nextProps.app.user.groups[i].groupId
                });
            }

            this.setState({
                formModel: {
                    ...this.state.formModel,
                    phoneDirectoryGroupName: {
                        ...this.state.formModel.phoneDirectoryGroupName,
                        options: groupOptions
                    }
                }
            });
        }
    }

    handleSubmit(data)
    {
        this.props.dispatch(userReport(data, (data) => {
            this.props.dispatch(dispatchItem("USER_REPORT", data.SmsInfoParams));
            this.setState({
                itemDetailsToShow: []
            });
        }, (data) => {
            scrollToTop();
        }));
    }

    handleItemClick(item)
    {
        var itemDetailsToShow = this.state.itemDetailsToShow;

        var indexOfItem = itemDetailsToShow.indexOf(item); 
        
        if(indexOfItem < 0)
        {
            itemDetailsToShow.push(item);
            this.setState({
                itemDetailsToShow: itemDetailsToShow
            }, () => {
            });
        }
        else {
            itemDetailsToShow.splice(indexOfItem, 1);
            this.setState({
                itemDetailsToShow: itemDetailsToShow
            }, () => {
            });
        }
    }
    
    getLastReport()
    {
        this.props.dispatch(userLastReport({}, (data) => {
            this.props.dispatch(dispatchItem("USER_REPORT", data.SmsInfoParams));
        }, () => {

        }));
    }
    
    render() {
        const breadcrumbItems = [{
            name: "Ana Sayfa",
            link: "/"
        },{
            name: "Raporlar"
        }];

        return (
        [
            <Breadcrumb items={breadcrumbItems} />,
            <section className="panel">
                <Message />
                <div className="container">
                    <div className="reports">
                        <div className="title-default">
                            <span>Raporlar</span>
                        </div>
                        <div className="report-form">
                            <Form model={this.state.formModel} handleSubmit={this.handleSubmit} smallTitle={""} buttonText={"Rapor Oluştur"} multipleColumn={true} buttonId={"report-list-filter"} />
                        </div>
                        <div className="report-items">
                            <div className="head">
                                <div className="item">
                                    <div>Gönderim Adı</div>
                                    <div>Başlangıç Tarihi - Bitiş Tarihi</div>
                                    <div>Alfanumerik</div>
                                    <div>Adres Defteri Grup</div>
                                    <div>Kullanıcı</div>
                                    <div>Durum</div>
                                </div>
                            </div>
                            <div className="body">
                                {this.props.app.user.report.map((item, i) =>
                                    <div className="item">
                                        <div onClick={() => this.handleItemClick(i)}>
                                            <span className="label">Gönderim Adı</span>
                                            <span>{item.requestName}</span>
                                        </div>
                                        <div onClick={() => this.handleItemClick(i)}>
                                            <span className="label">Başlangıç Tarihi - Bitiş Tarihi</span>
                                            <span>{moment(item.startDate).format('DD.MM.YYYY')} - {moment(item.endDate).format('DD.MM.YYYY')}</span>
                                        </div>
                                        <div onClick={() => this.handleItemClick(i)}>
                                            <span className="label">Alfanumerik</span>
                                            <span>{item.alfanumeric}</span>
                                        </div>
                                        <div onClick={() => this.handleItemClick(i)}>
                                            <span className="label">Adres Defteri Grup</span>
                                            <span>{item.groupName != null ? item.groupName.join(", ") : ""}</span>
                                        </div>
                                        <div onClick={() => this.handleItemClick(i)}>
                                            <span className="label">Kullanıcı</span>
                                            <span>{item.user}</span>
                                        </div>
                                        <div onClick={() => this.handleItemClick(i)}>
                                            <span className="label">Durum</span>
                                            <span className={item.waitingCount > 0 ? "waiting" : ""}>{item.waitingCount > 0 ? "BEKLENİYOR" : "TAMAMLANDI"}</span>
                                        </div>
                                        {this.state.itemDetailsToShow.indexOf(i) >= 0 &&
                                            <ReportDetail item={item} />
                                        }
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        ]
      );
    }
}

function mapStateToProps(state) {
    return {
        app: state.app 
    }
}

export default connect(mapStateToProps)(Report)