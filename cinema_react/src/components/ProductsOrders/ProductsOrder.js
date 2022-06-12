const ProductOrder = ({product, order, amount, status}) => {
    return (
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
        </tr>
    )
}

export default ProductOrder