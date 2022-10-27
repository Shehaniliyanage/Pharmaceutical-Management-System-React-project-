import React, { useEffect, useState } from 'react'
import './CustomerAddOrderForm.css';
import { getAuth } from 'firebase/auth';
import { db, storage } from '../Firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import { ref, getDownloadURL, uploadBytes, } from 'firebase/storage';

function CustomerAddOrderForm() {

    const [delivery, setDelivery] = useState("");
    const [orderDetails, setOrderDetails] = useState("");
    const [address, setAddress] = useState("");
    const [prescription, setPrescription] = useState([]);
    const [prescriptionURL, setPrescrptionURL] = useState("");
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);

    let today = new Date().toLocaleDateString();

    const auth = getAuth();
    const user = auth.currentUser;

    const customersCollectionRef = collection(db, "customerOrders");

    useEffect(() => {
        if (prescription[0] !== null) {
            addImages();
        }
        getLocation();
    })

    const addImages = () => {
        prescription.map((image) => {
            const uploadTask = ref(storage, `Prescriptions/${image.name}`);
            uploadBytes(uploadTask, image)
                .then((snapshot) => {
                    console.log(snapshot);
                    const downloadTask = ref(storage, `Prescriptions/${image.name}`);
                    getDownloadURL(downloadTask)
                        .then((url) => {
                            setPrescrptionURL((prevState) => [...prevState, url]);
                            console.log(prescriptionURL);
                            setPrescription([null])
                        })
                        .catch((err) => {
                            alert(err);
                        })
                })
                .catch((err) => {
                    alert(err);
                })
            return (<></>);
        })
    };

    const handleChange = (e) => {
        const newImage = e.target.files[0];
        newImage["id"] = Math.random();
        setPrescription((prevState) => [...prevState, newImage]);
    };

    const order = async () => {
        if (delivery === "") {
            alert("Please select a delivery type! ")
        } else if (delivery === "Delivery" && address === "") {
            alert("Please add the address!")
        } else {
            await addDoc(customersCollectionRef, { prescription: prescriptionURL, lat: Number(lat), lng: Number(lng), orderPrice: Number(), uId: user.uid, orderDate: Date(today), orderDetails: orderDetails, address: address, deliveryType: delivery, orderStatus: "Pending" });
            alert("Order Created Successfully!");
        }
    }

    const getLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser");
        } else {
            navigator.geolocation.getCurrentPosition((position) => {
                setLat(position.coords.latitude);
                setLng(position.coords.longitude);
            }, () => {
                alert("Unable to retrieve your location");
            });
        }
    }

    const handleClick = () => {
        order();
    }

    return (
        <>
            <div className="CustomerAddOrderForm-main">
                <div className="CustomerAddOrderForm-sub-main">
                    <div className="CustomerAddOrderForm-sub-sub-main">
                        <div className='CustomerAddOrderForm-details'>
                            <h1 className='CustomerAddOrderForm-heading'>Add Order</h1>
                            <div className='CustomerAddOrderForm-details'>
                                <input onChange={handleChange} type="file" placeholder="file" className="CustomerAddOrderForm-name" />
                            </div>
                            <div className="CustomerAddOrderForm-second-input">
                                <textarea onChange={(event) => { setOrderDetails(event.target.value) }} type="text" placeholder="Order Details (Optional)" className="CustomerAddOrderForm-name" />
                            </div>
                            <br></br>
                            <hr></hr>
                            Delivery Type
                            <div className="CustomerAddOrderForm-second-input">
                                Delivery<br></br>
                                <input type="radio" name='delivery' value='Delivery' className="CustomerAddOrderForm-radio" onChange={(event) => { setDelivery(event.target.value); }} />
                            </div>
                            <div className="CustomerAddOrderForm-second-input">
                                Pick-up<br>
                                </br>
                                <input type="radio" name='delivery' value='Pick-up' className="CustomerAddOrderForm-radio" onChange={(event) => { setDelivery(event.target.value); }} />
                            </div>
                            {delivery === "Delivery" ? (
                                <>
                                    <div className="CustomerAddOrderForm-second-input">
                                        <textarea onChange={(event) => { setAddress(event.target.value) }} type="text" placeholder="Enter The Address" className="CustomerAddOrderForm-name" />
                                    </div>
                                </>
                            ) : (
                                <></>
                            )}
                            <div className="CustomerAddOrderForm-login-button">
                                <button onClick={handleClick} className='CustomerAddOrderForm-button'>Order</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CustomerAddOrderForm

