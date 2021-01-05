import React, { Component } from 'react';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import AddProduct from './AddProductComponent';
import ProductDetail from './ProductDetailComponent';
import Product from  './ProductComponent';
import MyProducts from './MyProductsComponent';
import MyOrders from './MyOrdersComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signupUser, loginUser, deleteReview, updatePrice, updateStatus, updateLabel, updateDescription, updateImage,
    logoutUser, postProduct, fetchProducts, postReview, fetchReviews, order, fetchOrders, refund} from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

const mapStateToProps = state => {
    return {
        auth: state.auth,
        products: state.products,
        reviews: state.reviews,
        orders: state.orders
    }
}
const mapDispatchToProps = (dispatch) => ({
    fetchProducts: () => {dispatch(fetchProducts())},
    fetchReviews: () => {dispatch(fetchReviews())},
    fetchOrders: () => {dispatch(fetchOrders())},
    loginUser: (creds) => dispatch(loginUser(creds)),
    signupUser: (creds) => dispatch(signupUser(creds)),
    logoutUser: () => dispatch(logoutUser()),
    postProduct: (name, category, price, label, image, description) => dispatch(postProduct(name, category, price, label, image, description)),
    postReview: (productId, rating, review) => dispatch(postReview(productId, rating, review)),
    deleteReview: (reviewId) => dispatch(deleteReview(reviewId)),
    updateStatus: (productId, status) => dispatch(updateStatus(productId, status)),
    updatePrice: (productId, price) => dispatch(updatePrice(productId, price)),
    updateLabel: (productId, label) => dispatch(updateLabel(productId, label)),
    updateDescription: (productId, description) => dispatch(updateDescription(productId, description)),
    updateImage: (productId, image) => dispatch(updateImage(productId, image)),
    refund: (orderId) => dispatch(refund(orderId)),
    order: (name, image, quantity, price, productId, total, deliverydetails) => dispatch(order(name, image, quantity, price, productId, total, deliverydetails))
});

class Main extends Component {
    componentDidMount() {
        this.props.fetchProducts();
        this.props.fetchReviews();
        this.props.fetchOrders();
    }
    render() {
        const ProductWithId = ({match}) => {
            return(
                <ProductDetail product={this.props.products.products.filter((product) => product._id === match.params.productId)[0]}
                    isLoading={this.props.products.isLoading}
                    errMess={this.props.products.errMess}
                    auth={this.props.auth}
                    reviews={this.props.reviews.reviews.filter((review) => review.product === match.params.productId)}
                    deleteReview={this.props.deleteReview}
                    postReview={this.props.postReview}
                    order={this.props.order}
                />
            );
        }
        return (
            <div>
                <Header auth={this.props.auth}
                loginUser={this.props.loginUser}
                signupUser={this.props.signupUser}
                logoutUser={this.props.logoutUser}/>
                <Switch>
                    <Route exact path='/addproduct' component={() => <AddProduct auth={this.props.auth}
                        postProduct={this.props.postProduct} />} />} />
                    <Route exact path="/products" component={() => <Product products={this.props.products} />}/>
                    <Route path="/products/:productId" component={ProductWithId} />
                    <Route exact path="/home" component={() => <Home products={this.props.products} />}/>
                    <Route exact path="/myorders" component={() => <MyOrders auth={this.props.auth} orders={this.props.orders} refund={this.props.refund}/>}/>
                    <Route exact path="/myproducts" component={() => <MyProducts auth={this.props.auth}
                        products={this.props.products} updatePrice={this.props.updatePrice} updateStatus={this.props.updateStatus}
                        updateLabel={this.props.updateLabel} updateDescription={this.props.updateDescription} updateImage={this.props.updateImage} />}/>
                </Switch>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
