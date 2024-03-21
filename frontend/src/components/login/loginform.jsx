import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../Context/AuthContext'


const LoginForm = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    let { loginUser } = useContext(AuthContext)

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

    function signupPage(e) {
        e.preventDefault();
        navigate('/sign-up')
    }

    return (
        <div style={appStyle}>
            <form action='' onSubmit={loginUser} style={containerStyle}>
                <h1 style={headingStyle} >LOGIN TO EC-BOOKS</h1>
                <div style={inputContainerStyle}>
                    <input type="text" required name='username' id='username' style={inputStyle} placeholder="Username" />
                </div>

                <div style={inputContainerStyle}>
                    <input type="password" required id='password' name='password'  style={inputStyle} placeholder="Password" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '180px', width: '100%' }}>
                    <h1  style={{ color: '#ffffff' }}>Create a New Account ? </h1>
                    <button onClick={signupPage} style={{ color: '#266BEC' }}>-Click Here</button>
                </div>
                <button type="submit" style={buttonStyle}>Login</button>
            </form>
        </div>
    )
}



export default LoginForm