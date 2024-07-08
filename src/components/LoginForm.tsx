import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/userSlice';
import { AppDispatch, RootState } from '../store';

import './styles/LoginForm.scss'

const LoginForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { loading, error, token } = useSelector((state: RootState) => state.user);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [localError, setLocalError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
           await dispatch(loginUser({ username, password })).then((result) => {
                if (result.meta.requestStatus === 'fulfilled') {
                    navigate('/home');// Redirecionar após login bem-sucedido
                }
            });
            
        } catch (error) {
            setLocalError('Usuario e Senha invalidos');
        }
    };

    return (
        <form onSubmit={handleSubmit} className='form'>
            <div className="title">
                <img src='https://lms.ebaconline.com.br/_nuxt/img/ebac-logo.8292196.svg'/>
            
                <p>
                    <span>Bem-vindo,</span><br />
                    AO EBAC TWITT
                </p>
            </div>

            <div className='inputs'>
                <input  className="input" 
                        name="username" 
                        placeholder="Usuario" 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} />
                <input  className="input" 
                        name="password" 
                        placeholder="Senha" 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className='form-actions'>
                {loading && <p className='message'>Loading...</p>}
                <button type="submit" className="button-confirm">Bora →</button>
                {localError && <p className='message'>{localError}</p>}
                <Link className='button-register' to='/register'>Cadastre-se</Link>
            </div>
        </form>

    );
};

export default LoginForm;
