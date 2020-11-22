import React from 'react';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

class Home extends React.Component {
    render() {
      return (
        <section className="select vcenter">
          <Link  to={"/user/group/list"} className="item">
              <div className="logo vcenter">
                  <img src={require('../../../assets/icons/icon-home-list.png')} />
              </div>
              <div className="text vcenter">
                  <span>
                  Gönderim Listeleri
                  </span>
              </div>
          </Link>
          <Link  to={"/user/sendsms"} className="item">
              <div className="logo vcenter">
                <img src={require('../../../assets/icons/icon-home-message.png')} />
              </div>
              <div className="text vcenter">
                  <span>
                  SMS Gönder
                  </span>
              </div>
          </Link>
          <Link  to={"/user/group/list"} className="item">
              <div className="logo vcenter">
                  <img src={require('../../../assets/icons/icon-home-activity.png')} />
              </div>
              <div className="text vcenter">
                  <span>
                  Raporlar
                  </span>
              </div>
          </Link>
          <Link  to={"/user/group/list"} className="item">
              <div className="logo vcenter">
                <img src={require('../../../assets/icons/icon-home-slash.png')} />
              </div>
              <div className="text vcenter">
                  <span>
                  Karaliste Yönetimi
                  </span>
              </div>
          </Link>
        </section>
      );
    }
  }

  export default Home;