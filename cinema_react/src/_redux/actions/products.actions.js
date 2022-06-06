import {PRODUCTS_SUCCESS, PRODUCTS_FAILED, PRODUCTS_LOADING} from '../types'
import axios from '../../_axios'
import getConfig from '../../utils/config'
import {PAGE_SIZE} from '../../utils/constants'


export const loadProducts = (page = 1, all_objects = false) => async (dispatch, getState) => {
    dispatch({ type: PRODUCTS_LOADING })

    try {
        const result = await axios.get(
            `api/products/?size=${PAGE_SIZE}&page=${page}&all_objects=${all_objects}`,
            getConfig(getState)
        )
        dispatch({
            type: PRODUCTS_SUCCESS,
            payload: result.data
        })
    } catch (err) {
        // a?
    }
}


export const createProduct = (data) => async (dispatch, getState) => {
    try {
        await axios.post(
            'api/products/',
            data,
            getConfig(getState)
        )
        dispatch(loadProducts())
    } catch (err){
        console.log(err)
    }
}


export const updateProduct = (product_id, data) => async (dispatch, getState) => {
    try {
        await axios.patch(
            `api/products/${product_id}/`,
            data,
            getConfig(getState)
        )
        dispatch(loadProducts())
    } catch (err){
        // a?
    }
}


export const deleteProduct = (product_id) => async (dispatch, getState) => {
    try {
        await axios.delete(
            `api/products/${product_id}/`,
            getConfig(getState)
        )
        dispatch(loadProducts())
    } catch (err){
        // a?
    }
}

