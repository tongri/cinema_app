import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'
import {useDispatch} from 'react-redux'
import {updateOrderStatus} from '../../_redux/actions/order.actions'

const AdminOrder = ({id, show, amount, status}) => {
    const dsp = useDispatch()

    const acceptOrder = () => {
        dsp(updateOrderStatus(id, "accepted"))
    }

    const declineOrder = () => {
        dsp(updateOrderStatus(id, "declined"))
    }

    return (
        <>
            <tr>
                <td>
                    {show.film.name}
                </td>
                <td>
                    {show.place.name}
                </td>
                <td>
                    {amount}
                </td>
                <td>
                    {show.show_time_start}
                </td>
                <td>
                    {status}
                </td>
                <td>
                    {
                        status !== "accepted" && <DoneOutlinedIcon onClick={() => acceptOrder()}/>
                    }
                </td>
                <td>
                    {status !== "declined" && <ClearOutlinedIcon onClick={() => declineOrder()}/>}
                </td>
            </tr>
        </>
    )
}

export default AdminOrder