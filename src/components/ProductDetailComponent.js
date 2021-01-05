import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle,CardSubtitle, Alert, Breadcrumb, BreadcrumbItem, Label, Modal, ModalHeader, ModalBody, Button, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm } from 'react-redux-form';
import { Loading } from './LoadingComponent';

const ProductDetail = (props) => {
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.product != null) {
        return (
            <div className="container">
                <Row>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/products'>Products</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.product.name}</BreadcrumbItem>
                    </Breadcrumb>
                </Row>
                <Row>
                    <div className="col-12">
                        <h3>{props.product.name}</h3>
                        <hr />
                    </div>
                </Row>
                <div className="row">
                    <RenderProduct product={props.product}/>
                    <RenderComments auth={props.auth} reviews={props.reviews} postReview={props.postReview}
                        product={props.product} productId={props.product._id} deleteReview={props.deleteReview}
                        order={props.order}/>
                </div>
            </div>
        );
    }
    else {
        return(
            <div></div>
        );
    }
}

function RenderProduct({product}) {
        return(
            <div className="col-12 col-md-5 ml-5">
                <Card body outline color="info">
                    <CardImg top src={product.image} alt={product.name} />
                    <CardBody>
                        <CardTitle className="text-primary">{product.name}</CardTitle>
                        <CardSubtitle className="text-success">{product.label}</CardSubtitle><br/>
                        <CardSubtitle className="text-danger">{product.status}</CardSubtitle><br/>
                        <CardText>Price: ${product.price}</CardText>
                        <CardText>Category: {product.category}</CardText>
                        <CardText>Seller: {product.seller.firstname} {product.seller.lastname}</CardText>
                        <CardText>Details: <br/>{product.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
}

class RenderComments extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return(
            <div className="col-12 col-md-5 ml-5">
                { this.props.auth.isAuthenticated && (this.props.auth.user.username!=this.props.product.seller.username) ?
                    <React.Fragment>
                        <h5>Order Product</h5>
                        <OrderForm product={this.props.product} order={this.props.order} auth={this.props.auth}/><hr />
                    </React.Fragment>
                : null }
                { this.props.auth.isAuthenticated ?
                    <React.Fragment>
                        <Row>
                            <Col sm="6">
                                <h5>Reviews</h5>
                            </Col>
                            <Col>
                                <CommentForm productId={this.props.productId} postReview={this.props.postReview} />
                            </Col>
                        </Row>
                        <br/>
                    </React.Fragment>
                : <React.Fragment> <h5>Reviews</h5><br/> </React.Fragment> }
                { this.props.auth.isAuthenticated ?
                    <ul className="list-unstyled">
                        {this.props.reviews.map((review) => {
                            return (
                                <div key={review._id}>
                                    {review.author.firstname} {review.author.lastname} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(review.updatedAt)))}
                                    {" "}
                                    {this.props.auth.user.username===review.author.username ?
                                        <Button outline onClick={() => this.props.deleteReview(review._id)} size="sm">Delete</Button>
                                        : null
                                    }
                                    <br/>
                                    {review.rating} stars <br/>
                                {review.review} <br/><br/>
                                </div>
                            );
                        })}
                    </ul>
                :
                    <ul className="list-unstyled">
                        {this.props.reviews.map((review) => {
                            return (
                                <div key={review._id}>
                                    {review.author.firstname} {review.author.lastname} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(review.updatedAt)))}
                                    <br/>
                                    {review.rating} stars <br/>
                                {review.review} <br/><br/>
                                </div>
                            );
                        })}
                    </ul>
                }
            </div>
        );
    }
}

class OrderForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOrderedModalOpen: false,
            quantity: 1,
            total: parseFloat(this.props.product.price).toFixed(2)
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.toggleOrderedModal = this.toggleOrderedModal.bind(this);
    }
    handleSubmit(values) {
        this.toggleOrderedModal();
        this.props.order(this.props.product.name, this.props.product.image, this.state.quantity,
            parseFloat(this.props.product.price).toFixed(2), this.props.product._id, 
            this.state.total, values.deliverydetails);
    }
    handleChange(values) {
        this.setState({
            quantity: values.quantity,
        });
        this.setState({
            total: (parseFloat(this.props.product.price)*values.quantity).toFixed(2)
        });
    }
    toggleOrderedModal() {
        this.setState({
          isOrderedModalOpen: !this.state.isOrderedModalOpen
        });
    }
    render() {
        return (
            <div>
                <LocalForm onSubmit={(values) => this.handleSubmit(values)} onChange={(values) => this.handleChange(values)}>
                    <Row className="form-group">
                        <Label htmlFor="quantity" md={4} className="text-left">Quantity</Label>
                        <Col>
                            <Control type="number" model=".quantity" id="quantity" className="form-control"
                                min={1}/>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Col>
                        <Label htmlFor="deliverydetails">Delivery Details  (optional)</Label>
                        <Control.textarea model=".deliverydetails" id="deliverydetails" rows="2" className="form-control"
                            placeholder="Ex) If absent, leave in front of the door"/>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Col md={4}> Total: </Col>
                        <Col className="text-right">
                            ${this.props.product.price} x {this.state.quantity}
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Col className="text-right">
                            = ${this.state.total}
                        </Col>
                    </Row>
                    <Button type="submit" className="bg-info float-right">Order</Button><br/><br/>
                </LocalForm>
                <Modal isOpen={this.state.isOrderedModalOpen} toggle={this.toggleOrderedModal}>
                    <ModalBody className="text-center">
                        <p>Thank you {this.props.auth.user.username}, your item has been ordered.</p>
                        <p> View your order in the 'My Orders' section. </p>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.toggleModal = this.toggleModal.bind(this);
        this.toggleReviewedModal = this.toggleReviewedModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
          isModalOpen: false,
          isReviewedModalOpen: false
        };
    }
    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    }
    toggleReviewedModal() {
        this.setState({
          isReviewedModalOpen: !this.state.isReviewedModalOpen
        });
    }
    handleSubmit(values) {
        this.toggleModal();
        this.props.postReview(this.props.productId, values.rating, values.review);
        this.toggleReviewedModal();
    }
    render() {
        return(
        <div>
            <Button outline className="float-right" onClick={this.toggleModal}>
                <span className="fa fa-pencil fa-lg"></span> Write a Review</Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Write a Review</ModalHeader>
            <ModalBody>
                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                    <Row className="form-group">
                        <Col>
                        <Label htmlFor="rating">Rating</Label>
                        <Control.select model=".rating" id="rating" className="form-control">
                            <option>-- Choose rating --</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Control.select>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Col>
                        <Label htmlFor="review">Review Details</Label>
                        <Control.textarea model=".review" id="review" rows="6" className="form-control" />
                        </Col>
                    </Row>
                    <Button type="submit" className="bg-primary">Post</Button>
                </LocalForm>
            </ModalBody>
           </Modal>
           <Modal isOpen={this.state.isReviewedModalOpen} toggle={this.toggleReviewedModal}>
               <ModalBody className="text-center">
                   <p>Your review has been posted!</p>
               </ModalBody>
           </Modal>
        </div>
        );
    }
}

export default ProductDetail;
