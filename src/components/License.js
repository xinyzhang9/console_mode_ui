import React, { Component } from 'react';
import NewLicense from './modal/NewLicense';
import { loadLicense } from '../services/license';
import { ButtonToolbar, Button } from 'react-bootstrap';
import LicenseTable from './LicenseTable';

class License extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
            list: []
        }
        this.setModalShow = this.setModalShow.bind(this);
        this.setModalHide = this.setModalHide.bind(this);
    }
    componentDidMount() {
        loadLicense().then(data => {
            this.setState({list : data})
        });
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
                <LicenseTable list={this.state.list}/>
                <ButtonToolbar>
                <Button variant="outline-dark" onClick={() => this.setModalShow()}>
                <i className="fas fa-plus"></i>
                </Button>
            </ButtonToolbar>
                <NewLicense show={this.state.modalShow} onHide={this.setModalHide} />
            </div>
        )
    }
}

export default License;