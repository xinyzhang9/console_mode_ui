import React, { Component } from 'react';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import NavHeader from './NavHeader';
import Content from './Content';

class Navigator extends Component {
    render() {
        return (
            <Router>
              <NavHeader />
              <Content />
            </Router>
          );
    }
}

export default Navigator;