import { useTheme } from "@react-navigation/native";
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
function Backup() {

    const [lastback, setlastback] = useState([])
    const [loading, setLoading1] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const theme = useTheme();
    const navigation = useNavigation()
    const url_data = Config.URL_SERVER + "/Backup"
    const { Token, User } = useSelector((reducers) => reducers.loginReducer);
    useEffect(() => {
        async function getBackups() {
            setLoading1(true)
            try {
                const res = await axios.get(url_data + "/last", { headers: { "authorization": `Bearer ${Token}` } });
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
        getBackups()
    }, [])

    const createBackup = async () => {
        setLoading2(true)
        try {
            const res = await axios.get(url_data, { headers: { "authorization": `Bearer ${Token}` } });
            setlastback(res.data.objModel)
            setLoading2(false)
            Alert.alert(
                "Excelente",
                "El respaldo de información se hizo correctamente.",
                [
                    {
                        text: "Ok",
                        onPress: () => { }
                    }
                ]
            )
        }
        catch (error) {
            setLoading2(false)
            Alert.alert(
                "Error",
                "Ocurrió un error al hacer el respaldo de información.",
                [
                    {
                        text: "Ok",
                        onPress: () => { }
                    }
                ]
            )
        }
    }

    return (
        <ScrollView style={styles.containerHead}

        >
            <SpinnerModal loading={loading} text="Cargando Backups " />
            <SpinnerModal loading={loading2} text="Generando Backup" />
            <View style={styles.container}>
                <Pressable android_ripple={{ color: "#b99a55", radius: 15 }} style={{ width: 30 }}
                    onPress={() => navigation.goBack()}>
                    <Icon name='arrow-left' color={"#b99a55"} size={30} />
                </Pressable>
                <Row_simple>
                    <Text style={[styles.hello, { color: theme.dark ? "#fff" : "black" }]}>Backups</Text>
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
                        <View style={{ paddingBottom: 20, }} key={a.iD_BKP}>
                            <Cont_card_color brad={5} pad={10} bc={'#faf3ec'}  >
                                <Row_simple flex={1}>
                                    <Row_simple flex={1} jus_cont={'flex-start'}>
                                        <Colum_simple jus_cont={'center'} tav={'center'} flex={0.8}>
                                            <Text style={{ color: theme.dark ? "#fff" : "#3b3b3b", fontFamily: "Metropolis-Bold", fontSize: 12 }}>{i + 1}</Text>
                                        </Colum_simple>
                                        <Colum_simple jus_cont={'center'} tav={'center'}>
                                            <Text style={{ color: theme.dark ? "#fff" : "#3b3b3b", fontFamily: "Metropolis-Bold", fontSize: 12 }}>{a.ruta}</Text>

                                            <Row_simple jus_cont={'flex-start'}>
                                                {/* {( a.idTransactionType!=3) &&  <Text style={[textos.tit_det],{color:Colors.colorPrimaryVar2}}>{a.idTransactionType} status {a.idStatus} {  get_transaction_type(a.idTransactionType , User.primarysid , a.idSender) } </Text>} */}

                                                {/* tipo de  cobro */}
                                                {<Text style={[textos.text_det], { color: theme.dark ? "#fff" : "#3b3b3b", fontFamily: "Metropolis-SemiBold" }}> {a.fechA_BKP} </Text>}


                                            </Row_simple>

                                        </Colum_simple>
                                    </Row_simple>

                                </Row_simple>
                            </Cont_card_color>
                        </View>
                    )
                })
            }

            <BtnForm1 text="Generar Backup" onPress={() => createBackup()} classContainer={{ marginVertical: 10 }} />

        </ScrollView>
    );
}

export default Backup;

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