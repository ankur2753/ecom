import { useEffect, useState } from 'react';
import { Button, ButtonGroup, Card, Dropdown, DropdownButton, Form, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import InputWithValidation from '../components/InputWithValidation';
import { IReduxState } from '../constants/interfaces';
import { BASE_URL, PROFILE, THANK_YOU } from '../constants/links';
import { CURRENCY_SYMBOL } from '../constants/names';
import '../css/Checkout.css'
import { clearCart } from '../redux/actions/CartActions';
import SavedCards from '../components/SavedCards';
import SavedAddress from '../components/SavedAddress';
import AddressItem from '../components/AddressItem';
import CardItem from '../components/CardItem';
import axios from 'axios';
import { replaceAddressAction, replaceCardsAction } from '../redux/actions/UserInfoActions';
const Checkout = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const address = useSelector((state: IReduxState) => state.UserInfo.Address)
    const UserID = useSelector((state: IReduxState) => state.UserId)
    const cards = useSelector((state: IReduxState) => state.UserInfo.Cards)
    const amount = useSelector((state: IReduxState) => state.Cart)
        .reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const Start = "SELECT PAYMENT METHOD";
    const [ PaymentDetails, setPaymentDetails ] = useState(
        {
            addressID: 0,
            cardID: 0,
            paymentMethod: Start
        }
    );
    async function getAddress() {
        const res = await axios.get(BASE_URL + `/Address/${UserID}`)
        dispatch(replaceAddressAction(res.data));
    }
    async function getCardsList() {
        const res = await axios.get(BASE_URL + `/card/Card?UserID=${UserID}`)
        dispatch(replaceCardsAction(res.data));
    }
    useEffect(() => {
        getCardsList();
        getAddress();
    }, []);
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const postObj = {
            "id": 0,
            "cartID": PaymentDetails.cardID,
            "paymentMode": PaymentDetails.paymentMethod,
            "totalPrice": amount,
            "transactionID": Math.random().toString(16).slice(0, 9),
            "addressID": PaymentDetails.addressID,
            "cardID": PaymentDetails.cardID,
            "userID": UserID
        }
        axios.post(BASE_URL + "/order/placeOrder", postObj).then(
            () => navigate(THANK_YOU.to)
        )
    }
    return (
        <form className='p-5' onSubmit={handleSubmit}>
            <Card>
                <Card.Header>Select An Address</Card.Header>
                <Card.Body>
                    {address.length > 0 ?
                        address.map(oneAddress =>
                            <Form.Check
                                className='my-2 border-bottom'
                                type='radio'
                                onClick={() => setPaymentDetails({ ...PaymentDetails, addressID: oneAddress.id })}
                                key={oneAddress.id + oneAddress.userID}
                                label={
                                    <AddressItem isDeletable={false} address={oneAddress} />
                                }
                                name='selectAddress'
                            />
                        ) : <div className='d-flex align-items-center justify-content-center flex-column'>
                            <h3>OOPS no address found</h3>
                            try adding a new one <Link to={PROFILE.to}>
                                Go to {PROFILE.text.toLocaleLowerCase()}
                            </Link>
                        </div>
                    }
                </Card.Body>
            </Card>

            <div className="d-flex justify-content-between m-1">
                Total Amount Payable :{CURRENCY_SYMBOL} {Math.ceil(amount)}
                <Dropdown as={ButtonGroup}>
                    <Button>{PaymentDetails.paymentMethod}</Button>
                    <Dropdown.Toggle split id="dropdown-split-basic" />
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => {
                            setPaymentDetails({
                                ...PaymentDetails,
                                paymentMethod: "UPI"
                            })
                        }}>UPI</Dropdown.Item>
                        <Dropdown.Item onClick={() => {
                            setPaymentDetails({
                                ...PaymentDetails,
                                paymentMethod: "CARD"
                            })
                        }}>CARD</Dropdown.Item>
                        <Dropdown.Item onClick={() => {
                            setPaymentDetails({
                                ...PaymentDetails,
                                paymentMethod: "CASH"
                            })
                        }}>CASH ON DELIVERY</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            {
                PaymentDetails.paymentMethod === 'CARD' &&
                <Card>
                    <Card.Header>Select An Card</Card.Header>
                    <Card.Body>
                        {cards.length > 0 ?
                            cards.map(card =>
                                <Form.Check
                                    key={card.id + card.userID}
                                    type='radio'
                                    name='selectCard'
                                    className='my-2 border-bottom'
                                    onClick={() => setPaymentDetails({
                                        ...PaymentDetails,
                                        cardID: card.id,
                                    })}
                                    label={<CardItem isDeletable={false} card={card} />}
                                />

                            )
                            : <div className='d-flex align-items-center justify-content-center flex-column'>
                                <h3>OOPS no address found</h3>
                                try adding a new one <Link to={PROFILE.to}>
                                    Go to {PROFILE.text.toLocaleLowerCase()}
                                </Link>
                            </div>
                        }
                    </Card.Body>
                </Card>
            }
            <Button disabled={PaymentDetails.paymentMethod === 'CARD' ? PaymentDetails.addressID === 0 || PaymentDetails.cardID === 0 : PaymentDetails.addressID === 0 || PaymentDetails.paymentMethod === Start} className='add-btn' type='submit'>Proceed</Button>
        </form>
    );
}

export default Checkout

