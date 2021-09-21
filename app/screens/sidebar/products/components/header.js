import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, ImageBackground, Image, Pressable, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import { Picker } from '@react-native-community/picker';
import ModalAllCategoriesComp from './modalAllCat';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { FlatList } from 'react-native';

const Header = ({ nameCategory, subCategorys, indSubcatSelect, indSubcat, stores, storeSearch }) => {
    const [place, selectPlace] = useState("1");
    const [modalAllCategories, setModalAllCategories] = useState(false);
    const navigation = useNavigation()
    const toggleModalAllCategories = () => {
        setModalAllCategories(!modalAllCategories);
    };


    return (
        <>
            <ImageBackground style={styles.container_top} source={require("../../../../../assets/fondo-02.png")} >
                <Pressable 
                    onPress={() => navigation.goBack()}>
                    <Icon name='arrow-left' color={"#b99a55"} size={30} />
                </Pressable>
                <Text style={styles.h1}>{nameCategory}</Text>
            </ImageBackground>
        </>
    )
}

export default Header

const styles = StyleSheet.create({
    container_top: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
        resizeMode: "cover"
    },
    h1: {
        color: "#fff",
        textTransform: "uppercase",
        marginTop: 5
    },
    border_icon: {
        width: 32,
        height: 32,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 999
    },
    searchFilter: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    search: {
        width: 260,
        height: 36,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingHorizontal: 20
    },
    input: {
        fontSize: 11
    },
    filters: {
        width: 86,
        height: 36,
        backgroundColor: "#fff",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        borderRadius: 10,
        paddingHorizontal: 5
    },
    iconfilter: {
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center"
    },
    container_options: {
        //paddingHorizontal: 20,
        flexDirection: "row",
        backgroundColor: "#ff9300",
        //flexWrap:"wrap",
        //alignItems: "center",
        //justifyContent:"center"
    },
    border_option: {

    },
    press_option_more: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
        height: 77,
        width: 65,
        backgroundColor: "#fff",
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        overflow: "hidden",
        //marginRight: 5,
        paddingVertical: 10,
        borderRightWidth: 0.5,
        //borderTopWidth:0.5,
        //borderBottomWidth:0.5,
        borderColor: "#ff9300",
        overflow: "hidden",
        position: "absolute",
        zIndex: 100
    },
    text_option_more: {
        textAlign: "center",
        fontSize: 8,
        fontWeight: "bold",
        lineHeight: 7.8,
        height: 18,
        overflow: "visible",
        marginTop: 2,
        paddingHorizontal: 1
    },
    press_option: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
        height: 57,
        width: 57,
        backgroundColor: "#fff",
        borderRadius: 999,
        //overflow: "hidden",
        marginHorizontal: 10,
        marginVertical: 10,
    },
    icon_option: {
        height: 26,
        width: 26
    },
    text_option: {
        textAlign: "center",
        fontSize: 8,
        lineHeight: 7.8,
        height: 18,
        overflow: "visible",
        marginTop: 2,
        paddingHorizontal: 1
    },
    scroll: {
        marginLeft: 60,
        marginVertical: 0,
        paddingVertical: 0
    }
})
