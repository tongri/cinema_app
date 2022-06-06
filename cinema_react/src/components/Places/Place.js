import {Button, CardActions, CardContent, CircularProgress, Typography} from '@mui/material'
import {useEffect, useState} from 'react'
import {CustomDialog} from '../Layout/CustomDialog'
import {useDispatch} from 'react-redux'
import {deletePlace} from '../../_redux/actions/places.actions'
import {PlaceForm} from '../forms/PlaceForm'


const Place = (
    {id, name, size, ...tags}
) => {
    const dsp = useDispatch()
    const [isPlaceDialogOpen, setPlaceDialog] = useState(false)
    const [isDeleteLoading, setDeleteLoading] = useState(false)

    const handleDelete = () => () => {
        setDeleteLoading(true)
        dsp(deletePlace(id)).finally(() => setDeleteLoading(false))
    }

    const handlePlaceDialog = () => {
        setPlaceDialog(false)
    }

    useEffect(() => {
        setPlaceDialog(false)
    }, [])

    return (
        <>
            <CardContent sx={{ boxShadow: 10, borderRadius: '13px', backgroundColor: '#bbdefb' }}>
                <Typography variant="h5" component="div">
                    {name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    size {size} places
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => setPlaceDialog(true)}>
                    Edit
                </Button>
                <Button size="small" onClick={handleDelete(id)}>
                    { isDeleteLoading ?
                        <CircularProgress color="inherit" size={15}/> :
                        "Delete"}
                </Button>
            </CardActions>
            <CustomDialog isDialogOpen={isPlaceDialogOpen} setDialog={handlePlaceDialog}  title={"Edit Place"}>
                <PlaceForm placeId={id} name={name} size={size} setPlaceDialog={setPlaceDialog} title="edit place"/>
            </CustomDialog>
        </>
    )
}

export default Place