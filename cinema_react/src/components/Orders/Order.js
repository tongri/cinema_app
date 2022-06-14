const Order = ({amount, show, status}) => {
    return (
        <tr>
            <td>
                {show.film.name}
            </td>
            <td>
                {show.show_time_start}
            </td>
            <td>
                {show.place.name}
            </td>
            <td>
                {amount}
            </td>
            <td>
                {status}
            </td>
        </tr>
    )
}

export default Order