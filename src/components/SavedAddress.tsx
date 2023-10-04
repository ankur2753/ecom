import React, { useEffect, useState } from 'react'
import { Card, Button, ListGroup, Modal } from 'react-bootstrap'
import { addAddressAction, replaceAddressAction } from '../redux/actions/UserInfoActions'
import { useDispatch, useSelector } from 'react-redux'
import { IAddressResponse, IReduxState } from '../constants/interfaces'
import axios from 'axios'
import { BASE_URL } from '../constants/links'
import AddressItem from './AddressItem'
import CenterModal from './CenterModal'
import InputWithValidation from './InputWithValidation'

const SavedAddress = () => {
    const dispatch = useDispatch();
    const address = useSelector((state: IReduxState) => state.UserInfo.Address)
    const UserID = useSelector((state: IReduxState) => state.UserId)
    const [ showModal, setShowModal ] = useState(false);
    const [ AddressDetails, setAddressDetails ] = useState<IAddressResponse>({
        city: "",
        state: "",
        street: "",
        id: 0,
        userID: UserID
    });

    async function getAddress() {
        const res = await axios.get(BASE_URL + `/Address/${UserID}`)
        dispatch(replaceAddressAction(res.data));
    }
    useEffect(() => {
        getAddress();
    }, []);
    function handleClose() {
        setShowModal(false)
    }
    function handleSave(event: React.FormEvent<HTMLFormElement>) {
        const { currentTarget: form } = event;
        event.preventDefault();
        if (!form.checkValidity()) return;
        const address: IAddressResponse =
        {
            "city": AddressDetails.city,
            "street": AddressDetails.street,
            "state": AddressDetails.state,
            "id": 0,
            "userID": UserID
        }
        axios.post(BASE_URL + "/Address", address).then(
            () =>
                dispatch(addAddressAction(address))
        ).finally(
            () => {
                handleClose();
                setAddressDetails({
                    city: "",
                    id: 0,
                    userID: UserID,
                    state: "",
                    street: ""
                })

            }
        )
    }
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setAddressDetails(
            {
                ...AddressDetails,
                [ name ]: value,
            }
        )
    }
    return (
        <Card>
            <CenterModal heading='Add New Address' show={showModal} onSave={handleSave} onHide={handleClose} >
                <InputWithValidation handleChange={handleChange} required={true} name='city' value={AddressDetails.city} />
                <InputWithValidation handleChange={handleChange} required={true} name='street' value={AddressDetails.street} />
                <InputWithValidation handleChange={handleChange} required={true} name='state' value={AddressDetails.state} />
            </CenterModal>
            <Card.Header className='d-flex align-items-center justify-content-between'>
                Saved Address
                <Button onClick={() => setShowModal(true)} variant='primary'>
                    +
                </Button>
            </Card.Header>
            <ListGroup className='list-group-flush'>
                {address.length > 0 ?
                    address.map(oneAddress =>
                        <AddressItem isDeletable={true} key={oneAddress.id + oneAddress.userID} address={oneAddress} />
                    ) : <div className='d-flex align-items-center justify-content-center flex-column'>
                        <h3>OOPS no address found</h3>
                        try adding a new one by clicking on the + icon
                    </div>
                }
            </ListGroup>
        </Card>
    )
}




export default SavedAddress