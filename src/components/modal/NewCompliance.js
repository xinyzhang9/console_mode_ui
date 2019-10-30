import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Form, Field } from 'react-final-form';
import Styles from '../../styles/Styles'
import { createCompliance } from '../../services/compliance';
import uuidv4 from 'uuid/v4';
class NewCompliance extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        const props = this.props;
        const onSubmit = (values) => {
            console.log(values);
            createCompliance({
                id: uuidv4(),
                name: values.name,
                versions: values.versions,
                status: values.status,
                overspending: values.overspending,
                date: new Date()
            }).then(() => {
                props.onHide();
            })
        }
        return(
            
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    New Compliance
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Styles>
                <Form
                    onSubmit={onSubmit}
                    render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Product Name</label>
                            <Field name="name" component="input" />
                        </div>

                        <div>
                            <label>No.of Versions</label>
                            <Field name="versions" component="input" />
                        </div>
                        <div>
                        <label>Compliance status</label>
                        <div>
                        <label>
                            <Field
                            name="status"
                            component="input"
                            type="radio"
                            value="compliant"
                            />{' '}
                            Compliant
                        </label>
                        <label>
                            <Field
                            name="status"
                            component="input"
                            type="radio"
                            value="noncompliant"
                            />{' '}
                            Noncompliant
                        </label>
                        </div>
                    </div>

                        <div>
                            <label>Overspending</label>
                            <Field name="overspending" component="input" />
                        </div>


                        <Button type="submit">Submit</Button>
                    </form>
                    
                    )}
                />
                </Styles>
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer> */}
                </Modal>
        )
    }
}

export default NewCompliance;