import React, { Component } from 'react';
import {
  Switch,
  Route,  
} from "react-router-dom";
import { createBrowserHistory } from "history";
import Home from '../Home';
import Compliance from '../Compliance';
import License from '../License';
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
        this.renderPage = this.renderPage.bind(this);
    }
    renderPage(page) {
        console.log('renderPage', page)
        if(page === 'compliance') return <Compliance />
        if(page === 'license') return <License />
        if(page === '') return <Home />
    }
    handleRedirect(page) {
        console.log(page);
        history.push('/'+page)
        this.setState({
            redirect: true,
            page: page
        })
    }
    handleClick() {
        this.setState({
            displayConsole: !this.state.displayConsole
        })
    }
    render() {
        console.log(this.state.redirect)
        let body;
        if(this.state.redirect) {
            body = this.renderPage(this.state.page)
        } else {
            body = <Switch>
            <Route exact path="/">
            <Home />
            </Route>
            <Route path="/Compliance">
            <Compliance />
            </Route>
            <Route path="/license">
            <License />
            </Route>
        </Switch>
        }
            
        return (
            <div id="wrapper">
                { body }
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