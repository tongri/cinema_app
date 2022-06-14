import {useDispatch, useSelector} from 'react-redux'
import {useEffect} from 'react'
import {Box, CircularProgress} from '@mui/material'
import PaginationPage from '../components/Pagination'
import {adminLoadOrdersByFilm} from '../_redux/actions/order.actions'
import AdminOrderList from '../components/Orders/AdminOrderList'

const AdminOrderPageByFilm = () => {
    const { items, isLoading, ...pagination } = useSelector((state) => state.orders)
    const token = useSelector(state => state.users.token)

    const dsp = useDispatch()

    const changePage = ( newPage ) => {
        dsp(adminLoadOrdersByFilm(newPage))
    }

    useEffect(() => {
        dsp(adminLoadOrdersByFilm())
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
                    <AdminOrderList items={items}/>
                    <PaginationPage {...pagination} pageChanger={changePage}/>
                </>
            }
        </>
    )
}

export default AdminOrderPageByFilm