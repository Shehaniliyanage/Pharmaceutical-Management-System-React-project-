import React,{useState} from 'react';
import './CustomerLoginForm.css';
import {useNavigate} from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, facebookProvider } from '../Firebase-config';

function CustomerLoginForm({setIsAuth}) {

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    let navigate = useNavigate();

    const register = () => {
        
        signInWithEmailAndPassword(auth,registerEmail,registerPassword)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            localStorage.setItem("isAuth", true);
            setIsAuth(true);
            alert("Successfully Signed in!");
            navigate("/customeraddorder");
        })
        .catch((error) => {
            //const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        })
    }

    const googleRegister = () => {
        signInWithPopup(auth,googleProvider).then(()=>{
            setIsAuth(true);
            localStorage.setItem("isAuth", true);
            navigate("/customeraddorder");
        })
        .catch((error)=>{
            const errorMessage = error.message;
            alert(errorMessage);
        })
    }

    const facebookRegister = () =>{
        signInWithPopup(auth,facebookProvider).then((result)=>{
            setIsAuth(true);
            localStorage.setItem("isAuth",true);
            navigate("/customeraddorder");
        })
        .catch((error)=>{
            const errorMessage = error.message;
            alert(errorMessage);
        })
    }

    return (
        <>
            <div className="customer-login-form-main">
                <div className="customer-login-form-sub-main">
                    <div className="customer-login-form-sub-sub-main">
                        <div className="customer-login-form-imgs">
                            <div className="customer-login-form-container-image">
                                <img src={process.env.PUBLIC_URL + "Logos/Login.png"} alt="profile" className="customer-login-form-profile" />
                            </div>
                        </div>
                        <div className='customer-login-form-details'>
                            <h1 className='customer-login-form-heading'>Customer Login</h1>
                            <div className='customer-login-form-details'>
                                <input onChange={(event) => { setRegisterEmail(event.target.value); }} type="text" placeholder="Email" className="customer-login-form-name" />
                            </div>
                            <div className="customer-login-form-second-input">
                                <input onChange={(event) => { setRegisterPassword(event.target.value); }} type="password" placeholder="Password" className="customer-login-form-name" />
                            </div>
                            <div className="customer-login-form-login-button">
                                <button onClick={register} className='customer-login-form-button'>Login</button>
                            </div>
                            <div className='customer-login-logos'>
                                <div className='customer-login-single-logos'>
                                    <img alt='' onClick={googleRegister} src={process.env.PUBLIC_URL + "Logos/GoogleLogo.png"}></img>
                                </div>
                                <div className='customer-login-single-logos'>
                                    <img alt='' onClick={facebookRegister}  src={process.env.PUBLIC_URL + "Logos/FacebookLogo.png"}></img>
                                </div>
                            </div>
                            <p className="customer-login-form-link">
                                <a className='customer-login-form-a' href='/customerforgotpassword'>Forgot password ?</a> Or <a className='customer-login-form-a' href='/customersignup'>Sign Up ?</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CustomerLoginForm
