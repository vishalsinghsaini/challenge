import { useAppTheme } from '@/src/app-hooks/use-app-theme';
import React, { useCallback } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { createStyleSheet } from './style';

const OrderBook = () => {
    const { theme } = useAppTheme();
    const styles = createStyleSheet(theme);


    const bids = useSelector((state) => state.orderBook.bids);
    const asks = useSelector((state) => state.orderBook.asks);


    const renderBids = (item: any) => {
        return (
            <View style={[styles.row, styles.bidRow]}>
                <View style={styles.cell}>
                    <Text style={styles.amount}>{item.amount}</Text>
                </View>
                <View style={styles.cell}>
                    <Text style={styles.price}>{item.price}</Text>
                </View>
            </View>
        )
    }

    const renderAsks = (item: any) => {
        return (
            <View style={[styles.row, styles.askRow]}>
                <View style={styles.cell}>
                    <Text style={styles.price}>{item.price}</Text>
                </View>
                <View style={styles.cell}>
                    <Text style={styles.amount}>{item.amount}</Text>
                </View>
            </View>
        )
    }

    const keyExtractor = useCallback(
        (item: any) => `${item.price}-${item.amount}`,
        []
    )

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Order Book</Text>

            <View style={styles.row}>
                <View style={[styles.header, { flex: 0.5 }]}>
                    <Text style={styles.headerText}>Amount</Text>
                    <Text style={styles.headerText}>Price</Text>
                </View>
                <View style={[styles.header, { flex: 0.5 }]}>
                    <Text style={styles.headerText}>Price</Text>
                    <Text style={styles.headerText}>Amount</Text>
                </View>
            </View>

            <View style={{ flexDirection: 'row' }}>
                <FlatList
                    data={bids}
                    renderItem={({ item }) => renderBids(item)}
                    keyExtractor={keyExtractor}
                />
                <FlatList
                    data={asks}
                    renderItem={({ item }) => renderAsks(item)}
                    keyExtractor={keyExtractor}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 10 },
    title: { fontSize: 20, fontWeight: 'bold', textAlign: 'center' },
    header: { flexDirection: 'row', justifyContent: 'space-between', padding: 5 },
    headerText: { fontSize: 16, fontWeight: 'bold' },
    row: { flexDirection: 'row', justifyContent: 'space-between', padding: 5 },
    askRow: { backgroundColor: '#f8d7da' },
    bidRow: { backgroundColor: '#d4edda' },
    cell: { flex: 1, textAlign: 'center' },
    price: { fontWeight: 'bold' },
    amount: { color: '#666' },
    count: { color: '#666' },
});

export default OrderBook;
