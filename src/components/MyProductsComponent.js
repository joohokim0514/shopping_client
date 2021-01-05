import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, Label, Card, CardImg, CardText, CardBody, CardImgOverlay,
    CardTitle,CardSubtitle, Row, Col, Button, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { Control, LocalForm } from 'react-redux-form';

class MyProducts extends Component {
    render() {
        return (
            <div>
            { this.props.auth.isAuthenticated ?
                <div className="container">
                    <Row>
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/products'>Products</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Products</BreadcrumbItem>
                        </Breadcrumb>
                    </Row>
                    <div className="row">
                        <div className="col-12 text-center">
                            <h4>My Uploaded Products</h4>
                            <p>Click image to go to product details</p>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <List products={this.props.products.products.filter((product) => product.seller.username === this.props.auth.user.username)}
                            updatePrice={this.props.updatePrice} updateStatus={this.props.updateStatus}
                            updateLabel={this.props.updateLabel} updateDescription={this.props.updateDescription} updateImage={this.props.updateImage} />
                    </div>
                </div>
            : <Redirect to='/home' /> }
            </div>
        );
    }
}

const List = (props) => {
    const product = props.products.map((product) => {
        return (
            <div key={product._id} className="container col-sm-10">
                <RenderMyItem product={product} updatePrice={props.updatePrice} updateStatus={props.updateStatus}
                    updateLabel={props.updateLabel} updateDescription={props.updateDescription} updateImage={props.updateImage}/>
                <hr/>
            </div>
        );
    });
    return (
        <div className="container">
            {product}
        </div>
    );
}

class RenderMyItem extends Component {

    constructor(props) {
        super(props);
        this.toggleStatusModal = this.toggleStatusModal.bind(this);
        this.togglePriceModal = this.togglePriceModal.bind(this);
        this.toggleLabelModal = this.toggleLabelModal.bind(this);
        this.toggleDescriptionModal = this.toggleDescriptionModal.bind(this);
        this.toggleImageModal = this.toggleImageModal.bind(this);
        this.state = {
          isStatusModalOpen: false,
          isPriceModalOpen: false,
          isLabelModalOpen: false,
          isDescriptionModalOpen: false,
          isImageModalOpen: false
        };
    }

    toggleStatusModal() {
        this.setState({
          isStatusModalOpen: !this.state.isStatusModalOpen
        });
    }
    togglePriceModal() {
        this.setState({
          isPriceModalOpen: !this.state.isPriceModalOpen
        });
    }
    toggleLabelModal() {
        this.setState({
          isLabelModalOpen: !this.state.isLabelModalOpen
        });
    }
    toggleDescriptionModal() {
        this.setState({
          isDescriptionModalOpen: !this.state.isDescriptionModalOpen
        });
    }
    toggleImageModal() {
        this.setState({
          isImageModalOpen: !this.state.isImageModalOpen
        });
    }
    handleStatusSubmit(values) {
        this.toggleStatusModal();
        this.props.updateStatus(this.props.product._id, values.status);
    }
    handlePriceSubmit(values) {
        this.togglePriceModal();
        this.props.updatePrice(this.props.product._id, values.price);
    }
    handleLabelSubmit(values) {
        this.toggleLabelModal();
        this.props.updateLabel(this.props.product._id, values.label);
    }
    handleDescriptionSubmit(values) {
        this.toggleDescriptionModal();
        this.props.updateDescription(this.props.product._id, values.description);
    }
    handleImageSubmit(values) {
        this.toggleImageModal();
        this.props.updateImage(this.props.product._id, values.image);
    }

