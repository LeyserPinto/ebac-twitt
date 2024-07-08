import React, {BaseSyntheticEvent, useState} from 'react';
import './styles/HomePage.scss'
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { logoutUser } from '../store/userSlice'
import Posts from './Posts';
import CreatePost from './CreatePost';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>();
    const [showForm, setShowForm] = useState(false);
    const user = useSelector((state: RootState) => state.user.user);

    const handleToggle = (e: BaseSyntheticEvent) => {
        if(e.target?.attributes['data-eb-toggle']) {
            setShowForm(!showForm)
        }        
    }

    const handleLogout = () => {
        try {
            dispatch(logoutUser());
            navigate('/')            
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <div className='home'>            
            <div className='home-container'>
                <div className='home-header'>
                    {user?.username !== undefined ? <h1>Ben-vindo, {user?.username}!</h1> :  <h1>Ben-vindo!</h1>}       

                    <button className='btn' onClick={() => setShowForm(!showForm)}> Novo Post</button>         
                </div>
                <div className='posts-container'>
                    <Posts />
                </div>
                <div>
                    <button className='btn' onClick={handleLogout}>Logout</button>
                </div>
            </div>
            {showForm && <CreatePost  handleToggle={handleToggle} />}
        </div>
    );
};

export default HomePage;


