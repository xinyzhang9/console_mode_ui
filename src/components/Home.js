import React, { Component } from 'react';
import { loadTodos } from '../services'
class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todos:[]
        }
    } 
    componentDidMount() {
        loadTodos().then(data => {
            this.setState({todos : data})
        });
    }

    render() {
        return (
            <div>
                {this.state.todos.map(todo => (
                    <div>{todo.name}</div>
                ))}
                {/* <img alt="" src="images/linux-icon.png" /> */}
            </div>
        )
    }
}

export default Home;