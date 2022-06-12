import {useDispatch, useSelector} from 'react-redux'
import {useEffect} from 'react'
import {Box, CircularProgress} from '@mui/material'
import PaginationPage from '../components/Pagination'
import RestProductOrderList from '../components/ProductsOrders/RestProductsOrdersList'
import {restLoadProductOrders} from '../_redux/actions/products.orders.actions'

const RestProductOrderPage = () => {
    const { items, isLoading, ...pagination } = useSelector((state) => state.products_orders)
    const token = useSelector(state => state.users.token)

    const dsp = useDispatch()

    const changePage = ( newPage ) => {
        dsp(restLoadProductOrders(newPage))
    }

    useEffect(() => {
        dsp(restLoadProductOrders())
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
                    <RestProductOrderList items={items}/>
                    <PaginationPage {...pagination} pageChanger={changePage}/>
                </>
            }
        </>
    )
}

export default RestProductOrderPage