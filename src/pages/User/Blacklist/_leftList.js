import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from "react-router-dom";
import Button from '../../../components/form/button';
import { scrollToTop } from '../../../actions/utils';
import Paging from '../../../components/paging/index';
import { blacklist, deleteBlacklist, deleteBlacklistAll, dispatchItem } from '../../../actions/actions';
import { mobileAccordion } from '../../../assets/scripts/custom';

class LeftList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            searchText: ''
        }

        this.handleSearch = this.handleSearch.bind(this);
        this.deleteBlacklist = this.deleteBlacklist.bind(this);
        this.deleteBlacklistAll = this.deleteBlacklistAll.bind(this);
    }

    componentDidMount() {
        mobileAccordion();
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        mobileAccordion();
    }

    handleSearch(e)
    {
        this.setState({
            searchText: e.target.value
        })
    }

    deleteBlacklist(phone) {
        this.props.dispatch(deleteBlacklist({ blacklist: [ phone ] }, (data) => {
            this.props.changePage(0, this.props.pageSize);
            scrollToTop();
        }, () => {

        }));
    }

    deleteBlacklistAll() {
        this.props.dispatch(deleteBlacklistAll({ }, (data) => {
            this.props.changePage(0, this.props.pageSize);
            scrollToTop();
        }, () => {

        }));
    }

    render() {
        const currentRoute = this.props.location.pathname;
        return (
            <div className="left mobile-accordion">
                <div className="header">
                    <div className="title">
                        Karaliste
                    </div>
                    <Link id={"blacklist-leftlist-addnew"} className="link only-desktop" to={"/user/blacklist/create"}>
                        <img src={require('../../../assets/icons/icon-plus.svg')} aria-hidden="true" />
                        <span>Numara Ekle</span>
                    </Link>
                    <Button id={"blacklist-leftlist-addnew-mobile"} disabled={false} extraClass={"secondary only-mobile"} onClick={() => { this.props.history.push('/user/blacklist/create') }} text={"+ Numara Ekle"} />
                </div>
                <div className="search">
                    <div className="form-item">
                        <input type="text" placeholder="Numaralar içinde arama yap" value={this.state.searchText} onChange={this.handleSearch} />
                    </div>
                </div>
                <div className="blacklist-numbers" id="blacklist-leftlist">
                    {this.props.items && this.props.items.map((item, i) =>
                    {
                        if(item.toLowerCase().indexOf(this.state.searchText.toLowerCase()) >= 0)
                        {
                            return (
                                <div className="number-item">
                                    <span>{item}</span>
                                    <a className="remove-item" href="javascript:void(0)" onClick={() => this.deleteBlacklist(item)}>
                                        Sil
                                    </a>
                                </div>
                            )
                        }
                    }
                    )}
                    <div className="paging-container">
                        {this.state.searchText.length <= 0 &&
                            <Paging totalItemCount={this.props.itemsCount} pageSize={this.props.pageSize} changePage={this.props.changePage} />
                        }
                    </div>
                    <a className="remove-all-numbers" href="javascript:void(0)" onClick={this.deleteBlacklistAll}>Tüm numaraları karalisteden kaldır.</a>
                </div>
            </div>
      );
    }
  }

  function mapStateToProps(state) {
    return {
        app: state.app 
    }
}

export default withRouter(connect(mapStateToProps)(LeftList))