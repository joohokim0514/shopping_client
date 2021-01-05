import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import '../App.css';

class Header extends Component  {
    constructor(props) {
            super(props);
            this.state = {
                isNavOpen: false,
                isModalOpen: false,
                isSignupModalOpen: false,
                isRegistrationModalOpen: false,
            };
            this.toggleNav = this.toggleNav.bind(this);
            this.toggleModal = this.toggleModal.bind(this);
            this.toggleSignupModal = this.toggleSignupModal.bind(this);
            this.toggleRegistrationModal = this.toggleRegistrationModal.bind(this);
            this.handleLogin = this.handleLogin.bind(this);
            this.handleSignup = this.handleSignup.bind(this);
            this.handleLogout = this.handleLogout.bind(this);
    }
    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    toggleSignupModal() {
        this.setState({
            isSignupModalOpen: !this.state.isSignupModalOpen
        });
    }
    toggleRegistrationModal() {
        this.setState({
            isRegistrationModalOpen: !this.state.isRegistrationModalOpen
        });
    }
    handleLogin(event) {
        this.toggleModal();
        this.props.loginUser({username: this.username.value, password: this.password.value});
        event.preventDefault();

    }
    handleSignup(event) {
        this.toggleSignupModal();
        this.props.signupUser({firstname: this.firstname.value, lastname: this.lastname.value,
            username: this.username.value, password: this.password.value});
        this.toggleRegistrationModal();
        event.preventDefault();
    }
    handleLogout() {
        this.props.logoutUser();
    }

    render() {
        return (
            <React.Fragment>
                <Navbar color="info" dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                            <NavbarBrand className="mr-auto" href="/home">
                                <img src="images/images.png" height="40" width="40"
                                    alt="Ristorante Con Fusion"/>{" "}
                                Web Store
                            </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar className="col-12 col-sm-8 ml-5">
                                <NavItem>
                                    <NavLink className="nav-link" to="/home"> Home </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/products"> Products </NavLink>
                                </NavItem>
                                <NavItem>
                                    { this.props.auth.isAuthenticated ?
                                        <NavLink className="nav-link" to="/myproducts"> My Products </NavLink>
                                        : null
                                    }
                                </NavItem>
                                <NavItem>
                                    { this.props.auth.isAuthenticated ?
                                        <NavLink className="nav-link" to="/myorders"> My Orders </NavLink>
                                        : null
                                    }
                                </NavItem>
                                <NavItem>
                                    { this.props.auth.isAuthenticated ?
                                        <NavLink className="nav-link" to="/addproduct"> Add Item </NavLink>
                                        : null
                                    }
                                </NavItem>
                            </Nav>
                            <Nav className="ml-5" navbar>
                                <NavItem>
                                    { !this.props.auth.isAuthenticated ?
                                        <Button color="light" outline onClick={this.toggleModal}>
                                            <span className="fa fa-sign-in fa-lg"></span> Login
                                            {this.props.auth.isFetching ?
                                                <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                : null
                                            }
                                        </Button>
                                        :
                                        <div>
                                        <div className="navbar-text mr-3">{this.props.auth.user.username}</div>
                                        <Button color="light" outline onClick={this.handleLogout}>
                                            <span className="fa fa-sign-out fa-lg"></span> Logout
                                            {this.props.auth.isFetching ?
                                                <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                : null
                                            }
                                        </Button>
                                        </div>
                                    }
                                </NavItem>
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    { !this.props.auth.isAuthenticated ?
                                        <Button color="light" outline onClick={this.toggleSignupModal}>
                                            <span className="fa fa-user-plus fa-lg"></span> SignUp
                                            {this.props.auth.isFetching ?
                                                <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                : null
                                            }
                                        </Button>
                                        : null
                                    }
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
                <Jumbotron className="webstorejumbotron">
                    <div className="container">
                        <div className="row row-header text-uppercase text-center">
                            <div className="col-12">
                                <h1>Web Store</h1>
                                <p>Shop smart and explore yourself on Web Store!</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username"
                                    innerRef={(input) => this.username = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                    innerRef={(input) => this.password = input}  />
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="remember"
                                    innerRef={(input) => this.remember = input}  />
                                    Remember me
                                </Label>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Login</Button>
                        </Form>
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.isSignupModalOpen} toggle={this.toggleSignupModal}>
                    <ModalHeader toggle={this.toggleSignupModal}>Join the Community</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSignup}>
                            <FormGroup>
                                <Label htmlFor="username">First Name</Label>
                                <Input type="text" id="firstname" name="firstname"
                                    innerRef={(input) => this.firstname = input} />
                            </FormGroup><FormGroup>
                                <Label htmlFor="lastname">Last Name</Label>
                                <Input type="text" id="lastname" name="lastname"
                                    innerRef={(input) => this.lastname = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username"
                                    innerRef={(input) => this.username = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                    innerRef={(input) => this.password = input}  />
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">SignUp</Button>
                        </Form>
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.isRegistrationModalOpen} toggle={this.toggleRegistrationModal}>
                    <ModalBody className="text-center">
                        <p><h5>Welcome to our community. Login now!</h5></p>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

export default Header;
