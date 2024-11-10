import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { NavigationContainerRef, useFocusEffect, useNavigation } from '@react-navigation/native';
import { useGetAllAssets } from '@/src/network/hooks/use-available-asset';
import { navigations } from '@/src/config/app-navigation/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setAppointmentData } from '@/src/network/reducers/home-reducer';
import { StoreType } from '@/src/network/reducers/store';

export const Home = () => {
    const [data, setData] = useState([])
    const navigation: NavigationContainerRef<any> = useNavigation()
    const dispatch = useDispatch()
    const { appointmentData } = useSelector((state: StoreType) => state.homeReducer);
    useFocusEffect(() => {
        getScreenData()
    })

    const getScreenData = () => {
        useGetAllAssets().then(res => {
            // setData(res)
            dispatch(setAppointmentData(res))
        }).finally(() => {
        }).catch(err => {
        })
    }

    const keyExtractor = useCallback(
        (item) => item?.id?.toString(),
        []
    )

    const renderItem = ({ item, index }) => {
        return (
            <View>
                <Text>{item?.id}</Text>
            </View>
        )
    }

    const navigateToProduct = useCallback(() => {
        return navigation.navigate(navigations.PRODUCT, {
            params: {
                name: 'hi'
            }
        })
    }, [navigation])

    return (
        <>
            {/* <View>
                {appointmentData && <FlatList
                    data={appointmentData}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                />}
            </View> */}
            <View style={{ alignSelf: 'center', marginTop: '50%' }}>
                <TouchableOpacity onPress={navigateToProduct} style={{ height: 30, width: 100 }}>
                    <Text>Navigate</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}
