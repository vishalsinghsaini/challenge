import React, { useCallback, useState } from 'react';
import { View, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { setPrecision } from '../store/orderBookSlice';

import { Picker } from '@react-native-picker/picker';

const Controls = () => {
    const dispatch = useDispatch();
    const [selectedPrecision, setSelectedPrecision] = useState(0);

    const onConnect = useCallback(() => {
        return dispatch({ type: 'CONNECT', payload: { symbol: 'tBTCUSD', precision: selectedPrecision } })
    }, [dispatch])

    const onDisconnect = useCallback(() => {
        return dispatch({ type: 'DISCONNECT' })
    }, [dispatch])

    const handlePrecisionChange = (value) => {
        setSelectedPrecision(value);
        dispatch(setPrecision(value));
    };

    return (
        <View >
            <Button title="Connect" onPress={onConnect} />
            <Button title="Disconnect" onPress={onDisconnect} />
            <Picker selectedValue={selectedPrecision} onValueChange={handlePrecisionChange}>
                {[0, 1, 2, 3, 4].map((val) => (
                    <Picker.Item key={val} label={`Precision ${val}`} value={val} />
                ))}
            </Picker>
        </View>
    );
};

export default Controls;
