const AdminOrderByFilm = ({total, film_name, show_time_start}) => {
    return (
        <tr>
            <td>
                {film_name}
            </td>
            <td>
                {show_time_start}
            </td>
            <td>
                {total}
            </td>
        </tr>
    )
}

export default AdminOrderByFilm