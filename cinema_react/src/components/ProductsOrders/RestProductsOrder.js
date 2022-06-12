import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'
import {updateProductOrderStatus} from '../../_redux/actions/products.orders.actions'
import {useDispatch} from 'react-redux'

const RestProductOrder = ({id, product, order, amount, status}) => {
    const dsp = useDispatch()

    const acceptOrder = () => {
        dsp(updateProductOrderStatus(id, "accepted"))
    }

    const declineOrder = () => {
        dsp(updateProductOrderStatus(id, "declined"))
    }

    return (
    <>
        <tr>
            <td>
                {product.name}
            </td>
            <td>
                {amount}
            </td>
            <td>
                {order.show.show_time_start}
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

export default RestProductOrder