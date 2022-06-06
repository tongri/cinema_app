import axios from '../../_axios'
import getConfig from '../../utils/config'
import {ORDER_LOADING, ORDER_SUCCESS} from '../types'
import {PAGE_SIZE} from '../../utils/constants'



export const loadOrders = (page = 1) => async (dispatch, getState) => {
    dispatch({ type: ORDER_LOADING })

    try {
        const result = await axios.get(
            `api/orders/?size=${PAGE_SIZE}&page=${page}`,
            getConfig(getState)
        )
        dispatch({
            type: ORDER_SUCCESS,
            payload: result.data
        })
    } catch (err) {
        // a?
    }
}


export const adminLoadOrders = (page = 1) => async (dispatch, getState) => {
    dispatch({ type: ORDER_LOADING })

    try {
        const result = await axios.get(
            `api/orders_by_film/?size=${PAGE_SIZE}&page=${page}`,
            getConfig(getState)
        )
        dispatch({
            type: ORDER_SUCCESS,
            payload: result.data
        })
    } catch (e) {
        // a?
    }
}

export const createOrder = (show_id, data) => async (dispatch, getState) => {
    dispatch({ type: ORDER_LOADING })

    try {
        const result = await axios.post(`api/shows/${show_id}/create_order/`, data, getConfig(getState))
        dispatch({
            type: ORDER_SUCCESS,
            payload: result.data
        })
    } catch (err) {
        // a?
    }
}
