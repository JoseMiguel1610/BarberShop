import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { SaveShopsParams } from '../../../../../../actions/shopHomeActions'
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';
import { color } from 'react-native-reanimated';
const CardSubcategory = (props) => {
    const { navigation, goModal, openModal, style, toggleModal, iconUrl, name, id, subCategory } = props
    const dispatch = useDispatch()
    let fullStores = []
    let subCategoryAux = []
    const theme = useTheme();

    return (
        <View style={[styles.card, style || {}]}>
            <Pressable style={styles.container_image} android_ripple={{ color: "#fff" }}
                onPress={() => {}}>
                    <Image source={require("../../../../assets/addimagen.png")} style={{ width: 80, height: 80 }} />
            </Pressable>
            <Text style={[styles.description, { color: theme.dark ? "#fff" : "black" }]}  numberOfLines={1}> {name} </Text>
        </View>
    )
}

export default CardSubcategory

const styles = StyleSheet.create({
    card: {
        width: 80,
        marginVertical: 8
    },
    container_image: {
        paddingTop: 0,
    },
    description: {
        textAlign: "center",
        fontSize: 11,
        textTransform: "capitalize",
        fontFamily: "Metropolis-Regular"
    }
})
