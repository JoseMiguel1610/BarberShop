import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Image, ImageBackground, Pressable, StyleSheet, Text, View, TextInput, Alert } from "react-native";
import { Picker } from '@react-native-community/picker'
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/Ionicons';
import { useSelector } from "react-redux";
import { Config } from "../../../../configuration/config";
import BtnForm1 from "../../../../utils/components/btnForm1";
import Colum_simple from "../../../../utils/components/colum_simple";
import Cont_card_color from "../../../../utils/components/cont_card_color";
import Row_simple from "../../../../utils/components/row_simple";
import CalendarPicker from 'react-native-calendar-picker';
import { actionByError } from "../../../../utils/actionServerResponse";
import { ScrollView } from "react-native-gesture-handler";
import { useTheme } from "@react-navigation/native";
import ModalHorarioUpdate from "./modalHorario";

const CitasUpdate = (props) => {
    const { route: { params } } = props
    // const { route: route1 } = params
    // const { params: params1 } = route1
    const navigation = useNavigation()
    const minDate = new Date();
    const [date, setdate] = useState(null)
    const [hora, setHora] = useState(null)
    const [metodo, setMetodo] = useState(null)
    const [id_metodo, setIdMetodo] = useState(null)
    const [day, setDay] = useState(null)
    const [dataGet, setdataGet] = useState([])
    const [data2, setdata2] = useState([])
    const { Token, User } = useSelector((reducers) => reducers.loginReducer);
    console.log(Token);
    const { dnI_ESTILISTA, idcita } = params
    const theme = useTheme();
    // console.log("EL NUMERO DE SERVICIO ES: ", iD_SERVICIO);
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
        // let data = e.toISOString()
        // let data2 = data.substring(0,10)
        console.log(e.toISOString());
        setdate(e.toISOString())
    }


    useEffect(() => {
        setdataGet([])
        setHora(null)
        if (date != null) {
            const fechaDato = new Date (date)
            const fecha2 = fechaDato.toLocaleString()
            console.log(fecha2);
            const date1 = fecha2.substring(0,10)
            console.log(date1);
            const fecha = new Date()
            const fecha3 = fecha.toLocaleString()
            const date2 = fecha3.substring(0,10)
            console.log(date2);
            if(date1 == date2){
                getHora()
            }else{
                setdata2([]) 
            }
            
            getAvailable()
            
        }
    }, [date])
    console.log("data2: ", data2);

    async function getHora() {
        try {
            const res = await axios.get(url_data + "/validacion/hora", { headers: { "authorization": `Bearer ${Token}` } });
            console.log("Resultado de horaaa xddd: ", res.data.objModel);
            let objData = res.data.objModel
            let objData2 = [...objData]
            objData2.map((a, i) => {
                if (a.available == "1") {
                    a.available = true
                }
                else {
                    a.available = false
                }
            })
            setdata2(objData2)
            console.log(objData2);
        }
        catch (e) {
            console.log(e);
        }
    }

    async function getAvailable() {
        let objData = []
        const formData = {
            fecha: date,
            dni: dnI_ESTILISTA
        }
        console.log(formData);
        try {
            const res = await axios.post(url_data + "/available", formData, { headers: { "authorization": `Bearer ${Token}` } });
            console.log("Resultado de availabilidad xddd: ", res.data.objModel);
            res.data.objModel.map((a, i) => {
                objData.push({ name: a.horA_RESERVACION })
            })
            console.log(objData);
            setdataGet(objData)
        }
        catch (e) {
            console.log(e);
        }
    }

    function alerta() {
        return Alert.alert(
            "Alerta",
            "Seleccione primero una fecha.",
            [{ text: "Aceptar", style: "default" }]
        )
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
        } else {
            const formData = {
                id: idcita,
                fecha: date,
                hora: hora
            }
            try {
                const res = await axios.put(url_data + "/modify", formData, { headers: { "authorization": `Bearer ${Token}` } });
                console.log("Resultado de modificar: ", res.data.objModel);
                if (res.data.status == 1) {
                    Alert.alert(
                        "Satisfactorio",
                        "Cita modificada correctamente.",
                        [
                            {
                                text: "Ok",
                                onPress: () => { navigation.navigate("HistorialCitas", { refresh: true}) }
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
            <ScrollView style={{ flex: 1 }}>
                <ImageBackground style={styles.container_top} source={require("../../../../../assets/fondo-02.png")} >
                    <View style={styles.top}>
                        <Row_simple jus_cont={'flex-start'} alitems={'center'} flex={1}>
                            <Colum_simple jus_cont={'center'} alitems={'flex-start'} flex={0.6}>
                                <Pressable android_ripple={{ color: "#3b3b3b" }}
                                    onPress={() => navigation.goBack()}>
                                    <Icon name='arrow-left' color={"#b99a55"} size={30} />
                                </Pressable>
                            </Colum_simple>
                            <Colum_simple jus_cont={'center'} alitems={'flex-start'} >
                                <Text style={{ fontSize: 20, color: "#fff" }}>Modificar Cita</Text>
                            </Colum_simple>
                            <Colum_simple jus_cont={'center'} alitems={'flex-end'} flex={1}>
                                <Image
                                    source={require("../../../../../assets/logobarber.png")} style={{ width: 80, height: 80 }}>
                                </Image>
                            </Colum_simple>
                        </Row_simple>

                    </View>
                </ImageBackground>
                <View style={styles.container}>
                    <CalendarPicker
                        textStyle={{
                            fontFamily: 'Cochin',
                            color: theme.dark ? "#fff" : "#000",
                        }}
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
                    <View style={styles.container_input} onTouchEnd={() => date != null ? toggleModalCurrent() : alerta()}>
                        <TextInput
                            placeholder='Horario'
                            placeholderTextColor="#7c7878"
                            keyboardType="default"
                            value={hora}
                            editable={false}
                            style={[styles.input, { color: "#000" }]}
                        />
                    </View>
                    <ModalHorarioUpdate data={dataGet} data2={data2} setHora={setHora} isModalVisible={modalCurrent} toggleModal={toggleModalCurrent}
                        onBackButtonPress={() => setModalCurrent(false)} />
                </View>
                <View style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 20 }}>
                    <BtnForm1 text="Modificar" classContainer={{ width: 190 }} onPress={() => submit()} />
                </View>
            </ScrollView>
        </>
    );
}

export default CitasUpdate;

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