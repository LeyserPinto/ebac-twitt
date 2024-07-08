import React, { useEffect, useState } from 'react';
import axios from '../axios';

interface Post {
    id: number,
    title: string;
    content: string;
    created_at: Date;
    user: string
}

const Posts: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
   
    useEffect(() => {
        axios.get('/api/posts/', {
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            if(response.data.constructor == Array && response.data.length > 0) {
                setPosts(response.data);
                setLoading(false);
            } else {
                setPosts([]);
                setError('Sem publicações disponíveis');
                setLoading(false);
            }
        })
        .catch(error => {
            setError('Erro ao buscar publicações');
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <ul className='posts-list'>
            {posts.map((post) => (
                <li className='posts' key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                </li>
            ))}
        </ul>
    );
};

export default Posts;
