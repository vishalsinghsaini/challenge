import { ThemeProps } from '@/src/theme/theme';
import { StyleSheet } from 'react-native';


export const createStyleSheet = (theme: ThemeProps) => StyleSheet.create({
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
    ml5: { paddingLeft: 100 }
})