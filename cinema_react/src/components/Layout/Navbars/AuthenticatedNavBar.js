import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import Avatar from '@mui/material/Avatar'
import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {logoutUser} from '../../../_redux/actions/users.actions'
import { useNavigate } from 'react-router-dom'
import {PAGE_ORDERS, PAGE_PRODUCTS_ORDERS} from '../../../consts/routes'


const AuthenticatedNavBar = () => {
    const navigate = useNavigate()
    const dsp = useDispatch()
    const [anchorElUser, setAnchorElUser] = useState(null);
    const logoutHandler = () => dsp(logoutUser())

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <>
            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                    </IconButton>
                </Tooltip>
                <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    <MenuItem onClick={() => navigate(PAGE_ORDERS)}>
                        <Typography textAlign="center">Orders</Typography>
                    </MenuItem>
                    <MenuItem onClick={() => navigate(PAGE_PRODUCTS_ORDERS)}>
                        <Typography textAlign="center">Product Orders</Typography>
                    </MenuItem>
                    <MenuItem onClick={logoutHandler}>
                        <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                </Menu>
            </Box>
        </>
    )
}

export default AuthenticatedNavBar