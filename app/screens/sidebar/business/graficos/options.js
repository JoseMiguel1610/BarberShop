import React, { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Search_box from "../../../../utils/components/search_box";
import SpinnerModal from "../../../../utils/components/spinnerModal";
import Icon from 'react-native-vector-icons/Feather';
import Row_simple from '../../../../utils/components/row_simple';
import { useSelector } from 'react-redux';
import { Config } from '../../../../configuration/config';
import { actionByError } from '../../../../utils/actionServerResponse';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import Axios from 'axios';
import { Colors } from '../../../../styles/colors';
import textos from '../../../../styles/textos';
import { ActivityIndicator } from 'react-native-paper';
import Colum_simple from '../../../../utils/components/colum_simple';
import Cont_card_color from '../../../../utils/components/cont_card_color';
import { useTheme } from '@react-navigation/native';

function Options(props) {
    console.log("Options props: ", props);
    const { route: { params } } = props
    const { props : props1 } = params
    const [spiner_contactosf, setspiner_contactosf] = useState(false);
    const [email_for_send, setemail_for_send] = useState("")
    const navigation = useNavigation()
    const [loading1, setLoading1] = useState(false)
    const [bolloading, setbolloading] = useState(false);
    const [list_contact, setlist_contact] = useState([]);
    const [list_allcontact, setlist_allcontact] = useState([]);
    const [sexo, setSexo] = useState(null)
    const theme = useTheme();
    const [boollist, setboollist] = useState(false);
    const { Token, User } = useSelector((reducers) => reducers.loginReducer);
    const url_data = Config.URL_SERVER + "/Usuarios/list/worker"


    return (
        <>
            <View style={styles.container}

            >
                <SpinnerModal loading={spiner_contactosf} text="Cargando estilistas" />

                <View style={{ paddingHorizontal: 20, }}>
                    <View style={styles.container}>
                        <Pressable android_ripple={{ color: "#b99a55", radius: 15 }} style={{ width: 30 }}
                            onPress={() => navigation.goBack()}>
                            <Icon name='arrow-left' color={"#b99a55"} size={30} />
                        </Pressable>
                        <Row_simple>
                            <Text style={[styles.hello, { color: theme.dark ? "#fff" : "black" }]}>Opciones</Text>
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

                </View>

            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Pressable android_ripple={{ color: "#3b3b3b" }}
                    onPress={() => navigation.navigate("GraficoBarras", props1)} style={[styles.acontainer, { borderColor: theme.dark ? "#fff" : "#3b3b3b"}]}>
                    <Row_simple h={120} pad_h={0}>
                        <View style={{ display: "flex", justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={[styles.txt_center, { color: theme.dark ? '#fff' : "#3b3b3b" }]}>Monto recaudado por mes</Text>
                        </View>

                    </Row_simple>
                </Pressable>
                <Pressable android_ripple={{ color: "#3b3b3b" }}
                    onPress={() => {}} style={[styles.acontainer, { borderColor: theme.dark ? "#fff" : "#3b3b3b"}]}>
                    <Row_simple h={120} pad_h={0}>
                        <View style={{ display: "flex", justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={[styles.txt_center, { color: theme.dark ? '#fff' : "#3b3b3b" }]}>Nube de palabras</Text>
                        </View>

                    </Row_simple>
                </Pressable>
            </View>
        </>
    );
}

export default Options;

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
    acontainer: {
        width: '70%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: "center",
        marginBottom: 100,
        borderRadius: 25,
        borderColor: '#3b3b3b',
        borderWidth: 2

    },
    txt_center: {
        textAlign: 'center',
        color: '#000',
        fontSize: 18,
        fontFamily: "Metropolis-Bold",
        textTransform: 'uppercase'
    },
    hello: {
        fontSize: 26,
        fontWeight: "bold",
        marginTop: 30,
        marginBottom: 20,
    },
    top: {
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        borderBottomColor: '#fff',
        borderBottomWidth: 1,
        width: '100%',
        height: 100,
        paddingHorizontal: 20
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