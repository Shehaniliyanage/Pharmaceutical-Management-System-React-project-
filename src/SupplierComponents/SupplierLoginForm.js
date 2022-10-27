import React, { useEffect, useState } from 'react'
import './SupplierLoginForm.css';
import { useNavigate } from "react-router-dom";
import { db } from '../Firebase-config';
import {collection,getDocs} from 'firebase/firestore';

function SupplierLoginForm({ setSupplierAuth, setSupplierId }) {

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    const [supplierUsers, setSupplierUsers] =useState([]);
    const supplierUsersCollectionRef = collection(db, "supplierUsers");

    const navigate = useNavigate();

    useEffect (()=>{
        const getUsers = async () =>{
            const data = await getDocs(supplierUsersCollectionRef);
            setSupplierUsers(data.docs.map((doc)=>({...doc.data(),id: doc.id})));

        }
        getUsers();
    })

    const register = () => {

        supplierUsers.map((user)=>{
            if(registerEmail===user.email && registerPassword===user.password){
                localStorage.setItem("SupplierAuth", true);
                setSupplierAuth(true);
                setSupplierId(user.id);
                alert("Signed in successfully!");
                navigate('/suppliermyorders');
            }
            else{
                alert("Please enter the correct email or password");
            }
            return(<></>);
        })

    }

  return (
    <>
        <div className="supplier-login-form-main">
                <div className="supplier-login-form-sub-main">
                    <div className="supplier-login-form-sub-sub-main">
                        <div className="supplier-login-form-imgs">
                            <div className="supplier-login-form-container-image">
                                <img src={process.env.PUBLIC_URL + "Logos/Login.png"} alt="profile" className="supplier-login-form-profile" />
                            </div>
                        </div>
                        <div className='supplier-login-form-details'>
                            <h1 className='supplier-login-form-heading'>Supplier Login</h1>
                            <div className='supplier-login-form-details'>
                                <input onChange={(event) => { setRegisterEmail(event.target.value); }} type="text" placeholder="Email" className="supplier-login-form-name" />
                            </div>
                            <div className="supplier-login-form-second-input">
                                <input onChange={(event) => { setRegisterPassword(event.target.value); }} type="password" placeholder="Password" className="supplier-login-form-name" />
                            </div>
                            <div className="supplier-login-form-login-button">
                                <button onClick={register} className='customer-login-form-button'>Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </>
  )
}

export default SupplierLoginForm
