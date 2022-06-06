import {Button, CardActions, CardContent, CircularProgress, Typography} from '@mui/material'
import {useState} from 'react'
import {CustomDialog} from '../Layout/CustomDialog'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {PAGE_LOGIN} from '../../consts/routes'
import {FilmForm} from '../forms/FilmForm'
import {deleteFilm} from '../../_redux/actions/films.actions'


const Film = (
    {id, name, begin_date, end_date, lasts_minutes, is_staff=false, ...tags}
) => {
    const dsp = useDispatch()
    const navigate = useNavigate()
    const [isFilmDialogOpen, setFilmDialog] = useState(false)
    const [isDeleteLoading, setDeleteLoading] = useState(false)

    const handleDelete = () => () => {
        setDeleteLoading(true)
        dsp(deleteFilm(id)).finally(() => setDeleteLoading(false))
    }

    const handleFilmDialog = () => {
        setFilmDialog(false)
    }


    return (
        <>
            <CardContent sx={{ boxShadow: 10, borderRadius: '13px', backgroundColor: '#bbdefb' }}>
                <Typography variant="h5" component="div">
                    {name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    lasts {lasts_minutes} minutes
                </Typography>
                <Typography variant="body2">
                    will be on cinema from {begin_date} to {end_date}
                </Typography>
            </CardContent>
                <CardActions>
                    {
                        is_staff === true &&
                        <>
                            <Button size="small" onClick={() => setFilmDialog(true)}>
                                Edit
                            </Button>
                            <Button size="small" onClick={handleDelete(id)}>
                                { isDeleteLoading ?
                                    <CircularProgress color="inherit" size={15}/> :
                                    "Delete"}
                            </Button>
                        </>
                    }
                </CardActions>
            <CustomDialog isDialogOpen={isFilmDialogOpen} setDialog={handleFilmDialog}  title={"Edit Film"}>
                <FilmForm filmId={id} name={name} begin_date={begin_date} end_date={end_date}
                          lasts_minutes={lasts_minutes} title="edit show"/>
            </CustomDialog>
        </>
    )
}

export default Film