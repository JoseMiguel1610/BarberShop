import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { ActivityIndicator } from "react-native";
import Modal from "react-native-modal";
import textos from "../../styles/textos";
import Row_simple from "../components/row_simple";
import BtnForm1 from "../components/btnForm1";
import { wait } from "../others";


const Out_of_service = ({ isModalVisible, setvis_out_of_serv }) => {
    const navigation = useNavigation();

    function close() {
        setvis_out_of_serv(false)
    }

    return (
        <Modal isVisible={isModalVisible} style={styles.modal} onBackButtonPress={() => null} animationIn='slideInRight' animationOut='zoomOut' animationInTiming={300} animationOutTiming={300}>
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    paddingHorizontal: 20,
                }}
            >
                <View>
                    {/* <ActivityIndicator size='large' color='#77D353' /> */}
                    {/* <Image source={require('../../../../../assets/inicio-08.png')} style={styles.img_icon1} />
                    <Image source={require('../../../../../assets/working.png')} style={styles.img_portada} /> */}
                    <Text style={styles.text_h1}>Califica a tu estilista... </Text>
                    <BtnForm1 text="OK" onPress={() => close()} classContainer={{ marginTop: 15 }} />

                    <Row_simple jus_cont={"center"}></Row_simple>
                </View>
            </View>
        </Modal>
    );
};

export default Out_of_service;

const styles = StyleSheet.create({
    text_h1: {
        fontSize: 25,
        textAlign: 'center',
        color: "white",
        fontFamily: 'Poppins-Bold',
    },
    text_det: {
        fontSize: 15,
    },
    modal: {
        marginHorizontal: 0,
        paddingHorizontal: 0,
        paddingVertical: 0,
        marginVertical: 0,
        height: "100%",
    },
    img_portada: {
        width: null,
        resizeMode: 'contain',
        height: 220
    },
    img_icon1: {
        width: null,
        resizeMode: 'contain',
        height: 100
    },

});
