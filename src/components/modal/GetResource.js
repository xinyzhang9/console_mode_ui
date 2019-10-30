import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
class GetResource extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        const props = this.props;
        console.log('modal')
        return(
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    {props.resource.toUpperCase()}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   {props.data.map(d => (
                       <p>
                           {Object.keys(d).filter(k => k !== 'id').map(k => (
                               <span>{d[k]+' | '}</span>
                           ))}
                        </p>
                   ))}
                </Modal.Body>
                </Modal>
        )
    }
}

export default GetResource;