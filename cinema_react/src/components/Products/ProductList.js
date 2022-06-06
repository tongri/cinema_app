import {Container, Grid} from '@mui/material'
import Product from './Product'

const ProductList = ({items, total, size, page}) => {

    return items.length ? (
        <>
            <Container maxWidth="xl" sx={{ mt: 5}} >
                <Grid container spacing={2}>
                    {items.map(place => (
                        <Grid item key={place.id}>
                            <Product {...place} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    ) : (
        <p className="text-center">No products yet...</p>
    )
}

export default ProductList