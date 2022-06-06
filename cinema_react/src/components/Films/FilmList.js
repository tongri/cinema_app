import {Container, Grid} from '@mui/material'
import {useSelector} from 'react-redux'
import Film from './Film'

const FilmList = ({items}) => {

    const is_staff = useSelector(state => state.users.is_staff)

    return items.length ? (
        <>
            <Container maxWidth="xl" sx={{ mt: 5}} >
                <Grid container spacing={2}>
                    {items.map(film => (
                        <Grid item xs={4} key={film.id}>
                            <Film {...film} is_staff={is_staff} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    ) : (
        <p className="text-center">No films yet...</p>
    )
}

export default FilmList