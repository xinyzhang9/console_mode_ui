import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom";
import Home from '../Home';
import About from '../About';
import Dashboard from '../Dashboard';
import Console from '../console/Console';
function Content() {
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
            <Console />
        </div>
        
    )
}

export default Content;