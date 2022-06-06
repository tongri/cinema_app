import {Button, CardActions, CardContent, CircularProgress, Typography} from '@mui/material'
import {useEffect, useState} from 'react'
import {CustomDialog} from '../Layout/CustomDialog'
import {useDispatch} from 'react-redux'
import {deleteProduct} from '../../_redux/actions/products.actions'
import {ProductForm} from '../forms/ProductForm'


const Product = (
    {id, name, price, ...tags}
) => {
    const dsp = useDispatch()
    const [isProductDialogOpen, setProductDialog] = useState(false)
    const [isDeleteLoading, setDeleteLoading] = useState(false)

    const handleDelete = () => () => {
        setDeleteLoading(true)
        dsp(deleteProduct(id)).finally(() => setDeleteLoading(false))
    }

    const handleProductDialog = () => {
        setProductDialog(false)
    }

    useEffect(() => {
        setProductDialog(false)
    }, [])

    return (
        <>
            <CardContent sx={{ boxShadow: 10, borderRadius: '13px', backgroundColor: '#bbdefb' }}>
                <Typography variant="h5" component="div">
                    {name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    price {price}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => setProductDialog(true)}>
                    Edit
                </Button>
                <Button size="small" onClick={handleDelete(id)}>
                    { isDeleteLoading ?
                        <CircularProgress color="inherit" size={15}/> :
                        "Delete"}
                </Button>
            </CardActions>
            <CustomDialog isDialogOpen={isProductDialogOpen} setDialog={handleProductDialog}  title={"Edit Product"}>
                <ProductForm productId={id} name={name} price={price} setPlaceDialog={setProductDialog} title="edit product"/>
            </CustomDialog>
        </>
    )
}

export default Product