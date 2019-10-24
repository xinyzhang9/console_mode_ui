import React, { Component } from 'react';
import '../../styles/Console.css';
import Newline from './Newline';
import {createHistory} from '../../services/history';
import {process} from '../../services/console';
class Console extends Component {
    constructor(props) {
        super(props);
        this._handleKeyUp = this._handleKeyUp.bind(this);
        this._onChange = this._onChange.bind(this);
        this.state = {
            history:[],
            currentValue:''
        }
    }

    _handleKeyUp(e) {
        if (e.key === 'Enter') {
            let cmd = e.target.value.trim();
            console.log('submit this line');
            let newHistory = [...this.state.history, cmd]
            this.setState({
                history: newHistory,
                currentValue: ''
            });
            createHistory({
                cmd:cmd,
                system:false
            }).then(process(cmd).then(res => {
                console.log(res);
                if(res.history) {
                    let updated = [...this.state.history, ...res.history];
                    this.setState({
                        history: updated,
                        currentValue: ''
                    });
                    if(res.page) {
                        this.props.handleRedirect(res.page);
                    }
                } 
                
            }));
        }
    }
    _onChange(e) {
        this.setState({
            currentValue: e.target.value
        })
    }
    render() {
        return (
            <div className="console footer">
                <div className="consolebody">
                {this.state.history.map((h,i) => (
                        <div key={i}>{h}</div>
                    )
                )}
                <Newline onKeyUp={this._handleKeyUp} value={this.state.currentValue} onChange={this._onChange}/>
                    
                </div>
            </div>
        )
    }
}

export default Console;