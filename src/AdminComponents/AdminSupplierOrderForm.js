import React, { useState } from 'react'
import './AdminSupplierOrderForm.css';
import { useLocation } from 'react-router-dom'
import { db } from '../Firebase-config';
import { collection, addDoc } from 'firebase/firestore';

function AdminSupplierOrderForm() {

    let today = new Date().toLocaleDateString();

    const location = useLocation();

    const [orderDetails, setOrderDetails] = useState("");

    const suppliersCollectionRef = collection(db, "supplierOrders");

    const order = async () => {
        if (orderDetails === "") {
            alert("Please enter the order details")
        } else {
            await addDoc(suppliersCollectionRef, { date: Date(today), status: "Pending", price: Number(), details: orderDetails, supplierId: location.state.supplierID });
            alert("Order Created Successfully!");
        }
    }

    return (
        <>
            <div className="AdminSupplierOrderForm-main">
                <div className="AdminSupplierOrderForm-sub-main">
                    <div className="AdminSupplierOrderForm-sub-sub-main">
                        <div className='AdminSupplierOrderForm-details'>
                            <h1 className='AdminSupplierOrderForm-heading'>Add Order</h1>
                            <div className='AdminSupplierOrderForm-details'>
                                <input value={location.state.supplierID} type="text" placeholder="Supplier ID" className="AdminSupplierOrderForm-name" />
                            </div>
                            <div className="AdminSupplierOrderForm-second-input">
                                <textarea onChange={(event) => { setOrderDetails(event.target.value) }} type="text" placeholder="Order Details" className="AdminSupplierOrderForm-name" />
                            </div>
                            <br></br>
                            <div className="AdminSupplierOrderForm-login-button">
                                <button onClick={order} className='AdminSupplierOrderForm-button'>Order</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminSupplierOrderForm
