import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link, useNavigate, useResolvedPath } from 'react-router-dom'
import { IProduct } from '../constants/interfaces'
import { getWhere } from '../constants/links'
import { CURRENCY_SYMBOL } from '../constants/names'
import '../css/ProductItem.css'
import { useDispatch } from "react-redux";
import { setCurrentItem } from '../redux/actions/CurrItemActions'
const ProductItem: React.FC<{ productInfo: IProduct }> = ({ productInfo }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { pathname } = useResolvedPath("")
    return (
        <Card className='list-item' >
            <Card.Img src={productInfo.image} />
            <Card.Body>
                <Card.Title>
                    <span className='title'>
                        {productInfo.title}
                    </span>
                </Card.Title>
                <Card.Text>
                    <Link to={getWhere(productInfo.category)}> {productInfo.category}</Link><br />
                    <span className="rating">
                        Rating:{productInfo.rating.rate}
                        ({productInfo.rating.count})
                    </span>
                </Card.Text>
            </Card.Body>
            <Card.Footer className='footer'>
                Price: {CURRENCY_SYMBOL}{productInfo.price}
                <Button onClick={() => {
                    dispatch(setCurrentItem(productInfo))
                    navigate(`${pathname}/${productInfo.id}`)
                }}>View Details</Button>
            </Card.Footer>
        </Card>
    )
}

export default ProductItem