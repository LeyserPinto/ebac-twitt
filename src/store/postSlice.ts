import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios';

interface Post {
    title: string;
    content: string;
    created_at?: Date;
    user?: string
}

interface PostState {
    posts: Post[];
    loading: boolean;
    error: string | null;
}

const initialState: PostState = {
    posts: [],
    loading: false,
    error: null,
};

export const createPost = createAsyncThunk(
    'posts/createPost',
    async (post: Post, thunkAPI) => {
        try {
            const response = await axios.post('/api/posts/', post);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('Erro ao criar post');
        }
    }
);


export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {    
    const response = await axios.get('/api/posts/', {
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
        }
    });
    return response.data;
});


const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createPost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.loading = false;
                state.posts.push(action.payload);
            })
            .addCase(createPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null;
            });
    },
});

export default postsSlice.reducer;
