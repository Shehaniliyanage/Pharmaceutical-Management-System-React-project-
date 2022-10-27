import React, { useEffect, useState } from 'react';
import './SupplierOrdersDetails.css';
import { useLocation } from 'react-router-dom'
import { db } from '../Firebase-config';
import { collection, query, getDocs, where, updateDoc, doc } from 'firebase/firestore';

function SupplierOrdersDetails() {

    const [orderStatus, setOrderStatus] = useState("");
    const [price, setPrice] = useState(0);

    const [myOrders, setMyOrders] = useState([]);
    const [scroll, setScroll] = useState(true);

    const location = useLocation();
    const q1 = query(collection(db, "supplierOrders"), where("__name__", "==", location.state.orderID));

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

    const updateStatus = async (id) => {
        if (orderStatus === "") {
            alert("Please select the order Status!")
        } else {
            const orderDoc = doc(db, "supplierOrders", id);
            const newFields = { status: orderStatus };
            await updateDoc(orderDoc, newFields);
            alert("Order status updated!");
        }
    }

    const updatePrice = async (id) => {
        if (price === 0) {
            alert("Please Enter the Order Price!")
        } else {
            const orderDoc = doc(db, "supplierOrders", id);
            const newFields = { price: Number(price) };
            await updateDoc(orderDoc, newFields);
            alert("Order Price updated!");
        }
    }

    return (
        <>
            <div className='SupplierOrderViewPopup'>
                {myOrders.map((order) => {
                    return (
                        <>
                            <div className='SupplierOrderViewPopup-inner'>
                                <h2 className='suppliermyorders-h2'>Order Details</h2>
                                <hr></hr>
                                <label className='suppliermyorders-label'>Order ID : {order.id}</label>
                                <br></br>
                                <label className='suppliermyorders-label'>Order Description : {order.details}</label>
                                <br></br>
                                <label className='suppliermyorders-label'>Order Date : {order.date}</label>
                                <br></br>
                                <hr></hr>
                                <br></br>
                                <h2 className='suppliermyorders-h2'>Add Price</h2>
                                <hr></hr>
                                <br></br>
                                <input onChange={(e) => setPrice(e.target.value)} className='suppliermyorders-input' type='number' placeholder='Price'></input>
                                <br></br>
                                <br></br>
                                <button onClick={() => updatePrice(order.id)} className='suppliermyorders-button' >Add</button>
                                <br></br>
                                <br></br>
                                <hr></hr>
                                <br></br>
                                <h2 className='suppliermyorders-h2'>Order Status</h2>
                                <hr></hr>
                                <br></br>
                                <select onChange={(e) => setOrderStatus(e.target.value)} className='suppliermyorders-select' >
                                    <option>Pending</option>
                                    <option value="Order Confirmed">Order Confirmed</option>
                                    <option value="Order Rejected">Order Rejected</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Shipped">Ready to Ship</option>
                                </select>
                                <br></br>
                                <br></br>
                                <button onClick={() => updateStatus(order.id)} className='suppliermyorders-button' >Update</button>
                                <br></br>
                                <br></br>
                                <hr></hr>
                            </div>
                        </>
                    )
                })}
            </div>
        </>
    )
}

export default SupplierOrdersDetails
