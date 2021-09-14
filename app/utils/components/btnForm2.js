import React from 'react'
import { Pressable } from 'react-native'
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'

const BtnForm2 = ({ onPress, text, children, classContainer, className, classText, pressColor }) => {
    return (
        <View style={[styles.btn2, classContainer]}>
            <Pressable style={[{ paddingVertical: 5, justifyContent: "center" }, className]} android_ripple={{ color: pressColor || "#f6f6f4" }}
                onPress={onPress} >
                {text && <Text style={[styles.text_btn2, classText, classText && classText.fontFamily && { fontWeight: null }]}>{text}</Text>}
                {children}
            </Pressable>
        </View>
    )
}

export default BtnForm2

const styles = StyleSheet.create({
    btn2: {
        borderRadius: 12,
        overflow: "hidden",
        marginBottom: 10,
        backgroundColor: "#E70D04"
    },
    text_btn2: {
        textAlign: "center",
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold"
    }
})
