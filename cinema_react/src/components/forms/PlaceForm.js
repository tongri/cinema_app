import {Box, Button, CircularProgress, TextField} from '@mui/material'
import {useDispatch} from 'react-redux'
import {useState} from 'react'
import {createPlace, updatePlace} from '../../_redux/actions/places.actions'
import {toBody} from '../../utils/formDataToBody'


export const PlaceForm = ({ placeId, name, size, title, setPlaceDialog}) => {
    const dsp = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const [formValues, setFormValues] = useState({name, size})

    const submitHandler = (e) => {
        setIsLoading(true)
        if (placeId) {
            dsp(updatePlace(placeId, formValues))
        } else {
            dsp(createPlace(formValues))
        }
        setIsLoading(false)
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
                    id="size"
                    label="Size"
                    name="size"
                    type="number"
                    variant="standard"
                    value={formValues.size}
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