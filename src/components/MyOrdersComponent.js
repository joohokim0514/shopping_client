import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, Label, Card, CardImg,CardSubtitle, Row, Col, Button, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';

class MyOrders extends Component {
    render() {
        return (
            <div>
            { this.props.auth.isAuthenticated ?
                <div className="container">
                    <Row>
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/products'>Products</Link></BreadcrumbItem>
                            <BreadcrumbItem active>My Orders</BreadcrumbItem>
                        </Breadcrumb>
                    </Row>
                    <div className="row">
                        <div className="col-12 text-center">
                            <h4>My Orders</h4>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <List refund={this.props.refund} orders={this.props.orders.orders.filter((order) => this.props.auth.user.username === order.buyer.username)}/>
                    </div>
                </div>
            : <Redirect to='/home' /> }
            </div>
        );
    }
}

const List = (props) => {
    const orders = props.orders.map((order) => {
        return (
            <div key={order._id} className="container col-sm-7">
                <RenderMyOrder order={order} refund={props.refund}/>
                <hr/>
            </div>
        );
    });
    return (
        <div className="container">
            {orders}
        </div>
    );
}

class RenderMyOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.requestRefund = this.requestRefund.bind(this);
    }
    requestRefund() {
        this.props.refund(this.props.order._id);
    }
    render() {
        return(
            <Row>
                <Col xs="3">
                    <Link to={`/products/${this.props.order.productId}`} >
                        <CardImg src={this.props.order.image} alt={this.props.order.name} />
                    </Link>
                </Col>
                <Col>
                    <CardSubtitle className="text-center text-success">{this.props.order.name}</CardSubtitle><br/>
                    <Row>
                        <Col md={6}>
                            Quantity: {this.props.order.quantity}<br/>
                            Price: ${this.props.order.price}<br/>
                            Order Date: {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(this.props.order.updatedAt)))}
                        </Col>
                        <Col>
                            Order Status: {this.props.order.status}<br/>
                            Order Total: ${this.props.order.total}<br/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

export default MyOrders;

// { this.props.order.status!=="refunded" ?
//     <Button outline size="sm" onClick={this.requestRefund()}> Request refund </Button>
// : null }
