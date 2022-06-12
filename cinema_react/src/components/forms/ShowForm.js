import {Box, Button, CircularProgress, TextField} from '@mui/material'
import {useDispatch, useSelector} from 'react-redux'
import {createShow, updateShow} from '../../_redux/actions/shows.actions'
import {useEffect, useState} from 'react'
import SelectPage from '../SelectPage'
import {loadFilms} from '../../_redux/actions/films.actions'
import {loadPlaces} from '../../_redux/actions/places.actions'


export const ShowForm = ({ showId, film_id, place_id,
                             show_time_start=new Date().toJSON().slice(0, -8), price, title }) => {
    const dsp = useDispatch()
    const films = useSelector(st => st.films.items)
    const places = useSelector(st => st.places.items)
    const [isLoading, setIsLoading] = useState(false)
    const [formValues, setFormValues] = useState({film_id, place_id, show_time_start, price})

    const submitHandler = (e) => {
        setIsLoading(true)
        if (showId) return dsp(updateShow(showId, formValues))
        dsp(createShow(formValues))
    }
    const handleInput = (e) => {
        e.preventDefault()
        setFormValues({...formValues, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        dsp(loadFilms(1, true))
        dsp(loadPlaces(1, true))
    }, [])

    return (
        <>
        <Box
            component="form"
            onSubmit={submitHandler}
            noValidate sx={{justifyContent: "center"}}>
            <SelectPage name={"place_id"} id={"place_id"} title="Choose place" handler={handleInput} selected={place_id}
                        objList={places}/>
            <SelectPage name={"film_id"} id={"film_id"} title="Choose film" handler={handleInput} selected={film_id}
                        objList={films}/>
            <TextField
                margin="normal"
                required
                fullWidth
                name="show_time_start"
                label="Show Time Start"
                variant="standard"
                id="show_time_start"
                type="datetime-local"
                value={formValues.show_time_start}
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
                value={formValues.price}
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