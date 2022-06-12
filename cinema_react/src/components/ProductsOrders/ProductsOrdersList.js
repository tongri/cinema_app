import {MDBTable, MDBTableBody, MDBTableHead} from 'mdbreact'
import ProductOrder from './ProductsOrder'

const ProductOrderList = ({items}) => {

    return items.length ? (
        <>
            <MDBTable>
                <MDBTableHead>
                    <tr>
                        <th>Product</th>
                        <th>Amount</th>
                        <th>Starts At</th>
                        <th>Status</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {items.map(productOrder => (
                        <ProductOrder key={productOrder.id} {...productOrder} />
                    ))}
                </MDBTableBody>
            </MDBTable>
        </>
    ) : (
        <p className="text-center">No orders yet...</p>
    )
}

export default ProductOrderList