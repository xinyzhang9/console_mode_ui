import React, { Component } from 'react';
import NewCompliance from './modal/NewCompliance';
import { ButtonToolbar, Button } from 'react-bootstrap';
class Compliance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShow: false
        }
        this.setModalShow = this.setModalShow.bind(this);
        this.setModalHide = this.setModalHide.bind(this);
    }
    setModalShow() {
        this.setState({
            modalShow: true
        })
    }

    setModalHide() {
        this.setState({
            modalShow: false
        })
    }
    render() {
        return (
            <div>
                <ButtonToolbar>
                    <Button variant="primary" onClick={() => this.setModalShow()}>
                        create
                    </Button>
                </ButtonToolbar>
                <NewCompliance show={this.state.modalShow} onHide={this.setModalHide} />
            </div>
        )
    }
}

export default Compliance;