    render() {
        return(
            <Row>
                <Col xs="4">
                    <Link to={`/products/${this.props.product._id}`} >
                        <CardImg src={this.props.product.image} alt={this.props.product.name} />
                    </Link>
                    <CardBody>
                        <CardSubtitle className="text-center">{this.props.product.name}</CardSubtitle>
                    </CardBody>
                </Col>
                <Col xs="5">
                    <p> Label: {this.props.product.label}<br/>
                    Status: {this.props.product.status}<br/>
                    Price: ${this.props.product.price}<br/>
                    Category: {this.props.product.category}<br/>
                    Details: <br/>{this.props.product.description}</p>
                </Col>
                <Col className="text-center" xs="3">
                    <Button outline onClick={this.toggleStatusModal}> Update Status </Button><br/><br/>
                    <Button outline onClick={this.togglePriceModal}> Update Price </Button><br/><br/>
                    <Button outline onClick={this.toggleLabelModal}> Update Label </Button><br/><br/>
                    <Button outline onClick={this.toggleDescriptionModal}> Update Details </Button><br/><br/>
                    <Button outline onClick={this.toggleImageModal}> Update Image </Button>
                </Col>
                <Modal isOpen={this.state.isStatusModalOpen} toggle={this.toggleStatusModal}>
                    <ModalHeader toggle={this.toggleStatusModal}>Update Item Status</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleStatusSubmit(values)}>
                            <Row className="form-group">
                                <Col>
                                <Label htmlFor="status">Status</Label>
                                <Control.select model=".status" id="status" className="form-control">
                                    <option>-- Choose status --</option>
                                    <option>None</option>
                                    <option>Low in stock</option>
                                    <option>Coming Soon</option>
                                    <option>SOLD OUT</option>
                                </Control.select>
                                </Col>
                            </Row>
                            <Button type="submit" className="bg-primary"> Update </Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.isPriceModalOpen} toggle={this.togglePriceModal}>
                    <ModalHeader toggle={this.togglePriceModal}>Update Item Price</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handlePriceSubmit(values)}>
                           <Row className="form-group">
                               <Label htmlFor="price" md={2} className="text-left">Price</Label>
                               <Col md={10}>
                                   <Control.text model=".price" id="price" className="form-control" />
                               </Col>
                           </Row>
                           <Button type="submit" className="bg-primary"> Update </Button>
                       </LocalForm>
                    </ModalBody>
               </Modal>
               <Modal isOpen={this.state.isLabelModalOpen} toggle={this.toggleLabelModal}>
                  <ModalHeader toggle={this.toggleLabelModal}>Update Item Label</ModalHeader>
                  <ModalBody>
                      <LocalForm onSubmit={(values) => this.handleLabelSubmit(values)}>
                          <Row className="form-group">
                              <Col>
                                  <Label htmlFor="label">Label</Label>
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
                          <Button type="submit" className="bg-primary"> Update </Button>
                      </LocalForm>
                  </ModalBody>
              </Modal>
              <Modal isOpen={this.state.isDescriptionModalOpen} toggle={this.toggleDescriptionModal}>
                 <ModalHeader toggle={this.toggleDescriptionModal}>Update Item Details</ModalHeader>
                 <ModalBody>
                     <LocalForm onSubmit={(values) => this.handleDescriptionSubmit(values)}>
                         <Row className="form-group">
                             <Label htmlFor="description" md={2} className="text-left">Details</Label>
                             <Col md={10}>
                                 <Control.textarea model=".description" id="description" rows="6" className="form-control" />
                             </Col>
                         </Row>
                         <Button type="submit" className="bg-primary"> Update </Button>
                     </LocalForm>
                 </ModalBody>
              </Modal>
              <Modal isOpen={this.state.isImageModalOpen} toggle={this.toggleImageModal}>
                 <ModalHeader toggle={this.toggleImageModal}>Update Item Image</ModalHeader>
                 <ModalBody>
                     <LocalForm onSubmit={(values) => this.handleImageSubmit(values)}>
                         <Row className="form-group">
                             <Label htmlFor="image" md={2} className="text-left">Image</Label>
                             <Col md={10}>
                                 <Control.file model=".image" id="image" className="form-control" />
                             </Col>
                         </Row>
                         <Button type="submit" className="bg-primary"> Update </Button>
                     </LocalForm>
                 </ModalBody>
              </Modal>
            </Row>
        );
    }
}


export default MyProducts;
