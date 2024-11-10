import { createSlice } from '@reduxjs/toolkit';

const orderBookSlice = createSlice({
    name: 'orderBook',
    initialState: {
        bids: [],
        asks: [],
        precision: 5,
        connected: false,
    },
    reducers: {
        setBids: (state, action) => {
            // logic to maintain the top bids in sorted order
            state.bids = [action.payload, ...state.bids].slice(0, 10);
        },
        setAsks: (state, action) => {
            // logic to maintain the top asks in sorted order
            state.asks = [action.payload, ...state.asks].slice(0, 10);
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

export const { setBids, setAsks, setPrecision, setConnected, resetOrderBook, setSocketConnection } =
    orderBookSlice.actions;
export default orderBookSlice.reducer;
