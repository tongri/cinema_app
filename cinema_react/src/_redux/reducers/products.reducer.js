import {PRODUCTS_SUCCESS, PRODUCTS_LOADING} from '../types'


const initialState = {
    isLoading: false,
    items: [],
    total: 0,
    page: 1,
    size: 0
}


const Reducer = (state = initialState, action) => {
    switch (action.type){
        case PRODUCTS_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isLoading: false
            }
        case PRODUCTS_LOADING:
            return {
                ...state,
                isLoading: true
            }
        default:
            return state
    }
}
export default Reducer