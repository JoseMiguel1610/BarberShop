import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, FlatList } from 'react-native';
import Modal from "react-native-modal"
import textos from '../../../../styles/textos';
import Icon from 'react-native-vector-icons/AntDesign';
import { Pressable } from 'react-native';
import 'moment/locale/es'
import Row_simple from '../../../../utils/components/row_simple';
import Colum_simple from '../../../../utils/components/colum_simple';
import BtnForm1 from '../../../../utils/components/btnForm1';
import BtnForm2 from '../../../../utils/components/btnForm2';
import { Config } from '../../../../configuration/config';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { actionByError } from '../../../../utils/actionServerResponse';

function ModalUpdate({ isModalVisible, send, setsend, set_id_cita, idcita, toggleModal, onBackButtonPress,
    toggleModalPickUp, type, minEstOrden, maxEstOrden }) {
    const navigation = useNavigation()
    const kdriverEstimate = 0 // 1 hora
    const url_data = Config.URL_SERVER + "/Citas/update"
    const [ booldata, setbooldata ] = useState(false)
    const { Token, User } = useSelector((reducers) => reducers.loginReducer);
    const submit = async () =>{
        const formData = {
            iD_CITA: idcita
        }
        console.log(formData);
        try {
            const res = await axios.put(url_data, formData, { headers: { "authorization": `Bearer ${Token}` } });
            console.log("Resultado de update: ", res.data.objModel);
            set_id_cita(null)
            setsend(!send)
            toggleModal()
            
        }
        catch (error) {
            console.log(error);
        }
    }

    const closeModal = () => {
        set_id_cita(null)
        toggleModal()
        
    }

    return (
        <Modal isVisible={isModalVisible} style={styles.modal} onBackButtonPress={onBackButtonPress} >
            <View style={styles.container}>
                <View style={textos.separator_trans}></View>
                <View style={textos.separator_trans}></View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={styles.text}></Text>
                    <Text style={styles.text}>Concluir servicio?</Text>
                    <Pressable onPress={() => closeModal()} style={{ padding: 4 }} android_ripple={{ color: "#FE9401", radius: 16 }}>
                        <Icon name='closecircle' color={"#FE9401"} size={25} />
                    </Pressable>
                </View>
                <Row_simple flex={1}>
                    <Colum_simple jus_cont={'center'} flex={0.4}>
                    <BtnForm1 text="Sí" classContainer={{backgroundColor: "#1cc611eb"}} onPress={() => submit()}/>
                    </Colum_simple>
                    
                    <Colum_simple jus_cont={'center'} flex={0.4}>
                    <BtnForm1 text="No" classContainer={{backgroundColor: "#c62a11eb"}} onPress={() => closeModal()}/>
                    </Colum_simple>
                    </Row_simple>
            </View>
        </Modal>
    );
}

export default ModalUpdate;

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
        height: "25%",
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