import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../utils/axios";


export const getMyFriends = createAsyncThunk(
    'myFriends/getMyFriends',
    async (filter, {rejectWithValue}) => {
        try {
            const res = await axios(`/users?friends=${filter.friends.join(',')}`);

            if (res.statusText !== 'OK') {
                throw new Error('Данные не получены')
            }

            return res.data

        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
)


const myFriendsSlice = createSlice({
    name: 'myFriends',
    initialState: {
        data: [],
        status: '',
        error: ''
    },
    reducers: {},
    extraReducers: {
        [getMyFriends.pending]: (state, action) => {
            state.status = 'Loading...'
            state.error = ''
        },
        [getMyFriends.rejected]: (state, action) => {
            state.status = 'Error'
            state.error = action.payload
        },
        [getMyFriends.fulfilled]: (state, action) => {
            state.status = 'Done'
            state.data = action.payload
        }
    }
})

export const {emptyFriends} = myFriendsSlice.actions
export default myFriendsSlice.reducer