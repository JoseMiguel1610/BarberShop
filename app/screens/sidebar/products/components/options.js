import React from 'react'
import { Pressable } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'

const Options = ({ setSelectOption, selectOption }) => {

    return (
        <View style={styles.title}>
            <Pressable android_ripple={{ color: "#ffc26c" }} style={{ padding: 8 }}
                onPress={() => setSelectOption(0)}>
                <Text style={!selectOption ? styles.select : styles.noSelect}>Destacados</Text>
            </Pressable>
            <View style={styles.rod}></View>
            <Pressable android_ripple={{ color: "#ffc26c" }} style={{ padding: 8 }}
                onPress={() => setSelectOption(1)} >
                <Text style={selectOption ? styles.select : styles.noSelect} >Cercanos</Text>
            </Pressable>
        </View>
    )
}

export default Options

const styles = StyleSheet.create({
    title: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 16
    },
    select: {
        color: "#ff1818",
        fontSize: 18,
        fontWeight: "bold",
    },
    noSelect: {
        color: "#000",
        fontSize: 18,
        fontWeight: "bold",
    },
    rod: {
        height: 18,
        width: 2.5,
        backgroundColor: "#000",
    }
})
