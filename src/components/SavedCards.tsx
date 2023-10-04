import React, { useEffect, useState } from 'react'
import { Card, Button, ListGroup, Form } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { ICardDetailsResponse, IReduxState } from '../constants/interfaces';
import { addCardsAction, removeCardsActions, replaceCardsAction } from '../redux/actions/UserInfoActions';
import axios from 'axios';
import { BASE_URL } from '../constants/links';
import CenterModal from './CenterModal';
import InputWithValidation from './InputWithValidation';
import { removeLoader, setLoader } from '../redux/actions/LoaderActions';
import CardItem from './CardItem';

const SavedCards: React.FC = () => {
    const dispatch = useDispatch();
    const cards = useSelector((state: IReduxState) => state.UserInfo.Cards)
    const UserID = useSelector((state: IReduxState) => state.UserId)
    const [ show, setShowModal ] = useState(false);
    let date = new Date()
    const today = date.getFullYear() + "-" + (date.getMonth() + 1).toString().padStart(2, '0') + "-" + date.getDate().toString().padStart(2, '0')
    const [ CardDetails, setCardDetails ] = useState<ICardDetailsResponse>(
        {
            cardNo: 10001000100,
            cvv: 100,
            expDate: today,
            id: 0,
            userID: UserID ?? 0
        }
    );
    async function getCardsList() {
        const res = await axios.get(BASE_URL + `/card/Card?UserID=${UserID}`)
        dispatch(replaceCardsAction(res.data));
    }
    useEffect(() => {
        getCardsList();
    }, []);
    function handleClose() {
        setShowModal(false)
    }
    function handleSave(event: React.FormEvent<HTMLFormElement>) {
        const { currentTarget: form } = event;
        event.preventDefault();
        if (!form.checkValidity()) return;
        const card: ICardDetailsResponse =
        {
            "cardNo": CardDetails.cardNo,
            "cvv": CardDetails.cvv,
            "expDate": CardDetails.expDate,
            "id": Math.random(),
            "userID": UserID ?? 0
        }
        dispatch(setLoader())
        axios.post(BASE_URL + "/card/Card", card).then(
            () =>
                dispatch(addCardsAction(card))
        ).finally(
            () => {
                dispatch(removeLoader())
                handleClose()
            }
        )
    }
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setCardDetails(
            {
                ...CardDetails,
                [ name ]: value,
            }
        )
    }
    return (
        <Card>
            <CenterModal heading='Add New Card' show={show} onSave={handleSave} onHide={handleClose} >
                <InputWithValidation handleChange={handleChange} type='number' required={true} pattern='[0-9]{16}' minVal={1000000000000000} maxVal={9999999999999999} name='cardNo' value={CardDetails.cardNo} />
                <InputWithValidation handleChange={handleChange} type='number' max={3} pattern='[0-9]{3}' maxVal={999} required={true} name='cvv' value={CardDetails.cvv} />
                <InputWithValidation handleChange={handleChange} type='date' maxVal={today} required={true} name='expDate' value={CardDetails.expDate} />
            </CenterModal>
            <Card.Header className='d-flex align-items-center justify-content-between'>
                Saved Cards
                <Button onClick={() => setShowModal(true)} variant='primary'>
                    +
                </Button>
            </Card.Header>
            <ListGroup className='list-group-flush'>
                {cards.length > 0 ?
                    cards.map(card =>
                        <CardItem isDeletable={true} card={card} key={card.id + card.userID} />
                    ) : <div className='d-flex align-items-center justify-content-center flex-column'>
                        <h3>OOPS no address found</h3>
                        try adding a new one
                    </div>
                }
            </ListGroup>
        </Card>

    )
}


export default SavedCards