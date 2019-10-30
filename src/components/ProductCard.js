import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import moment from 'moment';

class ProductCard extends Component {
    render() {
        const { content } = this.props;
        return (
            <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" 
                src={'images/'+content.shortname+'.png'} 
                style={{width: '160px', height: '160px',paddingLeft: '10px'}}
            />
            <Card.Body>
                <Card.Title>{content.name}</Card.Title>
                <Card.Text>
                {content.status}
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <small className="text-muted">{moment(content.date).format('l')}</small>
            </Card.Footer>
            </Card>
        )
    }
}

export default ProductCard;
