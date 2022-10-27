import React, { useEffect, useState } from 'react';
import './AdminLoginForm.css';
import { useNavigate } from "react-router-dom";
import { db } from '../Firebase-config';
import {collection,getDocs} from 'firebase/firestore';

function AdminLoginForm({setAdminAuth}) {

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    const [supplierUsers, setSupplierUsers] =useState([]);
    const adminUsersCollectionRef = collection(db, "adminUsers");

    const navigate = useNavigate();

    useEffect (()=>{
        const getUsers = async () =>{
            const data = await getDocs(adminUsersCollectionRef);
            setSupplierUsers(data.docs.map((doc)=>({...doc.data(),id: doc.id})));

        }
        getUsers();
    })

    const register = () => {

        supplierUsers.map((user)=>{
            if(registerEmail===user.email && registerPassword===user.password){
                localStorage.setItem("AdminAuth", true);
                setAdminAuth(true);
                alert("Signed in successfully!");
                navigate('/admincustomerorders');
            }
            else{
                alert("Please enter the correct email or password");
            }
            return(<></>);
        })

    }

    return (
        <> 
            <div className="admin-login-form-main">
                <div className="admin-login-form-sub-main">
                    <div className="admin-login-form-sub-sub-main">
                        <div className="admin-login-form-imgs">
                            <div className="admin-login-form-container-image">
                                <img src={process.env.PUBLIC_URL + "Logos/Login.png"} alt="profile" className="admin-login-form-profile" />
                            </div>
                        </div>
                        <div className='admin-login-form-details'>
                            <h1 className='admin-login-form-heading'>Admin Login</h1>
                            <div className='admin-login-form-details'>
                                <input onChange={(event) => { setRegisterEmail(event.target.value); }} type="text" placeholder="Email" className="admin-login-form-name" />
                            </div>
                            <div className="admin-login-form-second-input">
                                <input onChange={(event) => { setRegisterPassword(event.target.value); }} type="password" placeholder="Password" className="admin-login-form-name" />
                            </div>
                            <div className="admin-login-form-login-button">
                                <button onClick={register} className='admin-login-form-button'>Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminLoginForm
