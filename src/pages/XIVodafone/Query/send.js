import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Link,
  withRouter
} from "react-router-dom";
import Form from '../../../components/form/form';
import { maximumSmsLength, calculateSmsLength } from '../../../actions/utils';
import Message from '../../../components/message/index';
import { query, findTargetQuery, client, sendQuery, testSmsQuery, sendInfo, sendFileInfo, sendEdit, dispatchItem } from '../../../actions/actions';

class QuerySend extends React.Component {
    constructor(props)
    {
        super(props)

        const queryId = this.props.match.params.id;
        const companyId = this.props.match.params.companyId;
        const sendId = this.props.match.params.sendId;

        this.state = {
            fileErrorListPopupContent: '',
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
                uniqueCodeFile: {
                    value: '',
                    valuePlaceholder: '',
                    name: 'uniqueCodeFile',
                    type: 'file',
                    label: 'Unique Kod Dosyası Yükle (Lütfen sadece .csv veya .xlsx uzantılı dosya yükleyiniz)',
                    placeholder: 'Bilgisayarınızdan seçim yapmak için tıklayın',
                    error: 'Lütfen bir dosya seçin.',
                    valid: false,
                    touched: false,
                    validationRules: {
                    }
                },
                uniqueCodeLength: {
                    value: '',
                    name: 'uniqueCodeLength',
                    type: 'text',
                    label: 'Unique Kod Uzunluğu',
                    placeholder: 'Unique Kod Uzunluğu',
                    error: 'Lütfen unique kod uzunluğu girin.',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isNumber: true
                    }
                },
                sendCount: {
                    value: '',
                    name: 'sendCount',
                    type: 'text',
                    label: 'Gönderim Adedi',
                    placeholder: 'Gönderim Adedi',
                    error: 'Lütfen gönderim adedi girin.',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true,
                        isNumber: true
                    }
                },
                broadcastMessage: {
                    value: '',
                    name: 'broadcastMessage',
                    maxLength: 400,
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
                sendDate: {
                    value: '',
                    name: 'sendDate',
                    type: 'textdate',
                    label: 'En Erken Gönderim Tarihi',
                    error: 'Lütfen tarih seçin',
                    valid: false,
                    touched: false,
                    isHalf: true,
                    validationRules: {
                        isDate: true
                    }
                },
                sendTime: {
                    value: '',
                    name: 'sendTime',
                    type: 'timepicker',
                    label: 'Saat',
                    error: 'Lütfen zaman seçin.',
                    valid: false,
                    touched: false,
                    isHalf: true,
                    validationRules: {
                        isTime: true
                    }
                },
                latestSendDate : {
                    value: '',
                    name: 'latestSendDate',
                    type: 'textdate',
                    label: 'En Geç Gönderim Tarihi',
                    error: 'Lütfen tarih seçin',
                    valid: false,
                    touched: false,
                    isHalf: true,
                    isHalfStart: true,
                    validationRules: {
                        isDate: true
                    }
                },
                latestSendTime: {
                    value: '',
                    name: 'latestSendTime',
                    type: 'timepicker',
                    label: 'Saat',
                    error: 'Lütfen zaman seçin.',
                    valid: false,
                    touched: false,
                    isHalf: true,
                    validationRules: {
                        isTime: true
                    }
                },
                testSmsNumber: {
                    value: '',
                    name: 'testSmsNumber',
                    type: 'text',
                    label: 'Test Numarası',
                    placeholder: 'Lütfen en az 1 en fazla 3 numarayı aralarında vilgül olacak sekilde girin.',
                    error: 'Lütfen en az 1 en fazla 3 numarayı aralarında vilgül olacak sekilde girin.',
                    valid: false,
                    touched: false,
                    validationRules: {
                    }
                },
            },
            companyId: companyId,
            queryId: queryId,
            sendId: sendId,
            queryName: "",
            companyName: "",
            personCount: 0,
            originator: "",
            limit: 0,
            currentSmsCount: 1
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    componentDidMount() {
        //Edit
        if(this.state.sendId) {
            this.props.dispatch(sendInfo(this.state.sendId, (data) => {
                this.setState({
                    formModel: {
                        ...this.state.formModel,
                        campaignName: {
                            ...this.state.formModel.campaignName,
                            value: data.campaignName,
                            disabled: true
                        },
                        uniqueCodeLength: {
                            ...this.state.formModel.uniqueCodeLength,
                            value: data.uniqueCodeLength
                        },
                        sendCount: {
                            ...this.state.formModel.sendCount,
                            value: data.sendCount
                        },
                        broadcastMessage: {
                            ...this.state.formModel.broadcastMessage,
                            value: data.broadcastMessage
                        },
                    },
                    companyId: data.xCustomerId,
                    queryId: data.queryId
                });

                if(data.sendDate && data.sendDate.length > 0) {
                    var sendDate = data.sendDate.split(' ')[0];
                    var sendTime = data.sendDate.split(' ')[1];
                    this.setState({
                        formModel: {
                            ...this.state.formModel,
                            sendDate: {
                                ...this.state.formModel.sendDate,
                                value: sendDate.substring(0, 2) + "." + sendDate.substring(2, 4) + "." + sendDate.substring(4, 8)
                            },
                            sendTime: {
                                ...this.state.formModel.sendTime,
                                value: sendTime
                            }
                        }
                    });
                }
                
                if(data.latestSendDate && data.latestSendDate.length > 0) {
                    var latestSendDate = data.latestSendDate.split(' ')[0];
                    var latestSendTime = data.latestSendDate.split(' ')[1];
                    this.setState({
                        formModel: {
                            ...this.state.formModel,
                            latestSendDate : {
                                ...this.state.formModel.latestSendDate,
                                value: latestSendDate.substring(0, 2) + "." + latestSendDate.substring(2, 4) + "." + latestSendDate.substring(4, 8)
                            },
                            latestSendTime: {
                                ...this.state.formModel.latestSendTime,
                                value: latestSendTime
                            }
                        }
                    });
                }

                var broadcastMessage = data.broadcastMessage;
                var currentSmsCount = calculateSmsLength(broadcastMessage, true);
                this.setState({
                    currentSmsCount: currentSmsCount
                });

                //Get UniqueCode File
                if(data.uniqueCodeLength && data.uniqueCodeLength > 0) {
                    this.props.dispatch(sendFileInfo(this.state.sendId, (blob, filename) => {
                        var file = new File([blob], filename)
                        this.setState({
                            formModel: {
                                ...this.state.formModel,
                                uniqueCodeFile : {
                                    ...this.state.formModel.uniqueCodeFile,
                                    value: file,
                                    valuePlaceholder: filename
                                }
                            }
                        });
                    }, () => {
                        this.props.dispatch(dispatchItem("NOTIFICATION", { message: 'Unicode dosyası bulunamadı!', isError: true }));
                        this.props.history.push('/xivodafone/report');
                    }));
                }

                //Get Query Info
                var serviceDataForQuery = {
                    queryId: data.queryId
                }
                this.props.dispatch(query(serviceDataForQuery, (data) => {
                    this.setState({
                        queryName: data.queryName
                    });
                    
                    var serviceDataForTarget = {};
                    serviceDataForTarget["params"] = data.queryParam;
                    this.props.dispatch(findTargetQuery(serviceDataForTarget, (data) => {
                        this.setState({
                            personCount: data.count
                        });
                    }, () => {
                    }));
                }, () => {
                    this.props.dispatch(dispatchItem("NOTIFICATION", { message: 'Sorgu bulunamadı!', isError: true }));
                    this.props.history.push('/xivodafone/report');
                }));

                //Get Customer Info
                var serviceDataForCompany = {
                    xCustomerId: data.xCustomerId
                }
                this.props.dispatch(client(serviceDataForCompany, (data) => {
                    this.setState({
                        companyName: data.companyName,
                        originator: data.originator,
                        limit: data.limit
                    });
                }, () => {
                    this.props.dispatch(dispatchItem("NOTIFICATION", { message: 'Müşeri bulunamadı!', isError: true }));
                    this.props.history.push('/xivodafone/report');
                }));

            }, () => {
                this.props.dispatch(dispatchItem("NOTIFICATION", { message: 'Bir hata oluştu!', isError: true }));
                this.props.history.push('/xivodafone/report');
            }));
        }
        else {
            //Get Query Info
            var serviceDataForQuery = {
                queryId: this.state.queryId
            }
            this.props.dispatch(query(serviceDataForQuery, (data) => {
                this.setState({
                    queryName: data.queryName
                });
                
                var serviceDataForTarget = {};
                serviceDataForTarget["params"] = data.queryParam;
                this.props.dispatch(findTargetQuery(serviceDataForTarget, (data) => {
                    this.setState({
                        personCount: data.count
                    });
                }, () => {
                }));
            }, () => {
                this.props.dispatch(dispatchItem("NOTIFICATION", { message: 'Sorgu bulunamadı!', isError: true }));
                this.props.history.push('/xivodafone/query/list');
            }));
            
            //Get Customer Info
            var serviceDataForCompany = {
                xCustomerId: this.state.companyId
            }
            this.props.dispatch(client(serviceDataForCompany, (data) => {
                this.setState({
                    companyName: data.companyName,
                    originator: data.originator,
                    limit: data.limit
                });
            }, () => {
                this.props.dispatch(dispatchItem("NOTIFICATION", { message: 'Müşeri bulunamadı!', isError: true }));
                this.props.history.push('/xivodafone/query/list');
            }));
        }
    }

