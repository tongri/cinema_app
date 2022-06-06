const Order = ({amount, show, place}) => {
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
        </tr>
    )
}

export default Order