import React, { useState, useEffect } from 'react'
import './AdminStockUpdate.css'
import { useLocation } from 'react-router-dom'
import { db } from '../Firebase-config';
import { collection, query, getDocs, where, updateDoc, doc } from 'firebase/firestore';

function AdminStockUpdate() {

    const location = useLocation();

    const [stock, setStock] = useState([]);
    const [scroll, setScroll] = useState(true);

    const [drugCode, setDrugCode] = useState(location.state.drugCode);
    const [drugName, setDrugName] = useState(location.state.drugName);
    const [drugPricePerDozen, setDrugPricePerDozen] = useState(location.state.drugPricePerDozen);
    const [drugQty, setDrugQty] = useState(location.state.drugQty);

    const q1 = query(collection(db, "stocks"), where("__name__", "==", location.state.productID));

    useEffect(() => {
        const getStock = async () => {
            const data = await getDocs(q1);
            setStock(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        getStock();
        if (scroll === true) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            setScroll(false);
        }
    }, [scroll, q1])

    const editStock = async () => {
        let confirmAction = window.confirm("Are you Sure to update the Stock ?");
        if (confirmAction) {
            const productDoc = doc(db, "stocks", location.state.productID)
            const newFields = { drugCode:drugCode,drugName:drugName,drugPricePerDozen:Number(drugPricePerDozen),drugQty:Number(drugQty) };
            await updateDoc(productDoc, newFields).then((re)=>{
                alert("Stock Updated!");
            }).catch((err)=>{
                alert(err);
            })
            
        } else {
            alert("Canceled!");
        }
    }

    return (
        <div className='AdminStockUpdate'>
            {stock.map((stock) => {
                return (
                    <>
                        <div className='AdminStockUpdate-inner'>
                            <h2 className='AdminStockUpdate-h2'>Update Drug</h2>
                            <hr></hr>
                            <br></br>
                            <input value={stock.id} type="text" className='AdminStockUpdate-input' placeholder='Drug-ID' />
                            <br></br>
                            <br></br>
                            <input defaultValue={stock.drugCode} onChange={(e)=>setDrugCode(e.target.value)} type="text" className='AdminStockUpdate-input' placeholder='Drug-Code' />
                            <br></br>
                            <br></br>
                            <input defaultValue={stock.drugName} onChange={(e)=>setDrugName(e.target.value)} type="text" className='AdminStockUpdate-input' placeholder='Drug-Name' />
                            <br></br>
                            <br></br>
                            <input defaultValue={stock.drugPricePerDozen} onChange={(e)=>setDrugPricePerDozen(e.target.value)} type="number" className='AdminStockUpdate-input' placeholder='Price-Per Dozen' />
                            <br></br>
                            <br></br>
                            <input defaultValue={stock.drugQty} onChange={(e)=>setDrugQty(e.target.value)} type="number" className='AdminStockUpdate-input' placeholder='Quantity' />
                            <br></br>
                            <br></br>
                            <button onClick={editStock} className='AdminStockUpdate-button'>Update</button>
                        </div>
                    </>
                )
            })}
        </div>
    )
}

export default AdminStockUpdate
