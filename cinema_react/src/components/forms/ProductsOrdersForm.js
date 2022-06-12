import {useDispatch, useSelector} from 'react-redux'
import {loadProducts} from '../../_redux/actions/products.actions'
import {useEffect, useState} from 'react'
import {Box, Button, CircularProgress} from '@mui/material'
import {SingleProductOrderForm} from './SingleProductOrderForm'
import {createProductsOrders} from '../../_redux/actions/products.orders.actions'

export const ProductsOrdersForm = ({orderId}) => {
    const dsp = useDispatch()
    const products = useSelector(st => st.products.items)
    const [productsForms, setProductsAmount] = useState([])
    const [formValues, setFormValues] = useState([])

    const submitHandler = () => {
        dsp(createProductsOrders(orderId, formValues))
    }
    const handleInput = (e) => {
        e.preventDefault()
        const [fieldForm, formIndex] = e.target.name.split("__")
        setFormValues(prevState => {
            prevState[formIndex] = {...prevState[formIndex], [fieldForm]: e.target.value}
            console.log(formValues)
            return prevState
        })
        console.log(formValues)
    }

    useEffect(() => {
        dsp(loadProducts(1, true))
    }, [])

    return (
        <>
            <Box
                component="form"
                onSubmit={submitHandler}
                noValidate sx={{justifyContent: "center"}}
            >

                {
                    productsForms.map(prForm => prForm)
                }
                <Button
                    variant="contained"
                    sx={{ mt: 3, mb: 2, p: 1, width: "15rem"}}
                    fontSize={30}
                    onClick={
                    () =>
                        setProductsAmount(
                            st => [...st,
                                <SingleProductOrderForm key={st.length} formValues={formValues} index={st.length} products={products} handler={handleInput}>
                                    {st.length}
                                </SingleProductOrderForm>]
                        )
                }
                >
                    Add One More Product
                </Button>
                <Box sx={{ justifyContent: 'flex-end' }}>
                    {productsForms.length ?
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2, p: 1, width: "15rem"}}
                            fontSize={30}
                        >
                            {"Order products"}
                        </Button>
                        : null }
                </Box>
            </Box>
        </>
    )
}