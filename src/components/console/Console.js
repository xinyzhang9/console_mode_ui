import React, { Component } from 'react';
import '../../styles/Console.css';
import Newline from './Newline';
import { createHistory } from '../../services/history';
import { process } from '../../services/console';
import NewCompliance from '../modal/NewCompliance';
import NewLicense from '../modal/NewLicense';
import GetResource from '../modal/GetResource';
import { Button, ButtonToolbar } from 'react-bootstrap' 
import uuidv4 from 'uuid/v4';

class Console extends Component {
    constructor(props) {
        super(props);
        this._handleKeyUp = this._handleKeyUp.bind(this);
        this._onChange = this._onChange.bind(this);
        this.renderComponent = this.renderComponent.bind(this);
        this.setNewComplianceState = this.setNewComplianceState.bind(this);
        this.setNewLicenseState = this.setNewLicenseState.bind(this);
        this.setGetComplianceState = this.setGetComplianceState.bind(this);
        this.setGetLicenseState = this.setGetLicenseState.bind(this);

        this.state = {
            history:[],
            currentValue:'',
            newCompliance: false,
            newLicense: false,
            getCompliance: false,
            getLicense: false,
            data:[],
            resource: undefined
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
            } else if(action === 'get') {
                this.setState({
                    getCompliance: true
                })
            }
        }
        if(component === 'license') {
            if(action === 'new') {
                this.setState({
                    newLicense: true
                })
            } else if(action === 'get') {
                this.setState({
                    getLicense: true
                })
            }
        }
    }

    setNewComplianceState(state) {
        this.setState({
            newCompliance: state
        })
    }
    setNewLicenseState(state) {
        this.setState({
            newLicense: state
        })
    }
    setGetComplianceState(state) {
        this.setState({
            getCompliance: state
        })
    }
    setGetLicenseState(state) {
        this.setState({
            getLicense: state
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
                    if(res.page !== undefined) {
                        this.props.handleRedirect(res.page);
                    }
                    if(res.component) {
                        this.renderComponent(res.component, res.action)
                    }
                    if(res.resource) {
                        this.setState({
                            resource: res.resource,
                            data: res.data
                        })
                        this.renderComponent(res.resource, res.action)
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
            component = <NewCompliance show={this.state.newCompliance} onHide={() => this.setNewComplianceState(false)}/>;
        }
        if(this.state.newLicense) {
            component = <NewLicense show={this.state.newLicense} onHide={() => this.setNewLicenseState(false)}/>;
        }
        if(this.state.getCompliance) {
            component = <GetResource 
                show={this.state.getCompliance} 
                onHide={() => this.setGetComplianceState(false)}
                data = {this.state.data}
                resource = {this.state.resource}
                />;
        }
        if(this.state.getLicense) {
            component = <GetResource 
                show={this.state.getLicense} 
                onHide={() => this.setGetLicenseState(false)}
                data = {this.state.data}
                resource = {this.state.resource}
                />;
        }
        if (show) {
            myConsole = (
                <div className="console footer">
                    <div className="consoleheader" style={{padding:'0 1rem'}}>
                    <ButtonToolbar style={{justifyContent:'flex-end'}}>
                    <Button className="test-speech" variant="outline-dark" style={{marginRight: '.5rem'}}><i className="fas fa-microphone"></i></Button>
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
                        <Button variant="success" onClick={handleClick}><i className="fas fa-power-off"></i></Button>      
                    </ButtonToolbar>
                </div>
            )
        }
        return(
            <div>
                {component}
                {myConsole}
            </div>
        )
    }
}

export default Console;