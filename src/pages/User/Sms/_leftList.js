import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Link,
  withRouter
} from "react-router-dom";

class LeftList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="left only-desktop">
                <div className="header">
                    <div className="title">
                        {this.props.isExcel &&
                            <span>
                                Excel Yüklendi
                            </span>
                        }
                        {!this.props.isExcel &&
                            <span>
                                Seçilen gruplar
                            </span>
                        }
                    </div>
                    <a className="link" href="javascript:void(0)" onClick={() => this.props.goToState(1)}>
                        <img src={require('../../../assets/icons/icon-edit.svg')} aria-hidden="true" />
                        <span>Düzenle</span>
                    </a>
                </div>
                <div className="user-sms-choosen">
                    {!this.props.isExcel &&
                        [
                            <div className="text">
                                Aşağıdaki gruplara yazdığınız mesaj gönderilecek.
                            </div>,
                            <div className="groups">
                                {this.props.items.map((item, i) =>
                                    <div>{item.groupName}</div>
                                )}
                            </div>
                        ]
                    }
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