import {SHOWS_LOADING, SHOWS_SUCCESS} from '../types'


const initialState = {
    isLoading: false,
    items: [],
    total: 0,
    page: 1,
    size: 0
}


const Reducer = (state = initialState, action) => {
    switch (action.type){
        case SHOWS_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isLoading: false
            }
        case SHOWS_LOADING:
            return {
                ...state,
                isLoading: true
            }
        default:
            return state
    }
}
export default Reducer