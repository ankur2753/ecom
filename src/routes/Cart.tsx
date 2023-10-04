import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { ICartItem, ICartResponse, IReduxState } from '../constants/interfaces'
import '../css/Cart.css'
import CartItemListing from '../components/CartItem'
import { FaShoppingBag } from 'react-icons/fa'
import { CURRENCY_SYMBOL, } from '../constants/names'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL, CHECKOUT, HOME } from '../constants/links'
import { setLoader } from '../redux/actions/LoaderActions'
import axios from 'axios'
import { replaceCartItems } from '../redux/actions/CartActions'

const Cart: React.FC = () => {
    const CartItems = useSelector((state: IReduxState) => state.Cart)
    const UserID = useSelector((state: IReduxState) => state.UserId)
    const dispatch = useDispatch()
    useEffect(() => {
        if (CartItems.length > 0) return;
        axios.get(BASE_URL + `/cart/${UserID}`).then(res => res.data)
            .then((data: ICartResponse) => {
                const cartItems: ICartItem[] = data.products.map((item) => {
                    return {
                        id: item.id,
                        image: item.image,
                        price: item.price,
                        quantity: item.quantity,
                        title: item.title,
                    }
                });
                dispatch(replaceCartItems(cartItems))
            })
    }, [])


    const cartTotal = CartItems.reduce((accumulator, currentValue) => accumulator + (currentValue.price * currentValue.quantity), 0)
    return (
        <div className='cart-wrapper'>
            <main>
                {
                    CartItems.length > 0 ?
                        CartItems.map(item => <CartItemListing key={item.id + item.title} item={item} />)
                        :
                        <div className='d-flex flex-column justify-content-center align-items-center m-5' >
                            <FaShoppingBag size={200} />
                            <span className='mt-3'>
                                No items Found in your Cart
                            </span>
                        </div>

                }
            </main>
            <aside className='cart-total'>
                <h5>Order Details:</h5>
                <div className="calculations">
                    <div className="line">
                        <span>
                            Cart Total:
                        </span>
                        {Math.ceil(cartTotal)}
                    </div>
                    <div className="line">
                        <span>
                            Tax (18%) :

                        </span>
                        {Math.ceil(cartTotal * 0.18)}
                    </div>
                    <div className="line"><span>
                        Convenience Fee:
                    </span>
                        {CURRENCY_SYMBOL} {Math.ceil(cartTotal * 0.07)}
                    </div>
                    <div className="line">
                        <span>Discount</span>
                        {CURRENCY_SYMBOL} {Math.ceil(cartTotal * 0.07)}

                    </div>
                    <div className="line"><span>
                        Total:
                    </span>
                        {CURRENCY_SYMBOL}{Math.ceil(cartTotal) + Math.ceil(cartTotal * 0.18)}
                    </div>
                </div>
                {
                    CartItems.length === 0 ?
                        <Link to={HOME.to} >
                            <Button variant='outline-secondary'>
                                Add items to continue
                            </Button>
                        </Link>
                        :
                        <Link to={CHECKOUT.to}>
                            <Button className='add-btn'>
                                CheckOut
                            </Button>
                        </Link>
                }
            </aside>
        </div>
    )
}

export default Cart