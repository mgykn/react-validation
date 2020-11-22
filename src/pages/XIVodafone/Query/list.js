import React from 'react';
import {
    BrowserRouter as Router,
    Redirect,
    withRouter,
    Link,
    Route
  } from "react-router-dom";
import { connect } from 'react-redux';
import Message from '../../../components/message/index';
import Paging from '../../../components/paging/index';
import { queries, deleteQuery, dispatchItem } from '../../../actions/actions';

class QueryList extends React.Component {
    constructor(props)
    {
        super(props);

        const companyId = this.props.match.params.companyId;
        
        this.state = {
            pageSize: 50,
            companyId: companyId
        }

        this.deleteQuery = this.deleteQuery.bind(this);
        this.getQueries = this.getQueries.bind(this);
        this.changePage = this.changePage.bind(this);
    }

    componentDidMount() {
        this.getQueries();
    }

    deleteQuery(queryId) {
        var data = {
            queryId: queryId
        }
        this.props.dispatch(deleteQuery(data, (data) => {
            this.getQueries();
        }, () => {

        }));
    }

    getQueries(){
        var model = {
            page: 0,
            size: this.state.pageSize
        };

        this.props.dispatch(queries(model, (data) => {
            this.props.dispatch(dispatchItem("QUERY_LIST", data.queryRes));
            this.props.dispatch(dispatchItem("QUERY_COUNT", data.totalSize));
        }, () => {

        }));
    }

