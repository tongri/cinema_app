import {useDispatch, useSelector} from 'react-redux'
import {useEffect, useState} from 'react'
import {loadShows} from '../_redux/actions/shows.actions'
import ShowList from '../components/Shows/ShowList'
import {Box, CircularProgress, SpeedDial, SpeedDialIcon} from '@mui/material'
import {CustomDialog} from '../components/Layout/CustomDialog'
import {ShowForm} from '../components/forms/ShowForm'
import PaginationPage from '../components/Pagination'

const Main = () => {
    const { items, isLoading, ...pagination } = useSelector(state => state.shows)
    const token = useSelector(state => state.users.token)
    const is_staff = useSelector(state => state.users.is_staff)
    const [isDialogOpen, setDialog] = useState(false)

    const handleDialog = () => {
        setDialog(st => !st)
    }

    const dsp = useDispatch()
    const changePage = ( newPage ) => {
        dsp(loadShows(newPage))

    }
    useEffect(() => {
        dsp(loadShows())
    }, [token, dsp])
    return (
        <>
            { isLoading ? <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="90vh"
            ><CircularProgress color="inherit" size={100}/></Box> :
                <>
                    <ShowList items={items}/>
                    <PaginationPage {...pagination} pageChanger={changePage}/>
                </>
            }
            { is_staff ?
                <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    sx={{ position: 'absolute', bottom: 16, right: 16 }}
                    icon={<SpeedDialIcon />}
                    onClick={handleDialog}
                >hi</SpeedDial>
            : null}
            <CustomDialog isDialogOpen={isDialogOpen} setDialog={handleDialog}  title={"Create Show"}>
                <ShowForm title="create show"/>
            </CustomDialog>
        </>
    )
}

export default Main