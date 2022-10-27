import React, { useState } from 'react'
import './AdminAddStocksForm.css';
import { db } from '../Firebase-config';
import { collection, addDoc } from 'firebase/firestore';

function AdminAddStocksForm() {

    const [drugCode, setDrugCode] = useState("");
    const [drugName, setDrugName] = useState("");
    const [drugPricePerDozen, setDrugPricePerDozen] = useState(0);
    const [drugQty, setDrugQty] = useState(0);

    const productsCollectionRef = collection(db, "stocks");

    const add = async () => {
        if (drugCode === "") {
            alert("Please enter the drug code!")
        } else if (drugName === "") {
            alert("Please enter thr drug name!")
        } else if (drugPricePerDozen === 0) {
            alert("Please enter the drug price!")
        } else if (drugQty === 0) {
            alert("Please enter the drug qty!")
        } else {
            await addDoc(productsCollectionRef, { drugCode: drugCode, drugName: drugName, drugPricePerDozen: Number(drugPricePerDozen), drugQty: Number(drugQty) });
            alert("Stock Added Successfully!");
        }
    }

    return (
        <>
            <div className="AdminAddStocksForm-main">
                <div className="AdminAddStocksForm-sub-main">
                    <div className="AdminAddStocksForm-sub-sub-main">
                        <div className='AdminAddStocksForm-details'>
                            <h1 className='AdminAddStocksForm-heading'>Add Stock</h1>
                            <div className='AdminAddStocksForm-details'>
                                <input onChange={(e) => setDrugCode(e.target.value)} type="text" placeholder="Drug Code" className="AdminAddStocksForm-name" />
                            </div>
                            <div className="AdminAddStocksForm-second-input">
                                <input onChange={(e) => setDrugName(e.target.value)} type="text" placeholder="Drug Name" className="AdminAddStocksForm-name" />
                            </div>
                            <div className="AdminAddStocksForm-second-input">
                                <input onChange={(e) => setDrugPricePerDozen(e.target.value)} type="number" placeholder="Price - Per Dozen" className="AdminAddStocksForm-name" />
                            </div>
                            <div className="AdminAddStocksForm-second-input">
                                <input onChange={(e) => setDrugQty(e.target.value)} type="number" placeholder="Qantity" className="AdminAddStocksForm-name" />
                            </div>
                            <div className="AdminAddStocksForm-login-button">
                                <button onClick={add} className='AdminAddStocksForm-button'>Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminAddStocksForm
