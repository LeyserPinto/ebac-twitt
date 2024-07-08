import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios';

interface UserState {
    user: { username: string; email: string } | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}

interface LoginPayload {
    username: string;
    password: string;
}

const initialState: UserState = {
    user: null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
};

export const registerUser = createAsyncThunk(
    'user/register',
    async (userData: { username: string; password: string; email: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/register/', userData);
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.response.data);
        }
    }
);


export const loginUser = createAsyncThunk(
    'user/login',
    async ({ username, password }: LoginPayload, thunkAPI) => {
        try {
            const response = await axios.post('/api/login/', { username: username, password });
            const { token, user_id, username: userName, email: userEmail } = response.data;
            localStorage.setItem('token', token);
            return { token, user: { id: user_id, username: userName, email: userEmail } };
        } catch (error) {
            return thunkAPI.rejectWithValue('Erro ao fazer login');
        }
    }
);

export const logoutUser = createAsyncThunk('user/logout', async () => {    
    try {
        debugger;
        await axios.post('/api/logout/', {},{
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`,
                },
            }
        );
        return {};
    } catch (error: any) {
        return Promise.reject(error.response.data);
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
        },
        setToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem('token', action.payload);
        },
        clearToken: (state) => {
            state.token = null;
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.token = null;
                localStorage.removeItem('token');
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.error = String(action.payload);
            });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
