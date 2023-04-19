import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const getAllProducts = createAsyncThunk(
    'products/getAllProduct',
    async (filter, {rejectWithValue}) => {
        try {
            const category = `${filter.category !== 'All' ? `category=${filter.category}&` : ''}`

            const res = await axios(`http://localhost:8080/products?${category}`)
            if (res.statusText !== 'OK') {
                throw new Error('ERROR !!!')
            }
            return res.data
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)


const initialState = {
    data: [],
    filter: {
        category: 'All',
        orders: ''
    },
    error: '',
    status: ''
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        changeStatus: (state, action) => {
            state.filter = {
                ...state.filter,
                category: action.payload
            }
        }
    },
    extraReducers : {
        [getAllProducts.rejected] : (state, action) => {
            state.error = action.payload
            state.status = 'error'
        },
        [getAllProducts.pending] : (state, action) => {
            state.status = 'loading'
        },
        [getAllProducts.fulfilled] : (state, action) => {
            state.status = 'done'
            state.data = action.payload
        }
    }

})


export const {changeStatus} = productsSlice.actions
export default productsSlice.reducer;
