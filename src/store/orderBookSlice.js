import { createSlice } from '@reduxjs/toolkit';

const orderBookSlice = createSlice({
    name: 'orderBook',
    initialState: {
        bids: [],
        asks: [],
        precision: 5, // Default precision
        connected: false,
    },
    reducers: {
        setBids: (state, action) => {
            state.bids = action.payload;
        },
        setAsks: (state, action) => {
            state.asks = action.payload;
        },
        setPrecision: (state, action) => {
            state.precision = action.payload;
        },
        setConnected: (state, action) => {
            state.connected = action.payload;
        },
        resetOrderBook: (state) => {
            state.bids = [];
            state.asks = [];
        },
    },
});

export const { setBids, setAsks, setPrecision, setConnected, resetOrderBook } =
    orderBookSlice.actions;
export default orderBookSlice.reducer;
