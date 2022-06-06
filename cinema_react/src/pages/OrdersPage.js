import {useDispatch, useSelector} from 'react-redux'
import {useEffect} from 'react'
import {Box, CircularProgress} from '@mui/material'
import PaginationPage from '../components/Pagination'
import {loadOrders} from '../_redux/actions/order.actions'
import OrderList from '../components/Orders/OrderList'

const OrderPage = () => {
    const { items, isLoading, ...pagination } = useSelector((state) => state.orders)
    const token = useSelector(state => state.users.token)

    const dsp = useDispatch()

    const changePage = ( newPage ) => {
        dsp(loadOrders(newPage))
    }

    useEffect(() => {
        dsp(loadOrders())
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
                    <OrderList items={items}/>
                    <PaginationPage {...pagination} pageChanger={changePage}/>
                </>
            }
        </>
    )
}

export default OrderPage