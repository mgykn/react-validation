import React, { Component } from 'react';
import { Provider } from 'react-redux'
import configureStore from './actions/store'
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import LoginLayout from "./layouts/LoginLayout";
import MainLayout from "./layouts/MainLayout";
import UserLayout from "./layouts/UserLayout";
import AgentLayout from './layouts/AgentLayout';
import XIVodafoneLayout from './layouts/XIVodafoneLayout';

export const store = configureStore();

class App extends Component {
  
  render() {
    
    return (
      <Provider store={store}>
        <Router>
          <MainLayout>
            <Route exact path="/" component={LoginLayout} />
            <Route path="/account-activated" component={LoginLayout} />
            <Route path="/sms-verified" component={LoginLayout} />
            <Route path="/agent" component={AgentLayout} />
            <Route path="/user" component={UserLayout} />
            <Route path="/xivodafone" component={XIVodafoneLayout} />
          </MainLayout>
        </Router>
      </Provider>
    );
  }
}

export default App;
