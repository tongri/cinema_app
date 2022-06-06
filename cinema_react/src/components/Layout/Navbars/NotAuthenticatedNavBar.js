import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import {PAGE_LOGIN} from '../../../consts/routes'
import {useNavigate} from 'react-router-dom'


const NotAuthenticatedNavBar = () => {
    const navigate = useNavigate()

    return (
    <Box sx={{ flexGrow: 0 }}>
        <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={() => navigate(PAGE_LOGIN)}>
            Login
        </Button>
    </Box>
    )
}

export default NotAuthenticatedNavBar