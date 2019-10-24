import React, { Component } from 'react';
import {
  Switch,
  Route,
  Redirect  
} from "react-router-dom";
import Home from '../Home';
import About from '../About';
import Dashboard from '../Dashboard';
import Console from '../console/Console';
class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
        this.handleRedirect = this.handleRedirect.bind(this);
    }
    handleRedirect(page) {
        console.log(page);
        let component;
        if(page === 'dashboard') {
            component = <Dashboard />
        } else if(page === 'about') {
            component = <About />
        } else {
            component = <Home />
        }
        this.setState({
            redirect: true,
            page: '/'+page,
            component
        })
    }
    render() {
        const { redirect } = this.state;
        if(redirect) {
            return (
                <div id="wrapper">
                <Route exact path={this.state.page}>
                    {this.state.component}
                </Route>
                <Console handleRedirect = {this.handleRedirect} />
            </div>
            )
        }
        return (
            <div id="wrapper">
                <Switch>
                    <Route exact path="/">
                    <Home />
                    </Route>
                    <Route path="/about">
                    <About />
                    </Route>
                    <Route path="/dashboard">
                    <Dashboard />
                    </Route>
                </Switch>
                <Console handleRedirect = {this.handleRedirect} />
            </div>
        )
    }
    
}

export default Content;