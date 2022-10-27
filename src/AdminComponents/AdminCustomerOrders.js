import React, { useState, useEffect } from 'react'
import './AdminCustomerOrders.css'
import { useNavigate } from 'react-router-dom'
import { db } from '../Firebase-config';
import { collection, query, getDocs } from 'firebase/firestore';

function AdminCustomerOrders() {

    const [myOrders, setMyOrders] = useState([]);
    const [scroll, setScroll] = useState(true);

    useEffect(() => {
        const getOrders = async () => {
            const q1 = query(collection(db, "customerOrders"));
            const data = await getDocs(q1);
            setMyOrders(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        getOrders();
        if (scroll === true) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            setScroll(false);
        }
    }, [scroll])

    const navigate = useNavigate();
    const set = (id) => {
        navigate('/admincustomerorderdetails', { state: { orderID: id } });
    }

    return (
        <>
            <div className='admincustomermyorders-main'>
                <table className='admincustomermyorders-table'>
                    <tr>
                        <th className='admincustomermyorders-th'>Order ID</th>
                        <th className='admincustomermyorders-th'>Customer Id</th>
                        <th className='admincustomermyorders-th'>Date</th>
                        <th className='admincustomermyorders-th'>Order Status</th>
                        <th className='admincustomermyorders-th'>Action</th>
                    </tr>
                    {myOrders.map((order) => {
                        return (
                            <>
                                <tr>
                                    <td className='admincustomermyorders-td'>{order.id}</td>
                                    <td className='admincustomermyorders-td'>{order.uId}</td>
                                    <td className='admincustomermyorders-td'>{order.orderDate}</td>
                                    <td className='admincustomermyorders-td'>{order.orderStatus}</td>
                                    <td className='admincustomermyorders-td'>
                                        <button onClick={() => set(order.id)} className='admincustomermyorders-button'>View</button>
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

export default AdminCustomerOrders
