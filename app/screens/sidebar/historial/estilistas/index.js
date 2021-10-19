import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Row_simple from "../../../../utils/components/row_simple";
import Icon from 'react-native-vector-icons/Feather';
import SpinnerModal from "../../../../utils/components/spinnerModal";
import Cont_card_color from "../../../../utils/components/cont_card_color";
import Colum_simple from "../../../../utils/components/colum_simple";
import textos from "../../../../styles/textos";
import { useSelector } from "react-redux";
import { Config } from "../../../../configuration/config";
import axios from "axios";
import { actionByError } from "../../../../utils/actionServerResponse";
import BtnForm1 from "../../../../utils/components/btnForm1";
import { RadioButton, useTheme } from "react-native-paper";
import Cont_card_color_pressable from "../../../../utils/components/cont_card_color_pressable";
import ModalUpdate from "./modal";
function HistorialCitasEstilista() {

    const [lastback, setlastback] = useState([])
    const [loading, setLoading1] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [send, setsend] = useState(null)
    const [id_cita, set_id_cita] = useState(null)
    const theme = useTheme();
    const navigation = useNavigation()
    const url_data = Config.URL_SERVER + "/Citas/estilista"
    const { Token, User } = useSelector((reducers) => reducers.loginReducer);

    async function getCitasUsuario() {
        setLoading1(true)
        try {
            const res = await axios.get(url_data + "/" + User.dni, { headers: { "authorization": `Bearer ${Token}` } });
            const userData = res.data.objModel
            console.log(userData);
            setlastback(userData)
            setLoading1(false)
        }
        catch (error) {
            setLoading1(false)
            actionByError(error, navigation)
        }
    }

    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        setModal(!modal);
    };

    const OpenModal = (data) => {
        set_id_cita(data)
        toggleModal()
    }

    useEffect(() => {
        getCitasUsuario()


    }, [send])

    function separadorName(value) {
        let lastIndex = value.lastIndexOf(" ");

        let resultado = value.substring(0, lastIndex);
        return resultado;
    }

    function getDate(data) {
        let date = new Date(data);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let dt = date.getDate();

        if (dt < 10) {
            dt = '0' + dt;
        }
        if (month < 10) {
            month = '0' + month;
        }

        let fecha = dt + '/' + month + '/' + year;
        return fecha
    }


    return (
        <ScrollView style={styles.containerHead}

        >
            <ModalUpdate send={send} setsend={setsend} idcita={id_cita} set_id_cita={set_id_cita} isModalVisible={modal} toggleModal={toggleModal}
                onBackButtonPress={() => setModal(false)} />
            <SpinnerModal loading={loading} text="Cargando historial " />
            <SpinnerModal loading={loading2} text="Generando Backup" />
            <View style={styles.container}>
                <Pressable android_ripple={{ color: "#b99a55", radius: 15 }} style={{ width: 30 }}
                    onPress={() => navigation.goBack()}>
                    <Icon name='arrow-left' color={"#b99a55"} size={30} />
                </Pressable>
                <Row_simple>
                    <Text style={[styles.hello, { color: theme.dark ? "#fff" : "black" }]}>Citas</Text>
                    {/* {sexo == 1 && */}
                    {theme.dark ?
                        <Image
                            source={require('../../../../../assets/logobarber.png')}
                            style={styles.img_prof} />
                        :
                        <Image
                            source={require('../../../../../assets/logobarber2.png')}
                            style={styles.img_prof} />
                    }
                    {/* } */}
                    {/* {sexo == 2 && */}
                    {/* <Image
                            source={require('../../../../../assets/woman.png')}
                            style={styles.img_prof} /> */}
                    {/* } */}



                </Row_simple>
            </View>
            {


                lastback.map((a, i) => {


                    return (
                        <Pressable style={{ paddingBottom: 20, }} key={a.iD_CITA} onPress={() => a.estado == 1 && OpenModal(a.iD_CITA)}>
                            <Cont_card_color_pressable brad={5} pad={10} bc={'#faf3ec'}  >
                                <Row_simple flex={1}>
                                    <Row_simple flex={1} jus_cont={'flex-start'}>
                                        <Colum_simple jus_cont={'center'} tav={'center'} flex={0.5}>
                                            <Text style={{ color: "#3b3b3b", fontFamily: "Metropolis-Bold", fontSize: 12 }}>{i + 1}</Text>
                                        </Colum_simple>
                                        <Colum_simple jus_cont={'center'} tav={'center'}>
                                            <Text style={{ color: "#3b3b3b", fontFamily: "Metropolis-Bold", fontSize: 12 }}>{separadorName(a.nombrE_CLIENTE)}</Text>

                                            <Row_simple jus_cont={'flex-start'}>
                                                {/* {( a.idTransactionType!=3) &&  <Text style={[textos.tit_det],{color:Colors.colorPrimaryVar2}}>{a.idTransactionType} status {a.idStatus} {  get_transaction_type(a.idTransactionType , User.primarysid , a.idSender) } </Text>} */}

                                                {/* tipo de  cobro */}
                                                {<Text style={[textos.text_det], { color: "#3b3b3b", fontFamily: "Metropolis-SemiBold" }}> {getDate(a.fechA_ATENCION)} </Text>}


                                            </Row_simple>
                                            <Row_simple jus_cont={'flex-start'}>
                                                {/* {( a.idTransactionType!=3) &&  <Text style={[textos.tit_det],{color:Colors.colorPrimaryVar2}}>{a.idTransactionType} status {a.idStatus} {  get_transaction_type(a.idTransactionType , User.primarysid , a.idSender) } </Text>} */}

                                                {/* tipo de  cobro */}
                                                {<Text style={[textos.text_det], { color: "#3b3b3b", fontFamily: "Metropolis-SemiBold" }}> {a.horA_RESERVACION} </Text>}


                                            </Row_simple>

                                        </Colum_simple>
                                    </Row_simple>
                                    <Colum_simple jus_cont={'center'}>
                                        <View style={{ width: 20, height: 20, borderRadius: 1000, backgroundColor: a.estado == 1 ? "#fae917eb" : a.estado == 2 ? "#1752faeb" : a.estado == 3 ? "#1bc820eb" : "#ee2121eb" }}></View>
                                    </Colum_simple>
                                </Row_simple>
                            </Cont_card_color_pressable>
                        </Pressable>
                    )
                })
            }

        </ScrollView>
    );
}

export default HistorialCitasEstilista;

const styles = StyleSheet.create({
    containerHead: {
        paddingHorizontal: 20,
    },
    container: {
        marginTop: 10,
        marginBottom: 20
    },
    hello: {
        fontSize: 26,
        fontWeight: "bold",
        marginTop: 30,
        marginBottom: 20,
    },
    img_contac: {
        marginRight: 8,
        marginTop: 5,
        height: 'auto',
        width: 60,
        borderRadius: 80,
        resizeMode: 'cover',
        aspectRatio: 1,
    },
    img_contac2: {
        marginRight: 8,
        marginTop: 5,
        height: 60,
        width: 60,
        borderRadius: 50,

    },
    img_prof: {
        marginTop: 5,
        height: 102,
        width: 103,
        borderRadius: 100,

    },
    content_activity: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    },
    mail_send_ico: {
        height: 40,
        width: 40,

    },
})