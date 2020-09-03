import {combineReducers} from 'redux'
import url from "../../utils/url"
import { FETCH_DATA } from "../middleware/api"
import { schema } from "./entities/products"

export const params = {
    PATH_LIKES: 'likes',
    PATH_DISCOUNTS: 'discounts',
    PAGE_SIZE_LIKES: 5,
    PAGE_SIZE_DISCOUNTS: 3
}

export const types = {
    FETCH_LIKES_REQUEST: "HOME/FETCH_LIKES_REQUEST",
    FETCH_LIKES_SUCCESS: "HOME/FETCH_LIKES_SUCCESS",
    FETCH_LIKES_FAILURE: "HOME/FETCH_LIKES_FAILURE",
    FETCH_DISCOUNT_REQUEST: "HOME/FETCH_DISCOUNT_REQUEST",
    FETCH_DISCOUNT_SUCCESS: "HOME/FETCH_DISCOUNT_SUCCESS",
    FETCH_DISCOUNT_FAILURE: "HOME/FETCH_DISCOUNT_FAILURE"
}

const initialState = {
    likes:{
        isFetching: false,
        pageCount: 0,
        ids: []
    },
    discounts:{
        isFetching: false,        
        ids: []
    }
}

export const actions = {
    loadLikes: () => {
        return (dispatch, getState) => {
            const {pageCount} = getState().home.likes;
            const rowIndex = pageCount * params.PAGE_SIZE_LIKES
            const endpoint = url.getProductList(params.PATH_LIKES, rowIndex, params.PAGE_SIZE_LIKES)
            return dispatch(fetchLikes(endpoint))
        }
    },
    loadDiscounts: () => {
        return (dispatch, getState) => {
            const {ids} = getState().home.discounts
            if(ids.length > 0){
                return null;
            }
            const endpoint = url.getProductList(params.PATH_DISCOUNTS, 0, params.PAGE_SIZE_DISCOUNTS)
            return dispatch(fetchDiscounts(endpoint))
        }
    }
    // loadLikes: () => {
    //     return (dispatch, getState) => {
    //         dispatch(fetchLikesRequest());
    //         return get(url.getProductList(0, 10)).then(
    //             data => {
    //                 dispatch(fetchLikesSuccess(data))
    //             },
    //             error => {
    //                 dispatch(fetchLikesFailure(error))
    //             }
    //         )

    //     }
    // }
}

const fetchLikes = (endpoint, params) => ({
    [FETCH_DATA]: {
        types: [
            types.FETCH_LIKES_REQUEST,
            types.FETCH_LIKES_SUCCESS,
            types.FETCH_LIKES_FAILURE
        ],
        endpoint,
        schema
    },
    params
})

const fetchDiscounts = (endpoint, params) => ({
    [FETCH_DATA]: {
        types: [
            types.FETCH_DISCOUNT_REQUEST,
            types.FETCH_DISCOUNT_SUCCESS,
            types.FETCH_DISCOUNT_FAILURE
        ],
        endpoint,
        schema
    },
    params
})

// const fetchLikesRequest = () => ({
//     type: types.FETCH_LIKES_REQUEST
// })

// const fetchLikesSuccess = (data) => ({
//     type: types.FETCH_LIKES_SUCCESS,
//     data
// })

// const fetchLikesFailure = (error) => ({
//     type: types.FETCH_LIKES_FAILURE,
//     error
// })

const likes = (state = initialState.likes, action) => {
    switch(action.type){
        case types.FETCH_LIKES_REQUEST:
            return {...state, isFetching: true};
        case types.FETCH_LIKES_SUCCESS:
            return {
                ...state,
                isFetching: false,
                pageCount: state.pageCount + 1,
                ids: state.ids.concat(action.response.ids)
            }
        case types.FETCH_LIKES_FAILURE:
            return {...state, isFetching: false};
        default:
            return state;
    }
}

const discounts = (state = initialState.discounts, action) => {
    switch(action.type){
        case types.FETCH_DISCOUNT_REQUEST:
            return {...state, isFetching: true};
        case types.FETCH_DISCOUNT_SUCCESS:
            return {
                ...state,
                isFetching: false,
                ids: state.ids.concat(action.response.ids)
            }
        case types.FETCH_DISCOUNT_FAILURE:
            return {...state, isFetching: false};
        default:
            return state;
    }
}

const reducer = combineReducers({
    likes,
    discounts
})

// const reducer = (state = {}, action) => {
//     switch(action.type){
//         case types.FETCH_LIKES_REQUEST:
//         case types.FETCH_LIKES_SUCCESS:
//         case types.FETCH_LIKES_FAILURE:
//         default:
//             return state;
//     }
// }

export default reducer;

//selectors
export const getLikes = state => {
    return state.home.likes.ids.map(id => {
        return state.entities.products[id]
    })
}

export const getDiscounts = state => {
    return state.home.discounts.ids.map(id => {
        return state.entities.products[id]
    })
}

export const getPageCountOfLikes = state => {
    return state.home.likes.pageCount
}