import {PLACES_SUCCESS, PLACES_LOADING} from '../types'


const initialState = {
    isLoading: false,
    items: [],
    total: 0,
    page: 1,
    size: 0
}


const Reducer = (state = initialState, action) => {
    switch (action.type){
        case PLACES_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isLoading: false
            }
        case PLACES_LOADING:
            return {
                ...state,
                isLoading: true
            }
        default:
            return state
    }
}
export default Reducer