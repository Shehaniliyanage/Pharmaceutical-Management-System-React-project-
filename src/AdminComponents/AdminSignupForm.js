import React,{useState} from 'react'
import './AdminSignupForm.css';
import { db } from '../Firebase-config';
import {addDoc,collection} from 'firebase/firestore';

function AdminSignupForm() {

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    const adminUsersCollectionRef = collection(db, "adminUsers");

    const register = async () => {
        
       await addDoc(adminUsersCollectionRef, {email:registerEmail,password:registerPassword});
       alert("New admin created successfully");

    }

  return (
    <> 
      <div className="admin-signup-form-main">
                <div className="admin-signup-form-sub-main">
                    <div className="admin-signup-form-sub-sub-main">
                        <div className="admin-signup-form-imgs">
                            <div className="admin-signup-form-container-image">
                                <img src={process.env.PUBLIC_URL + "Logos/Sign-up.png"} alt="profile" className="admin-signup-form-profile" />
                            </div>
                        </div>
                        <div className='admin-signup-form-details'>
                            <h1 className='admin-signup-form-heading'>Admin Sign-up</h1>
                            <div className='admin-signup-form-details'>
                                <input onChange={(event) => { setRegisterEmail(event.target.value); }} type="text" placeholder="Email" className="admin-signup-form-name" />
                            </div>
                            <div className="admin-login-form-second-input">
                                <input onChange={(event) => { setRegisterPassword(event.target.value); }} type="password" placeholder="Password" className="admin-signup-form-name" />
                            </div>
                            <div className="admin-signup-form-login-button">
                                <button onClick={register} className='admin-signup-form-button'>Sign-up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </>
  )
}

export default AdminSignupForm
