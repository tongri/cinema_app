import Form from 'react-bootstrap/Form'


const SelectPage = ({selected, title, name, id, objList, handler}) => {

    return(
        <div>
            <Form.Select name={name} id={id} className="browser-default custom-select" onChange={handler}>
                <option>{title}</option>
                {
                    objList.map(obj =>
                        <option key={obj.id} value={obj.id} selected={obj.id === selected ? "selected" : false}>
                            {obj.name}
                        </option>
                    )
                }
            </Form.Select>
        </div>
    );

}

export default SelectPage;