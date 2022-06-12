import axios from '../../_axios'
import getConfig from '../../utils/config'
import {PAGE_SIZE} from '../../utils/constants'
import {PRODUCTS_ORDERS_SUCCESS, PRODUCTS_ORDERS_LOADING} from '../types'


export const createProductsOrders = (orderId, data) => async (dispatch, getState) => {
    try{
        await axios.post(
            `/api/products_order/${orderId}/`,
            data,
            getConfig(getState)
        )
        dispatch({
            type: PRODUCTS_ORDERS_SUCCESS
        })
    } catch (err) {
        console.log(err)
    }
}

export const loadProductOrders = (page = 1) => async (dispatch, getState) => {
    dispatch({ type: PRODUCTS_ORDERS_LOADING })

    try {
        const result = await axios.get(
            `api/products_order/?size=${PAGE_SIZE}&page=${page}`,
            getConfig(getState)
        )
        dispatch({
            type: PRODUCTS_ORDERS_SUCCESS,
            payload: result.data
        })
    } catch (err) {
        // a?
    }
}

export const restLoadProductOrders = (page = 1) => async (dispatch, getState) => {
    dispatch({ type: PRODUCTS_ORDERS_LOADING })

    try {
        const result = await axios.get(
            `api/products_order/rest_view/?size=${PAGE_SIZE}&page=${page}`,
            getConfig(getState)
        )
        dispatch({
            type: PRODUCTS_ORDERS_SUCCESS,
            payload: result.data
        })
    } catch (err) {
        // a?
    }
}

export const updateProductOrderStatus = (productOrderId, newStatus) => async (dispatch, getState) => {
    try {
        const result = await axios.patch(
            `api/products_order/${productOrderId}/?new_status=${newStatus}`,
            {},
            getConfig(getState)
        )
        dispatch(loadProductOrders())
    } catch (e) {
        console.log(e)
    }
}
