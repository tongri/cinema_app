import {MDBTable, MDBTableBody, MDBTableHead} from 'mdbreact'
import AdminOrder from './AdminOrder'

const AdminOrderList = ({ items }) => {

    return items.length ? (
        <>
            <MDBTable>
                <MDBTableHead>
                    <tr>
                        <th>Film</th>
                        <th>Place</th>
                        <th>Amount</th>
                        <th>Starts At</th>
                        <th>Status</th>
                        <th>User</th>
                        <th>Accept</th>
                        <th>Decline</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {items.map(order => (
                        <AdminOrder key={order.id} {...order} />
                    ))}
                </MDBTableBody>
            </MDBTable>
        </>
    ) : (
        <p className="text-center">No orders yet...</p>
    )
}

export default AdminOrderList