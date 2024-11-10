import { eventChannel } from 'redux-saga';
import { call, put, take, takeLatest } from 'redux-saga/effects';
import { setBids, setAsks, setConnected, resetOrderBook } from './orderBookSlice';
import { SOCKET_URL } from '../network/api/api-constants';

function createSocketChannel(symbol, precision) {
    return eventChannel((emit) => {
        const socket = new WebSocket(SOCKET_URL.bitfinexUrl);
        socket.onopen = () => {
            socket.send(
                JSON.stringify({
                    event: 'subscribe',
                    channel: 'book',
                    symbol: `${symbol}`,
                    prec: `P${precision}`,
                })
            );
            emit({ type: 'CONNECTED' });
        };


        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);

            if (!Array.isArray(data) || data[1] === 'hb') return;

            const [, updates] = data;
            if (updates && Array.isArray(updates)) {
                const [price, count, amount] = updates;
                if (count > 0) {
                    const order = { price, count, amount: Math.abs(amount) };
                    if (amount > 0) {
                        emit({ type: 'BID_UPDATE', payload: order });
                    } else {
                        emit({ type: 'ASK_UPDATE', payload: order });
                    }
                }
            }
        };


        socket.onclose = () => { console.log('res=>', 'close'); emit({ type: 'DISCONNECTED' }) };

        return () => socket.close();
    });
}

function* watchSocketChannel(symbol, precision) {
    const channel = yield call(createSocketChannel, symbol, precision);
    yield put(setConnected(true));

    try {
        while (true) {
            const { type, payload } = yield take(channel);
            if (type === 'BID_UPDATE') {
                yield put(setBids(payload));
            } else if (type === 'ASK_UPDATE') {
                yield put(setAsks(payload));
            } else if (type === 'DISCONNECTED') {
                yield put(setConnected(false));
            }
        }
    } finally {
        channel.close();
    }
}

function* handleConnect({ payload }) {
    console.log('res=>', 'handleConnect')
    const { symbol, precision } = payload;
    yield put(resetOrderBook());
    yield call(watchSocketChannel, symbol, precision);
}

export default function* rootSaga() {
    yield takeLatest('CONNECT', handleConnect);
    yield takeLatest('DISCONNECT', function* () {
        yield put(setConnected(false));
    });
}

