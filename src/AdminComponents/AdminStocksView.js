import React, { useState, useEffect } from 'react'
import './AdminStocksView.css';
import { useNavigate } from 'react-router-dom'
import { db } from '../Firebase-config';
import { collection, query, getDocs, deleteDoc, doc } from 'firebase/firestore';

function AdminStocksView() {

    const [stocks, setStocks] = useState([]);
    const [scroll, setScroll] = useState(true);
    const [search, setSearch] = useState("");

    const filteredStocks = stocks.filter(stock => stock.drugName.toLowerCase().includes(search.toLowerCase()));

    useEffect(() => {
        const getStocks = async () => {
            const q1 = query(collection(db, "stocks"));
            const data = await getDocs(q1);
            setStocks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        getStocks();
        if (scroll === true) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            setScroll(false);
        }
    }, [scroll])

    const navigate = useNavigate();
    const update = (id,code,name,price,qty) => {
        navigate('/adminstockupdate', { state: { productID: id,drugCode:code,drugName:name,drugPricePerDozen:price,drugQty:qty } });
    }

    const deleteStock = async (id) => {
        let confirmAction = window.confirm("Are you Sure to delete the product ?");
        if (confirmAction) {
            const item = doc(db, "stocks", id);
            await deleteDoc(item).then(() => {
                alert("Stock removed successfully!");
                navigate('/adminstocksview')
            }).catch((err) => {
                alert(err)
            })
        } else {
            alert("Canceled!")
        }
    }

    return (
        <>
        <h1 className='AdminStocksView-h1'>Stocks</h1>
            
            <div className='AdminStocksView-filter'>
                <input className='AdminStockView-input' onChange={(e) => setSearch(e.target.value)} placeholder="Search by Drug Name" type="text" />
            </div>
            <div className='AdminStocksView-main'>
                <table className='AdminStocksView-table'>
                    <tr>
                        <th className='AdminStocksView-th'>Drug ID</th>
                        <th className='AdminStocksView-th'>Drug Code</th>
                        <th className='AdminStocksView-th'>Drug Name</th>
                        <th className='AdminStocksView-th'>Price - Per Dozen</th>
                        <th className='AdminStocksView-th'>Quantity</th>
                        <th className='AdminStocksView-th'>Action</th>
                    </tr>
                    {filteredStocks.map((pro) => {
                        return (
                            <>
                                <tr>
                                    <td className='AdminStocksView-td'>{pro.id}</td>
                                    <td className='AdminStocksView-td'>{pro.drugCode}</td>
                                    <td className='AdminStocksView-td'>{pro.drugName}</td>
                                    <td className='AdminStocksView-td'>{pro.drugPricePerDozen}</td>
                                    <td className='AdminStocksView-td'>{pro.drugQty}</td>
                                    <td className='AdminStocksView-td'>
                                        <button onClick={()=>update(pro.id,pro.drugCode,pro.drugName,pro.drugPricePerDozen,pro.drugQty)} className='AdminStocksView-button'>Update</button>
                                        &nbsp;
                                        <button onClick={()=>deleteStock(pro.id)} className='AdminStocksView-button'>Delete</button>
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

export default AdminStocksView
