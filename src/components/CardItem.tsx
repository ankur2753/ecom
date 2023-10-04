import axios from "axios";
import { ListGroup, Button } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import { ICardDetailsResponse, IReduxState } from "../constants/interfaces";
import { removeCardsActions } from "../redux/actions/UserInfoActions";

interface cartItemProps {
    card: ICardDetailsResponse,
    isDeletable: boolean,
    onSelect?: (card: ICardDetailsResponse) => void
}
export default function CardItem(prop: cartItemProps) {
    const UserID = useSelector((state: IReduxState) => state.UserId)
    const dispatch = useDispatch();
    function handleDelete() {
        axios.delete(`https://localhost:7182/card/Card?CardID=${prop.card.id}`)
        dispatch(removeCardsActions(prop.card.id))

    }
    const cardNo = prop.card.cardNo.toString()
    const maskedCardNo = cardNo.slice(-4).padStart(cardNo.length, '*').match(/.{1,4}/g)?.join(" / ")
    return <ListGroup.Item className='d-flex align-items-center justify-content-between' >

        <span>
            Card No: {maskedCardNo}
            <br />
            Expiry Date :{prop.card.expDate.split("T")[ 0 ]}
        </span>
        {
            prop.isDeletable &&
            <Button variant='outline-danger' disabled={!prop.isDeletable} onClick={handleDelete} style={{ maxHeight: 60 }}><FaTrash /></Button>
        }

    </ListGroup.Item>
}