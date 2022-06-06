import {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import AuthenticatedNavBar from './Navbars/AuthenticatedNavBar'
import {useSelector} from 'react-redux'
import NotAuthenticatedNavBar from './Navbars/NotAuthenticatedNavBar'
import NavBar from "./Navbars/NavBar"


const ResponsiveAppBar = () => {
    const isAuthenticated = useSelector(state => state.users.isAuthenticated)
    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <NavBar
                    anchorElNav={anchorElNav}
                    handleCloseNavMenu={handleCloseNavMenu}
                    handleOpenNavMenu={handleOpenNavMenu}>
                    {isAuthenticated ? <AuthenticatedNavBar /> : <NotAuthenticatedNavBar />}
                </NavBar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;
