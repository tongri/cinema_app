import {Box, Button, CircularProgress, TextField} from '@mui/material'
import {useDispatch} from 'react-redux'
import {useState} from 'react'
import {updateProduct, createProduct} from '../../_redux/actions/products.actions'


export const ProductForm = ({ productId, name, price, title }) => {
    const dsp = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const [formValues, setFormValues] = useState({name, price})

    const submitHandler = (e) => {
        setIsLoading(true)
        if (productId) return dsp(updateProduct(productId, formValues))
        dsp(createProduct(formValues))
    }
    const handleInput = (e) => {
        e.preventDefault()
        setFormValues({...formValues, [e.target.name]: e.target.value})
    }
    return (
        <>
            <Box component="form" onSubmit={submitHandler} noValidate sx={{justifyContent: "center"}}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    variant="standard"
                    value={formValues.name}
                    autoFocus
                    onChange={e => handleInput(e)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="price"
                    label="Price"
                    name="price"
                    type="number"
                    variant="standard"
                    value={formValues.lasts_minutes}
                    autoFocus
                    onChange={e => handleInput(e)}
                />
                <Box sx={{ justifyContent: 'flex-end' }}>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2, p: 1, width: "15rem"}}
                        fontSize={30}
                    >
                        { isLoading ? <CircularProgress color="inherit" size={30} /> : title }
                    </Button>
                </Box>
            </Box>
        </>
    )
}