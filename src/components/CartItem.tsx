import axios from "axios"
import { Card, Button } from "react-bootstrap"
import { FaTrash } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { ICartItem, IReduxState } from "../constants/interfaces"
import { BASE_URL } from "../constants/links"
import { decreaseQuantityInCart, increaseQuantityInCart, removeFromCart } from "../redux/actions/CartActions"

const CartItemListing: React.FC<{ item: ICartItem }> = ({ item }) => {
    const dispatch = useDispatch()
    const userID = useSelector((state: IReduxState) => state.UserId)
    function decreaseInCart() {
        axios.put(BASE_URL + "/cart/decrement", {
            "userID": userID,
            "productID": item.id
        })
        dispatch(decreaseQuantityInCart(item.id))
    }
    function increaseInCart() {
        axios.put(BASE_URL + "/cart/increment", {
            "userID": userID,
            "productID": item.id
        })
        dispatch(increaseQuantityInCart(item.id))
    }
    function deleteItem() {
        axios.delete(BASE_URL + `/cart/delete?UserID=${userID}&ProductID=${item.id}`)
        dispatch(removeFromCart(item.id))
    }
    return <>
        <Card className='cart-item'>
            <div className="item">
                <img src={item.image} alt={item.title} />
                <span>{item.title}</span>
            </div>
            <div className="actions">
                <div className="counter">
                    <Button onClick={decreaseInCart} variant="outline-primary">
                        -
                    </Button>
                    <span style={{ padding: 4, margin: 2 }}>
                        {item.quantity}
                    </span>
                    <Button onClick={increaseInCart} variant='outline-primary'>
                        +
                    </Button>
                </div>
                <Button onClick={deleteItem} variant='outline-danger'><FaTrash /></Button>
            </div>
        </Card>
    </>
}
export default CartItemListing