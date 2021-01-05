import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label, Row, Col, Modal, ModalBody} from 'reactstrap';
import { Redirect } from 'react-router-dom'
import { Control, LocalForm } from 'react-redux-form';

class AddProduct extends Component  {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
            { this.props.auth.isAuthenticated ?
                <div className="container text-center">
                    <h4>Welcome, {this.props.auth.user.username} </h4>
                    <p>Add your new item below.</p>
                    <br/>
                    <div className="container">
                        <ProductForm postProduct={this.props.postProduct}/>
                    </div>
                    <br/>
                </div>
            : <Redirect to='/home' /> }
            </div>
        );
    }
}

class ProductForm extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleConfirmationModal = this.toggleConfirmationModal.bind(this);
        this.state={
            isConfirmationModalOpen: false
        };
    }

    handleSubmit(values) {
        this.props.postProduct(values.name, values.category, values.price, values.label, values.image, values.description);
        this.toggleConfirmationModal();
    }

    toggleConfirmationModal() {
        this.setState({
            isConfirmationModalOpen: !this.state.isConfirmationModalOpen
        });
    }

    render() {
        return(
        <div>
            <LocalForm onSubmit={this.handleSubmit}>
                <Row className="form-group">
                    <Label htmlFor="name" md={2} className="text-left">Item Name</Label>
                    <Col md={10}>
                        <Control.text model=".name" id="name" className="form-control" />
                    </Col>
                </Row>
                <Row className="form-group">
                    <Label htmlFor="category" md={2} className="text-left">Item Category</Label>
                    <Col md={10}>
                        <Control.select model=".category" id="category" className="form-control">
                            <option>-- Choose Category --</option>
                            <option>Electronics</option>
                            <option>Books</option>
                            <option>Movies and Music</option>
                            <option>Fashion</option>
                            <option>Beauty and Personal Care</option>
                            <option>Food and Kitchen</option>
                            <option>Tools and Home Improvement</option>
                            <option>Other</option>
                        </Control.select>
                    </Col>
                </Row>
                <Row className="form-group">
                    <Label htmlFor="price" md={2} className="text-left">Item Price</Label>
                    <Col md={10}>
                        <Control.text model=".price" id="price" className="form-control" />
                    </Col>
                </Row>
                <Row className="form-group">
                    <Label htmlFor="label" md={2} className="text-left">Item Label</Label>
                    <Col md={10}>
                        <Control.select model=".label" id="label" className="form-control">
                            <option>-- Choose Label --</option>
                            <option>TRENDING</option>
                            <option>HOT</option>
                            <option>SALE</option>
                            <option>NEW</option>
                            <option>FREE SHIPPING</option>
                        </Control.select>
                    </Col>
                </Row>
                <Row className="form-group">
                    <Label htmlFor="image" md={2} className="text-left">Item Image</Label>
                    <Col md={10}>
                        <Control.file model=".image" id="image" className="form-control" />
                    </Col>
                </Row>
                <Row className="form-group">
                    <Label htmlFor="description" md={2} className="text-left">Item Description</Label>
                    <Col md={10}>
                        <Control.textarea model=".description" id="description" rows="6" className="form-control" />
                    </Col>
                </Row>
                <Button type="submit" value="submit" color="primary" size="lg">Add Item</Button>
            </LocalForm>
            <Modal isOpen={this.state.isConfirmationModalOpen} toggle={this.toggleConfirmationModal}>
                <ModalBody className="text-center">
                    <p>Your product has been added. Go to "My Products" or products list to check</p>
                </ModalBody>
            </Modal>
        </div>
        );
    }
}



export default AddProduct;
