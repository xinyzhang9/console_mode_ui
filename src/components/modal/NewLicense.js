import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Form, Field } from 'react-final-form';
import Styles from '../../styles/Styles'
import { createLicense } from '../../services/license';
import uuidv4 from 'uuid/v4';
class NewLicense extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        const props = this.props;
        const onSubmit = (values) => {
            console.log(values);
            createLicense({
                id: uuidv4(),
                name: values.name,
                publisher: values.publisher,
                code: values.code,
                metric: values.metric,
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
                    New License Rule
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Styles>
                <Form
                    onSubmit={onSubmit}
                    render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Name</label>
                            <Field name="name" component="input" />
                        </div>
                        <div>
                            <label>Publisher</label>
                            <Field name="publisher" component="input" />
                        </div>
                        <div>
                            <label>Metric</label>
                            <Field name="metric" component="input" />
                        </div>
                        <div>
                            <label>Code</label>
                            <Field name="code" component="input" />
                        </div>
                        <Button type="submit">Submit</Button>
                    </form>
                    
                    )}
                />
                </Styles>
                </Modal.Body>
                </Modal>
        )
    }
}

export default NewLicense;