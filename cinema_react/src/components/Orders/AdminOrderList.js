import {MDBTable, MDBTableBody, MDBTableHead} from 'mdbreact'
import AdminOrder from './AdminOrder'

const AdminOrderList = ({items}) => {

    return items.length ? (
        <>
            <MDBTable>
                <MDBTableHead>
                    <tr>
                        <th>Film</th>
                        <th>Show starts at</th>
                        <th>Amount</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {items.map(order => (
                        <AdminOrder {...order} />
                    ))}
                </MDBTableBody>
            </MDBTable>
        </>
    ) : (
        <p className="text-center">No orders yet...</p>
    )
}

export default AdminOrderList