    onInputChange(model, name) {
        if(name == 'broadcastMessage') {
            var broadcastMessage = model["broadcastMessage"].value;
            var currentSmsCount = calculateSmsLength(broadcastMessage, true);
            this.setState({
                currentSmsCount: currentSmsCount
            });
        }
    }

    handleSubmit(data, isSecondButton)
    {
        var smsLength = maximumSmsLength(data.broadcastMessage, true);
        if(data.broadcastMessage.length > smsLength)
        {
            var notification = {
                isError: true,
                message: 'Göndereceğiniz SMS maksimum ' + smsLength + ' uzunluğunda olabilir, şuanda ' + data.broadcastMessage.length + 'uzulunğunda.'
            }
            this.props.dispatch(dispatchItem("NOTIFICATION", notification));
        }
        else if(data.sendCount > Math.floor(this.state.limit / this.state.currentSmsCount))
        {
            var notification = {
                isError: true,
                message: Math.floor(this.state.limit / this.state.currentSmsCount) + ' SMS boyutunda bir metin girildiği için en fazla ' + Math.floor(this.state.limit / this.state.currentSmsCount) + ' adedinde kişiye gönderim yapılabilir.'
            }
            this.props.dispatch(dispatchItem("NOTIFICATION", notification));
        }
        else {

            var sendTimeHour = data.sendTime.split(':')[0];
            var sendTimeMinute = data.sendTime.split(':')[1];
            var latestSendTimeHour = data.latestSendTime.split(':')[0];
            var latestSendTimeMinute = data.latestSendTime.split(':')[1];

            if((isSecondButton=false) && (sendTimeHour < 9 || (sendTimeHour > 20 && sendTimeMinute > 0) || latestSendTimeHour < 9 || (latestSendTimeHour > 20 && latestSendTimeMinute > 0)))
            {
                var notification = {
                    isError: true,
                    message: 'En erken ve en geç gönderim zamanları için lütfen 09:00 ile 20:00 arasında bir zaman seçiniz.'
                }
                this.props.dispatch(dispatchItem("NOTIFICATION", notification));
            }
            else {

                if(isSecondButton=true){

                    var today = new Date();

                    var month = ("0" + (today.getMonth() + 1)).slice(-2)
                    var date = ("0" + today.getDate()).slice(-2);
                    var hour = ("0" + today.getHours).slice(-2);
                    var minutes = ("0" + today.getMinutes).slice(-2);
            
                    var serviceData = {
                        broadcastMessage: data.broadcastMessage,
                        campaignName: data.campaignName,
                        sendCount: data.sendCount,
                        sendDate: date + "" + month + "" + today.getFullYear() + " " + hour + ':' + minutes,
                        xCustomerId: this.state.companyId,
                        queryId: this.state.queryId,
                        receiver: data.testSmsNumber
                    };
                }
                else{

                var serviceData = {
                    broadcastMessage: data.broadcastMessage,
                    campaignName: data.campaignName,
                    sendCount: data.sendCount,
                    sendDate: data.sendDate + " " + data.sendTime,
                    latestSendDate: data.latestSendDate + " " + data.latestSendTime,
                    xCustomerId: this.state.companyId,
                    queryId: this.state.queryId
                    };
                }
                if(data.uniqueCodeFile)
                {
                    serviceData["uniqueCodeFile"] = data.uniqueCodeFile;
                    serviceData["uniqueCodeLength"] = data.uniqueCodeLength;
                }

                if(this.state.sendId) {
                    serviceData["requestId"] = this.state.sendId;
                }
        
                var serviceDataForm = new FormData();
                for (var key in serviceData) {
                    serviceDataForm.append(key, serviceData[key]);
                }
                
                    if(isSecondButton)
                    {
                    this.props.dispatch(testSmsQuery(serviceDataForm, (data) => {
                        this.props.dispatch(dispatchItem("NOTIFICATION", { message: 'Test SMS\'i gönderildi.', isError: false }));
                    }, () => {
        
                    }));
                    }
                    else {
                        if(this.state.sendId) {
                        this.props.dispatch(sendEdit(serviceDataForm, (data) => {
                            this.props.history.push('/xivodafone/query/send/success');
                        }, () => {
            
                        }));

                        }
                        else {
                        this.props.dispatch(sendQuery(serviceDataForm, (data) => {
                            this.props.history.push('/xivodafone/query/send/success');
                        }, () => {
            
                        }));
                        }
                    }
            
            }
        }
    }
    
