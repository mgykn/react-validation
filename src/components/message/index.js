import React from 'react';
import {connect} from 'react-redux';
import { dispatchItem } from '../../actions/actions';
import { scrollToTop } from '../../actions/utils';

class Message extends React.Component {
    constructor(props){
      super(props);

      this.state = {
        message: '',
        isError: false,
        timeoutFunction: null
      }
    }

    componentWillReceiveProps(nextProps)
    {
      if(nextProps.app.notification.message)
      {
        if(this.state.timeoutFunction != null)
        {
          window.clearTimeout(this.state.timeoutFunction);
        }

        this.setState({
          message: nextProps.app.notification.message,
          isError: nextProps.app.notification.isError,
          waitingForReset: true
        });

        var timeoutFunction = setTimeout(
          function() {
            this.setState({
              message: '',
              isError: false,
              timeoutFunction: null
            });
            this.props.dispatch(dispatchItem('NOTIFICATION', { message: '', isError: false }));
        }.bind(this), 7000);

        this.setState({
          timeoutFunction: timeoutFunction
        });
        
        scrollToTop();
      }
    }
    
    render() {
      return (
        <div>
          {this.state.message &&
            <div className={"notification" + (this.state.isError ? " error" : "")}>
                {this.state.message}
            </div>
          }
        </div>
      );
    }
  }

  function mapStateToProps(state) {
      return {
          app: state.app 
      }
  }
  
  export default connect(mapStateToProps)(Message);