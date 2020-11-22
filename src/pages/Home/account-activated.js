import React from 'react';
import {connect} from 'react-redux'
import { withRouter } from "react-router-dom"
import { dispatchItem, userVerification } from '../../actions/actions'

class AccountActivated extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        status: 0
      }

      this.changeActivePopup = this.changeActivePopup.bind(this);
    }

    componentDidMount() {
      this.props.dispatch(userVerification({ }, (data) => {
        this.setState({
          status: 1
        });
      }, () => {
        this.setState({
          status: -1
        });
      }, this.props.match.params.id));
    }

    changeActivePopup(activePopup) {
      this.props.dispatch(dispatchItem('POPUP', activePopup));
    }

    render() {
      return (
        <section className="panel small">
          <div className="container">
            {this.state.status == 1 &&
              <div className="activation">
                <div className="title-default">
                  <span>Hesabın aktifleştirildi!</span>
                </div>
                <div className="text">
                  Giriş yapman için şifreni telefonuna gönderdik.
                </div>
                <a className="btn primary" href="javascript:void(0)" title="Giriş Yap" onClick={() => this.changeActivePopup('login')}>
                  <span>Giriş Yap</span>
                </a>
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

  export default withRouter(connect(mapStateToProps)(AccountActivated))