import { FILMS_LOADING, FILMS_SUCCESS } from '../types'
import axios from '../../_axios'
import getConfig from '../../utils/config'
import {PAGE_SIZE} from '../../utils/constants'


export const loadFilms = (page = 1, all_objects = false) => async (dispatch, getState) => {
    dispatch({ type: FILMS_LOADING })

    try {
        const result = await axios.get(
            `api/films/?size=${PAGE_SIZE}&page=${page}&all_objects=${all_objects}`,
            getConfig(getState)
        )
        dispatch({
            type: FILMS_SUCCESS,
            payload: result.data
        })
    } catch (err) {
        // a?
    }
}


export const createFilm = (data) => async (dispatch, getState) => {
    try {
        await axios.post(
            'api/films/',
            data,
            getConfig(getState)
        )
        dispatch(loadFilms())
    } catch (err){
        console.log(err)
    }
}


export const updateFilm = (film_id, data) => async (dispatch, getState) => {
    try {
        await axios.patch(
            `api/films/${film_id}/`,
            data,
            getConfig(getState)
        )
        dispatch(loadFilms())
    } catch (err){
        // a?
    }
}


export const deleteFilm = (film_id) => async (dispatch, getState) => {
    try {
        await axios.delete(
            `api/films/${film_id}/`,
            getConfig(getState)
        )
        dispatch(loadFilms())
    } catch (err){
        // a?
    }
}

