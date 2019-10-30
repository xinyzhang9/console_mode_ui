import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import LicenseCell from './LicenseCell';

class LicenseTable extends Component {
    render() {
        const { list } = this.props;
        return(
            <Table striped bordered hover>
            <thead>
                <tr>
                <th>Name</th>
                <th>Publisher</th>
                <th>Code</th>
                <th>Metric</th>
                </tr>
            </thead>
            <tbody>
                {list.map(l => <LicenseCell key={l.id} {...l} />)}
            </tbody>
            </Table>
        )
    }
}

export default LicenseTable;