import {Container, Grid} from '@mui/material'
import Place from './Place'

const PlaceList = ({items, total, size, page}) => {

    return items.length ? (
        <>
            <Container maxWidth="xl" sx={{ mt: 5}} >
                <Grid container spacing={2}>
                    {items.map(place => (
                        <Grid item key={place.id}>
                            <Place {...place} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    ) : (
        <p className="text-center">No places yet...</p>
    )
}

export default PlaceList