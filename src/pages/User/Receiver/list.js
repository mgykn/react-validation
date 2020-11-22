import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import Message from '../../../components/message/index';
import Breadcrumb from '../../../components/breadcrumb/index';
import Paging from '../../../components/paging/index';
import { scrollToTop } from '../../../actions/utils';
import { groups, receivers, deleteReceiver, dispatchItem } from '../../../actions/actions';

class ReceiverList extends React.Component {
    constructor(props)
    {
        super(props)

        this.state = {
            pageSize: 50
        }

        this.getGroupList = this.getGroupList.bind(this);
        this.getReceiverList = this.getReceiverList.bind(this);
        this.deleteReceiver = this.deleteReceiver.bind(this);
        this.changePage = this.changePage.bind(this);
    }

    componentDidMount() {
        if (this.props.app.user.groups.length < 1) {
            this.getGroupList();
        }

        this.getReceiverList();
    }

    getGroupList()
    {
        this.props.dispatch(groups({}, (data) => {
            this.props.dispatch(dispatchItem("GROUP_LIST", data.listGroup));
        }, () => {

        }));
    }
    
    getReceiverList()
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
        }, () => {

        }));
    }

    changePage(pageNumber, pageSize) {
        var groupId = this.props.match.params.id;

        var model = {
            page: pageNumber,
            size: pageSize,
            groupId: groupId
        };

        this.props.dispatch(receivers(model, (data) => {
            this.props.dispatch(dispatchItem("RECEIVER_LIST", data.receiverInfo));
            this.props.dispatch(dispatchItem("RECEIVER_COUNT", data.totalSize));
        }, () => {

        }));
    }

    deleteReceiver(id, msisdn, name, surName) {
        var groupId = this.props.match.params.id;
        var formPostModel = {
            deleteList: [
                {
                  id: id,
                  msisdn: msisdn,
                  name: name,
                  surName: surName
                }
            ],
            groupId: groupId
        }

        this.props.dispatch(deleteReceiver(formPostModel, (data) => {
            this.getReceiverList();
            scrollToTop();
        }, () => {

        }));
    }

    render() {
        var groupId = this.props.match.params.id;
        
        var filterGroup = this.props.app.user.groups.filter(function (item) {
            return item.groupId === groupId;
        });
        
        var group = filterGroup.length > 0 ? filterGroup[0] : null;
        
        var receivers = this.props.app.user.receivers;
        var receiverCount = this.props.app.user.receiverCount;
        
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
            name: "Numaralar"
        }];

        return (
        [
          <Breadcrumb items={breadcrumbItems} />,
          <section className="panel small">
            <Message />
            {group &&    
                [    
                    <Link id={"receiver-list-groupedit-mobile"} className="btn-back only-mobile" to={"/user/group/detail/" + group.groupId }>
                        <img src={require('../../../assets/icons/icon-back.svg')} aria-hidden="true"/>
                        <span>Grup detayına geri dön</span>
                    </Link>,
                    <div className="container">
                        <div className="title-default">
                            <Link id={"receiver-list-groupedit"} className="title-link only-desktop" to={"/user/group/detail/" + group.groupId }>
                                Grup Detayı
                            </Link>
                            <span>{group.groupName}</span>
                        </div>
                        <div className="user-numbers">
                            <div className="user-number-details">
                                <div className="user-group-text">
                                    <div>Grup İsmi</div>
                                    <div>{group.groupName}</div>
                                </div>
                                <div className="user-group-text">
                                    <div>Grup Açıklaması</div>
                                    <div>{group.groupDesc}</div>
                                </div>
                            </div>
                            <div className="user-number-list">
                                <div className="title">
                                    Numaralar
                                </div>
                                {receivers && receivers.map((item, i) =>
                                    <div className="user-number-item" key={"receiver_" + group.groupId + "_" + i}>
                                        <span>{item.msisdn}</span>
                                        <span>{item.name} {item.surName}</span>
                                        <a className="remove-item" href="javascript:void(0)" onClick={() => this.deleteReceiver(item.id, item.msisdn, item.name, item.surName)}>Sil</a>
                                    </div>
                                )}
                                <Paging totalItemCount={receiverCount} pageSize={this.state.pageSize} changePage={this.changePage.bind(this)} />
                            </div>
                        </div>
                    </div>
                ] 
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

export default connect(mapStateToProps)(ReceiverList)