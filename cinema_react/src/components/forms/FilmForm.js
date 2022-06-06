import {Box, Button, CircularProgress, TextField} from '@mui/material'
import {useDispatch} from 'react-redux'
import {createFilm, updateFilm} from '../../_redux/actions/films.actions'
import {useState} from 'react'


export const FilmForm = ({ filmId, name,
                             begin_date = new Date().toJSON().slice(0, -14),
                             end_date= new Date().toJSON().slice(0, -14),
                             lasts_minutes, title }) => {
    const dsp = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const [formValues, setFormValues] = useState({name, begin_date, end_date, lasts_minutes})

    const submitHandler = (e) => {
        setIsLoading(true)
        if (filmId) return dsp(updateFilm(filmId, formValues))
        dsp(createFilm(formValues))
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
                    name="begin_date"
                    label="Begin Date"
                    value={formValues.begin_date}
                    type="date"
                    id="begin_date"
                    variant="standard"
                    onChange={e => handleInput(e)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="end_date"
                    label="End Date"
                    variant="standard"
                    id="end_date"
                    type="date"
                    value={formValues.end_date}
                    onChange={e => handleInput(e)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="lasts_minutes"
                    label="Lasts Minutes"
                    name="lasts_minutes"
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