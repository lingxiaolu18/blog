import React, {useContext, useState} from 'react';
import logo from './logo.svg';
import {StateContext} from './App';

function LoginPane(){
    const context = useContext(StateContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const handleSignup = () => {
        context.Dispatch({type: 'TOGGLE_SIGNUP', payload: true});
    };
    const handleLogin = () => {
        context.callLogin(username, password);
    }
    const handleNameChange = (e) => {
        setUsername(e.target.value);
        if(e.target.value.length > 0 && password.length > 0){
            setButtonDisabled(false);
        }
        else{
            setButtonDisabled(true);
        }
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if(e.target.value.length > 0 && username.length > 0){
            setButtonDisabled(false);
        }
        else{
            setButtonDisabled(true);
        }
    }
    return(
        <div className = 'login-card'>
            <img src = {logo} alt = "login-logo" className = "App-logo"/>
            <div>
                <span>Username</span><input onChange = {handleNameChange} placeholder = "username"></input><br/><br/>
                <span>Password  </span><input onChange = {handlePasswordChange} type = "password" placeholder = "password"></input><br/><br/>
                <button onClick = {handleLogin} disabled = {buttonDisabled}>LOGIN</button><br/><br/>
                <label>Don't have an account yet?</label><button onClick = {handleSignup}>SIGNUP</button><br/><br/><br/>
            </div>
        </div>
    )
}




export default LoginPane;