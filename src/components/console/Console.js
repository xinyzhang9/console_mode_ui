import React, { Component } from 'react';
import '../../styles/Console.css';
import Newline from './Newline';
import { createHistory } from '../../services/history';
import { process } from '../../services/console';
import NewCompliance from '../modal/NewCompliance';
import { Button, ButtonToolbar } from 'react-bootstrap' 
import uuidv4 from 'uuid/v4';
class Console extends Component {
    constructor(props) {
        super(props);
        this._handleKeyUp = this._handleKeyUp.bind(this);
        this._onChange = this._onChange.bind(this);
        this.renderComponent = this.renderComponent.bind(this);
        this.setNewComplianceState = this.setNewComplianceState.bind(this);

        this.state = {
            history:[],
            currentValue:'',
            newCompliance: false
        }
    }

    componentDidMount () {
        const script = document.createElement("script");
        script.src = "scripts/speech.js";
        script.async = true;
    
        document.body.appendChild(script);
    }

    renderComponent(component, action) {
        if(component === 'compliance') {
            if(action === 'new') {
                this.setState({
                    newCompliance: true
                })
            }
        }
    }

    setNewComplianceState(state) {
        this.setState({
            newCompliance: state
        })
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
                system:false,
                id: uuidv4()
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
                    if(res.component) {
                        this.renderComponent(res.component, res.action)
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
        const {handleClick, show} = this.props;
        let component, myConsole;
        if(this.state.newCompliance) {
            component =   <NewCompliance show={this.state.newCompliance} onHide={() => this.setNewComplianceState(false)}/>;
        }
        if (show) {
            myConsole = (
                <div className="console footer">
                    <div className="consoleheader" style={{padding:'0 1rem'}}>
                    <ButtonToolbar style={{justifyContent:'flex-end'}}>
                    <Button className="test-speech" variant="outline-dark" style={{marginRight: '.5rem'}}>test speech</Button>
                    <Button variant="danger" onClick={handleClick}><i className="fas fa-power-off"></i></Button>      
                    </ButtonToolbar>
                                      
                    </div>
                    <div className="consolebody">
                    {this.state.history.map((h,i) => (
                            <div key={i}>{h}</div>
                        )
                    )}
                    <Newline onKeyUp={this._handleKeyUp} value={this.state.currentValue} onChange={this._onChange}/>
                        
                    </div>
                </div>
            )
        } else {
            myConsole = (
                <div className="consolefooter footer" style={{padding:'0 1rem'}}>
                    <ButtonToolbar style={{justifyContent:'flex-end'}}>
                        <Button variant="danger" onClick={handleClick}><i className="fas fa-power-off"></i></Button>      
                    </ButtonToolbar>
                </div>
            )
        }
        return(
            <div>
                <div>
                    <p className="phrase">Phrase...</p>
                    <p className="result">Right or wrong?</p>
                    <p className="output">...diagnostic messages</p>
                </div>
                {component}
                {myConsole}
            </div>
        )
    }
}

export default Console;