import Show from './Show'
import {Container, Grid} from '@mui/material'
import {useSelector} from 'react-redux'

const ShowList = ({items}) => {

    const isAuthenticated = useSelector(state => state.users.isAuthenticated)
    const is_staff = useSelector(state => state.users.is_staff)
    console.log({items})
    return items.length ? (
        <>
            <Container maxWidth="xl" sx={{ mt: 5}} >
                <Grid container spacing={2}>
                {items.map(show => (
                    <Grid item key={show.id}>
                        <Show {...show} is_staff={is_staff} isAuthenticated={isAuthenticated}/>
                    </Grid>
                ))}
                </Grid>
            </Container>
        </>
    ) : (
        <p className="text-center">No shows yet...</p>
    )
}

export default ShowList