import {MDBTable, MDBTableBody, MDBTableHead} from 'mdbreact'
import AdminOrderByFilm from './AdminOrderByFilm'

const AdminOrderListByFilm = ({items}) => {

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
                        <AdminOrderByFilm {...order} />
                    ))}
                </MDBTableBody>
            </MDBTable>
        </>
    ) : (
        <p className="text-center">No orders yet...</p>
    )
}

export default AdminOrderListByFilm