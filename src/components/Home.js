import React, { Component } from 'react';
import {Jumbotron, Button} from 'react-bootstrap'
class Home extends Component {
    render() {
        return (
            <Jumbotron>
            <h1>Hello!</h1>
            <p>
              This is an experimental UI with embedded console control. You can have an experience with how powerful this console can be!
            </p>
            <p>
              <Button variant="primary">Learn more</Button>
            </p>
          </Jumbotron>
        )
    }
}

export default Home;