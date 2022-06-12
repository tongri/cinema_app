import SelectPage from '../SelectPage'
import {TextField} from '@mui/material'

export const SingleProductOrderForm = ({index, products, handler, formValues}) => {
    return (
        <>
            <div>Choose Your product to buy #{index + 1}</div>
        <SelectPage
            name={`product_id__${index}`}
            id={`product_id__${index}`}
            title="Choose Product to buy"
            handler={handler}
            selected={0}
            objList={products}/>
            <TextField
                margin="normal"
                required
                fullWidth
                id={`amount__${index}`}
                label="Amount"
                name={`amount__${index}`}
                type="number"
                variant="standard"
                value={1 && formValues[0] && formValues[0].price}
                autoFocus
                onChange={handler}
            />
            <br/>
        </>
    )
}