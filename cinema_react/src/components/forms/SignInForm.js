import {useDispatch, useSelector} from 'react-redux'
import {loginUser} from '../../_redux/actions/users.actions'
import {
    Box, Button, CircularProgress, CssBaseline, TextField,
} from '@mui/material'


export const SignInForm = () => {
    const isLoading = useSelector(state => state.users.isLoading)
    const dsp = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget);
        const username = data.get('username')
        const password = data.get('password')
        if (!username || !password) return alert("Fields can't be empty")
        dsp(loginUser({username, password}))
    }
    return (
        <>
            <CssBaseline />
                <Box component="form" onSubmit={submitHandler} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, p: 1 }}
                        fontSize={30}
                    >
                        { isLoading ? <CircularProgress color="inherit" size={30} /> : "Sign In"}
                    </Button>
                </Box>
        </>
    )
}