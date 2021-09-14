import React from 'react'
import { Pressable } from 'react-native'
import { ImageBackground } from 'react-native'
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'

/* const BtnForm1 = ({ onPress, text, children, classContainer, className, classText, bg2,w,brad }) => {
    return (
        <ImageBackground style={[styles.btn2, classContainer ,  { width:w?w:'auto' ,borderRadius:brad||15 }]}
            source={bg2 ? require("../../../assets/banner_deg2.png") : require("../../../assets/banner_deg.png")} >
            <Pressable style={[{ paddingVertical: 5, justifyContent: "center" }, className]} android_ripple={{ color: "#f6f6f4" }}
                onPress={onPress} >
                {!!text && <Text style={[styles.text_btn2, classText, classText && classText.fontFamily ? { fontWeight: null } : {}]}>{text}</Text>}
                {children}
            </Pressable>
        </ImageBackground>
    )
} */
const BtnForm1 = ({ onPress, text, children, classContainer, className, classText, bg2 }) => {
    return (
        <ImageBackground style={[styles.btn2, classContainer]}
             >
            <Pressable style={[{ paddingVertical: 5, justifyContent: "center" }, className]} android_ripple={{ color: "#f6f6f4" }}
                onPress={onPress} >
                {!!text && <Text style={[styles.text_btn2, classText, classText && classText.fontFamily ? { fontWeight: null } : {}]}>{text}</Text>}
                {children}
            </Pressable>
        </ImageBackground>
    )
}

export default BtnForm1

const styles = StyleSheet.create({
    btn2: {
        borderRadius: 12,
        overflow: "hidden",
        marginBottom: 10,
        backgroundColor: "#b99a55"
    },
    text_btn2: {
        textAlign: "center",
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold"
    }
})
