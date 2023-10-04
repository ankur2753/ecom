import { Button } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { IReduxState } from '../constants/interfaces'
import { BASE_URL, CART, getWhere } from '../constants/links'
import { CURRENCY_SYMBOL } from '../constants/names'
import { useDispatch, useSelector } from 'react-redux'
import '../css/ProductDetails.css'
import { addToCart } from '../redux/actions/CartActions'
import Loader from '../components/Loader'
import axios from 'axios'

const ProductPage = () => {
    const { productId } = useParams()
    const product = useSelector((state: IReduxState) => state.List).find(item => item.id === parseInt(productId!))
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const alreadyInCart = useSelector((state: IReduxState) => state.Cart).some(item => item.id === product?.id)
    const userID = useSelector((state: IReduxState) => state.UserId)

    function sendToCart() {
        axios.post(BASE_URL + "/cart/addToCart", {
            "userID": userID,
            "productID": productId
        })
        dispatch(addToCart(product!))
    }

    if (product === null) {
        return <Loader />
    }
    return (
        <main className='product-page'>
            <div className="image-wrapper">
                <img src={product!.image} alt={product!.category} />
            </div>
            <div className="text-wrapper">
                <h3>{product!.title}</h3>
                <span>
                    Price:{CURRENCY_SYMBOL} {product!.price}
                </span>
                <span>
                    {product!.rating.count} customers rated this product at {product!.rating.rate}
                </span>
                <span>
                    <Link to={getWhere(product!.category)}>
                        {product!.category}
                    </Link>
                </span>
                <span className="description">
                    <h4>Product Details :</h4>
                    {product!.description}
                </span>
                {
                    !alreadyInCart ?
                        <Button onClick={sendToCart} className='add-btn'>ADD TO CART</Button>
                        :
                        <Button className='add-btn' onClick={() => navigate(CART.to)}>Go To Cart</Button>
                }
                <Button onClick={() => navigate(-1)} style={{ width: "100%", marginTop: 5 }} variant='outline-dark'>Go Back</Button>
            </div>

        </main>
    )
}

export default ProductPage