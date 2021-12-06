import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating'
import { useDispatch, useSelector } from 'react-redux'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { detailProduct } from '../actions/productAction';

export default function ProductScreen() {
    const navigate = useNavigate()
    const [qty, setQty] = useState(1);
    const dispatch = useDispatch()
    const params =useParams()
    const productId = params.id;
    const productDetails = useSelector((state) => state.productDetails)
    const { product, loading, error } = productDetails;
    
    const addToCart =() => {
            navigate(`/cart/${productId}?qty=${qty}`);
          };
    
    useEffect(() => {
        dispatch(detailProduct(productId))
    },[dispatch,productId]);

    return (
        <div>
             <Link to="/">Back to result </Link>
            {
                loading ? (<LoadingBox ></LoadingBox>):
                error ? (<MessageBox variant="danger">{error}</MessageBox>):(
                    <div>
                        <div className="row top">
                            <div className="col-2">
                                <img className="large" src={product.image} alt={product.name} />
                            </div>
                            <div className="col-1">
                                <ul>
                                    <li><h1>{product.name}</h1></li>
                                    <li>
                                        <Rating rating={product.rating} numReviews={product.numReviews} />
                                    </li>
                                    <li>Price : ${product.price}</li>
                                    <li>Description:
                                        <p>{product.description}</p>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-2">
                                <div className="card card-body">
                                    <ul>
                                        <li>
                                            <div className="row">
                                                <div>Price</div>
                                                <div className="price">{product.price}</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="row">
                                                <div>Status</div>
                                                <div>{
                                                    product.countInStock >0 ? (<span className="success"> In Stock </span>) :
                                                    (<span className="danger">Unavailable</span>)
                                                    }</div>
                                            </div>
                                        </li>
                                        {
                                            product.countInStock > 0 && (
                                            <>
                                                <li>
                                                    <div className="row">
                                                        <div>Qty</div>
                                                        <div>
                                                            <select value={qty} onChange={e => setQty(e.target.value)}>
                                                                {[...Array(product.countInStock).keys()].map(
                                                                    (x) => (
                                                                        <option  key={x+1} value={x+1}>{x+1}</option>
                                                                    )
                                                                )}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <button onClick={addToCart} className="primary block">Add to Cart</button>
                                                </li>
                                            </>

                                            )
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
