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
import Colum_simple from '../../../../utils/components/colum_simple';
import Row_simple from '../../../../utils/components/row_simple';

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
            <View style={styles.top}>
                    <Row_simple alitems={'center'} jus_cont={'flex-start'} flex={1}>
                        <Colum_simple jus_cont={'center'} alitems={'flex-start'} flex={1}>
                            <Pressable android_ripple={{ color: "#3b3b3b" }}
                                onPress={() => navigation.goBack()}>
                                <Icon name='arrow-left' color={"#b99a55"} size={30} />
                            </Pressable>
                        </Colum_simple>
                        <Colum_simple jus_cont={'center'} alitems={'center'} flex={1}>
                            <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ fontSize: 20, color: "#fff" }}>{nameCategory}</Text>
                            </View>
                        </Colum_simple>
                        <Colum_simple jus_cont={'center'} alitems={'flex-end'} flex={1}>
                            <Image
                                source={require("../../../../../assets/logobarber.png")} style={{ width: 80, height: 80 }}>
                            </Image>
                        </Colum_simple>
                    </Row_simple>

                </View>
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
    top: {
        height: 100,
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
