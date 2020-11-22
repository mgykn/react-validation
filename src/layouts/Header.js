import React from 'react';
import {connect} from 'react-redux'
import { Link, withRouter } from "react-router-dom"
import { dispatchItem, removeAllCache } from '../actions/actions'

class Header extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            mobileMenuIsOpen: false
        };

        this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
        this.changeActivePopup = this.changeActivePopup.bind(this);
        this.logout = this.logout.bind(this);
    }

    changeActivePopup(activePopup) {
        this.props.dispatch(dispatchItem('POPUP', activePopup));
    }

    toggleMobileMenu() {
        if(this.state.mobileMenuIsOpen)
        {
            this.setState({
                mobileMenuIsOpen: false
            })
        }
        else {
            this.setState({
                mobileMenuIsOpen: true
            })
        }
    }
    
    logout() {
        localStorage.removeItem('user');
        localStorage.removeItem('userType');
        
        this.props.dispatch(removeAllCache());
        
        this.changeActivePopup('login');
    }

    render() {
        const isLoggedIn = this.props.app.accessToken !== "";
        const isSalesAgent = this.props.app.userType === "Sales";
        const isStandart = this.props.app.userType === "Standart";
        const isXIVodafone = this.props.app.userType === "XIVodafone";
        const isXIPartner = this.props.app.userType === "XIPartner";
        const isXIOtd = this.props.app.userType === "XIOtd";
        const currentRoute = this.props.location.pathname;
        return (
            [
            <div className="header-placeholder"></div>,
            <header className={(this.state.mobileMenuIsOpen ? "menu-active" : "")}>
                <div className="container">
                    <div className="left">
                        <Link className="logo" to={"/"}>
                            <img src={require('../assets/icons/logo.svg')} alt="Vodafone Business Logo" />
                        </Link>
                    </div>
                    <div className="menu-wrapper">
                        {/* {isLoggedIn && isSalesAgent &&
                            <div className="menu">
                                <Link className={"vcenter" + (currentRoute.indexOf('/agent/company') >= 0 ? " active" : "")} to={"/agent/company/detail"}>
                                    <span>
                                        Müşteriler
                                    </span>
                                </Link>
                            </div>
                        } */}
                        {isLoggedIn && isStandart &&
                            <div className="menu">
                                <Link id={"menu-groups"} className={"vcenter" + (currentRoute.indexOf('/user/group') >= 0 ? " active" : "")} to={"/user/group/list"}>
                                    <span>
                                        Gönderim Listeleri
                                    </span>
                                </Link>
                                <Link id={"menu-sendsms"} className={"vcenter" + (currentRoute.indexOf('/user/sendsms') >= 0 ? " active" : "")} to={"/user/sendsms"}>
                                    <span>
                                        SMS Gönder
                                    </span>
                                </Link>
                                <Link id={"menu-blackhour"} className={"vcenter" + (currentRoute.indexOf('/user/blackhour') >= 0 ? " active" : "")} to={"/user/blackhour"}>
                                    <span>
                                        Blackhour Ayarları
                                    </span>
                                </Link>
                                <Link id={"menu-blacklist"} className={"vcenter" + (currentRoute.indexOf('/user/blacklist') >= 0 ? " active" : "")} to={"/user/blacklist"}>
                                    <span>
                                        Karaliste Yönetimi
                                    </span>
                                </Link>
                                <Link id={"menu-report"} className={"vcenter" + (currentRoute.indexOf('/user/report') >= 0 ? " active" : "")} to={"/user/report"}>
                                    <span>
                                        Raporlar
                                    </span>
                                </Link>
                            </div>
                        }
                        {isLoggedIn && (isXIVodafone || isXIPartner) &&
                            <div className="menu">
                                <Link id={"menu-xi-send"} className={"vcenter" + (currentRoute.indexOf('/xivodafone/client/list') >= 0 ? " active" : "")} to={"/xivodafone/client/list"}>
                                    <span>
                                        Gönderim Kur
                                    </span>
                                </Link>
                                <Link id={"menu-xi-query"} className={"vcenter" + (currentRoute.indexOf('/xivodafone/query') >= 0 ? " active" : "")} to={"/xivodafone/query/list"}>
                                    <span>
                                        Sorgular
                                    </span>
                                </Link>
                                <Link id={"menu-xi-report"} className={"vcenter" + (currentRoute.indexOf('/xivodafone/report') >= 0 ? " active" : "")} to={"/xivodafone/report"}>
                                    <span>
                                        Raporlar
                                    </span>
                                </Link>
                                {isXIVodafone &&
                                    <Link id={"menu-xi-partnerreport"} className={"vcenter" + (currentRoute.indexOf('/xivodafone/partnerreport') >= 0 ? " active" : "")} to={"/xivodafone/partnerreport"}>
                                        <span>
                                            Partner Gönderimleri
                                        </span>
                                    </Link>
                                }
                            </div>
                        }
                      {isLoggedIn && (isXIOtd) &&
                            <div className="menu">
                                <Link id={"menu-xi-query"} className={"vcenter" + (currentRoute.indexOf('/xivodafone/query') >= 0 ? " active" : "")} to={"/xivodafone/query/list"}>
                                    <span>
                                        Sorgular
                                    </span>
                                </Link>
                                {isXIVodafone &&
                                    <Link id={"menu-xi-partnerreport"} className={"vcenter" + (currentRoute.indexOf('/xivodafone/partnerreport') >= 0 ? " active" : "")} to={"/xivodafone/partnerreport"}>
                                        <span>
                                            Gönderimler
                                        </span>
                                    </Link>
                                }
                            </div>
                        }
                    </div>
                    <div className={"right" + (isLoggedIn ? " dropdown" : "")}>
                        {isLoggedIn &&
                            <div className="dropdown-container vcenter">
                                <span>{this.props.app.userEmail}</span>
                                <img className="icon-dropdown only-desktop" src={require('../assets/icons/icon-dropdown.svg')} aria-hidden="true" />
                                <img className="icon-user only-mobile" src={require('../assets/icons/icon-user.svg')} aria-hidden="true" />
                                <div className="dropdown-menu">
                                    {isStandart &&
                                        <a id={"menu-changepassword"} href="javascript:void(0)" title="Şifremi Değiştir" onClick={() => this.changeActivePopup('updatePassword')}>Şifremi Değiştir</a>
                                    }
                                    <a id={"menu-logout"} href="javascript:void(0)" title="Çıkış Yap" onClick={() => this.logout()}>Çıkış Yap</a>
                                </div>
                            </div>
                        }
                        {!isLoggedIn &&
                            <a id={"menu-login"} className="login" href="javascript:void(0)" title="Giriş Yap" onClick={() => this.changeActivePopup('login')}>
                                <img src={require('../assets/icons/icon-user.svg')} aria-hidden="true" />
                                <span>Giriş Yap</span>
                            </a>
                        }
                        {isLoggedIn && isStandart &&
                            <a className="btn-mobile-menu only-mobile" href="javascript:void(0)" onClick={this.toggleMobileMenu}>
                                <img className="open" src={require('../assets/icons/icon-menu.svg')} aria-hidden="true" />
                                <img className="close" src={require('../assets/icons/icon-menu-close.svg')} aria-hidden="true" />
                            </a>
                        }
                    </div>
                </div>
            </header>
            ]
      );
    }
}

function mapStateToProps(state) {
    return {
        app: state.app 
    }
}

export default withRouter(connect(mapStateToProps)(Header))