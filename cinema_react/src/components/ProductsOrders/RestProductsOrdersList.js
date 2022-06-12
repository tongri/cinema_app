import {MDBTable, MDBTableBody, MDBTableHead} from 'mdbreact'
import RestProductOrder from './RestProductsOrder'

const RestProductOrderList = ({ items }) => {

    return items.length ? (
        <>
            <MDBTable>
                <MDBTableHead>
                    <tr>
                        <th>Product</th>
                        <th>Amount</th>
                        <th>Starts At</th>
                        <th>Status</th>
                        <th>Accept</th>
                        <th>Decline</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {items.map(productOrder => (
                        <RestProductOrder key={productOrder.id} {...productOrder} />
                    ))}
                </MDBTableBody>
            </MDBTable>
        </>
    ) : (
        <p className="text-center">No orders yet...</p>
    )
}

export default RestProductOrderList