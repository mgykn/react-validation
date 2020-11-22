import React from 'react';
import { connect } from 'react-redux';
import Message from '../../../components/message/index';
import Breadcrumb from '../../../components/breadcrumb/index';
import { groups, dispatchItem } from '../../../actions/actions';
import LeftList from './_leftList';

class GroupList extends React.Component {
    componentDidMount() {
        if (this.props.app.user.groups.length < 1) {
            this.props.dispatch(groups({}, (data) => {
                this.props.dispatch(dispatchItem("GROUP_LIST", data.listGroup));
            }, () => {

            }));
        }
    }

    render() {
        const breadcrumbItems = [{
            name: "Ana Sayfa",
            link: "/"
        },{
            name: "Gruplar"
        }];
        return (
        [
          <Breadcrumb items={breadcrumbItems} />,
          <section className="panel">
            <Message />
            <div className="only-mobile dashboard-mobile">
                Başlamak için bir grup seçin.
            </div>
            <div className="container">
                <LeftList items={this.props.app.user.groups} />
                <div className="right only-desktop">
                    <div className="placeholder">
                        Başlamak için soldaki panelden bir grup seçin.
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

  export default connect(mapStateToProps)(GroupList)