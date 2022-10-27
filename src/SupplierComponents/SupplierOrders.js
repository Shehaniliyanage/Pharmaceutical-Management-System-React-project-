import React, { useState, useEffect } from 'react'
import './SupplierOrders.css';
import { useNavigate } from 'react-router-dom';
import { db } from '../Firebase-config';
import { collection, query, getDocs, where } from 'firebase/firestore';

function SupplierOrders({supplierId}) {

    const [myOrders, setMyOrders] = useState([]);
    const [scroll, setScroll] = useState(true);

    

    useEffect(() => {
        const getOrders = async () => {
            const q1 = query(collection(db, "supplierOrders"), where("supplierId", "==", supplierId));
            const data = await getDocs(q1);
            setMyOrders(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        getOrders();
        if (scroll === true) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            setScroll(false);
        }
    }, [scroll,supplierId])

    const navigate = useNavigate();
    const set = (id) => {
        navigate('/suppliermyorderdetails', { state: { orderID: id } });
    }

    return (
        <>
            <div className='suppliermyorders-main'>
                <table className='suppliermyorders-table'>
                    <tr>
                        <th className='suppliermyorders-th'>Order ID</th>
                        <th className='suppliermyorders-th'>Date</th>
                        <th className='suppliermyorders-th'>Order Status</th>
                        <th className='suppliermyorders-th'>Action</th>
                    </tr>
                    {myOrders.map((order) => {
                        return (
                            <>
                                <tr>
                                    <td className='suppliermyorders-td'>{order.id}</td>
                                    <td className='suppliermyorders-td'>{order.date}</td>
                                    <td className='suppliermyorders-td'>{order.status}</td>
                                    <td className='suppliermyorders-td'>
                                        <button onClick={() => set(order.id)} className='suppliermyorders-button'>View</button>
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

export default SupplierOrders
