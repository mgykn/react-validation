import React from 'react';
import {connect} from 'react-redux';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import Breadcrumb from '../../../components/breadcrumb/index';
import Message from '../../../components/message/index';
import Form from '../../../components/form/form';
import Button from '../../../components/form/button';
import { scrollToTop } from '../../../actions/utils';
import { groups, updateGroup, deleteGroup, dispatchItem } from '../../../actions/actions';
import LeftList from './_leftList';

class GroupDetail extends React.Component {
    constructor(props)
    {
        super(props);

        const groupId = this.props.match.params.id;
        
        const filterGroup = this.props.app.user.groups.filter(function (item) {
            return item.groupId === groupId;
        });

        const group = filterGroup.length > 0 ? filterGroup[0] : null;

        this.state = {
            group: group,
            formModel: {
                groupName: {
                    value: (group !== null ? group.groupName : ""),
                    name: 'groupName',
                    type: 'text',
                    label: 'Grup İsmi',
                    placeholder: 'Grup İsmi',
                    error: 'Lütfen grup ismi girin.',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true
                    }
                },
                groupDesc: {
                    value: (group !== null ? group.groupDesc : ""),
                    name: 'groupDesc',
                    type: 'textarea',
                    label: 'Grup Açıklaması',
                    placeholder: 'Grup Açıklaması',
                    error: 'Lütfen grup açıklaması girin.',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true
                    }
                }
            }
        }
        
        this.activateEditState = this.activateEditState.bind(this);
        this.getGroupList = this.getGroupList.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.app.user.groups.length < 1) {
            this.getGroupList();
        }
    }

    componentWillReceiveProps(nextProps)
    {
        if(this.props.app.user.groups !== nextProps.app.user.groups || this.props.match.params.id != nextProps.match.params.id)
        {
            if(this.props.match.params.id != nextProps.match.params.id)
            {
                scrollToTop();
            }

            const groupId = nextProps.match.params.id;
            const filterGroup = nextProps.app.user.groups.filter(function (item) {
                return item.groupId === groupId;
            });

            const group = filterGroup.length > 0 ? filterGroup[0] : null;
            
            this.setState({
                group: group,
                formModel: {
                    ...this.state.formModel,
                    groupName: {
                        ...this.state.formModel.groupName,
                        value: (group !== null ? group.groupName : "")
                    },
                    groupDesc: {
                        ...this.state.formModel.groupDesc,
                        value: (group !== null ? group.groupDesc : "")
                    }
                }
            });
        }
    }

    handleSubmit(data)
    {
        data["groupId"] = this.props.match.params.id;
                
        this.props.dispatch(updateGroup(data, (data) => {
            this.getGroupList(() => {
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
    }

    deleteGroup(groupId) {
        this.props.dispatch(deleteGroup({ groupId: groupId }, (data) => {
            this.getGroupList(() => { this.props.history.push('/user/group/list') });
            scrollToTop();
        }, () => {

        }));
    }

    getGroupList(successFunc) {
        this.props.dispatch(groups({}, (data) => {
            this.props.dispatch(dispatchItem("GROUP_LIST", data.listGroup));
            if(successFunc)
            {
                successFunc();
            }
        }, () => {

        }));
    }

    render() {
        const group = this.state.group;

        const breadcrumbItems = [{
            name: 'Ana Sayfa',
            link: '/'
        },{
            name: 'Gruplar',
            link : '/user/group/list'
        },{
            name: (group ? group.groupName : "")
        }];

        return (
        [
          <Breadcrumb items={breadcrumbItems} />,
          <section className="panel">
            <Message />
            <div className="container">
                <LeftList items={this.props.app.user.groups} />
                {group &&
                    <div className="right">
                        <div className="header">
                            <div className="column">
                                <div className="title-default">
                                    <span>{group.groupName}</span>
                                </div>
                            </div>
                            {!this.state.isEdit &&
                                <div className="column only-desktop">
                                    <Button disabled={false} extraClass={"tertiary"} onClick={() => this.activateEditState(true)} text={"Bilgileri Düzenle"} id={"group-edit-edit"} />
                                </div>
                            }
                        </div>
                        {!this.state.isEdit && 
                            <div className="user-group-detail">
                                <div className="top">
                                    <div className="column">
                                        <div className="user-group-text">
                                            <div>Grup İsmi</div>
                                            <div>{group.groupName}</div>
                                        </div>
                                    </div>
                                    <div className="column">
                                        <div className="user-group-text">
                                            <div>Grup Açıklaması</div>
                                            <div>{group.groupDesc}</div>
                                        </div>
                                    </div>
                                    <div className="only-mobile">
                                        <Button disabled={false} extraClass={"tertiary"} onClick={() => this.activateEditState(true)} text={"Bilgileri Düzenle"} buttonId={"group-edit-edit-mobile"} />
                                        <a id={"group-edit-numbers-mobile"} className="see-all-numbers" href="#" title="Gruptaki Numaraları Gör">
                                            Gruptaki Numaraları Gör
                                        </a>
                                    </div>
                                </div>
                                <div className="buttons">
                                    <Button disabled={false} extraClass={"secondary"} onClick={() => { this.props.history.push('/user/group/detail/' + group.groupId + '/receivers/create') }} text={"+ Yeni Numara Ekle"} id={"group-edit-addreceiver"} />
                                    <Button disabled={false} extraClass={"tertiary"} image={ { className:'icon-upload', url:require('../../../assets/icons/icon-upload.svg') } }  onClick={() => { this.props.history.push('/user/group/detail/' + group.groupId + '/receivers/upload') }} text={"Excel Yükle"} id={"group-edit-uploadreceiver"} />
                                    {/* <a className="btn " href="javascript:void(0)" title="Excel Yükle">
                                        <img className="icon-upload" src={require()} aria-hidden="true" />
                                        <span>Excel Yükle</span>
                                    </a> */}
                                    <a id={"group-edit-delete"} className="btn" href="javascript:void(0)"  onClick={() => this.deleteGroup(group.groupId)}>
                                        <span>Grubu Sil</span>
                                    </a>
                                </div>
                                <div id={"group-edit-numbers"} className="bottom only-desktop">
                                    <Link to={"/user/group/detail/" + group.groupId + "/receivers" }>
                                        Gruptaki Numaraları Gör
                                    </Link>
                                </div>
                            </div>
                        }
                        {this.state.isEdit &&
                            <div className="user-group-edit">
                                <div className="form-container">
                                    <Form model={this.state.formModel} handleSubmit={this.handleSubmit} smallTitle={""} buttonText={"Kaydet"} multipleColumn={true} buttonId={"group-edit-save"} />
                                    <Button disabled={false} extraClass={""} onClick={() => this.activateEditState(false)} text={"Vazgeç"} id={"group-edit-cancel"} />
                                </div>
                            </div>
                        }
                    </div>
                }
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

  export default connect(mapStateToProps)(GroupDetail)