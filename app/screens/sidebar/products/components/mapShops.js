import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import MapView, { Callout, Marker } from 'react-native-maps'
import { useDispatch, useSelector } from 'react-redux'
import Triangle from '../../../../utils/components/figures/triangle'

const MapShops = ({ stores, setSelectOption }) => {
    const [ready, setReady] = useState(false)
    const [storesNear, setStoresNear] = useState([])
    const navigation = useNavigation();
    const { initAdrress } = useSelector(reducers => reducers.deliveryReducer);
    const dispatch = useDispatch()
    const radius = 2
    const region = {
        latitude: initAdrress.latitude,
        longitude: initAdrress.longitude,
        latitudeDelta: 0.0280,
        longitudeDelta: 0.0280,
    }
    console.log("stores MapShops:", stores)

    /* useEffect(() => {
        const aux = stores.filter(e => {
            const distance = haversineDistance(e.locations, initAdrress);
            console.log("distance " + e.nameStore + ": ", distance)
            console.log("dif Long:", e.locations.longitude - initAdrress.longitude)
            console.log("dif latitude:", e.locations.latitude - initAdrress.latitude)
            console.log("__________")
            return distance < radius
        })
        console.log("aux:", aux)
        setStoresNear(aux)
    }, [stores]) */

    function goStoreView(storeSelect) {
        navigation.navigate("StoresSales/ProductsShop", storeSelect)
    }

    return (
        <View style={styles.container}>

            <MapView
                style={{ width: "100%", flex: 1 }}
                //region={region}
                initialRegion={region}
                //ref={mapRef}
                liteMode={false}
                //scrollEnabled={false}
                //customMapStyle={style && mapStyles}
                showsUserLocation={true}
                showsMyLocationButton={false}
                showsCompass={false}
                onMapReady={() => setReady(true)}
                toolbarEnabled={false}
                mapType="standard"
                loadingEnabled={true}
            //zoomEnabled={false}
            >

                {
                    stores.map(e => (
                        <Marker
                            key={e.id}
                            coordinate={e.locations}
                            draggable={false}
                            onPress={() => {
                                /* pressMarker(e)
                                setStoreSelect(e) */
                            }}
                        >
                            <Image source={require("../../../../../assets/back.png")} style={{ height: 50, width: 50 }}
                                resizeMode="contain"
                            />
                            <Callout tooltip={true} onPress={() => goStoreView(e)}>
                                <Pressable style={styles.callout}>
                                    <Text style={styles.nameStore}>{e.nameStore}</Text>
                                    <Text style={styles.address}></Text>
                                    <Text style={styles.goStore}>Ver tienda</Text>
                                </Pressable>
                                <Triangle />
                            </Callout>
                        </Marker>
                    ))
                }
            </MapView>
        </View>
    )
}

export default MapShops

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: "7%",
        flex: 1
    },
    nameStore: {
        fontSize: 10,
        textAlign: "center",
        fontWeight: "bold"
    },
    goStore: {
        fontSize: 10,
        textAlign: "center",
        color: "blue",
        textDecorationLine: "underline",
        marginVertical: 0
    },
    address: {
        textAlign: "center",
        fontSize: 8
    },
    callout: {
        width: 100,
        backgroundColor: "#fff",
        padding: 5,
        borderRadius: 5
    }
})
