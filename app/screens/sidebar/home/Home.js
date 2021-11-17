import React, { useEffect, useState } from 'react'
import { View, Text, Pressable, ImageBackground, StyleSheet, TextInput, Image, ActivityIndicator, RefreshControl, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Row_simple from '../../../utils/components/row_simple'
import { SaveLogin, SaveUser } from '../../../actions/loginActions';
import Colum_simple from '../../../utils/components/colum_simple';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Col } from 'react-native-table-component';
import Banner from './banner';
import { wait } from "../../../utils/others";
import CardSubcategory from './cardSubcategory';
import Recently from './recently';
import { actionByError } from '../../../utils/actionServerResponse';
import axios from 'axios';
import { Config } from '../../../configuration/config';
import Recently2 from './recently2';

export default function Home(props) {
    const navigation = useNavigation()
    const dispatch = useDispatch();
    console.log("nadaa");
    const [name, setName] = useState('')
    const [refreshing, setRefreshing] = useState(false);
    const [categories, setcategories] = useState(null)
    const [recomendados, setrecomendados] = useState(null)
    const [recomendados2, setrecomendados2] = useState(null)
    const { Token, User } = useSelector((reducers) => reducers.loginReducer);
    const { dni } = User
    const url_data = Config.URL_SERVER + "/Categorias"
    const url_data2 = Config.URL_SERVER + "/Citas"
    console.log(Token);


    useEffect(() => {
        getCategorias()
        getRecomendados()
        getRecomendados2()
    }, [])

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setcategories(null);
        setrecomendados(null);
        wait(1000).then(() => {
            setRefreshing(false);
        });
    }, []);

    useEffect(() => {
        refreshing && getCategorias() && getRecomendados() //dispatch(getCategoriesGroupHome(navigation))
    }, [refreshing]);

    async function getCategorias() {
        try {
            const res = await axios.get(url_data, { headers: { "authorization": `Bearer ${Token}` } });
            setcategories(res.data.objModel)
        }
        catch (error) {
            actionByError(error, navigation)
        }
    }

    async function getRecomendados() {
        try {
            const res = await axios.get(url_data2 + "/" + dni, { headers: { "authorization": `Bearer ${Token}` } });
            setrecomendados(res.data.objModel)
        }
        catch (error) {
        }
    }

    async function getRecomendados2() {
        try {
            const res = await axios.get(url_data2 + "/analisis/estilista/" + dni, { headers: { "authorization": `Bearer ${Token}` } });
            setrecomendados2(res.data.objModel)
        }
        catch (error) {
        }
    }

    console.log(categories);

    return (
        <>
            <ScrollView style={styles.scrollView} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <Banner />
                <View style={styles.container_categories}>
                    {!!categories ? (
                        categories.length > 0 ? (
                            <>
                                {categories.map((data, ind) => ind < 8 && <CardSubcategory style={styles.img} key={ind} {...data} navigation={navigation} />)}
                            </>
                        ) : (
                            <View style={{ justifyContent: "center", alignItems: "center", width: "100%", height: 226 }}>
                                <ActivityIndicator size='large' color='#fc9610' />
                            </View>
                        )
                    ) : (
                        <View style={{ justifyContent: "center", alignItems: "center", width: "100%", height: 226 }}>
                            <ActivityIndicator size='large' color='#fc9610' />
                        </View>
                    )}
                </View>
                <Recently recomendados={recomendados} />
                <Recently2 recomendados={recomendados2} />
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    containerhead: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    scrollView: {
    },
    container_categories: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginBottom: 10,
        marginTop: 10,
    },
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: 'center'
    },
    top: {
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        borderBottomWidth: 1,
        width: '100%',
        height: 100,
        paddingHorizontal: 20
    },
    centro_cont: {
        display: 'flex',
        justifyContent: 'center',
    },
    container_sec: {
        margin: 20
    },
    txt_white: {
        fontSize: 18,
        fontFamily: "Metropolis-Bold"
    },
    acontainer: {
        width: '60%',
        paddingHorizontal: 20,
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 20,
        borderRadius: 25,
        borderColor: '#3b3b3b',
        borderWidth: 2

    },
    txt_center: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 18,
        fontFamily: "Metropolis-Bold",
        textTransform: 'uppercase'
    },
    container_input: {
        backgroundColor: "#fff",
        width: 290,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        borderRadius: 15,
        marginVertical: 10,
        paddingHorizontal: 10
    },
    icon: {
        width: 40,
        height: 40
    },
    input: {
        flex: 1,
        color: "#000"
    },
    textbtn: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "bold",
        //fontSize:15,
        marginVertical: 12
    },
    containerBtn: {
        width: 290,
        backgroundColor: "#ff4d0d",
        borderRadius: 15,
        marginVertical: 10,
        overflow: "hidden"
    },
    text1: {
        color: "#e9c28f",
        textDecorationLine: "underline",
        marginVertical: 2.5,
        paddingVertical: 5,
        fontWeight: "bold"
    },
    text2: {
        color: "#fff",
        fontWeight: "bold"
    },
    loginFooter: {
        //flexDirection: "row",
        marginTop: 20,
        width: 220,
        //justifyContent: "space-around",
        alignItems: "center"
    }
})
