import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Link,
  withRouter
} from "react-router-dom";
import Button from '../../../components/form/button';
import Form from '../../../components/form/form';
import Message from '../../../components/message/index';
import Breadcrumb from '../../../components/breadcrumb/index';
import { scrollToTop, calculateSmsLength, maximumSmsLength } from '../../../actions/utils';
import { groups, dispatchItem, sendSmsByFile, sendSmsBySingle, sendSmsByGroupId, originators, validateFile } from '../../../actions/actions';
import LeftList from './_leftList';

class SendSms extends React.Component {
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

        this.state = {
            fileErrorListPopupContent: '',
            step: 1,
            searchText: '',
            sendBy: 0,
            selectedGroupIds: [],
            excelFile: null,
            detailData: {},
            groupFormModel: {
                file: {
                    value: '',
                    valuePlaceholder: '',
                    name: 'file',
                    type: 'file',
                    label: 'Dosya Seç',
                    placeholder: 'Bilgisayarınızdan seçim yapmak için tıklayın',
                    error: 'Lütfen bir dosya seçin.',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true
                    }
                }
            },
            formModel: {
                campaignName: {
                    value: '',
                    name: 'campaignName',
                    type: 'text',
                    label: 'Gönderim Adı',
                    placeholder: 'Gönderim adı',
                    error: 'Lütfen gönderim adı girin.',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true
                    }
                },
                broadcastMessage: {
                    value: '',
                    name: 'broadcastMessage',
                    type: 'textarea',
                    label: 'Gönderim Metni',
                    placeholder: 'Gönderim metni',
                    error: 'Lütfen gönderim metni girin.',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true
                    }
                },
                iysControlRequired: {
                    value: "true",
                    name: 'iysControlRequired',
                    type: 'radio',
                    label: 'İYS\'den sorgulanmalı mı? (Reklam mesajları için Evet seçilmelidir.)',
                    placeholder: '',
                    options: [
                        {
                            name: "Evet",
                            value: "true"
                        },
                        {
                            name: "Hayır",
                            value: "false"
                        }
                    ],
                    valid: false,
                    touched: false,
                    error: 'Lütfen seçim yapınız.',
                    validationRules: {
                    }
                },
                originator: {
                    value: '',
                    name: 'originator',
                    type: 'select',
                    label: 'Alfanumerik',
                    placeholder: 'Alfanumerik',
                    options: originatorOptions,
                    error: 'Lütfen alfanumerik seçin.',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true
                    }
                },
                testSms: {
                    value: '',
                    name: 'testSms',
                    type: 'phone',
                    label: 'Test Telefon Numarası',
                    placeholder: 'Test Telefon numarası',
                    error: 'Lütfen telefon numarası girin.',
                    valid: false,
                    touched: false,
                    validationRules: {
                    }
                },
                controlBlacklist: {
                    value: true,
                    name: 'controlBlacklist',
                    type: 'checkbox',
                    label: 'Karalisteye gönderim yapma',
                    valid: false,
                    touched: false,
                    validationRules: {
                    }
                },
                sendOnFuture: {
                    value: false,
                    name: 'sendOnFuture',
                    type: 'checkbox',
                    label: 'İleri tarihte gönder',
                    valid: false,
                    touched: false,
                    validationRules: {
                    }
                },
                startDate: {
                    hide: true,
                    value: '',
                    name: 'startDate',
                    type: 'textdate',
                    label: 'Tarih',
                    error: 'Lütfen tarih seçin',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true,
                        isDate: true
                    }
                },
                startTime: {
                    hide: true,
                    value: '',
                    name: 'startTime',
                    type: 'timepicker',
                    label: 'Zaman',
                    error: 'Lütfen zaman seçin.',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true,
                        isTime: true
                    }
                }
            }
        }

        this.handleGroupInputChange = this.handleGroupInputChange.bind(this);
        this.goToState = this.goToState.bind(this);
        this.updateSendBy = this.updateSendBy.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.fileErrorListPopup = this.fileErrorListPopup.bind(this);
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
                originator: {
                    ...this.state.formModel.originator,
                    options: originatorOptions
                }
            }
        })
      }
    }
    
    fileErrorListPopup(content){
        this.setState({
            fileErrorListPopupContent: content
        });
    }

    handleSearch(e) {
        this.setState({
            searchText: e.target.value 
        })
    }

    goToState(state)
    {
        this.setState({
            step: state
        });
        scrollToTop();
    }

    updateSendBy(sendBy)
    {
        this.setState({
            sendBy: sendBy
        })
    }

    handleGroupInputChange(e, groupId) {
        if(e.target.checked){
            var selectedGroupIds = this.state.selectedGroupIds;
            selectedGroupIds.push(groupId);
            this.setState({
                selectedGroupIds: selectedGroupIds
            });
        }
        else {
            var selectedGroupIds = this.state.selectedGroupIds;
            selectedGroupIds = selectedGroupIds.filter(function(item) {
                                  return item != groupId  
                                });
            this.setState({
                selectedGroupIds: selectedGroupIds
            });
        }
    }

    handleSubmit(data)
    {
        if(this.state.step == 1)
        {
            if(this.state.sendBy == 0)
            {
                if(this.state.selectedGroupIds.length > 0)
                {
                    this.goToState(2);
                }
                else {
                    this.props.dispatch(dispatchItem("NOTIFICATION", { message: 'En az bir grup seçmelisiniz.', isError: true }));
                }
            }
            else {
                if(data != null)
                {
                    var serviceData = new FormData();
                    for (var key in data) {
                        serviceData.append(key, data[key]);
                    }
                    this.props.dispatch(validateFile(serviceData, () => {
                        this.setState({
                            excelFile: data["file"]
                        }, () => {
                            this.goToState(2);
                        });
                    }, (data) => {
                        if(data && data.fileErrorList){    
                            var fileErrorMessage = "";
                            for(var i = 0; i < data.fileErrorList.length; i++)
                            {
                                var message = data.fileErrorList[i];
                                fileErrorMessage += message.description + "<br />Satır No: ";
                                for(var j = 0; j < message.details.length; j++)
                                {
                                    fileErrorMessage += message.details[j].index;
                                    if(j < message.details.length - 1)
                                    {
                                        fileErrorMessage += ", ";
                                    }
                                }

                                if(i < data.fileErrorList.length - 1)
                                {
                                    fileErrorMessage += "<br /><br />";
                                }
                            }

                            if(fileErrorMessage != '')
                            {
                                this.fileErrorListPopup(fileErrorMessage);
                            }
                        }
                    }));
                }
            }
        }
        else if(this.state.step == 2)
        {
            this.setState({
                detailData: data
            });

            var smsLength = maximumSmsLength(data.broadcastMessage);
            if(data.broadcastMessage.length > smsLength)
            {
                var notification = {
                    isError: true,
                    message: 'Göndereceğiniz SMS maksimum ' + smsLength + ' uzunluğunda olabilir, şuanda ' + data.broadcastMessage.length + 'uzulunğunda.'
                }

                this.props.dispatch(dispatchItem("NOTIFICATION", notification));
            }
            else {
                if(data.testSms != "")
                {
                    var singleSmsDataModel = {
                        broadcastMessage: data.broadcastMessage,
                        originator: data.originator,
                        iysControlRequired : false,
                        receiverList: [data.testSms]
                    };
        
                    this.props.dispatch(sendSmsBySingle(singleSmsDataModel, (data) => {
                        this.goToState(3);
                    }, () => {
        
                    }));
                }
                else {
                    this.goToState(3);
                }
            }
        }
        else {
            if(this.state.sendBy == 0)
            {
                var sendSmsByGroupServiceData = {
                    groupIdList: this.state.selectedGroupIds,
                    campaignName: this.state.detailData.campaignName,
                    broadcastMessage: this.state.detailData.broadcastMessage,
                    iysControlRequired : this.state.detailData.iysControlRequired,
                    controlBlacklist: this.state.detailData.controlBlacklist,
                    originator: this.state.detailData.originator
                };

                if(this.state.detailData.startDate)
                {
                    sendSmsByGroupServiceData["startDate"] = this.state.detailData.startDate + " " + this.state.detailData.startTime;
                }

                this.props.dispatch(sendSmsByGroupId(sendSmsByGroupServiceData, (data) => {
                    this.props.history.push('/user/sendsms/success');
                }, () => {
    
                }));
            }
            else {
                var sendSmsByFileServiceData = {
                    file: this.state.excelFile,
                    campaignName: this.state.detailData.campaignName,
                    broadcastMessage: this.state.detailData.broadcastMessage,
                    iysControlRequired : this.state.detailData.iysControlRequired,
                    controlBlacklist: this.state.detailData.controlBlacklist,
                    originator: this.state.detailData.originator
                };

                if(this.state.detailData.startDate)
                {
                    sendSmsByFileServiceData["startDate"] = this.state.detailData.startDate + " " + this.state.detailData.startTime;
                }

                var sendSmsByFileServiceDataForm = new FormData();
                for (var key in sendSmsByFileServiceData) {
                    sendSmsByFileServiceDataForm.append(key, sendSmsByFileServiceData[key]);
                }

                this.props.dispatch(sendSmsByFile(sendSmsByFileServiceDataForm, (data) => {
                    this.props.history.push('/user/sendsms/success');
                }, () => {
    
                }));
            }
        }
    }

    
    render() {
        const breadcrumbItems = [{
            name: "Ana Sayfa",
            link: "/"
        },{
            name: 'SMS Gönder'
        }];

        var selectedGroupIds = this.state.selectedGroupIds;
        var selectedGroups = this.props.app.user.groups.filter(function(item){
            return selectedGroupIds.indexOf(item.groupId) >= 0;
        });


        return (
        [
            <Breadcrumb items={breadcrumbItems} />,
            <section className={"panel" + (this.state.step == 1 ? " small" : "")}>
                <Message />
                {this.state.step == 1 && this.state.sendBy == 0 &&
                    <div className="container">
                        <div className="title-default choose">
                            <span>Grup seç</span>
                            <span className="middle">veya</span>
                            <a href="javascript:void(0)" onClick={() => this.updateSendBy(1)}>Excel yükle</a>
                        </div>
                        <div className="user-sms-selection">
                            <div className="text">
                                SMS göndermek için en az bir grup seçin.
                            </div>
                            <div className="search">
                                <div className="form-item">
                                    <input type="text" placeholder="Gruplar içinde arama yap" value={this.state.searchText} onChange={this.handleSearch} />
                                </div>
                            </div>
                            <div className="groups" id="sendsms-groups">
                                {this.props.app.user.groups.map((item, i) => {
                                    if(item.groupName.toLowerCase().indexOf(this.state.searchText.toLowerCase()) >= 0)
                                    {
                                        return (
                                            <div className="item" key={"sendsms-group-" + i}>
                                                <input id={"sendsms-group-" + i} type="checkbox" onChange={(e) => this.handleGroupInputChange(e, item.groupId)} checked={this.state.selectedGroupIds.indexOf(item.groupId) >= 0} />
                                                <label for={"sendsms-group-" + i}>
                                                    <span>{item.groupName}</span>
                                                </label>
                                            </div>
                                        )
                                    }
                                }
                                )}
                            </div>
                            <a className="btn primary" href="javascript:void(0)" onClick={this.handleSubmit} id={"sms-send-next"}>
                                <span>Sonraki Adım</span>
                            </a>
                        </div>
                    </div>
                }
                {this.state.step == 1 && this.state.sendBy == 1 &&
                    <div className="container">
                        <div className="title-default choose">
                            <a href="javascript:void(0)" onClick={() => this.updateSendBy(0)}>Grup seç</a>
                            <span className="middle">veya</span>
                            <span>Excel yükle</span>
                        </div>
                        <div className="user-sms-selection">
                            <div className="form-container">
                                <Form model={this.state.groupFormModel} handleSubmit={this.handleSubmit} smallTitle={""} buttonText={"Dosya Yükle"} buttonId={"sms-send-upload"} />
                            </div>
                        </div>
                    </div>
                }
                {this.props.app.originators.length > 0 && this.state.step == 2 &&
                    <div className="container">
                        <LeftList isExcel={this.state.sendBy != 0} items={selectedGroups} goToState={this.goToState} />
                        <div className="right">
                            <div className="header">
                                <div className="title-default">
                                    <span>Gönderim Detayları</span>
                                </div>
                            </div>
                            <div className="user-sms-details">
                                <div className="form-container">
                                    <Form model={this.state.formModel} handleSubmit={this.handleSubmit} smallTitle={""} buttonText={"Sonraki Adım"} buttonId={"sms-send-second-next"} />
                                    <Button disabled={false} extraClass={"secondary only-mobile"} onClick={() => { this.goToState(1) }} text={"Bilgileri Düzenle"} id={"sms-send-second-cancel"} />
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {this.state.step == 3 &&
                    <div className="container">
                        <LeftList items={selectedGroups} goToState={this.goToState} />
                        <div className="right">
                            <div className="header">
                                <div className="column">
                                    <div className="title-default">
                                        <span>Gönderim Detayları</span>
                                    </div>
                                </div>
                                <div className="column only-desktop">
                                    <a className="btn tertiary" href="javascript:void(0)" onClick={() => this.goToState(2)}>
                                        <span>Bilgileri Düzenle</span>
                                    </a>
                                </div>
                            </div>
                            <div className="user-sms-preview">
                                <div className="info">
                                    <div className="item">
                                        <div>Gönderim Adı</div>
                                        <div>{this.state.detailData.campaignName}</div>
                                    </div>
                                    <div className="item sms-text">
                                        <div>Gönderim Metni</div>
                                        <div>
                                            {this.state.detailData.broadcastMessage}
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div>İYS Kontrolü Gerekli Mi?</div>
                                        <div>
                                            {this.state.detailData.iysControlRequired ? 'Evet' : 'Hayır'}
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div>Karakter</div>
                                        <div>{this.state.detailData.broadcastMessage.length}</div>
                                    </div>
                                    <div className="item">
                                        <div>Uzunluk</div>
                                        <div>{calculateSmsLength(this.state.detailData.broadcastMessage)} SMS</div>
                                    </div>
                                </div>
                                {this.state.detailData.controlBlacklist &&
                                    <div className="info">
                                        <div className="info-text">
                                            Bu SMS karalistedeki numaralara <strong>gönderilmeyecektir.</strong>
                                        </div>
                                    </div>
                                }
                                {this.state.detailData.sendOnFuture &&
                                    <div className="info">
                                        <div className="item">
                                            <div>ileriki tarihte gönder</div>
                                            <div>{this.state.detailData.startDate}, {this.state.detailData.startTime}</div>
                                        </div>
                                    </div>
                                }
                                {/* <div className="info important">
                                    <img className="icon-info" src="Content/Icons/icon-info.svg" aria-hidden="true" />
                                    <span>11.00 - 14:00 arası blackhour olarak ayarlandı.</span>
                                </div> */}
                                <Button disabled={false} extraClass={"primary"} onClick={this.handleSubmit} text={"SMS Gönder"} buttonId={"sms-send-third-save"} />
                                <Button disabled={false} extraClass={"secondary only-mobile"} onClick={() => { this.goToState(2) }} text={"Bilgileri Düzenle"} id={"sms-send-third-cancel"} />
                            </div>
                        </div>
                    </div>
                }        
                {this.state.fileErrorListPopupContent != '' && 
                    <div className="popup-wrapper active">
                        <div className="popup-container">
                            <div className="popup-title small">
                                Dosyanızda hatalar mevcut
                            </div>
                            <div className="popup-text" dangerouslySetInnerHTML={{ __html: this.state.fileErrorListPopupContent }}>
                            </div>
                            <div className="form-container">
                                <a className="btn" href="javascript:void(0)" title="Tamam" onClick={() => this.fileErrorListPopup('')}>
                                    <span>Tamam</span>
                                </a>
                            </div>
                        </div>
                        <a className="popup-close" href="javascript:void(0)" title="Kapat" onClick={() => this.fileErrorListPopup('')}>
                            <img src={require('../../../assets/icons/icon-popup-close.svg')} alt="Kapat Ikonu" />
                        </a>
                    </div>
                }
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

export default withRouter(connect(mapStateToProps)(SendSms))