import React, { useState, useEffect } from 'react'
import './CustomerOrders.css'
import { useNavigate } from 'react-router-dom'
import { getAuth } from 'firebase/auth';
import { db } from '../Firebase-config';
import { collection, query, getDocs, where } from 'firebase/firestore';

function CustomerOrders() {

    const [myOrders, setMyOrders] = useState([]);
    const [scroll, setScroll] = useState(true);

    useEffect(() => {
        const getOrders = async () => {
            const auth = getAuth();
            const user = auth.currentUser;
            const q1 = query(collection(db, "customerOrders"), where("uId", "==", user.uid));
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
    const set = (id) =>{
      navigate('/customermyorderdetails', { state: { orderID: id} });
    }

    return (
        <>
            <div className='customermyorders-main'>
                <table className='customermyorders-table'>
                    <tr>
                        <th className='customermyorders-th'>Order ID</th>
                        <th className='customermyorders-th'>Date</th>
                        <th className='customermyorders-th'>Order Status</th>
                        <th className='customermyorders-th'>Price</th>
                        <th className='customermyorders-th'>Action</th>
                    </tr>
                    {myOrders.map((order) => {
                        return (
                            <>
                                <tr>
                                    <td className='customermyorders-td'>{order.id}</td>
                                    <td className='customermyorders-td'>{order.orderDate}</td>
                                    <td className='customermyorders-td'>{order.orderStatus}</td>
                                    <td className='customermyorders-td'>{order.orderPrice}</td>
                                    <td className='customermyorders-td'>
                                        <button onClick={()=>set(order.id)} className='customermyorders-button'>View</button>
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

export default CustomerOrders
