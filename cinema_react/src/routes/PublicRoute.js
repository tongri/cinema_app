import {useSelector} from 'react-redux'
import {Navigate} from 'react-router-dom'
import {PAGE_MAIN} from '../consts/routes'


const PublicRoute = ({ children, ...tags }) => {
    const isAuthenticated = useSelector(state => state.users.isAuthenticated)

    return isAuthenticated ? (
        <Navigate to={PAGE_MAIN} />
    ) : (
            children
    )
}

export default PublicRoute