import React from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import Breadcrumb from '../../../components/breadcrumb/index';
import Message from '../../../components/message/index';
import Form from '../../../components/form/form';
import Button from '../../../components/form/button';
import { groups, receivers, createReceiver, dispatchItem } from '../../../actions/actions';
import { scrollToTop } from '../../../actions/utils';

class ReceiverCreate extends React.Component {
    constructor(props)
    {
        super(props);

        this.state = {
            formModel: {
                msisdn: {
                    value: '',
                    name: 'msisdn',
                    type: 'globalphone',
                    label: 'Telefon Numarası',
                    placeholder: 'Telefon numarası',
                    error: 'Lütfen telefon numarası girin.',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true,
                        isPhone: true
                    }
                },
                name: {
                    value: '',
                    name: 'name',
                    type: 'text',
                    label: 'İsim',
                    placeholder: 'İsim',
                    error: 'Lütfen isim girin.',
                    valid: false,
                    touched: false,
                    validationRules: {
                    }
                },
                surName: {
                    value: '',
                    name: 'surName',
                    type: 'text',
                    label: 'Soyisim',
                    placeholder: 'Soyisim',
                    error: 'Lütfen soyisim girin.',
                    valid: false,
                    touched: false,
                    validationRules: {
                    }
                }
            }
        };

        this.getGroupList = this.getGroupList.bind(this);
        this.getReceiverList = this.getReceiverList.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.app.user.groups.length < 1) {
            this.getGroupList();
        }
    }

    handleSubmit(data)
    {
        const groupId = this.props.match.params.id;
        
        data["index"] = 0;

        var formPostModel = {
            groupId: groupId,
            receiverList: [
                data
            ]
        }

        this.props.dispatch(createReceiver(formPostModel, (data) => {
            this.getGroupList(() => { 
                this.getReceiverList(() => { this.props.history.push('/user/group/detail/' + groupId + '/receivers') });
            });
        }, (data) => {
            scrollToTop();
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
    
    getReceiverList(successFunc)
    {
        var groupId = this.props.match.params.id;

        var model = {
            page: 0,
            size: this.state.pageSize,
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
            name: 'Yeni Numara Ekleme'
        }];

        return (
            [
            <Breadcrumb items={breadcrumbItems} />,
            <section className="panel small">
                <Message />
                {group && 
                    <div className="container">
                        <div className="title-default">
                            <span>Yeni Numara Ekleme</span>
                        </div>
                        <div className="form-container">
                            <Form model={this.state.formModel} handleSubmit={this.handleSubmit} smallTitle={"Alıcı Bilgileri"} buttonText={"Numara Oluştur"} buttonId={"receiver-create-save"} />
                            <Button disabled={false} extraClass={""} onClick={() => { this.props.history.push('/user/group/detail/' + group.groupId) }} text={"İşlemi iptal et"} id={"receiver-create-cancel"} />
                        </div>
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

  export default withRouter(connect(mapStateToProps)(ReceiverCreate))