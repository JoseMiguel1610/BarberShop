import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from "react-native";
import { Rating, AirbnbRating } from 'react-native-ratings';
import { ActivityIndicator } from "react-native";
import Modal from "react-native-modal";
import textos from "../../styles/textos";
import Row_simple from "../components/row_simple";
import BtnForm1 from "../components/btnForm1";
import { wait } from "../others";
import { TextInput } from "react-native";
import axios from "axios";
import { Config } from "../../configuration/config";
import { actionByError } from "../actionServerResponse";
import { useSelector } from "react-redux";


const Out_of_service = ({ idcita, isModalVisible, setvis_out_of_serv }) => {
    const navigation = useNavigation();
    const [comentario, setcoment] = useState(null)
    const [rating, setrating ] = useState(0)
    const url_data = Config.URL_SERVER + "/Citas/feedback"
    const { Token, User } = useSelector((reducers) => reducers.loginReducer);

    async function send() {
        if( !comentario || !rating ){
            return Alert.alert(
                "Alerta",
                "Llene los campos.",
                [{ text: "Aceptar", style: "default" }]
            )
        }
        const formData = {
            iD_CITA: idcita,
            puntuacion: rating,
            comentario: comentario
        }
        console.log("Formdata: ", formData);
            try {
                const res = await axios.post(url_data, formData, { headers: { "authorization": `Bearer ${Token}` } });
                const resul = res.data.objModel
                console.log("resfedd:", resul);
                Alert.alert(
                    "Excelente",
                    "Comentarios enviados correctamente.",
                    [{ text: "Aceptar", onPress: () => { setvis_out_of_serv(false) }, style: "default" }]
                )
                setrating(0)
                setcoment(null)
                
                
            }
            catch (error) {
                actionByError(error, navigation)
                setrating(0)
                setcoment(null)
                setvis_out_of_serv(false)
            }
        
    }

    const ratingCompleted = (rating) => {
        setrating(rating)
    }

    const onChange = (e) => {
        setcoment((e.nativeEvent.text).trim());
    };

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
                    <Text style={styles.text_h1}>Califica tu última atención... </Text>
                    <View style={styles.container_input}>
                        <TextInput
                            placeholder='Comentarios'
                            placeholderTextColor="#7c7878"
                            //keyboardType="default"
                            onChange={(e) => onChange(e)}
                            style={{ fontSize: 18, color: "#000" }}
                            multiline={true}
                            numberOfLines={3}
                            autoCorrect={false}
                        />
                    </View>
                    <AirbnbRating showRating={false} onFinishRating={ratingCompleted} defaultRating={rating} />
                    <BtnForm1 text="OK" onPress={() => send()} classContainer={{ marginTop: 20 }} />

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
    container_input: {
        color: "#000",
        borderWidth: 2,
        borderColor: "#cbd5e0",
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        borderRadius: 10,
        marginVertical: 6,
        marginBottom: 20
    },
    input: {
        fontSize: 18,
        color: "#000",
        //height: 40,
        marginVertical: -5
    },

});
