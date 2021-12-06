import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router'
import { Link } from 'react-router-dom';
import { addToCart } from '../actions/cartAction';
import MessageBox from '../components/MessageBox';

export default function CartScreen() {
    const dispatch = useDispatch();
    const params = useParams()
    const productId = params.id;
    const { search } = useLocation()
    const query = new URLSearchParams(search)
    const qty = query.get('qty');
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart;

    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId,qty))
        }
    },[dispatch,productId,qty])
   
    const removeFromCart =() =>{
        //delete action
    }

    return (
        <div className="row top">
            <div className="col-2">
                <h1>Shopping Cart</h1>
                {
                    cartItems.length === 0? (<MessageBox>Cart is Empty<Link to="/">Go Shopping</Link></MessageBox>):(
                        <ul>
                            {cartItems.map((item) => (
                                <li key={item.product}>
                                    <div className="row">
                                        <div>"
                                            <img className="small" src={item.image} alt={item.name} />
                                        </div>
                                        <div className="min-30">
                                            <Link to={`/products/${item.product}`}>{item.name}</Link>
                                        </div>
                                        <div>
                                            <select value={item.qty} onChange={(e) => dispatch(addToCart(item.product),Number(e.target.value))}>
                                            {[...Array(item.countInStock).keys()].map(
                                                                    (x) => (
                                                                        <option  key={x+1} value={x+1}>{x+1}</option>
                                                                    )
                                            )}
                                            </select>
                                        </div>
                                        <div>${item.price}</div>
                                        <div>
                                            <button type="button" onClick={() => removeFromCart(item.product)}>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )
                }
            </div>
        </div>
    )
}
