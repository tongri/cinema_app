import {SignInForm} from './SignInForm'
import {useState} from 'react'
import {SignUpForm} from './SignUpForm'
import {Box, Button, Divider, Stack} from '@mui/material'


const AuthContainer = () => {
    const [activeTab, setActiveTab] = useState('tab1')

    const handleActivate = val => {
        if (activeTab === val) return
        setActiveTab(val)
    }

    return (
        <>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Stack direction="row" spacing={5} divider={<Divider orientation="vertical" flexItem />}>
                    <Button
                        variant={activeTab === 'tab1' ? "outlined" : "contained"}
                        onClick={() => handleActivate("tab1")}
                    >
                        Already Have Account
                    </Button>
                    <Button
                        variant={activeTab === 'tab2' ? "outlined" : "contained"}
                        onClick={() => handleActivate("tab2")}
                    >
                        Create Account
                    </Button>
                </Stack>
                {activeTab === 'tab1' ? <SignInForm /> : <SignUpForm />}
            </Box>
        </>
    )
}

export default AuthContainer