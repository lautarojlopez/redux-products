import types from '../types'

const initialState = {
    products: [],
    error: null,
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case types.ADD_PRODUCT:
            return{
            ...state,
            loading: true
        }
        case types.ADD_PRODUCT_SUCCESS:
            return{
                ...state,
                loading: false,
                products: [...state.products, action.payload]
            }
        case types.ADD_PRODUCT_ERROR:
            return{
                ...state,
                loading: false,
                error: true
            }
        case types.GET_PRODUCTS:
            return{
                ...state,
                loading: true
            }
        case types.GET_PRODUCTS_SUCCESS:
            return{
                ...state,
                loading: false,
                products: action.payload
            }
        case types.GET_PRODUCTS_ERROR:
            return{
                ...state,
                loading: false,
                error: true
            }
        case types.DELETE_PRODUCT:
            return{
                ...state,
                products: state.products.filter(product => product.id !== action.payload)
            }
        default:
            return state
    }
}