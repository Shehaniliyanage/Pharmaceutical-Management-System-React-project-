import React, { useEffect, useState } from 'react';
import './AdminCustomerOrdersDetails.css'
import { useLocation } from 'react-router-dom'
import { db } from '../Firebase-config';
import { collection, query, getDocs, where, updateDoc, doc } from 'firebase/firestore';

function AdminCustomerOrdersDetails() {

    const [myOrders, setMyOrders] = useState([]);
    const [scroll, setScroll] = useState(true);

    const [orderStatus, setOrderStatus] = useState("");
    const [orderPrice, setOrderPrice] = useState(0);

    const location = useLocation();
    const q1 = query(collection(db, "customerOrders"), where("__name__", "==", location.state.orderID));

    useEffect(() => {
        const getOrders = async () => {
            const data = await getDocs(q1);
            setMyOrders(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        getOrders();
        if (scroll === true) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            setScroll(false);
        }
    }, [scroll, q1])

    const updatePrice = async (id) => {
        if (orderPrice === 0) {
            alert("Please enter the order price!")
        } else {
            const orderDoc = doc(db, "customerOrders", id);
            const newFields = { orderPrice: Number(orderPrice) };
            await updateDoc(orderDoc, newFields);
            alert("Order Price updated!");
        }
    }

    const updateOrderStatus = async (id) => {
        if (orderStatus === "") {
            alert("Please select the order status!")
        } else {
            const orderDoc = doc(db, "customerOrders", id);
            const newFields = { orderStatus: orderStatus };
            await updateDoc(orderDoc, newFields);
            alert("Order Status updated!");
        }
    }

    return (
        <div className='adminCustomerOrderViewPopup'>
            {myOrders.map((order) => {
                return (
                    <>
                        <div className='adminCustomerOrderViewPopup-inner'>
                            <h2 className='admincustomermyorders-h2'>Order Details</h2>
                            <hr></hr>
                            <label className='admincustomermyorders-label'>Order ID : {order.id}</label>
                            <br></br>
                            <label className='admincustomermyorders-label'>Order Description : {order.orderDetails}</label>
                            <br></br>
                            <label className='admincustomermyorders-label'>Order Date : {order.orderDate}</label>
                            <br></br>
                            <label className='admincustomermyorders-label'>Order Status : {order.orderStatus}</label>
                            <br></br>
                            <label className='admincustomermyorders-label'>Order Price : {order.orderPrice}</label>
                            <br></br>
                            <label className='admincustomermyorders-label'>Delivery Type : {order.deliveryType} {order.deliveryType==="Delivery"?(<><a href={"https://www.latlong.net/c/?lat="+order.lat+"&long="+order.lng+""} target="_blank" rel="noopener noreferrer">Check Location</a></>):(<></>)}</label>
                            <br></br>
                            <label className='admincustomermyorders-label'>Address : {order.address}</label>
                            <br></br>
                            <hr></hr>
                            <br></br>
                            <br></br>
                            <h2 className='admincustomermyorders-h2'>Prescription</h2>
                            <hr></hr>
                            <br></br>
                            <img alt='image1' className='admincustomermyorders-img' src={order.prescription[0]} />
                            <hr></hr>
                            <br></br>
                            <br></br>
                            <h2 className='admincustomermyorders-h2'>Update Order Status</h2>
                            <hr></hr>
                            <br></br>
                            <select onChange={(e) => setOrderStatus(e.target.value)} className='admincustomermyorders-select' >
                                <option></option>
                                <option value="Order Confirmed">Order Confirmed</option>
                                <option value="Order Rejected">Order Rejected</option>
                                <option value="Ready to Ship">Ready to Ship</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Order ready please come and pick">Order ready please come and pick</option>

                            </select>
                            <br></br>
                            <br></br>
                            <button onClick={() => updateOrderStatus(order.id)} className='admincustomermyorders-button' >Update</button>
                            <br></br>
                            <br></br>
                            <hr></hr>
                            <br></br>

                            <br></br>
                            <h2 className='admincustomermyorders-h2'>Add Price</h2>
                            <hr></hr>
                            <br></br>
                            <input onChange={(e) => setOrderPrice(e.target.value)} className='admincustomermyorders-input' placeholder='Price' />
                            <br></br>
                            <br></br>
                            <button onClick={() => updatePrice(order.id)} className='admincustomermyorders-button' >Add Price</button>
                            <br></br>
                            <br></br>
                            <hr></hr>
                        </div>
                    </>
                )
            })}
        </div>
    )
}

export default AdminCustomerOrdersDetails
