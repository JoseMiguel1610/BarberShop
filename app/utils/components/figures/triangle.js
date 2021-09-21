import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Triangle = () => {
    return (
        <View style={styles.container}>
            <View style={styles.TriangleShapeCSS} />
        </View>
    )
}

export default Triangle

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf:"center",
        marginTop:-1
    },
    TriangleShapeCSS: {
        width: 0,
        height: 0,
        borderLeftWidth: 6,
        borderRightWidth: 6,
        borderTopWidth: 12,
        borderStyle: 'solid',
        backgroundColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: '#fff'
    }
})
