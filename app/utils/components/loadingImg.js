import React from 'react'
import { ActivityIndicator } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'

const LoadingImg = ({style}) => {
    return (
        <View style={{...style, position:"absolute"}}>
            <View style={{ width: "100%", height:"100%", justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" color="#b99a55" />
        </View>
        </View>

    )
}

export default LoadingImg

const styles = StyleSheet.create({})
