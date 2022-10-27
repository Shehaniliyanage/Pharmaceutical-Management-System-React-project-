import React,{useState,useEffect} from 'react'
import './AdminPayments.css'
import { Link } from 'react-router-dom';
import { db } from '../Firebase-config';
import { collection, query, getDocs } from 'firebase/firestore';

function AdminPayments() {

    const [customers, setCustomers] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [scroll, setScroll] = useState(true);

    useEffect(() => {
        const getCustomerOrders = async () => {
            const q1 = query(collection(db, "customerOrders"));
            const data = await getDocs(q1);
            setCustomers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        getCustomerOrders();

        const getSupplierOrders = async () => {
            const q1 = query(collection(db, "supplierOrders"));
            const data = await getDocs(q1);
            setSuppliers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        getSupplierOrders();

        if (scroll === true) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            setScroll(false);
        }
    }, [scroll])

    return (
        <>
            <div className='AdminPayments-btn'>
                <Link to='/adminaddpayments'>
                    <button className='AdminPayments-button'>Add other payments</button>
                </Link>
            </div>
            <div className='AdminPayments-main'>

                <div className='AdminPayments-submain'>
                    <table className='AdminPayments-table'>
                        <tr>
                            <th className='AdminPayments-th'>Order ID</th>
                            <th className='AdminPayments-th'>Customer ID</th>
                            <th className='AdminPayments-th'>Amount</th>
                        </tr>
                        {customers.map((cus) => {
                            return (
                                <>
                                    <tr>
                                        <td className='AdminPayments-td'>{cus.id}</td>
                                        <td className='AdminPayments-td'>{cus.uId}</td>
                                        <td className='AdminPayments-td'>{cus.orderPrice}</td>
                                    </tr>
                                </>
                            )
                        })}
                    </table>
                </div>
                <div className='AdminPayments-submain'>
                    <table className='AdminPayments-table'>
                        <tr>
                            <th className='AdminPayments-th'>Order ID</th>
                            <th className='AdminPayments-th'>Supplier ID</th>
                            <th className='AdminPayments-th'>Amount</th>
                        </tr>
                        {suppliers.map((sup) => {
                            return (
                                <>
                                    <tr>
                                        <td className='AdminPayments-td'>{sup.id}</td>
                                        <td className='AdminPayments-td'>{sup.supplierId}</td>
                                        <td className='AdminPayments-td'>{sup.price}</td>
                                    </tr>
                                </>
                            )
                        })}
                    </table>

                </div>
            </div>
        </>
    )
}

export default AdminPayments
