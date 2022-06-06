import {useSelector} from 'react-redux'
import {Navigate} from 'react-router-dom'
import {PAGE_LOGIN} from '../consts/routes'
import {Box, CircularProgress} from '@mui/material'


const PrivateRoute = ({ children, ...tags }) => {
    const {isAuthenticated, token} = useSelector(state => state.users)

    console.log(`is auth ${isAuthenticated}`)
    return isAuthenticated ? (
        children
    ) : token ? (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="90vh"
        ><CircularProgress color="inherit" size={100}/></Box>
    ) : (
        <Navigate to={PAGE_LOGIN} />
    )
}

export default PrivateRoute