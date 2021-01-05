import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';
var FormData = require('form-data');

//LOGIN, SIGNUP, LOGOUT
export const requestLogin = (creds) => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
        creds
    }
}
export const receiveLogin = (response) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: response.token
    }
}
export const loginError = (message) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message
    }
}
export const loginUser = (creds) => (dispatch) => {
    dispatch(requestLogin(creds))
    return fetch(baseUrl + 'users/login', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(creds)
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            throw error;
        })
    .then(response => response.json())
    .then(response => {
        if (response.success) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('creds', JSON.stringify(creds));
            //dispatch(fetchFavorites());
            dispatch(receiveLogin(response));
        }
        else {
            var error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(error => dispatch(loginError(error.message)))
};
export const requestSignup = (creds) => {
    return {
        type: ActionTypes.SIGNUP_REQUEST,
        creds
    }
}
export const receiveSignup = (response) => {
    return {
        type: ActionTypes.SIGNUP_SUCCESS,
        token: response.token
    }
}
export const signupError = (message) => {
    return {
        type: ActionTypes.SIGNUP_FAILURE,
        message
    }
}
export const signupUser = (creds) => (dispatch) => {
    dispatch(requestSignup(creds))
    return fetch(baseUrl + 'users/signup', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(creds)
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            throw error;
        })
    .then(response => response.json())
    .then(response => {
        if (response.success) {
            localStorage.setItem('creds', JSON.stringify(creds));
            dispatch(receiveSignup(response));
        }
        else {
            var error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(error => dispatch(signupError(error.message)))
};
export const requestLogout = () => {
    return {
      type: ActionTypes.LOGOUT_REQUEST
    }
}
export const receiveLogout = () => {
    return {
      type: ActionTypes.LOGOUT_SUCCESS
    }
}
export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout())
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    dispatch(receiveLogout())
}



//PRODUCTS
export const addProduct = (product) => ({
    type: ActionTypes.ADD_PRODUCT,
    payload: product
});
export const postProduct = (name, category, price, label, image, description) => (dispatch) => {
    var formData = new FormData();
        formData.append("name", name);
        formData.append("category", category);
        formData.append("price", price);
        formData.append("label", label);
        formData.append("image", image);
        formData.append("description", description);
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'addproduct', {
        method: 'POST',
        body: formData,
        headers: {
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(addProduct(response)))
    .then(response => dispatch(fetchProducts()))
    .catch(error => { console.log('Post products ', error.message);
        alert('Your product could not be posted\nError: '+ error.message); })
};
export const fetchProducts = () => (dispatch) => {
    dispatch(productsLoading(true));
    return fetch(baseUrl + 'products')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(products => dispatch(addProducts(products)))
        .catch(error => dispatch(productsFailed(error.message)));
}
export const productsLoading = () => ({
    type: ActionTypes.PRODUCTS_LOADING
});
export const productsFailed = (errmess) => ({
    type: ActionTypes.PRODUCTS_FAILED,
    payload: errmess
});
export const addProducts = (products) => ({
    type: ActionTypes.ADD_PRODUCTS,
    payload: products
});



//UPDATE PRODUCT
export const updateStatus = (productId, status) => (dispatch) => {
    const updates = {
        _id: productId,
        status: status
    }
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'addproduct/updatestatus', {
        method: 'PUT',
        body: JSON.stringify(updates),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(fetchProducts()))
    .catch(error => { console.log('Update status: ', error.message);})
}
export const updatePrice = (productId, price) => (dispatch) => {
    const updates = {
        _id: productId,
        price: price
    }
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'addproduct/updateprice', {
        method: 'PUT',
        body: JSON.stringify(updates),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(fetchProducts()))
    .catch(error => { console.log('Update price: ', error.message);})
}
export const updateLabel = (productId, label) => (dispatch) => {
    const updates = {
        _id: productId,
        label: label
    }
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'addproduct/updatelabel', {
        method: 'PUT',
        body: JSON.stringify(updates),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(fetchProducts()))
    .catch(error => { console.log('Update label: ', error.message);})
}
export const updateDescription = (productId, description) => (dispatch) => {
    const updates = {
        _id: productId,
        description: description
    }
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'addproduct/updatedescription', {
        method: 'PUT',
        body: JSON.stringify(updates),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(fetchProducts()))
    .catch(error => { console.log('Update description: ', error.message);})
}
export const updateImage = (productId, image) => (dispatch) => {
    var formData = new FormData();
        formData.append("_id", productId);
        formData.append("image", image);
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'addproduct/updateimage', {
        method: 'PUT',
        body: formData,
        headers: {
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(fetchProducts()))
    .catch(error => { console.log('Update image: ', error.message);})
}



//REVIEWS
export const addReview = (review) => ({
    type: ActionTypes.ADD_REVIEW,
    payload: review
});
export const postReview = (productId, rating, review) => (dispatch) => {
    const newReview = {
        product: productId,
        rating: rating,
        review: review
    }
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'reviews', {
        method: 'POST',
        body: JSON.stringify(newReview),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(addReview(response)))
    .catch(error => { console.log('Post reviews ', error.message);})
}
export const fetchReviews = () => (dispatch) => {
    return fetch(baseUrl + 'reviews')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(reviews => dispatch(addReviews(reviews)))
        .catch(error => dispatch(reviewsFailed(error.message)));
}
export const reviewsFailed = (errmess) => ({
    type: ActionTypes.REVIEWS_FAILED,
    payload: errmess
});
export const addReviews = (reviews) => ({
    type: ActionTypes.ADD_REVIEWS,
    payload: reviews
});
export const deleteReview = (reviewId) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'reviews', {
        method: "DELETE",
        body: JSON.stringify({"_id": reviewId}),
        headers: {
            "Content-Type": "application/json",
            'Authorization': bearer
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(reviews => { console.log('Review Deleted', reviews); dispatch(addReviews(reviews)); })
    .catch(error => dispatch(reviewsFailed(error.message)));
};



//ORDERS
export const addOrder = (order) => ({
    type: ActionTypes.ADD_ORDER,
    payload: order
});
export const order = (name, image, quantity, price, productId, total, deliverydetails) => (dispatch) => {
    const newOrder = {
        name: name,
        image: image,
        quantity: quantity,
        price: price,
        productId: productId,
        total: total,
        deliverydetails: deliverydetails
    }
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'orders', {
        method: 'POST',
        body: JSON.stringify(newOrder),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(addOrder(response)))
    .catch(error => { console.log('Post orders ', error.message);})
}
export const refund = (orderId) => (dispatch) => {
    const refundInfo = {
        orderId: orderId
    }
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'orders', {
        method: 'PUT',
        body: JSON.stringify(refundInfo),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(fetchOrders()))
    .catch(error => { console.log('Request refund: ', error.message);})
}
export const fetchOrders = () => (dispatch) => {
    return fetch(baseUrl + 'orders')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(orders => dispatch(addOrders(orders)))
        .catch(error => dispatch(ordersFailed(error.message)));
}
export const ordersFailed = (errmess) => ({
    type: ActionTypes.ORDERS_FAILED,
    payload: errmess
});
export const addOrders = (orders) => ({
    type: ActionTypes.ADD_ORDERS,
    payload: orders
});
