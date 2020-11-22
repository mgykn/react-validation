import React from 'react';
import {
    BrowserRouter as Router,
    Redirect,
    withRouter,
    Link,
    Route
} from "react-router-dom";
import { connect } from 'react-redux';
import moment from 'moment';
import Message from '../../../components/message/index';
import Paging from '../../../components/paging/index';
import { clients, clientContract, dispatchItem } from '../../../actions/actions';

class ClientList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            pageSize: 50
        }

        this.getClientList = this.getClientList.bind(this);
        this.changePage = this.changePage.bind(this);
        this.showContract = this.showContract.bind(this);
    }

    componentDidMount() {
        this.getClientList();
    }

    getClientList() {
        var model = {
            page: 0,
            size: this.state.pageSize
        };

        this.props.dispatch(clients(model, (data) => {
            this.props.dispatch(dispatchItem("CLIENT_LIST", data.xiCustomerResponse));
            this.props.dispatch(dispatchItem("CLIENT_COUNT", data.totalSize));
        }, () => {

        }));
    }

    changePage(pageNumber, pageSize) {
        var model = {
            page: pageNumber,
            size: pageSize
        };

        this.props.dispatch(clients(model, (data) => {
            this.props.dispatch(dispatchItem("CLIENT_LIST", data.xiCustomerResponse));
            this.props.dispatch(dispatchItem("CLIENT_COUNT", data.totalSize));
        }, () => {

        }));
    }

    showContract(xCustomerId) {
        this.props.dispatch(clientContract(xCustomerId, () => {
        }, () => {

        }));
    }

    render() {
        return (
            <section className="panel">
                <Message />
                <div className="container">
                    <div className="table">
                        <div className="top">
                            <div className="title-default">
                                Aktif Kurulum Yapılabilecek Müşteriler
                            </div>
                            <div className="actions"></div>
                        </div>
                        <div className="bottom">
                            <div className="table-container">
                                <table className="sortable">
                                    <thead>
                                        <tr>
                                            <th><span>Müşteri Adı</span></th>
                                            <th><span>Kalan Adet</span></th>
                                            <th><span>Sözleşme Tarihi</span></th>
                                            <th><span>Kullanım Bitiş Tarihi</span></th>
                                            <th><span>Sektör</span></th>
                                            <th><span>Gönderici Adı</span></th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.props.app.xivodafone.clients && this.props.app.xivodafone.clients.map((item, i) => {
                                            return (
                                                <tr>
                                                    <td>{item.companyName}</td>
                                                    <td>{item.limit}</td>
                                                    <td>{moment(item.contractStartDate).format('DD.MM.YYYY')}</td>
                                                    <td>{moment(item.contractEndDate).format('DD.MM.YYYY')}</td>
                                                    <td>{item.sector}</td>
                                                    <td>{item.originator}</td>
                                                    <td>
                                                        <a href="javascript:void(0)" onClick={() => this.showContract(item.companyId)}>
                                                            Sözleşmeyi Görüntüle
                                                    </a>
                                                    </td>
                                                    <td>
                                                        <Link className="btn primary" to={"/xivodafone/query/list/" + item.companyId}>
                                                            <span>Kurulum Yap</span>
                                                        </Link>
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
                            <Paging totalItemCount={this.props.app.xivodafone.clientsCount} pageSize={this.state.pageSize} changePage={this.changePage} />
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

export default connect(mapStateToProps)(ClientList)