import React from 'react'
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native'

const Loading = ({ view, logout }) => {
    return (
        <View style={styles.container}>
            {/* <ImageBackground style={styles.container} source={require("../../assets/banner_deg.png")}> */}
            <Image source={require("../../assets/fondo.jpg")} style={{width:240,height:111}} resizeMode="contain" />
            {/* <Image
                style={styles.image}
                source={require("../../assets/logo.png")} /> */}
            <Text style={styles.text}>{view ? "Cargando" : logout ? "Cerrando sesión" : "Validando"}</Text>
            {/* </ImageBackground> */}
        </View>
    )
}

export default Loading

const styles = StyleSheet.create({
    container: {
        flex: 1, /* backgroundColor: "#df7639", */ justifyContent: "center", alignItems: "center"
    },
    text: {
        fontSize: 25, color: /* "white" */"#df7639", fontFamily: "Poppins-SemiBold"
    },
    image: {
        width: 100, height: 100, borderRadius: 25
    }
})

