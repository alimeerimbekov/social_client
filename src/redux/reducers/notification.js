 import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const getAllNotifications = createAsyncThunk(
    'notification/getAllNotifications',
    async (filter, {rejectWithValue}) => {
        try {
            const res = await axios(`/users?notification=${filter.arr.join(',')}`);

            if (res.statusText !== 'OK') {
                throw new Error('Данные не получены')
            }

            return res.data

        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
)


const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        data: [],
        status: '',
        error: '',
    },
    reducers: {
        emptyNotification : (state, action) => {
            state.data = []
        }
    },
    extraReducers: {
        [getAllNotifications.pending] : (state, action) => {
            state.status = 'Loading...'
            state.error = ''
        },
        [getAllNotifications.rejected] : (state, action) => {
            state.status = 'Error'
            state.error = action.payload
        },
        [getAllNotifications.fulfilled] : (state, action) => {
            state.status = 'Done'
            state.data = action.payload
        }
    }
})

 export const {emptyNotification} = notificationSlice.actions
export default notificationSlice.reducer