import {useDispatch, useSelector} from 'react-redux'
import {useEffect, useState} from 'react'
import {Box, CircularProgress, SpeedDial, SpeedDialIcon} from '@mui/material'
import {CustomDialog} from '../components/Layout/CustomDialog'
import {loadPlaces} from '../_redux/actions/places.actions'
import PlaceList from '../components/Places/PlaceList'
import {PlaceForm} from '../components/forms/PlaceForm'
import PaginationPage from '../components/Pagination'

const PlacePage = () => {
    const { items, isLoading, total, size, page } = useSelector((state) => state.places)
    const token = useSelector(state => state.users.token)
    const is_staff = useSelector(state => state.users.is_staff)
    const [isDialogOpen, setDialog] = useState(false)

    const handleDialog = () => {
        setDialog(st => !st)
    }

    const dsp = useDispatch()

    const changePage = ( newPage ) => {
        dsp(loadPlaces(newPage))
    }
    useEffect(() => {
        dsp(loadPlaces(page))
    }, [token, dsp, is_staff])
    return (
        <>
            { isLoading ? <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="90vh"
                ><CircularProgress color="inherit" size={100}/></Box> :
                <>
                    <PlaceList items={items} total={total} size={size} page={page}/>
                    <PaginationPage total={total} size={size} page={page} pageChanger={changePage}/>
                </>
            }
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
                onClick={handleDialog}
            >hi</SpeedDial>
        <CustomDialog isDialogOpen={isDialogOpen} setDialog={handleDialog}  title={"Create place"}>
            <PlaceForm title="create place"/>
        </CustomDialog>
        </>
    )
}

export default PlacePage