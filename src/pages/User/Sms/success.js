import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import Message from '../../../components/message/index';
import Breadcrumb from '../../../components/breadcrumb/index';

class SendSmsSuccess extends React.Component {
    constructor(props)
    {
        super(props)
    }
    
    render() {
        const breadcrumbItems = [{
            name: "Ana Sayfa",
            link: "/"
        },{
            name: 'SMS Gönder'
        }];

        
        return (
        [
            <Breadcrumb items={breadcrumbItems} />,
            <section className="panel small">
                <Message />
                <div className="container">
                    <div className="activation success">
                        <div className="title-default">
                            <span>Mesajınız başarıyla gönderildi!</span>
                        </div>
                        <Link className={"btn primary"} to={"/"}>
                            <span>Tamam</span>
                        </Link>
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

export default connect(mapStateToProps)(SendSmsSuccess)