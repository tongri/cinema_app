import {useDispatch, useSelector} from 'react-redux'
import {useEffect} from 'react'
import {Box, CircularProgress} from '@mui/material'
import PaginationPage from '../components/Pagination'
import ProductOrderList from '../components/ProductsOrders/ProductsOrdersList'
import {loadProductOrders} from '../_redux/actions/products.orders.actions'

const ProductOrderPage = () => {
    const { items, isLoading, ...pagination } = useSelector(
        (state) => state.products_orders
    )
    const token = useSelector(state => state.users.token)

    const dsp = useDispatch()

    const changePage = ( newPage ) => {
        dsp(loadProductOrders(newPage))
    }

    useEffect(() => {
        dsp(loadProductOrders())
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
                    <ProductOrderList items={items}/>
                    <PaginationPage {...pagination} pageChanger={changePage}/>
                </>
            }
        </>
    )
}

export default ProductOrderPage