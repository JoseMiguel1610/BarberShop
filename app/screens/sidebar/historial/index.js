import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Row_simple from "../../../utils/components/row_simple";
import Icon from 'react-native-vector-icons/Feather';
import EvilIcon from 'react-native-vector-icons/EvilIcons'
import FontAweSomeIcon from 'react-native-vector-icons/FontAwesome'
import MateriaIcon from 'react-native-vector-icons/MaterialIcons'
import SpinnerModal from "../../../utils/components/spinnerModal";
import Cont_card_color from "../../../utils/components/cont_card_color";
import Colum_simple from "../../../utils/components/colum_simple";
import textos from "../../../styles/textos";
import { useSelector } from "react-redux";
import { Config } from "../../../configuration/config";
import axios from "axios";
import { actionByError } from "../../../utils/actionServerResponse";
import BtnForm1 from "../../../utils/components/btnForm1";
import { useTheme } from "react-native-paper";
import ModalCancel from "./components/modal";
import ModalUpdate from "./components/modal2";
function HistorialCitas() {

    const [lastback, setlastback] = useState([])
    const [loading, setLoading1] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [send, setsend] = useState(null)
    const [id_cita, set_id_cita] = useState(null)
    const [dnI_ESTILISTA, setdnI_ESTILISTA] = useState(null)
    const theme = useTheme();
    const navigation = useNavigation()
    const url_data = Config.URL_SERVER + "/Citas/usuario"
    const { Token, User } = useSelector((reducers) => reducers.loginReducer);
    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        setModal(!modal);
    };
    const [modal2, setModal2] = useState(false);
    const toggleModal2 = () => {
        setModal2(!modal2);
    };

    const OpenModal = (data) => {
        console.log(data);
        set_id_cita(data)
        toggleModal()
    }
    const OpenModal2 = (data, data2) => {
        console.log(data2);
        set_id_cita(data)
        setdnI_ESTILISTA(data2)
        toggleModal2()
    }
    useEffect(() => {
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
        getCitasUsuario()
    }, [send])

    async function validar(date) {
        let dato = new Date(date)
        console.log("fecha :", dato);
        return date
    }

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
            <ModalCancel send={send} setsend={setsend} idcita={id_cita} set_id_cita={set_id_cita} isModalVisible={modal} toggleModal={toggleModal}
                onBackButtonPress={() => setModal(false)} />
            <ModalUpdate dnI_ESTILISTA={dnI_ESTILISTA} setdnI_ESTILISTA={setdnI_ESTILISTA} send={send} setsend={setsend} idcita={id_cita} set_id_cita={set_id_cita} isModalVisible={modal2} toggleModal={toggleModal2}
                onBackButtonPress={() => setModal2(false)} />
            <SpinnerModal loading={loading} text="Cargando historial " />
            <SpinnerModal loading={loading2} text="Generando Backup" />
            <View style={styles.container}>
                <Pressable android_ripple={{ color: "#b99a55", radius: 15 }} style={{ width: 30 }}
                    onPress={() => navigation.goBack()}>
                    <Icon name='arrow-left' color={"#b99a55"} size={30} />
                </Pressable>
                <Row_simple>
                    <Text style={[styles.hello, { color: theme.dark ? "#fff" : "black" }]}>Historial de Citas</Text>
                    {/* {sexo == 1 && */}
                    {theme.dark ?
                        <Image
                            source={require('../../../../assets/logobarber.png')}
                            style={styles.img_prof} />
                        :
                        <Image
                            source={require('../../../../assets/logobarber2.png')}
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
                        <View style={{ paddingBottom: 20 }} key={a.iD_CITA} >
                            <Cont_card_color brad={5} pad={10} bc={'#faf3ec'}  >
                                <Row_simple flex={1}>
                                    <Row_simple flex={0.4} jus_cont={'flex-start'}>
                                        <Colum_simple jus_cont={'center'} tav={'center'} >
                                            <Text style={{ color: "#3b3b3b", fontFamily: "Metropolis-Bold", fontSize: 12 }}>{i + 1}</Text>
                                        </Colum_simple>
                                    </Row_simple>
                                    <Row_simple flex={1} jus_cont={'flex-start'} alitems={"center"}>
                                        <Colum_simple >
                                            <Text style={{ color: "#3b3b3b", fontFamily: "Metropolis-Bold", fontSize: 12 }}>{separadorName(a.nombrE_ESTILISTA)}</Text>

                                            {/* {( a.idTransactionType!=3) &&  <Text style={[textos.tit_det],{color:Colors.colorPrimaryVar2}}>{a.idTransactionType} status {a.idStatus} {  get_transaction_type(a.idTransactionType , User.primarysid , a.idSender) } </Text>} */}

                                            {/* tipo de  cobro */}
                                            <Text style={[textos.text_det], { color: "#3b3b3b", fontFamily: "Metropolis-SemiBold" }}>{getDate(a.fechA_ATENCION)}</Text>

                                            {/* {( a.idTransactionType!=3) &&  <Text style={[textos.tit_det],{color:Colors.colorPrimaryVar2}}>{a.idTransactionType} status {a.idStatus} {  get_transaction_type(a.idTransactionType , User.primarysid , a.idSender) } </Text>} */}

                                            {/* tipo de  cobro */}
                                            {<Text style={[textos.text_det], { color: "#3b3b3b", fontFamily: "Metropolis-SemiBold" }}>{a.horA_RESERVACION}</Text>}

                                        </Colum_simple>
                                    </Row_simple>
                                    <Row_simple flex={0.5} jus_cont={'center'} alitems={"center"}>
                                        <Colum_simple jus_cont={'center'}>
                                            <View style={{ width: 20, height: 20, borderRadius: 1000, backgroundColor: a.estado == 1 ? "#fae917eb" : a.estado == 2 ? "#1752faeb" : a.estado == 3 ? "#1bc820eb" : a.estado == 4 ? "#ee2121eb" : "#fae917eb" }}></View>
                                        </Colum_simple>
                                    </Row_simple>
                                    {/* <View style={{ width: 4, height: "auto", backgroundColor: "#fff" }}>
                                    </View> */}
                                    <Row_simple flex={0.5} jus_cont={'center'} alitems={"center"}>
                                        <Colum_simple jus_cont={'center'}>
                                            <Pressable onPress={() => a.estado == 1 && OpenModal2(a.iD_CITA, a.dnI_ESTILISTA)} style={{ width: "100%" }} android_ripple={{ color: a.estado === 1 && "#b99a55", radius: 15 }}>
                                                <EvilIcon name='pencil' color={ a.estado == 1 ? "#b99a55" : "#d2cfcf"} size={30} />
                                            </Pressable>
                                        </Colum_simple>
                                    </Row_simple>
                                    {/* <View style={{ width: 4, height: "auto", backgroundColor: "#fff" }}>
                                    </View> */}
                                    <Row_simple flex={0.5} jus_cont={'center'} alitems={"center"}>
                                        <Colum_simple jus_cont={'center'}>
                                            <Pressable onPress={() => a.estado == 1 && OpenModal(a.iD_CITA)} style={{ width: "100%" }} android_ripple={{ color: a.estado === 1 && "#b99a55", radius: 15 }}>
                                                <MateriaIcon name='highlight-remove' color={a.estado == 1 ? "#b99a55" : "#d2cfcf"} size={30} />
                                            </Pressable>
                                        </Colum_simple>
                                    </Row_simple>
                                </Row_simple>
                            </Cont_card_color>
                        </View>
                    )
                })
            }

        </ScrollView>
    );
}

export default HistorialCitas;

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