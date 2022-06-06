import getConfig from '../../utils/config'
import axios from '../../_axios'
import {USER_FAILED, USER_LOADING, USER_LOGOUT, USER_SUCCESS, USER_VERIFIED} from '../types'


export const loginUser = (data) => async (dispatch, getState) => {
    dispatch({ type: USER_LOADING })

    try {
        const result = await axios.post(
            'api/auth/',
            data,
        )
        dispatch({
            type: USER_SUCCESS,
            payload: result.data
        })
    } catch (err) {
        console.log(`error is ${err}`)
    }
}

export const signUpUser = (data) => async(dispatch, getState) => {
    dispatch({ type: USER_LOADING })

    try {
        const result = await axios.post(
            'api/reg/',
            data,
        )
        dispatch({
            type: USER_SUCCESS,
            payload: result.data
        })
    } catch (err) {
        console.log(`error is ${err}`)
    }
}

export const verifyToken = () => async (dispatch, getState) => {
    try {
        const result = await axios.get(
            'api/me/',
            getConfig(getState)
        )
        dispatch({
            type: USER_VERIFIED,
            payload: result.data
        })
    } catch (err) {
        dispatch({type: USER_FAILED})
    }
}

export const logoutUser = () => (dispatch) => dispatch({ type: USER_LOGOUT })
