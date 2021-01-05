import * as ActionTypes from './ActionTypes';

export const Reviews = (state = {
        errMess: null,
        reviews: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_REVIEWS:
            return {...state, isLoading: false, errMess: null, reviews: action.payload};
        case ActionTypes.REVIEWS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, reviews: []};
        case ActionTypes.ADD_REVIEW:
            var review = action.payload;
            return {...state, reviews: state.reviews.concat(review)};
        default:
            return state;
    }
}
