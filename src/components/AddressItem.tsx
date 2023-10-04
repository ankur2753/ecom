import axios from 'axios';
import { ListGroup, Button } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { IAddressResponse, IReduxState } from '../constants/interfaces';
import { removeAddressAction } from '../redux/actions/UserInfoActions';
interface prop {
    address: IAddressResponse,
    isDeletable: boolean
}

function AddressItem(props: prop) {
    const dispatch = useDispatch();
    const uid = useSelector((state: IReduxState) => state.UserId)
    function handleDelete() {
        axios.delete(`https://localhost:7182/Address?UserID=${uid}&AddressID=${props.address.id}`).then(
            () =>
                dispatch(removeAddressAction(props.address.id))
        )

    }
    return <ListGroup.Item className='d-flex align-items-center justify-content-between'>
        <span>
            City: {props.address.city}
            <br />
            Street:{props.address.street}
            <br />
            State: {props.address.state}
        </span>
        {
            props.isDeletable &&
            <Button variant='outline-danger' onClick={handleDelete} style={{ maxHeight: 60 }} ><FaTrash /></Button>
        }
    </ListGroup.Item>
}

export default AddressItem