import React from 'react';
import {connect} from 'react-redux';
import { dispatchItem } from '../actions/actions';
import Message from '../components/message/index';

class Popup extends React.Component {
    constructor(props) {
        super(props);
    
        this.changeActivePopup = this.changeActivePopup.bind(this);
    }

    changeActivePopup(activePopup) {
        this.props.dispatch(dispatchItem('POPUP', activePopup));
    }

    render() {
        return (
            <div className="popup-wrapper active">
                <Message />
                {this.props.children}
                <a className="popup-close" href="javascript:void(0)" title="Kapat" onClick={() => this.changeActivePopup('')}>
                    <img src={require('../assets/icons/icon-popup-close.svg')} alt="Kapat Ikonu" />
                </a>
            </div>
        );
    }
  }
  
function mapStateToProps(state) {
    return {
        app: state.app 
    }
}

export default connect(mapStateToProps)(Popup)