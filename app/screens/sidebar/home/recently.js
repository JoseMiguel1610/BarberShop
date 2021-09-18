import { useTheme } from '@react-navigation/native'
import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import CardShop2 from './cardShop2'

const Recently = () => {
    const theme = useTheme()
    return (
        <View style={styles.container}>
            <View style={styles.container_text}>
                <Text style={[styles.text, { color: theme.dark ? "#fff" : "black"}]}>Destacados...</Text>
            </View>
            <ScrollView horizontal style={{ paddingBottom: 3 }} showsHorizontalScrollIndicator={false}>
                {
                    data.map(e => <CardShop2 {...e} key={e.name} />)
                }
            </ScrollView>
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