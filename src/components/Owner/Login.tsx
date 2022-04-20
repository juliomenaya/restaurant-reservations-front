import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


import "./loginStyle.css";
import { ownerActions } from '../../actions';


const Login = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loginError, setLoginError] = useState<boolean>(false);

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { login } = bindActionCreators(ownerActions, dispatch);

    const loginSubmit = async () => {
        /* had to disabled strict mode at tsconfig to avoid
        "TS2774: This condition will always return true since this function is always defined. Did you mean to call it instead"*/
        const logged = await login(username, password);
        if (logged) {
            navigate('/restaurants');
        } else {
            setLoginError(true);
        }
    };

    return (
        <div className='login-container'>
            <h2>Welcome to the restauvertions system!</h2>
            {loginError && <h3>Wrong credentials :(</h3>}
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Email or username</Form.Label>
                    <Form.Control
                        placeholder="Type your email or username"
                        onChange={e => setUsername(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Type your password"
                        onChange={e => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button
                    variant="primary"
                    onClick={loginSubmit}
                >
                    Submit
                </Button>
            </Form>
        </div>  
    );
};

export default Login;
