import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import io from 'socket.io-client';
import { setBids, setAsks, setConnected, resetOrderBook } from './orderBookSlice';

const SOCKET_URL = 'wss://api-pub.bitfinex.com/ws/2';
let socket;

function createSocketChannel(symbol, precision) {
    return new Promise((resolve) => {
        socket = io(SOCKET_URL, { transports: ['websocket'] });

        socket.on('connect', () => {
            socket.emit('subscribe', {
                event: 'subscribe',
                channel: 'book',
                symbol,
                prec: `P${precision}`,
            });

            resolve(socket);
        });

        socket.on('message', (data) => {
            if (data[1] && Array.isArray(data[1])) {
                const [price, count, amount] = data[1];
                const type = amount > 0 ? 'bids' : 'asks';
                const updateData = { price, count, amount: Math.abs(amount) };
                socket.emit('order_update', { type, updateData });
            }
        });
    });
}

function* handleConnect({ payload }) {
    const { symbol, precision } = payload;
    yield put(setConnected(true));

    const socket = yield call(createSocketChannel, symbol, precision);

    // Listen for WebSocket events
    socket.on('order_update', function* (data) {
        const { type, updateData } = data;
        if (type === 'bids') {
            yield put(setBids(updateData));
        } else {
            yield put(setAsks(updateData));
        }
    });
}

function* handleDisconnect() {
    if (socket) {
        socket.disconnect();
    }
    yield put(setConnected(false));
    yield put(resetOrderBook());
}

export default function* rootSaga() {
    yield takeLatest('CONNECT', handleConnect);
    yield takeEvery('DISCONNECT', handleDisconnect);
}
