import React from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import Breadcrumb from '../../../components/breadcrumb/index';
import Message from '../../../components/message/index';
import Form from '../../../components/form/form';
import Button from '../../../components/form/button';
import LeftDetail from '../Group/_leftDetail';
import { groups, receivers, uploadReceiver, dispatchItem } from '../../../actions/actions';

class ReceiverUpload extends React.Component {
    constructor(props)
    {
        super(props);

        this.state = {
            receiverPageSize: 50,
            formModel: {
                reapFileData: {
                    value: '',
                    valuePlaceholder: '',
                    name: 'reapFileData',
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
            }
        };

        this.getGroupList = this.getGroupList.bind(this);
        this.getReceiverList = this.getReceiverList.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // if (this.props.app.user.groups.length < 1) {
        //     this.getGroupList();
        // }
    }

    handleSubmit(data)
    {
        const groupId = this.props.match.params.id;
        
        data["groupIds"] = [groupId];

        var serviceData = new FormData();
        for (var key in data) {
            serviceData.append(key, data[key]);
        }

        this.props.dispatch(uploadReceiver(serviceData, (data) => {
            this.getGroupList(() => { 
                this.getReceiverList(groupId, () => { this.props.history.push('/user/group/detail/' + groupId) });
            });
        }, (data) => {
        }));
    }

    getGroupList(successFunc)
    {
        this.props.dispatch(groups({}, (data) => {
            this.props.dispatch(dispatchItem("GROUP_LIST", data.listGroup));
            if(successFunc)
            {
                successFunc();
            }
        }, () => {

        }));
    }
    
    getReceiverList(groupId, successFunc)
    {
        var model = {
            page: 0,
            size: this.state.receiverPageSize,
            groupId: groupId
        };

        this.props.dispatch(receivers(model, (data) => {
            this.props.dispatch(dispatchItem("RECEIVER_LIST", data.receiverInfo));
            this.props.dispatch(dispatchItem("RECEIVER_COUNT", data.totalSize));
            if(successFunc)
            {
                successFunc();
            }
        }, () => {

        }));
    }

    render() {
        var groupId = this.props.match.params.id;
        
        var filterGroup = this.props.app.user.groups.filter(function (item) {
            return item.groupId === groupId;
        });
        
        var group = filterGroup.length > 0 ? filterGroup[0] : null;
        
        const breadcrumbItems = [{
            name: "Ana Sayfa",
            link: "/"
        },{
            name: 'Gruplar',
            link : '/user/group/list'
        },{
            name: (group ? group.groupName : ""),
            link : '/user/group/detail/' + (group ? group.groupId : "")
        },{
            name: "Numaralar",
            link : '/user/group/detail/' + (group ? group.groupId : "") + '/receivers'
        },{
            name: 'Toplu Numara Ekleme'
        }];

        return (
            [
                <Breadcrumb items={breadcrumbItems} />,
                <section className="panel">
                    <Message />
                    <div className="container">
                        <LeftDetail item={group} />
                        <div className="right">
                            <div className="header">
                                <div className="title-default">
                                    <span>Yeni Numara Ekle</span>
                                </div>
                            </div>
                            <div className="upload-file">
                                <div className="file-example">
                                    <img src={require('../../../assets/icons/icon-excel.svg')} aria-hidden="true" />
                                    <a href="/example.xlsx" target="_blank">
                                        Örnek Excel dökümanını indir
                                    </a>
                                </div>
                                <div className="form-container">
                                    <Form model={this.state.formModel} handleSubmit={this.handleSubmit} smallTitle={""} buttonText={"Dosya Yükle"} buttonId={"receiver-upload-save"} />
                                    <Button disabled={false} extraClass={""} onClick={() => { this.props.history.push('/user/group/detail/' + group.groupId) }} text={"İşlemi iptal et"} id={"receiver-upload-cancel"} />
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

export default withRouter(connect(mapStateToProps)(ReceiverUpload))