    render() {
        return (
            <section className="panel">
                <Message />
                <div className="container">
                    <div className="left only-desktop">
                        <div className="header">
                            <div className="title">
                                Sorgu Detayları
                            </div>
                            {!this.state.sendId &&
                                <Link id="setup-edit" className="link" to={"/xivodafone/query/edit/" + this.state.queryId + "/" + this.state.companyId}>
                                    <img src={require("../../../assets/icons/icon-edit.svg")} aria-hidden="true" />
                                    <span>Düzenle</span>
                                </Link>
                            }
                        </div>
                        <div className="user-sms-choosen">
                            <div className="text">
                                Aşağıdaki sorgu sonuçlarından oluşan gruba yazdığınız mesaj gönderilecek.
                            </div>
                        </div>
                        <div className="items">
                            <div className="item-container">
                                <div className="item">
                                    <div>Sorgu İsmi</div>
                                    <div>{this.state.queryName}</div>
                                </div>
                                <div className="item">
                                    <div>Müşteri</div>
                                    <div>{this.state.companyName}</div>
                                </div>
                                <div className="item">
                                    <div>Kişi Sayısı</div>
                                    <div>{this.state.personCount}</div>
                                </div>
                                <div className="item">
                                    <div>Originator</div>
                                    <div>{this.state.originator}</div>
                                </div>
                                <div className="item">
                                    <div>SMS Hakkı</div>
                                    <div>{Math.floor(this.state.limit / this.state.currentSmsCount)}</div>
                                </div>
                            </div>
                            <div className="description">
                                <div className="title-default">
                                    Dikkat Edilmesi Gereken Noktalar:
                                </div>
                                <div className="text-default font">
                                    <ul>
                                        <li>
                                            Çıkış metni otomatik eklenecektir. Eklemenize gerek yoktur.
                                        </li>
                                        <li>
                                            Unique kod varsa &#123;&#35;&#125; olarak metinde belirtilmelidir.
                                        </li>
                                        <li>
                                            Sadece Vodafonelulara özel verilecek bir fayda olmalıdır.
                                        </li>
                                        <li>
                                            Unique kod karakter sayısına dahildir.
                                        </li>
                                        <li>
                                            1 SMS 160 karakterdir, karakter sayısı arttıkça bakiyeden SMS eşdeğeri kadar düşer. 
                                        </li>
                                        <li>
                                            Bir link veriliyorsa, linkin gittiği websitesinde de Vodafonelulara özel fayda vurgulanmalıdır.
                                        </li>
                                        <li>
                                            Unique kod varsa &#123;&#35;&#125; olarak metinde belirtilmelidir.
                                        </li>
                                        <li>
                                            Test numarası girilirken numara formatı: 905XXXXXXXXX
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <div className="header">
                            <div className="title-default">
                                <span>Gönderim Detayları</span>
                            </div>
                        </div>
                        <div className="user-sms-details">
                            <div className="form-container">
                                <Form model={this.state.formModel} formId={"query-send-form"} onInputChange={this.onInputChange} handleSubmit={this.handleSubmit} buttonText={"Onaya Gönder"} buttonId={"query-sms-send"} secondButtonText={"Test SMS'i Gönder"} secondButtonId={"query-sms-test"} secondButtonExtraClass={"link"} />
                            </div>
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

export default withRouter(connect(mapStateToProps)(QuerySend))