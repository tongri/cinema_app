import {useDispatch, useSelector} from 'react-redux'
import {useEffect, useState} from 'react'
import {Box, CircularProgress, SpeedDial, SpeedDialIcon} from '@mui/material'
import {CustomDialog} from '../components/Layout/CustomDialog'
import {FilmForm} from '../components/forms/FilmForm'
import FilmList from '../components/Films/FilmList'
import {loadFilms} from '../_redux/actions/films.actions'
import PaginationPage from '../components/Pagination'

const FilmPage = () => {
    const { items, isLoading, ...pagination } = useSelector((state) => state.films)
    const token = useSelector(state => state.users.token)
    const is_staff = useSelector(state => state.users.is_staff)
    const [isDialogOpen, setDialog] = useState(false)

    const handleDialog = () => {
        setDialog(st => !st)
    }

    const dsp = useDispatch()

    const changePage = ( newPage ) => {
        dsp(loadFilms(newPage))
    }

    useEffect(() => {
        dsp(loadFilms())
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
                    <FilmList items={items}/>
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
            <CustomDialog isDialogOpen={isDialogOpen} setDialog={handleDialog}  title={"Create Film"}>
                <FilmForm title="create show"/>
            </CustomDialog>
        </>
    )
}

export default FilmPage