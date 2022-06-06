import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import {PAGE_FILMS, PAGE_MAIN, PAGE_PLACES} from '../../../consts/routes'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {useEffect, useState} from 'react'



const initialPages = [{name: "Shows", path: PAGE_MAIN}, {name: "Films", path: PAGE_FILMS}];


const NavBar = ({ anchorElNav, handleCloseNavMenu, handleOpenNavMenu, children }) => {
    const navigate = useNavigate()

    const [pages, setPages] = useState(initialPages)

    const is_staff = useSelector(state => state.users.is_staff)
    const token = useSelector(state => state.users.token)

    useEffect(() => {
        if (is_staff) return setPages(prev => [...prev, {name: "Places", path: PAGE_PLACES}])
        setPages(initialPages)
    }, [token])

    return (
        <>
            <Toolbar disableGutters>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                >
                    UA Cinema
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                        }}
                    >
                        {
                            pages.map(({name, path}) => (
                                <MenuItem key={name} onClick={() => navigate(path)}>
                                    <Typography textAlign="center">
                                        {name}
                                    </Typography>
                                </MenuItem>
                            ))
                        }
                    </Menu>
                </Box>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                >
                    UA Cinema
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {pages.map(({name, path}) => (
                        <Button
                            key={name}
                            onClick={() => navigate(path)}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            {name}
                        </Button>
                    ))}
                </Box>

                {children}
            </Toolbar>
        </>
    )
}

export default NavBar