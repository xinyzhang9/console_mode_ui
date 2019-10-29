import React, { Component } from 'react';
import {
  Switch,
  Route,  
} from "react-router-dom";
import { createBrowserHistory } from "history";
import Home from '../Home';
import Compliance from '../Compliance';
import Dashboard from '../Dashboard';
import Console from '../console/Console';

const history = createBrowserHistory();
class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            displayConsole: true
        }
        this.handleRedirect = this.handleRedirect.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    handleRedirect(page) {
        console.log(page);
        history.push('/'+page)
    }
    handleClick() {
        this.setState({
            displayConsole: !this.state.displayConsole
        })
    }
    render() {
        return (
            <div id="wrapper">
                <Switch>
                    <Route exact path="/">
                    <Home />
                    </Route>
                    <Route path="/Compliance">
                    <Compliance />
                    </Route>
                    <Route path="/dashboard">
                    <Dashboard />
                    </Route>
                </Switch>
                <Console 
                    handleRedirect = {this.handleRedirect} 
                    show={this.state.displayConsole}
                    handleClick={this.handleClick}
                />
            </div>
        )
    }
    
}

export default Content;