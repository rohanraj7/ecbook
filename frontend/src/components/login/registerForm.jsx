import axios from '../../Axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signup } from '../../constants/Constants'
import { ToastContainer, toast } from 'react-toastify'


const RegisterForm = () => {

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password1, setpassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password1: '',
        password2: '',
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    function loginPage(e) {
        e.preventDefault()
        navigate('/sign-in')
    }

    const clearFormData = () => {
        setFormData({
            name: '',
            username: '',
            email: '',
            password1: '',
            password2: '',
        });
    };

    async function handleSubmit(e) {
        e.preventDefault()
        const body = new FormData();
        for (const key in formData) {
            body.append(key, formData[key]);
        }
        axios.post(signup, body, {
            headers: { "Content-Type": "application/json" },
        }).then((response) => {
            if (response.status == 200) {
                navigate('/register_verify')
                toast.success("Otp Generated Please Check Email to Verify!")
                clearFormData();
            }
        }).catch((error) => {
            if (error.response.status === 400){
                setError({ email: error.response.data })
                toast.error("Password Is Not Matching");
            }
            else if (error.response.status === 401) {
                setError({ username: error.response.data })
                toast.error("Username already Exists");
            }
            else if (error.response.status === 406) {
                setError({ email: error.response.data })
                toast.error("Email already Exists");
            }
            else{
                setError({ error: error.response.data })
                toast.error("Something Went Wrong.!");
            }
        })

    }


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
        height: '640px',
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

    return (
        <>
            <div style={appStyle}>
                <form action='' onSubmit={handleSubmit} style={containerStyle}>
                    <h1 style={headingStyle} >SignUp EC-BOOKS</h1>
                    <div style={inputContainerStyle}>
                        <input type="text" name='name' onChange={handleChange} value={formData.name} style={inputStyle} placeholder="Name" />
                        <i className="zmdi zmdi-account zmdi-hc-lg" style={{ color: '#92949d', position: 'absolute', left: '6px', top: '50%', transform: 'translateY(-50%)', transition: 'color .3s' }}></i>
                    </div>
                    <div style={inputContainerStyle}>
                        <input type="text" onChange={handleChange} value={formData.username} name='username' style={inputStyle} placeholder="Username" />
                        <i className="zmdi zmdi-account zmdi-hc-lg" style={{ color: '#92949d', position: 'absolute', left: '6px', top: '50%', transform: 'translateY(-50%)', transition: 'color .3s' }}></i>
                    </div>
                    <div style={inputContainerStyle}>
                        <input type="email" name='email' onChange={handleChange} value={formData.email}  style={inputStyle} placeholder="Email" />
                        <i className="zmdi zmdi-account zmdi-hc-lg" style={{ color: '#92949d', position: 'absolute', left: '6px', top: '50%', transform: 'translateY(-50%)', transition: 'color .3s' }}></i>
                    </div>
                    <div style={inputContainerStyle}>
                        <input type="password" name='password1' onChange={handleChange} value={formData.password1} style={inputStyle} placeholder="Password" />
                        <i className="zmdi zmdi-lock zmdi-hc-lg" style={{ color: '#92949d', position: 'absolute', left: '6px', top: '50%', transform: 'translateY(-50%)', transition: 'color .3s' }}></i>
                    </div>
                    <div style={inputContainerStyle}>
                        <input type="password" name='password2' onChange={handleChange} value={formData.password2}  style={inputStyle} placeholder="Confirm-Password" />
                        <i className="zmdi zmdi-lock zmdi-hc-lg" style={{ color: '#92949d', position: 'absolute', left: '6px', top: '50%', transform: 'translateY(-50%)', transition: 'color .3s' }}></i>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '180px', width: '100%' }}>
                        <h1 style={{ color: '#ffffff' }}>Already have An Account ?</h1>
                        <button onClick={loginPage} style={{ color: '#266BEC' }}>-Click Here</button>
                    </div>
                    <ToastContainer/>
                    <button type="submit" style={buttonStyle}>SignUp</button>
                </form>
            </div>
        </>
    )
}

export default RegisterForm



