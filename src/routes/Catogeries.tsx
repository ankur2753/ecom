import { Button, Card } from 'react-bootstrap'
import '../css/Catogeries.css'
import { Link } from 'react-router-dom'
import { ALL_PRODUCTS, BASE_URL, ELECTRONICS, ILink, IMAGES, JEWELERY, MENS, WOMEN } from '../constants/links'
import React, { useEffect } from 'react'
import axios from 'axios'
import { getAllProductsAction, replaceListAction } from '../redux/actions/ApiActions'
import { useDispatch, useSelector } from 'react-redux'
import { IReduxState } from '../constants/interfaces'
import { getAllProducts } from '../redux/thunk/ApiActionsThunk'


const CatogeryCard: React.FC<{ where: ILink, img: string }> = ({ where, img }) => {
    const dispatch = useDispatch()
    const isProductFetched = useSelector((state: IReduxState) => state.List).length > 0
    useEffect(handleOn, [])
    function handleOn() {
        // let url = BASE_URL + "products";
        let url = "https://localhost:7182/products/all"
        if (isProductFetched) return;
        axios.get(url)
            .then(res => res.data)
            .then(data => {
                dispatch(replaceListAction(data))
            })
        // dispatch(getAllProductsAction());
    }
    return (
        <Card className='category-item'>
            <Card.Img src={img} />
            <Card.Body>
                <Card.Title>{where.text}</Card.Title>
                <Card.Text>
                    this is {where.text.toLowerCase()} catogery.
                    click here to show all mens products
                </Card.Text>
            </Card.Body>
            <Card.Footer>

                <Link to={where.to}>
                    <Button>GO TO {where.text} PAGE</Button>
                </Link>
            </Card.Footer>
        </Card>
    )
}

function Catogeries(): React.ReactElement {
    return (
        <div className="listing">
            <CatogeryCard img={IMAGES.ALL_PRODUCTS} where={ALL_PRODUCTS} />
            <CatogeryCard img={IMAGES.MENS} where={MENS} />
            <CatogeryCard img={IMAGES.JEWELERY} where={JEWELERY} />
            <CatogeryCard img={IMAGES.WOMENS} where={WOMEN} />
            <CatogeryCard img={IMAGES.ELECTRONICS} where={ELECTRONICS} />
        </div>
    )
}

export default Catogeries
