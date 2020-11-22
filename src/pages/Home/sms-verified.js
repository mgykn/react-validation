import React from 'react';
import {connect} from 'react-redux'
import { withRouter } from "react-router-dom"
import Message from '../../components/message/index';
import { smsVerification } from '../../actions/actions'

class SmsVerified extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        status: 0
      }
  }

    componentDidMount() {
      this.props.dispatch(smsVerification({ }, (data) => {
        this.setState({
          status: 1
        });
      }, () => {
        this.setState({
          status: -1
        });
      }, this.props.match.params.id));
    }

    render() {
      return (
        <section className="panel small">
          <Message />
          <div className="container">
            {this.state.status == 1 &&
              <div className="activation">
                <div className="title-default">
                  <span>Sms onayı işleme alındı!</span>
                </div>
              </div>
            }
            {this.state.status == -1 &&
              <div className="activation">
                <div className="title-default">
                  <span>Bir hata oluştu</span>
                </div>
                <div className="text">
                  Lütfen daha sonra tekrar deneyiniz.
                </div>
              </div>
            }
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

  export default withRouter(connect(mapStateToProps)(SmsVerified))