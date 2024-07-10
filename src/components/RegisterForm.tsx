import React, { useState } from 'react';
import axios from '../axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../store/userSlice';
import { AppDispatch } from '../store';
import  './styles/RegisterForm.scss';

const RegisterForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState<String[]>([]);
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError([]);
        try {
            const response = await axios.post('/api/register/', {
                username,
                email,
                password,
                password2,
            });

            dispatch(loginUser(response.data));
            navigate('/');
        } catch (error: any) {
            let errMsgArray: String[] = [];
            const errInputs = Object.keys(error.response.data);

            if(errInputs != undefined && errInputs.constructor == Array && errInputs.length > 0) {
                errInputs.forEach(errInput => {
                    errMsgArray.push(`${errInput} input: ${error.response.data[errInput]}`)
                })
            }
            if(errMsgArray != undefined) {
                setError(errMsgArray);
            } else {
                setError(['Registration failed']);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className='form' onSubmit={handleSubmit}>
            <div className="title">
                <img src='https://lms.ebaconline.com.br/_nuxt/img/ebac-logo.8292196.svg'/>            
                <p>
                    <span>Ta quase lá...</span><br />
                </p>
            </div>

            <div className='inputs'>
                    <input
                        placeholder="Usuario"
                        className="input"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        placeholder="Email"
                        className="input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        placeholder="Password"
                        className="input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        placeholder="Confirm Password"
                        className="input"
                        type="password"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                    />
            </div>
            <div className='form-actions'>
                {loading && <p className='message'>Loading...</p>}
                <button type="submit" className="button-confirm">Register</button>
                
                {error && <ul className='err-lists'>{error.map((err:String, index:number) => (
                    <li className='err' key={index}>{err}</li>
                ))}</ul>}
            </div>
        </form>
    );
};

export default RegisterForm;
