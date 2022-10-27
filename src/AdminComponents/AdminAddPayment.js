import React, { useState, useEffect } from 'react'
import './AdminAddPayments.css'
import { useNavigate } from 'react-router-dom';
import { db } from '../Firebase-config';
import { collection, addDoc, query, getDocs, deleteDoc, doc } from 'firebase/firestore';

function AdminAddPayment() {

    const [details, setDetails] = useState("");
    const [price, setPrice] = useState(0);

    const [payments, setPayments] = useState([]);
    const [scroll, setScroll] = useState(true);

    const paymentsCollectionRef = collection(db, "payments");

    const add = async () => {
        if (details === "") {
            alert("Please enter the order details!")
        } else if (price === 0) {
            alert("Please enter the Payment Price!")
        } else {
            await addDoc(paymentsCollectionRef, { price: Number(price), details: details });
            alert("Stock Added Successfully!");
        }
    }

    useEffect(() => {
        const getPayments = async () => {
            const q1 = query(collection(db, "payments"));
            const data = await getDocs(q1);
            setPayments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        getPayments();
        if (scroll === true) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            setScroll(false);
        }
    }, [scroll])

    const deletePayment = async (id) => {
        let confirmAction = window.confirm("Are you Sure to delete the payment ?");
        if (confirmAction) {
            const item = doc(db, "payments", id);
            await deleteDoc(item).then(() => {
                alert("Payment removed successfully!");
                navigate('/adminaddpayments')
            }).catch((err) => {
                alert(err)
            })
        } else {
            alert("Canceled!")
        }
    }

    const navigate = useNavigate();
    const update = (id, details, price) => {
        navigate('/adminpaymentupdate', { state: { paymentID: id, details: details, price: price } });
    }

    return (
        <>
            <div className="AdminAddPayments-main">
                <div className="AdminAddPayments-sub-main">
                    <div className="AdminAddPayments-sub-sub-main">
                        <div className='AdminAddPayments-details'>
                            <h1 className='AdminAddPayments-heading'>Add Other Payments</h1>
                            <div className='AdminAddPayments-details'>
                                <textarea onChange={(e) => setDetails(e.target.value)} type="text" placeholder="Payment Details" className="AdminAddPayments-name" />
                            </div>
                            <div className="AdminAddPayments-second-input">
                                <input onChange={(e) => setPrice(e.target.value)} type="number" placeholder="Amount" className="AdminAddPayments-name" />
                            </div>
                            <div className="AdminAddPayments-login-button">
                                <button onClick={add} className='AdminAddPayments-button'>Add Payment</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='AdminSupplierOrdersView-main'>
                <table className='AdminSupplierOrdersView-table'>
                    <tr>
                        <th className='AdminSupplierOrdersView-th'>Payment ID</th>
                        <th className='AdminSupplierOrdersView-th'>Payment Details</th>
                        <th className='AdminSupplierOrdersView-th'>Amount</th>
                        <th className='AdminSupplierOrdersView-th'>Action</th>
                    </tr>
                    {payments.map((pay) => {
                        return (
                            <>
                                <tr>
                                    <td className='AdminSupplierOrdersView-td'>{pay.id}</td>
                                    <td className='AdminSupplierOrdersView-td'>{pay.details}</td>
                                    <td className='AdminSupplierOrdersView-td'>{pay.price}</td>
                                    <td className='AdminSupplierOrdersView-td'>
                                        <button onClick={() => update(pay.id, pay.details, pay.price)} className='AdminAddPayments-btn'>Update</button>
                                        &nbsp;&nbsp;&nbsp;
                                        <button onClick={() => deletePayment(pay.id)} className='AdminAddPayments-btn'>Delete</button>
                                    </td>
                                </tr>
                            </>
                        )
                    })}
                </table>
            </div>
        </>
    )
}

export default AdminAddPayment
