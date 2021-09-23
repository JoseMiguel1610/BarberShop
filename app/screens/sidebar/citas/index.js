import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Image, ImageBackground, Pressable, StyleSheet, Text, View, TextInput, Alert } from "react-native";
import { Picker } from '@react-native-community/picker'
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/Ionicons';
import { useSelector } from "react-redux";
import { Config } from "../../../configuration/config";
import BtnForm1 from "../../../utils/components/btnForm1";
import Colum_simple from "../../../utils/components/colum_simple";
import Cont_card_color from "../../../utils/components/cont_card_color";
import Row_simple from "../../../utils/components/row_simple";
import CalendarPicker from 'react-native-calendar-picker';
import ModalSexo from "./components/modal";
import ModalMetodo from "./components/modal2";
import { actionByError } from "../../../utils/actionServerResponse";
const Citas = (props) => {
    const { route: { params } } = props
    const { route: route1 } = params
    const { params: params1 } = route1
    console.log("Citas", params1);
    const navigation = useNavigation()
    const minDate = new Date();
    const [date, setdate] = useState(null)
    const [hora, setHora] = useState(null)
    const [metodo, setMetodo] = useState(null)
    const [id_metodo, setIdMetodo] = useState(null)
    const [day, setDay] = useState(null)
    const { Token, User } = useSelector((reducers) => reducers.loginReducer);
    console.log(Token);
    const { dni: dniUsuario } = User;
    const { dni: dniEstilista, iD_SERVICIO } = params1
    console.log("EL NUMERO DE SERVICIO ES: ", iD_SERVICIO);
    // const namecomplete = nombre + " " + apE_PAT + " " + apE_MAT
    const url_data = Config.URL_SERVER + "/Citas"
    const startDate = date ? date.toString() : ""
    const [modalCurrent, setModalCurrent] = useState(false);
    const toggleModalCurrent = () => {
        setModalCurrent(!modalCurrent);
    };
    const [modalCurrent2, setModalCurrent2] = useState(false);
    const toggleModalCurrent2 = () => {
        setModalCurrent2(!modalCurrent2);
    };
    const changeDate = (e) => {
        setdate(e.toISOString())
    }

    const submit = async () => {
        if (!date) {
            return Alert.alert(
                "Alerta",
                "Seleccione una fecha.",
                [{ text: "Aceptar", style: "default" }]
            )
        } else if (!hora) {
            return Alert.alert(
                "Alerta",
                "Seleccione un horario.",
                [{ text: "Aceptar", style: "default" }]
            )
        } else if (!metodo) {
            return Alert.alert(
                "Alerta",
                "Seleccione el método de pago.",
                [{ text: "Aceptar", style: "default" }]
            )
        } else {
            const formData = {
                dni: dniUsuario,
                dnI2: dniEstilista,
                fechA_ATENCION: date,
                horA_RESERVACION: hora,
                iD_PAGO: id_metodo,
                iD_SERVICO: iD_SERVICIO
            }
            console.log(formData);
            try {
                const res = await axios.post(url_data, formData, { headers: { "authorization": `Bearer ${Token}` } });
                console.log("Resultado de reserva: ", res.data.objModel);
                if (res.data.status == 1) {
                    Alert.alert(
                        "Satisfactorio",
                        "Reserva de cita correcta.",
                        [
                            {
                                text: "Ok",
                                onPress: () => { navigation.navigate("HomeTabs") }
                            }
                        ]
                    )
                } else {
                    Alert.alert(
                        "Error",
                        "Ocurrió un error, intentelo más tarde.",
                        [
                            {
                                text: "Ok",
                                onPress: () => { }
                            }
                        ]
                    )
                }
                //props.navigation.replace('SideBarStack');//No es necesario, y hace renderizar 2 veces.
            } catch (error) {
                console.log(error);
                actionByError(error, navigation)
            }
        }
    }

    return (
        <>
            <View style={{ flex: 1 }}>
                <ImageBackground style={styles.container_top} source={require("../../../../assets/fondo-02.png")} >
                    <View style={styles.top}>
                        <Row_simple jus_cont={'flex-start'} alitems={'space-around'} flex={1}>
                            <Colum_simple jus_cont={'center'} alitems={'flex-start'} flex={0.6}>
                                <Pressable android_ripple={{ color: "#3b3b3b" }}
                                    onPress={() => navigation.goBack()}>
                                    <Icon name='arrow-left' color={"#b99a55"} size={30} />
                                </Pressable>
                            </Colum_simple>
                            <Colum_simple jus_cont={'center'} alitems={'flex-start'} >
                                <Text style={{ fontSize: 20, color: "#fff" }}>Reserva de Cita</Text>
                            </Colum_simple>
                            <Colum_simple jus_cont={'center'} alitems={'flex-end'} flex={1}>
                                <Image
                                    source={require("../../../../assets/logobarber.png")} style={{ width: 80, height: 80 }}>
                                </Image>
                            </Colum_simple>
                        </Row_simple>

                    </View>
                </ImageBackground>
                <View style={styles.container}>
                    <CalendarPicker
                        previousTitle="Anterior"
                        nextTitle="Próximo"
                        minDate={minDate}
                        selectedDayColor="#b99a55"
                        weekdays={['Dom', 'Lun', 'Mar', 'Mier', 'Jue', 'Vie', 'Sáb']}
                        months={['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']}
                        onDateChange={(e) => changeDate(e)}
                    />
                </View>
                <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <View style={styles.container_input} onTouchEnd={() => toggleModalCurrent()}>
                        <TextInput
                            placeholder='Horario'
                            placeholderTextColor="#7c7878"
                            keyboardType="default"
                            value={hora}
                            editable={false}
                            style={[styles.input, { color: "#000" }]}
                        />
                    </View>
                    <View style={styles.container_input} onTouchEnd={() => toggleModalCurrent2()}>
                        <TextInput
                            placeholder='Método de Pago'
                            placeholderTextColor="#7c7878"
                            keyboardType="default"
                            value={metodo}
                            editable={false}
                            style={[styles.input, { color: "#000" }]}
                        />
                    </View>
                    <ModalSexo setHora={setHora} isModalVisible={modalCurrent} toggleModal={toggleModalCurrent}
                        onBackButtonPress={() => setModalCurrent(false)} />
                    <ModalMetodo setIdMetodo={setIdMetodo} setMetodo={setMetodo} isModalVisible={modalCurrent2} toggleModal={toggleModalCurrent2}
                        onBackButtonPress={() => setModalCurrent2(false)} />
                </View>
                <View style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 40 }}>
                    <BtnForm1 text="Continuar" classContainer={{ width: 190 }} onPress={() => submit()} />
                </View>
            </View>
        </>
    );
}

