import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import Message from '../../../components/message/index';

class QuerySendSuccess extends React.Component {
    constructor(props)
    {
        super(props)
    }
    
    render() {
        return (
            <section className="panel small">
                <Message />
                <div className="container">
                    <div className="activation success">
                        <div className="title-default">
                            <span>Mesajınız başarıyla onaya gönderildi!</span>
                        </div>
                        <Link className={"btn primary"} to={"/"}>
                            <span>Tamam</span>
                        </Link>
                    </div>
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

export default connect(mapStateToProps)(QuerySendSuccess)