import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import Button from '../../../components/form/button';
import Message from '../../../components/message/index';
import Breadcrumb from '../../../components/breadcrumb/index';
import LeftList from './_leftList';
import { blacklist, dispatchItem } from '../../../actions/actions';

class Blacklist extends React.Component {
    constructor(props)
    {
        super(props)

        this.state = {
            pageSize: 50
        }

        this.getBlacklist = this.getBlacklist.bind(this);
        this.changePage = this.changePage.bind(this);
    }

    componentDidMount() {
        this.getBlacklist();
    }
    
    getBlacklist()
    {
        var model = {
            page: 0,
            size: this.state.pageSize
        };

        this.props.dispatch(blacklist(model, (data) => {
            this.props.dispatch(dispatchItem("BLACKLIST", data.blacklist));
            this.props.dispatch(dispatchItem("BLACKLIST_COUNT", data.totalSize));
        }, () => {

        }));
    }

    changePage(pageNumber, pageSize) {
        var model = {
            page: pageNumber,
            size: pageSize
        };

        this.props.dispatch(blacklist(model, (data) => {
            this.props.dispatch(dispatchItem("BLACKLIST", data.blacklist));
            this.props.dispatch(dispatchItem("BLACKLIST_COUNT", data.totalSize));
        }, () => {

        }));
    }

    render() {
        const breadcrumbItems = [{
            name: "Ana Sayfa",
            link: "/"
        },{
            name: "Karaliste Yönetimi"
        }];

        return (
        [
            <Breadcrumb items={breadcrumbItems} />,
            <section className="panel">
                <Message />
                <div className="container">
                    <LeftList items={this.props.app.user.blacklist} itemsCount={this.props.app.user.blacklistCount} pageSize={this.state.pageSize} changePage={this.changePage.bind(this)} />
                    <div className="right">
                        <div className="header">
                            <div className="column">
                                <div className="title-default">
                                    <span>Karaliste Yönetimi</span>
                                </div>
                            </div>
                            <div className="column only-desktop">
                                <Button id={"blacklist-list-upload"} disabled={false} extraClass={"tertiary"} onClick={() => { this.props.history.push('/user/blacklist/upload') }} text={"Excel ile Yükle"} />
                            </div>
                            <Button id={"blacklist-list-upload-mobile"} disabled={false} extraClass={"secondary only-mobile"} onClick={() => { this.props.history.push('/user/blacklist/upload') }} text={"Excel ile Yükle"} />
                        </div>
                        <div className="blacklist">
                        
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

export default connect(mapStateToProps)(Blacklist)