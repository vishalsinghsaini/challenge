import { View, Text } from 'react-native'
import React from 'react'

export const Product = (props: any) => {
    const { name } = props?.route?.params?.params
    return (
        <View style={{ alignSelf: 'center', marginTop: '50%' }}>
            <Text>Product</Text>
            <Text>{name}</Text>
        </View>
    )
}