export default Citas;

const styles = StyleSheet.create({
    container_top: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
        resizeMode: "cover"
    },
    container: {
        marginBottom: 10,
        paddingVertical: 10,
    },
    top: {
        height: 100,
    },
    h1: {
        color: "#fff",
        textTransform: "uppercase",
        marginTop: 5
    },
    img: {
        height: 100,
        width: 100,
    },
    title: {
        fontWeight: "bold",
        textTransform: "uppercase",
        fontSize: 12,
        width: 180,
        textAlign: "center"
    },//
    descrip: {
        color: "#6b6b6b",
        fontWeight: "700",
        fontSize: 11
    },
    price: {
        color: "#c5c3c3",
        fontSize: 11
    },
    stars: {
        flexDirection: "row"
    },
    row: {
        backgroundColor: "transparent",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        borderWidth: 1,
        width: 290,
        borderColor: "#fff",
        marginVertical: 10,
        paddingHorizontal: 10
    },
    input: {
        flex: 1,
        color: "#000",
        fontFamily: "Metropolis-Bold"
    },
    label: {
        color: "#959393",
        marginTop: 10,
        fontSize: 15,
        fontWeight: "bold"
    },
    container_input: {
        color: "#000",
        borderWidth: 0.5,
        borderColor: "#cbd5e0",
        backgroundColor: "#fff9f3",
        paddingHorizontal: 10,
        marginVertical: 6,
        width: "50%",
        height: 50
    },
})