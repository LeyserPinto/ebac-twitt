import React, { BaseSyntheticEvent,  MouseEventHandler, useState } from 'react';
import './styles/CreatePost.scss';
import axios from '../axios';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../store/postSlice';
import { RootState, AppDispatch } from '../store';
import { useNavigate } from 'react-router-dom';

type ICreatePost = {
    handleToggle: BaseSyntheticEvent | MouseEventHandler | any
}
const CreatePost = (props:ICreatePost) => {
    const [localErro, setLocalErro] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state: RootState) => state.post);


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        
        try {
            let created_at = new Date();
            dispatch(createPost({ title, content, created_at}))
            window.location.reload()
        } catch (error: any) {
            setLocalErro('Há ocorrudio um erro ' + error)
        }
    };

    


    return (
        <div className='createposts-form' data-eb-toggle onClick={props.handleToggle}>
            <form onSubmit={handleSubmit} className='form'>
                {error && <div>{error}</div>}
                {localErro && <div>{localErro}</div>}
                <div>
                    <h1>Criar Posts</h1>
                </div>
                <div className='inputs'>
                    <div>
                        <label htmlFor="title">Título:</label>
                        <input
                            className="input"
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="content">Conteúdo:</label>
                        <textarea
                            className="input"
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className='form-actions'>
                    <button type="submit" className='button'>Criar Post</button>
                </div>
            </form>
        </div>
    );
};

export default CreatePost;
