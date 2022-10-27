import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { db } from '../Firebase-config';
import { collection, query, getDocs, where, updateDoc, doc } from 'firebase/firestore';
import './CustomerOrdersDetails.css'

function CustomerOrdersDetails() {

    const [orderStatus, setOrderStatus] = useState("");

    const [myOrders, setMyOrders] = useState([]);
    const [scroll, setScroll] = useState(true);

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

    const update = async (id) => {
        if (orderStatus === "") {
            alert("Please select the order status!")
        } else {
            const orderDoc = doc(db, "customerOrders", id);
            const newFields = { orderStatus: orderStatus };
            await updateDoc(orderDoc, newFields);
            alert("Order status updated!");
        }
    }

    return (
        <div className='CustomerOrderViewPopup'>
            {myOrders.map((order) => {
                return (
                    <>
                        <div className='CustomerOrderViewPopup-inner'>
                            <h2 className='customermyorders-h2'>Order Details</h2>
                            <hr></hr>
                            <label className='customermyorders-label'>Order ID : {order.id}</label>
                            <br></br>
                            <label className='customermyorders-label'>Order Description : {order.orderDetails}</label>
                            <br></br>
                            <label className='customermyorders-label'>Order Date : {order.orderDate}</label>
                            <br></br>
                            <label className='customermyorders-label'>Order Status : {order.orderStatus}</label>
                            <br></br>
                            <label className='customermyorders-label'>Order Price : {order.orderPrice}</label>
                            <br></br>
                            <hr></hr>
                            <br></br>

                            <br></br>
                            <h2 className='customermyorders-h2'>Prescription</h2>
                            <hr></hr>
                            <br></br>
                            <img alt='image1' className='customermyorders-img' src={order.prescription[0]} />
                            <hr></hr>
                            <br></br>

                            <br></br>
                            <h2 className='customermyorders-h2'>Update Order Status</h2>
                            <hr></hr>
                            <br></br>
                            <select onChange={(e) => setOrderStatus(e.target.value)} className='customermyorders-select' >
                                <option></option>
                                <option value="Order Received">Order Received</option>
                            </select>
                            <br></br>
                            <br></br>
                            <button onClick={() => update(order.id)} className='customermyorders-button' >Update</button>
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

export default CustomerOrdersDetails
