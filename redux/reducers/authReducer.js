import types from "../types"

const initialState = {
    loading: false,
    error: null,
    message: null
}

export default function(state = initialState, action){
    switch (action.type) {

        case types.REGISTER_USER:
            return{
                ...state,
                loading: true
            }
        case types.REGISTER_USER_SUCCESS:
            return{
                ...state,
                loading: false,
                error: false,
                message: null
            }
        case types.REGISTER_USER_ERROR:
            return{
                ...state,
                loading: false,
                error: true,
                message: action.payload
            }
        case types.LOGIN_USER:
            return{
                ...state,
                loading: true
            }
        case types.LOGIN_USER_SUCCESS:
            return{
                ...state,
                loading: false,
                error: false,
                message: null
            }
        case types.LOGIN_USER_ERROR:
            return{
                ...state,
                loading: false,
                error: true,
                message: action.payload
            }

        default:
            return state
    }
}