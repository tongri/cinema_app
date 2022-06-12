import {Box, Button, CircularProgress, TextField} from '@mui/material'
import {useDispatch, useSelector} from 'react-redux'
import {createOrder} from '../../_redux/actions/order.actions'
import {CustomDialog} from '../Layout/CustomDialog'
import {useState} from 'react'
import {ProductsOrdersForm} from './ProductsOrdersForm'

const OrderForm = ({ showId }) => {
    const dsp = useDispatch()
    const isLoading = useSelector(state => state.orders.isLoading)
    const [isProductOrderDialogOpen, setProductOrderDialog] = useState(false)
    const [orderId, setOrderId] = useState(0)

    const handleProductOrderDialog = () => {
        setProductOrderDialog(false)
    }

    const submitHandler = (e) =>  {
        e.preventDefault()
        const data = new FormData(e.currentTarget);
        dsp(createOrder(showId, {amount: data.get('amount')}, setOrderId))
        setProductOrderDialog(true)
    }
    return (
        <>
            <Box component="form" onSubmit={submitHandler} noValidate>
                <TextField
                    variant="filled"
                    placeholder="Enter ticket amount"
                    id="amount"
                    name="amount"
                    type="number"
                    min={1}
                   fullWidth
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, p: 1 }}
                    fontSize={30}
                >
                    { isLoading ? <CircularProgress color="inherit" size={30} /> : "buy tickets" }
                </Button>
            </Box>
            <CustomDialog
                isDialogOpen={isProductOrderDialogOpen}
                setDialog={handleProductOrderDialog}
                title={"Order Food"}
            >
                <ProductsOrdersForm orderId={orderId}/>
            </CustomDialog>
        </>
    )
}

export default OrderForm