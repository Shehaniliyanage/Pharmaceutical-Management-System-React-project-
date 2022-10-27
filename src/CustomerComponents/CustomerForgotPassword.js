import React,{useState} from 'react';
import './CustomerForgotPassword.css';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth} from '../Firebase-config';
import {useNavigate} from "react-router-dom";

function CustomerForgotPassword() {

    const [email,setEmail] = useState("");

    let navigate = useNavigate();

    const sendEmail = () => {
        if(email===""){
            alert("Please enter the Email!")
        }else{
            sendPasswordResetEmail(auth,email).then(()=>{
                alert("Password Reset Link Sent to the Email!");
                navigate("/customerlogin");
            }).catch((err)=>{
                alert(err);
            })
        }
    }

  return (
        <> 
            <div className="CustomerForgotPassword-form-main">
                <div className="CustomerForgotPassword-form-sub-main">
                    <div className="CustomerForgotPassword-form-sub-sub-main">
                        <div className='CustomerForgotPassword-form-details'>
                            <h1 className='CustomerForgotPassword-form-heading'>Forget Password</h1>
                            <div className='CustomerForgotPassword-form-details'>
                                <input onChange={(event) => { setEmail(event.target.value); }} type="text" placeholder="Enter Email" className="CustomerForgotPassword-form-name" />
                            </div>
                            <div className="CustomerForgotPassword-form-login-button">
                                <button onClick={sendEmail} className='CustomerForgotPassword-form-button'>Enter</button>
                            </div>
                            <p className="CustomerForgotPassword-form-link">
                                <a className='CustomerForgotPassword-form-a' href='/customerlogin'>Login ?</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CustomerForgotPassword
