import React, { Component } from 'react';
import NewCompliance from './modal/NewCompliance';
import { ButtonToolbar, Button, CardGroup } from 'react-bootstrap';
import { loadCompliance } from '../services/compliance';
import ProductCard from './ProductCard';
class Compliance extends Component {
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
        loadCompliance().then(data => {
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
            <CardGroup>
                {this.state.list.map((c) => (
                    <ProductCard content={c} key={c.id}/>
                ))}
            </CardGroup>
            <ButtonToolbar>
                <Button variant="outline-dark" onClick={() => this.setModalShow()}>
                <i className="fas fa-plus"></i>
                </Button>
            </ButtonToolbar>
                <NewCompliance show={this.state.modalShow} onHide={this.setModalHide} />
            </div>
        )
    }
}

export default Compliance;