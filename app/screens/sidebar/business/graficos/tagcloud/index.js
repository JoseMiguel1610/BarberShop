import { useTheme } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { Alert, Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Row_simple from "../../../../../utils/components/row_simple";
import Icon from 'react-native-vector-icons/Feather';
import SpinnerModal from "../../../../../utils/components/spinnerModal";
import Cont_card_color from "../../../../../utils/components/cont_card_color";
import Colum_simple from "../../../../../utils/components/colum_simple";
import textos from "../../../../../styles/textos";
import { useSelector } from "react-redux";
import { Config } from "../../../../../configuration/config";
import axios from "axios";
import { actionByError } from "../../../../../utils/actionServerResponse";
import BtnForm1 from "../../../../../utils/components/btnForm1";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import Cloud from 'react-native-word-cloud';
import WordCloud from 'triz-react-native-wordcloud';
function GraficoTagCloud(props) {
    const { route: { params } } = props
    console.log(params);
    const { dni, nombre, apE_PAT, apE_MAT } = params
    const nombrecompleto = nombre + " " + apE_PAT + " " + apE_MAT;
    const [lastback, setlastback] = useState([])
    const [loading, setLoading1] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const theme = useTheme();
    const navigation = useNavigation()
    const [nivel, setNivel] = useState([20, 45, 28, 80, 99, 43])
    const [tagList, setTagList] = useState([])
    const screenWidth = Dimensions.get("window").width - 20;
    const url_data = Config.URL_SERVER + "/Grafics/tagcloud"
    const { Token, User } = useSelector((reducers) => reducers.loginReducer);

    useEffect(() => {
        async function getGraficos() {
            const formData = {
                dni: dni
            }
            setLoading1(true)
            try {
                const res = await axios.post(url_data, formData, { headers: { "authorization": `Bearer ${Token}` } });
                const respuesta = res.data.objModel
                console.log(respuesta);
                if (respuesta.length > 0) {
                    var auxNiveles = [];
                    respuesta.map(elemento => {
                        auxNiveles.push({ keyword: elemento.comenta, frequency: elemento.contador, color: elemento.color })
                    });
                    setTagList(auxNiveles);
                    setLoading1(false)
                } else {
                    setLoading1(false)
                    Alert.alert(
                        "Aviso",
                        "El estilista no tiene comentarios.",
                        [
                            {
                                text: "Ok",
                                onPress: () => navigation.goBack()
                            }
                        ]
                    )
                }

            }
            catch (error) {
                setLoading1(false)
                actionByError(error, navigation)
            }
        }
        getGraficos()
    }, [])
    const deviceWidth = Dimensions.get('window').width;
    const colorList = ['red', 'green', 'blue']
    const minFontSize = 12
    const style = {
        width: deviceWidth / 1.2,
        paddingLeft: 15,
        paddingRight: 15,
    }

    return (
        <ScrollView style={styles.containerHead}>
            <View style={styles.container}>

                <Pressable android_ripple={{ color: "#b99a55", radius: 15 }} style={{ width: 30 }}
                    onPress={() => navigation.goBack()}>
                    <Icon name='arrow-left' color={"#b99a55"} size={30} />
                </Pressable>
                <Row_simple>
                    <Text style={[styles.hello, { color: theme.dark ? "#fff" : "black" }]}>TagCloud</Text>
                    {/* {sexo == 1 && */}
                    {theme.dark ?
                        <Image
                            source={require('../../../../../../assets/logobarber.png')}
                            style={styles.img_prof} />
                        :
                        <Image
                            source={require('../../../../../../assets/logobarber2.png')}
                            style={styles.img_prof} />
                    }
                    {/* } */}
                    {/* {sexo == 2 && */}
                    {/* <Image
                            source={require('../../../../../assets/woman.png')}
                            style={styles.img_prof} /> */}
                    {/* } */}



                </Row_simple>
                <View style={styles.subcontainer}>
                    <Text style={{ fontFamily: "Metropolis-Regular", fontSize: 18, color: theme.dark ? "#fff" : "black" }}>{nombrecompleto}</Text>

                    <WordCloud
                        wordList={tagList}
                        style={{ fontWeight: "bold" }}
                    />
                </View>
            </View>
        </ScrollView>
    );
}

export default GraficoTagCloud;

const styles = StyleSheet.create({
    containerHead: {
        paddingHorizontal: 20,
    },
    container: {
        marginTop: 10,
        marginBottom: 20
    },
    subcontainer: {
        marginTop: 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
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