import React from 'react';
import {
    BrowserRouter as Router,
    Link, Redirect
} from "react-router-dom";

class Home extends React.Component {
    constructor(props){
        super(props);
        this.parseJwt = this.parseJwt.bind(this);
    }
    componentDidMount() {
       let token= this.parseJwt(localStorage.getItem("user"));
        if (token.exp < Date.now() / 1000) {
            localStorage.clear();
            return (<Redirect
                    to={{
                        pathname: "/",
                        state: { from: this.props.location }
                    }}
                />
            );
        }
    }
    parseJwt(token) {
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    }
    render() {
      return (
        <section className="select vcenter">
          <Link  to={"/agent/company/list"} className="item">
              <div className="logo vcenter">
                  <img src={require('../../../assets/icons/icon-home-list.png')} />
              </div>
              <div className="text vcenter">
                  <span>
                    One Messaging'e 
                    <br />
                    devam et
                  </span>
              </div>
          </Link>
          <Link  to={"/agent/client/create"} className="item">
              <div className="logo vcenter">
                <img src={require('../../../assets/icons/icon-home-message.png')} />
              </div>
              <div className="text vcenter">
                  <span>
                    Mobil Pazarlama'ya 
                    <br />
                    devam et
                  </span>
              </div>
          </Link>
        </section>
      );
    }
  }

  export default Home;