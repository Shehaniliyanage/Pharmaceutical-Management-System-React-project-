import React,{useState} from 'react'
import './SupplierSignupForm.css';
import { db } from '../Firebase-config';
import {addDoc,collection} from 'firebase/firestore';

function SupplierSignupForm() {

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [companyName, setCompanyName] = useState("");

    const supplierUsersCollectionRef = collection(db, "supplierUsers");

    const register = async () => {
        
       await addDoc(supplierUsersCollectionRef, {email:registerEmail,password:registerPassword,companyName:companyName});
       alert("New Supplier created successfully");

    }

  return (
    <>
      <div className="supplier-signup-form-main">
                <div className="supplier-signup-form-sub-main">
                    <div className="supplier-signup-form-sub-sub-main">
                        <div className="supplier-signup-form-imgs">
                            <div className="supplier-signup-form-container-image">
                                <img src={process.env.PUBLIC_URL + "Logos/Sign-up.png"} alt="profile" className="supplier-signup-form-profile" />
                            </div>
                        </div>
                        <div className='supplier-signup-form-details'>
                            <h1 className='supplier-signup-form-heading'>Supplier Sign-up</h1>
                            <div className='supplier-signup-form-details'>
                                <input onChange={(event) => { setCompanyName(event.target.value); }} type="text" placeholder="Company Name" className="supplier-signup-form-name" />
                            </div>
                            <div className="supplier-signup-form-second-input">
                                <input onChange={(event) => { setRegisterEmail(event.target.value); }} type="text" placeholder="Email" className="supplier-signup-form-name" />
                            </div>
                            <div className="supplier-signup-form-second-input">
                                <input onChange={(event) => { setRegisterPassword(event.target.value); }} type="password" placeholder="Password" className="supplier-signup-form-name" />
                            </div>
                            <div className="supplier-signup-form-login-button">
                                <button onClick={register} className='supplier-signup-form-button'>Sign-up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </>
  )
}

export default SupplierSignupForm
