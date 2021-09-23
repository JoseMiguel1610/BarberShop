import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { useDispatch } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';
import { color } from 'react-native-reanimated';
const CardSubcategory = (props) => {
    const { navigation, goModal, openModal, style, toggleModal, iconUrl, descripcion, iD_CATE, subCategory } = props
    const dispatch = useDispatch()
    let fullStores = []
    let subCategoryAux = []
    const theme = useTheme();

    function onPress() {
        if (goModal) {
            openModal()
        } else {
            if (toggleModal) {
                toggleModal()
                navigation.navigate("Servicios", { nameCategory: descripcion, id: iD_CATE })
            } else {
                navigation.navigate("Servicios", { nameCategory: descripcion, id: iD_CATE})
            }
        }

    }

    return (
        <View style={[styles.card, style || {}]}>
            <Pressable style={styles.container_image} android_ripple={{ color: "#fff" }}
                onPress={() => onPress()}>
                    {iD_CATE == 1 && 
                    <Image source={require("../../../../assets/categorias/corte-regular.jpg")} style={{ width: 95, height: 95 }} /> }
                    {iD_CATE == 2 && 
                    <Image source={require("../../../../assets/categorias/barba-diseño.jpg")} style={{ width: 95, height: 95 }} /> }
                    {iD_CATE == 3 && 
                    <Image source={require("../../../../assets/categorias/mascarilla-blanca.jpg")} style={{ width: 95, height: 95 }} /> }
                    {iD_CATE == 4 && 
                    <Image source={require("../../../../assets/categorias/masaje_cabeza.jpg")} style={{ width: 95, height: 95 }} /> }
                    {iD_CATE == 5 && 
                    <Image source={require("../../../../assets/categorias/peinado-regular.jpg")} style={{ width: 95, height: 95 }} /> }
                    {iD_CATE == 6 && 
                    <Image source={require("../../../../assets/categorias/tinte-puntas.jpg")} style={{ width: 95, height: 95 }} /> }
            </Pressable>
            <Text style={[styles.description, { color: theme.dark ? "#fff" : "black" }]}  numberOfLines={1}> {descripcion} </Text>
        </View>
    )
}

export default CardSubcategory

const styles = StyleSheet.create({
    card: {
        width: 95,
        marginVertical: 8
    },
    container_image: {
        paddingTop: 0,
    },
    description: {
        textAlign: "center",
        fontSize: 13,
        textTransform: "capitalize",
        fontFamily: "Metropolis-Bold"
    }
})
