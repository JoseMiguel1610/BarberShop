import { useTheme } from '@react-navigation/native'
import React from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import CardShop2 from './cardShop2'

const Recently = (props) => {
    const { recomendados } = props
    const theme = useTheme()
    return (
        <View style={styles.container}>
            <View style={styles.container_text}>
                <Text style={[styles.text, { color: theme.dark ? "#fff" : "black" }]}>Recomendados...</Text>
            </View>
            {!!recomendados ? (
                recomendados.length > 0 ? (
                    <ScrollView horizontal style={{ paddingBottom: 3 }} showsHorizontalScrollIndicator={false}>
                        {recomendados.map(e => <CardShop2 {...e} key={e.iD_SERVICIO} />)}
                    </ScrollView>
                ) : (
                    <View style={{ justifyContent: "center", alignItems: "center", width: "100%", height: 226 }}>
                        
                    </View>
                )
            ) : (
                <View style={{ justifyContent: "center", alignItems: "center", width: "100%", height: 226 }}>
                    <ActivityIndicator size='large' color='#fc9610' />
                </View>
            )
            }
        </View>
    )
}

export default Recently

const data = [
    { name: "don jacinto", category: "Frutas y veru", img: "https://corporacion-alva.s3.us-east-2.amazonaws.com/publico/otros/don-jacinto.jpg" },
    { name: "mi mejor amigo", category: "Veterinaría", img: "https://corporacion-alva.s3.us-east-2.amazonaws.com/publico/otros/mejor-amigo.jpg" },
    { name: "bb+", category: "Cervecería", img: "https://corporacion-alva.s3.us-east-2.amazonaws.com/publico/otros/BB%2B.jpg" }
]

const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingVertical: 10,
    },
    text: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 18,
        marginBottom: 10
    },
    container_text: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingRight: 20
    },
    watch: {
        marginTop: 3,
        fontFamily: "Poppins-SemiBold"
    },
})