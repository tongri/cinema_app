import {useSelector} from 'react-redux'
import {Navigate} from 'react-router-dom'
import {PAGE_MAIN} from '../consts/routes'
import {Box, CircularProgress} from '@mui/material'


const AdminRoute = ({ children, ...tags }) => {
    const {token, is_staff} = useSelector(state => state.users)

    return is_staff ? (
        children
    ) : token ? (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="90vh"
        ><CircularProgress color="inherit" size={100}/></Box>
    ) : (
        <Navigate to={PAGE_MAIN} />
    )
}

export default AdminRoute