import React, { useEffect, useState } from 'react'
import ProductItem from '../components/ProductItem'
import { IReduxState } from '../constants/interfaces'
import '../App.css'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { ALL_PRODUCTS, BASE_URL, ELECTRONICS, JEWELERY, MENS, WOMEN } from '../constants/links'
import { Pagination } from 'react-bootstrap'
import axios from 'axios'
import { replaceListAction } from '../redux/actions/ApiActions'
import { PAGINATION_SIZE } from '../constants/names'

const ProductListing: React.FC = () => {
    // TODO: use slicing for pagination
    const { category: selectedCategory } = useParams()
    const [ pageNo, setPageNo ] = useState(1);
    const dispatch = useDispatch()
    let productInfo = useSelector((state: IReduxState) => state.List)
    const isProductFetched = productInfo.length > 0
    useEffect(handleOn, [ isProductFetched ])
    function handleOn() {
        if (isProductFetched) return;
        let url = BASE_URL + "products/";
        axios.get(url)  
            .then(res => res.data)
            .then(data => {
                dispatch(replaceListAction(data))
            })
    }
    if (("/" + selectedCategory) !== ALL_PRODUCTS.to) {
        let category = "";
        switch ("/" + selectedCategory) {
            case MENS.to:
                category = "mens clothing"
                break;
            case WOMEN.to:
                category = "womens clothing"
                break;
            case ELECTRONICS.to:
                category = "electronics"
                break;
            case JEWELERY.to:
                category = "jewelery"
                break;
            default:
                break;
        }
        productInfo = productInfo.filter(item => item.category === category)
    }
    const pageCount = Math.ceil(productInfo.length / PAGINATION_SIZE);
    if (pageCount > 1) {
        const lastItem = pageNo * PAGINATION_SIZE + 1;
        productInfo = productInfo.slice(lastItem - PAGINATION_SIZE, lastItem);
    }
    const handlePrevios = () => {
        setPageNo(pageNo - 1);
    }
    const handleNext = () => {
        setPageNo(pageNo + 1)
    }

    return (
        <>
            {
                productInfo.length === 0 ? <div className='d-flex m-5 p-5 flex-column justify-content-center align-items-center'>
                    <h1 >ERROR</h1>
                    <h2>page not found</h2>
                    <h3>404</h3>
                </div> :
                    <>
                        <main className='listing'>
                            {productInfo.map(product => <ProductItem key={product.id + product.category} productInfo={product} />)}
                        </main>
                        <div className="d-flex align-items-center justify-content-center">
                            {
                                pageCount > 1 &&
                                <Pagination size='lg' >
                                    <Pagination.Prev onClick={handlePrevios} disabled={pageNo === 1} />
                                    {Array(pageCount)
                                        .fill(null).map(
                                            (ele, index) => <Pagination.Item key={index} active={pageNo === index + 1 ? true : false} onClick={() => setPageNo(index + 1)}>{index + 1}</Pagination.Item>
                                        )
                                    }
                                    <Pagination.Next onClick={handleNext} disabled={pageNo === pageCount} />
                                </Pagination>
                            }
                        </div>
                    </>
            }
        </>
    )
}

export default ProductListing