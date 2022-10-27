import React, { useEffect, useState } from 'react'
import './AdminSuppliers.css'
import { useNavigate } from 'react-router-dom'
import { db } from '../Firebase-config';
import { collection, query, getDocs, doc, deleteDoc } from 'firebase/firestore';


function AdminSuppliers() {

    const [suppliers, setSuppliers] = useState([]);
    const [scroll, setScroll] = useState(true);

    useEffect(() => {
        const getOrders = async () => {
            const q1 = query(collection(db, "supplierUsers"));
            const data = await getDocs(q1);
            setSuppliers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        getOrders();
        if (scroll === true) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            setScroll(false);
        }
    }, [scroll])

    const navigate = useNavigate();
    const order = (id) => {
        navigate('/adminsupplierorder', { state: { supplierID: id } });
    }

    const view = (id) => {
        navigate('/adminsuppliermyordersview', { state: { supplierID: id } });
    }

    const deleteSupplier = async (id) => {
        let confirmAction = window.confirm("Are you Sure to delete the supplier ?");
        if (confirmAction) {
            const item = doc(db, "supplierUsers", id);
            await deleteDoc(item).then(() => {
                alert("Supplier removed successfully!");
                navigate('/adminsuppliers')
            }).catch((err) => {
                alert(err)
            })
        } else {
            alert("Canceled!")
        }
    }

    return (
        <>

            <div className='adminsuppliers-main'>
                <table className='adminsuppliers-table'>
                    <tr>
                        <th className='adminsuppliers-th'>Supplier ID</th>
                        <th className='adminsuppliers-th'>Supplier Email</th>
                        <th className='adminsuppliers-th'>Company Name</th>
                        <th className='adminsuppliers-th'>Action</th>
                    </tr>
                    {suppliers.map((sup) => {
                        return (
                            <>
                                <tr>
                                    <td className='adminsuppliers-td'>{sup.id}</td>
                                    <td className='adminsuppliers-td'>{sup.email}</td>
                                    <td className='adminsuppliers-td'>{sup.companyName}</td>
                                    <td className='adminsuppliers-td'>
                                        <button onClick={() => order(sup.id)} className='adminsuppliers-button'>Order</button>
                                        <br></br>
                                        <button onClick={() => view(sup.id)} className='adminsuppliers-button'>View Orders</button>
                                        <br></br>
                                        <button onClick={() => deleteSupplier(sup.id)} className='adminsuppliers-button'>Delete Supplier</button>
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

export default AdminSuppliers
