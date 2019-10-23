import React, { Component } from 'react';
import '../../styles/Newline.css';

class Newline extends Component {
    render() {  
        return (
            <div>
                <div className="prefix">></div>
                <input 
                    className="fullwidth" 
                    type="text" 
                    onKeyUp={this.props.onKeyUp} 
                    value={this.props.value} 
                    onChange={this.props.onChange}/>
            </div>
        )
    }
}

export default Newline;