    changePage(pageNumber, pageSize) {
        var model = {
            page: pageNumber,
            size: pageSize
        };

        this.props.dispatch(queries(model, (data) => {
            this.props.dispatch(dispatchItem("QUERY_LIST", data.queryRes));
            this.props.dispatch(dispatchItem("QUERY_COUNT", data.totalSize));
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
                                Favori Sorgular
                            </div>
                            <div className="actions">
                                {this.state.companyId &&
                                    <Link className="link" to={"/xivodafone/query/create/" + this.state.companyId}>
                                        <img src={require('../../../assets/icons/icon-plus.svg')} aria-hidden="true" />
                                        <span>Yeni Sorgu Oluştur</span>
                                    </Link>
                                }
                                {!this.state.companyId &&
                                    <Link className="link" to={"/xivodafone/query/create"}>
                                        <img src={require('../../../assets/icons/icon-plus.svg')} aria-hidden="true" />
                                        <span>Yeni Sorgu Oluştur</span>
                                    </Link>
                                }
                            </div>
                        </div>
                        <div className="bottom">
                            <div className="table-container">
                                <table className="sortable">
                                    <thead>
                                        <tr>
                                            <th><span>Sorgu Adı</span></th>
                                            <th><span>Kullanıcı Adı</span></th>
                                            <th>Detay</th>
                                            <th>Sil</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {this.props.app.xivodafone.queries && this.props.app.xivodafone.queries.map((item, i) => 
                                    {
                                        return (            
                                            <tr>
                                                <td>{item.queryName}</td>
                                                <td>{item.userId}</td>
                                                <td>
                                                    {this.state.companyId &&
                                                        <Link id={"query-detail-" + i} className="link" to={"/xivodafone/query/edit/" + item.queryId + "/" + this.state.companyId}>
                                                            <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M1 9C1 9 5 1 12 1C19 1 23 9 23 9C23 9 19 17 12 17C5 17 1 9 1 9Z" stroke="#333333" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z" stroke="#333333" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                                                            </svg>
                                                            <span>Gör ve Gönderim Yap</span>
                                                        </Link>
                                                    }
                                                    {!this.state.companyId &&
                                                        <Link id={"query-detail-" + i} className="link" to={"/xivodafone/query/edit/" + item.queryId}>
                                                            <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M1 9C1 9 5 1 12 1C19 1 23 9 23 9C23 9 19 17 12 17C5 17 1 9 1 9Z" stroke="#333333" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z" stroke="#333333" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                                                            </svg>
                                                            <span>Detaylar</span>
                                                        </Link>
                                                    }
                                                </td>
                                                <td>
                                                    <a id={"query-remove-" + i} className="link" href="javascript:void(0)" onClick={() => this.deleteQuery(item.queryId)}>
                                                        <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M1 6H3H19" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                            <path className="fill" d="M4.6002 5.99995C4.6002 5.1163 3.88385 4.39995 3.0002 4.39995V5.99995H4.6002ZM4.6002 20V5.99995H3.0002V20H4.6002ZM5.0002 20.4C4.77928 20.4 4.6002 20.2209 4.6002 20H3.0002C3.0002 21.1045 3.89563 22 5.0002 22V20.4ZM15.0002 20.4H5.0002V22H15.0002V20.4ZM15.4002 20C15.4002 20.2209 15.2211 20.4 15.0002 20.4V22C16.1048 22 17.0002 21.1045 17.0002 20H15.4002ZM15.4002 5.99995V20H17.0002V5.99995H15.4002ZM17.0002 4.39995C16.1165 4.39995 15.4002 5.1163 15.4002 5.99995H17.0002H17.0002V4.39995ZM18.6002 5.99995C18.6002 5.1163 17.8839 4.39995 17.0002 4.39995V5.99995H17.0002H18.6002ZM18.6002 20V5.99995H17.0002V20H18.6002ZM15.0002 23.6C16.9884 23.6 18.6002 21.9882 18.6002 20H17.0002C17.0002 21.1045 16.1048 22 15.0002 22V23.6ZM5.0002 23.6H15.0002V22H5.0002V23.6ZM1.4002 20C1.4002 21.9882 3.01197 23.6 5.0002 23.6V22C3.89563 22 3.0002 21.1045 3.0002 20H1.4002ZM1.4002 5.99995V20H3.0002V5.99995H1.4002ZM3.0002 4.39995C2.11654 4.39995 1.4002 5.1163 1.4002 5.99995H3.0002V4.39995ZM7.6002 3.99995C7.6002 3.77904 7.77928 3.59995 8.0002 3.59995V1.99995C6.89563 1.99995 6.0002 2.89538 6.0002 3.99995H7.6002ZM7.6002 5.99995V3.99995H6.0002V5.99995H7.6002ZM6.0002 7.59995C6.88385 7.59995 7.6002 6.88361 7.6002 5.99995H6.0002V5.99995V7.59995ZM4.4002 5.99995C4.4002 6.88361 5.11654 7.59995 6.0002 7.59995V5.99995V5.99995H4.4002ZM4.4002 3.99995V5.99995H6.0002V3.99995H4.4002ZM8.0002 0.399951C6.01197 0.399951 4.4002 2.01173 4.4002 3.99995H6.0002C6.0002 2.89538 6.89563 1.99995 8.0002 1.99995V0.399951ZM12.0002 0.399951H8.0002V1.99995H12.0002V0.399951ZM15.6002 3.99995C15.6002 2.01173 13.9884 0.399951 12.0002 0.399951V1.99995C13.1048 1.99995 14.0002 2.89538 14.0002 3.99995H15.6002ZM15.6002 5.99995V3.99995H14.0002V5.99995H15.6002ZM14.0002 7.59995C14.8839 7.59995 15.6002 6.88361 15.6002 5.99995H14.0002L14.0002 5.99995V7.59995ZM12.4002 5.99995C12.4002 6.88361 13.1165 7.59995 14.0002 7.59995V5.99995L14.0002 5.99995H12.4002ZM12.4002 3.99995V5.99995H14.0002V3.99995H12.4002ZM12.0002 3.59995C12.2211 3.59995 12.4002 3.77904 12.4002 3.99995H14.0002C14.0002 2.89538 13.1048 1.99995 12.0002 1.99995V3.59995ZM8.0002 3.59995H12.0002V1.99995H8.0002V3.59995Z" fill="#333333"/>
                                                            <path d="M8 11V17" stroke="#333333" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                                                            <path d="M12 11V17" stroke="#333333" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                                                        </svg>
                                                        <span>Sil</span>
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
                            <Paging totalItemCount={this.props.app.xivodafone.queriesCount} pageSize={this.state.pageSize} changePage={this.changePage} />
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

  export default connect(mapStateToProps)(QueryList)