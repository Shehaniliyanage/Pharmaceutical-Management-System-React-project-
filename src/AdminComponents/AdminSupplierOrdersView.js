import React,{useState,useEffect} from 'react'
import './AdminSupplierOrdersView.css';
import { useLocation } from 'react-router-dom'
import { db } from '../Firebase-config';
import { collection, query, getDocs, where } from 'firebase/firestore';

function AdminSupplierOrdersView() {

    const [myOrders, setMyOrders] = useState([]);
    const [scroll, setScroll] = useState(true);

    const location = useLocation();

    const q1 = query(collection(db, "supplierOrders"), where("supplierId", "==", location.state.supplierID));

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

    return (
        <>

            <div className='AdminSupplierOrdersView-main'>
                <table className='AdminSupplierOrdersView-table'>
                    <tr>
                        <th className='AdminSupplierOrdersView-th'>Order ID</th>
                        <th className='AdminSupplierOrdersView-th'>Supplier ID</th>
                        <th className='AdminSupplierOrdersView-th'>Order Date</th>
                        <th className='AdminSupplierOrdersView-th'>Order Details</th>
                        <th className='AdminSupplierOrdersView-th'>Order Status</th>
                        <th className='AdminSupplierOrdersView-th'>Total Amount</th>
                    </tr>
                    {myOrders.map((order) => {
                        return (
                            <>
                                <tr>
                                    <td className='AdminSupplierOrdersView-td'>{order.id}</td>
                                    <td className='AdminSupplierOrdersView-td'>{location.state.supplierID}</td>
                                    <td className='AdminSupplierOrdersView-td'>{order.date}</td>
                                    <td className='AdminSupplierOrdersView-td'>{order.details}</td>
                                    <td className='AdminSupplierOrdersView-td'>{order.status}</td>
                                    <td className='AdminSupplierOrdersView-td'>{order.price}</td>
                                </tr>
                            </>
                        )
                    })}
                </table>
            </div>

        </>
    )
}

export default AdminSupplierOrdersView
