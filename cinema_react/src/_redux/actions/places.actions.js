import { PLACES_LOADING, PLACES_SUCCESS } from '../types'
import axios from '../../_axios'
import getConfig from '../../utils/config'
import {PAGE_SIZE} from '../../utils/constants'


export const loadPlaces = (page = 1, all_objects=false) => async (dispatch, getState) => {
    dispatch({ type: PLACES_LOADING })

    try {
        const result = await axios.get(`api/places/?size=${PAGE_SIZE}&page=${page}`, getConfig(getState))
        dispatch({
            type: PLACES_SUCCESS,
            payload: result.data
        })
    } catch (err) {
        // a?
    }
}


export const createPlace = (data) => async (dispatch, getState) => {
    try {
        const result = await axios.post(
            'api/places/',
            data,
            getConfig(getState)
        )
        dispatch(loadPlaces())
    } catch (err){
        console.log(err)
    }
}


export const updatePlace = (place_id, data) => async (dispatch, getState) => {
    console.log({data})
    try {
        await axios.patch(
            `api/places/${place_id}/`,
            data,
            getConfig(getState)
        )
        dispatch(loadPlaces())
    } catch (err){
        // a?
    }
}


export const deletePlace = (place_id) => async (dispatch, getState) => {
    try {
        const result = await axios.delete(
            `api/places/${place_id}/`,
            getConfig(getState)
        )
        dispatch(loadPlaces())
    } catch (err){
        // a?
    }
}

