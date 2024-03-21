import axios from '../../Axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { verify } from '../../constants/Constants';
import { toast } from 'react-toastify';

const Regverify = () => {

    const [showRestButton, setShowRestButton] = useState(false)
    const [remainingTime, setRemainingTime] = useState(30)


    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        otp: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // const location = useLocation();

    // useEffect(() => {
    //     const searchParams = new URLSearchParams(location.search);
    //     const successMessage = searchParams.get('success');

    //     if (successMessage) {
    //         toast.success(successMessage);
    //     }
    // }, [location.search]);



    useEffect(() => {
        let timer;
        if (remainingTime > 0) {
            timer = setTimeout(() => {
                setRemainingTime(prevTime => prevTime - 1);
            }, 1000);
        } else {
            setShowRestButton(true);
        }

        return () => clearTimeout(timer);
    }, [remainingTime]);

    const appStyle = {
        background: 'linear-gradient(140deg, rgb(219, 98, 65) 0%, rgb(229, 91, 141) 100%)',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const containerStyle = {
        background: '#27282d',
        height: '340px',
        width: '520px',
        margin: '0 auto',
        borderRadius: '5px',
        boxShadow: '0px 4px 30px -5px rgba(0,0,0,0.65)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const inputContainerStyle = {
        position: 'relative',
        marginBottom: '30px',
        width: '340px',
    };

    const inputStyle = {
        fontFamily: "'Dosis', sans-serif",
        letterSpacing: '1.3px',
        boxSizing: 'border-box',
        background: 'transparent',
        width: '100%',
        border: 'none',
        borderBottom: '1px solid #92949d',
        color: '#bcbec7',
        padding: '12px 6px 12px 36px',
        fontSize: '19px',
        outline: 'none',
        caretColor: 'rgb(229, 91, 141)',
    };

    const buttonStyle = {
        background: '#266BEC ',
        border: 'none',
        borderRadius: '30px',
        color: '#bcbec7',
        fontSize: '16px',
        padding: '16px 36px',
        cursor: 'pointer',
        transition: 'all .3s',
        marginTop: '20px',
        boxShadow: '0px 4px 15px -5px rgba(0,0,0,0.65)',
    };

    const headingStyle = {
        color: '#266BEC ',
        fontSize: '28px',
        marginBottom: '20px',
    };

    function Resent(e) {
        e.preventDefault();
        setShowRestButton(false)
        setRemainingTime(30);
        toast.success("Operation was successful!");
    }

    function handlesumbit(e) {
        e.preventDefault();
        const body = JSON.stringify(formData);
        axios.post(verify, body, {
            headers: { "Content-Type": "application/json" },
        }).then((response) => {
            if (response.status === 200) {
                alert("Successfully Registered!")
                toast.success('Successfully Registered!');
                navigate('/');
            }
        }).catch(error => {
            if (error.response && error.response.status === 400) {
                const errorMessage = error.response.data.error;
                if (errorMessage === 'Wrong OTP') {
                    toast.error('Wrong OTP Entered!');
                    alert("Wrong OTP Entered!")
                } else {
                    toast.error('Failed to register. Please try again.');
                }
            } else {
                toast.error('${error.message} Please try again.');
            }
        });
    }

    // function handlesumbit(e){
    //     e.preventDefault()
    //     const body = JSON.stringify(formData);
    //     axios.post(verify, body, {
    //         headers: { "Content-Type": "application/json" },
    //     }).then((response) => {
    //         if (response.status === 200) {
    //             toast.success('Successfully Registered!');
    //             navigate('/');
    //         }
    //     }).catch(error => {
    //         console.error('Error:', error);
    //         if (error.response.status === 400) {
    //             toast.error('Wrong OTP Entered!');
    //         } else {
    //             toast.error('Failed to register. Please try again.');
    //         }
    //     });

    // }



    return (
        <>
            <div style={appStyle}>
                <form action='' onSubmit={handlesumbit} style={containerStyle}>
                    <h1 style={headingStyle} >ONE TIME PASSWORD</h1>

                    <div style={inputContainerStyle}>
                        <input type="number" required name="otp" onChange={handleChange} value={formData.otp} style={inputStyle} placeholder="Enter the OTP" />
                    </div>
                    {showRestButton ? (
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '180px', width: '100%' }}>
                            <button onClick={Resent} style={{ color: '#266BEC' }}>Resend</button>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '180px', width: '100%' }}>
                            <p style={{ color: '#266BEC' }}>Resend in {remainingTime} seconds</p>
                        </div>
                    )}
                    <button type="submit" style={buttonStyle}>Check</button>
                </form>
            </div>
        </>
    )
}

export default Regverify