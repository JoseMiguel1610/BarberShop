import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, FlatList } from 'react-native';
import Modal from "react-native-modal"
import textos from '../../../../styles/textos';
import Icon from 'react-native-vector-icons/AntDesign';
import { Pressable } from 'react-native';
import 'moment/locale/es'
import CardSexo from './cardsexo';

function ModalSexo({ isModalVisible, setsexo, toggleModal, onBackButtonPress,
    toggleModalPickUp, type, minEstOrden, maxEstOrden }) {
    const navigation = useNavigation()
    const kdriverEstimate = 0 // 1 hora

    const items = [
        { id: 1, name: "Masculino" },
        { id: 2, name: "Femenino" },
    ]


    return (
        <Modal isVisible={isModalVisible} style={styles.modal} onBackButtonPress={onBackButtonPress} >
            <View style={styles.container}>
                <View style={textos.separator_trans}></View>
                <View style={textos.separator_trans}></View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={styles.text}></Text>
                    <Text style={styles.text}>Seleccione su sexo</Text>
                    <Pressable onPress={toggleModal} style={{ padding: 4 }} android_ripple={{ color: "#FE9401", radius: 16 }}>
                        <Icon name='closecircle' color={"#FE9401"} size={25} />
                    </Pressable>
                </View>
                <View style={textos.separator_trans}></View>
                <View style={textos.separator_trans}></View>
                <FlatList
                    data={items}
                    renderItem={({ item }) => <CardSexo setsexo={setsexo} toggleModal={toggleModal} data={item} />}
                    keyExtractor={(item) => item.id.toString()}
                    persistentScrollbar={true}
                />
            </View>
        </Modal>
    );
}

export default ModalSexo;

const styles = StyleSheet.create({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    container: {
        alignSelf: "center",
        backgroundColor: "#fff",
        width: "80%",
        height: "30%",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        overflow: "hidden",
        paddingTop: 20,
        paddingHorizontal: 30,
        paddingBottom: 5,
        bottom: 0
    },
    img_contac: {
        marginRight: 5,
        marginTop: "auto",
        marginBottom: "auto",
        height: 50,
        width: 50
    },
    text: {
        textAlign: "center",
        fontSize: 18,
        color: "#3b3b3b",
        fontFamily: "Metropolis-Bold",
    }
})