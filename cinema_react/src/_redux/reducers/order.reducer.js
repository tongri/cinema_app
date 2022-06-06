import {ORDER_LOADING, ORDER_SUCCESS} from '../types'

const initialState = {
    isLoading: false,
    items: [],
    total: 0,
    page: 1,
    size: 0
}


const Reducer = (state = initialState, action) => {
    switch (action.type){
        case ORDER_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isLoading: false,
            }
        case ORDER_LOADING:
            return {
                ...state,
                isLoading: true,
                total: 0,
            }
        default:
            return state
    }
}
export default Reducer
