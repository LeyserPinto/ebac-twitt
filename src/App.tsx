import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss'
import store from './store';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import HomePage from './components/HomePage';

const App: React.FC = () => {
    return (
        <div className='app_container'>
            <Provider store={store}>
                <Router>
                    <Routes>
                        <Route path="/" element={<LoginForm />} />
                        <Route path="/register" element={<RegisterForm />} />
                        <Route path="/home" element={<HomePage />} />
                    </Routes>
                </Router>
            </Provider>
        </div>
    );
};

export default App;
