import React,{useState} from 'react';
import './CustomerSignupForm.css';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import {auth,googleProvider,facebookProvider} from '../Firebase-config';
import {useNavigate} from "react-router-dom";

function CustomerSignupForm({setIsAuth}) {

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
  
    let navigate = useNavigate();

    const register = () => {
        
        createUserWithEmailAndPassword(auth,registerEmail,registerPassword)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            localStorage.setItem("isAuth", true);
            setIsAuth(true);
            alert("Successfully created an account!");
            navigate("/customerlogin");
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
        <div className="customer-signup-form-main">
                <div className="customer-signup-form-sub-main">
                    <div className="customer-signup-form-sub-sub-main">
                        <div className="customer-signup-form-imgs">
                            <div className="customer-signup-form-container-image">
                                <img src={process.env.PUBLIC_URL + "Logos/Sign-up.png"} alt="profile" className="customer-signup-form-profile" />
                            </div>
                        </div>
                        <div className='customer-signup-form-details'>
                            <h1 className='customer-signup-form-heading'>Customer Sign-up</h1>
                            <div className='customer-signup-form-details'>
                                <input type="text" placeholder="Email" className="customer-signup-form-name" onChange={(event) => { setRegisterEmail(event.target.value); }}/>
                            </div>
                            <div className="customer-signup-form-second-input">
                                <input type="password" placeholder="Password" className="customer-signup-form-name" onChange={(event) => { setRegisterPassword(event.target.value); }}/>
                            </div>
                            <div className="customer-signup-form-login-button">
                                <button onClick={register} className='customer-signup-form-button'>Sign-up</button>
                            </div>
                            <div className='customer-signup-logos'>
                                <div className='customer-signup-single-logos'>
                                    <img onClick={googleRegister}  alt='' src={process.env.PUBLIC_URL + "Logos/GoogleLogo.png"}></img>
                                </div>
                                <div className='customer-signup-single-logos'>
                                    <img onClick={facebookRegister}  alt='' src={process.env.PUBLIC_URL + "Logos/FacebookLogo.png"}></img>
                                </div>
                            </div>
                            <p className="customer-signup-form-link">
                                <a className='customer-signup-form-a' href='/customerlogin'>Login ?</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
    </>
  )
}

export default CustomerSignupForm
