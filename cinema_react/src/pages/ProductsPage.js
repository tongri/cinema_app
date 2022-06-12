import {useDispatch, useSelector} from 'react-redux'
import {useEffect, useState} from 'react'
import {Box, CircularProgress, SpeedDial, SpeedDialIcon} from '@mui/material'
import {CustomDialog} from '../components/Layout/CustomDialog'
import PaginationPage from '../components/Pagination'
import {loadProducts} from '../_redux/actions/products.actions'
import ProductList from '../components/Products/ProductList'
import {ProductForm} from '../components/forms/ProductForm'

const ProductPage = () => {
    const { items, isLoading, total, size, page } = useSelector(
        (state) => state.products
    )
    const token = useSelector(state => state.users.token)
    const is_restaurateur = useSelector(state => state.users.is_restaurateur)
    const [isDialogOpen, setDialog] = useState(false)

    const handleDialog = () => {
        setDialog(st => !st)
    }

    const dsp = useDispatch()

    const changePage = ( newPage ) => {
        dsp(loadProducts(newPage))
    }
    useEffect(() => {
        dsp(loadProducts(page))
    }, [token, dsp, is_restaurateur])
    return (
        <>
            { isLoading ? <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="90vh"
                ><CircularProgress color="inherit" size={100}/></Box> :
                <>
                    <ProductList items={items} total={total} size={size} page={page}/>
                    <PaginationPage total={total} size={size} page={page} pageChanger={changePage}/>
                </>
            }
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
                onClick={handleDialog}
            >hi</SpeedDial>
            <CustomDialog isDialogOpen={isDialogOpen} setDialog={handleDialog}  title={"Create product"}>
                <ProductForm title="create product"/>
            </CustomDialog>
        </>
    )
}

export default ProductPage