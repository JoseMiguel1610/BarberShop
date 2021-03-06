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

function EditUser() {
    const [spiner_contactosf, setspiner_contactosf] = useState(false);
    const [email_for_send, setemail_for_send] = useState("")
    const navigation = useNavigation()
    const [loading1, setLoading1] = useState(false)
    const [bolloading, setbolloading] = useState(false);
    const [list_contact, setlist_contact] = useState([]);
    const [list_allcontact, setlist_allcontact] = useState([]);
    const [sexo, setSexo] = useState(null)
    const theme = useTheme();
    const [boollist, setboollist ] = useState(false);
    const { Token, User } = useSelector((reducers) => reducers.loginReducer);
    const url_data = Config.URL_SERVER + "/Usuarios"
    useEffect(() => {
        async function getUser() {
            setLoading1(true)
            try {
                const res = await Axios.get(url_data + "/" + User.dni, { headers: { "authorization": `Bearer ${Token}` } });
                const userData = res.data.objModel[0]
                if (res.data.objModel.length > 0) {
                    setSexo(userData.iD_SEXO)
                    setLoading1(false)
                }
            }
            catch (error) {
                setLoading1(false)
                actionByError(error, navigation)
            }



        }
        getUser()
    },[])

    useEffect(() =>{
        get_list_allcontact()
    },[list_allcontact])

    async function get_list_allcontact() {
        //http://45.66.156.160:99/api/Wallets/getUsersByTransactions/9
        // console.log(User)
        // console.log("lsitando ultimas transacciones")
        try {
            const res = await Axios.get(url_data, { headers: { "authorization": `Bearer ${Token}` } })
            console.log("alllista: ", res.data);
            setlist_allcontact(res.data.objModel);
            setbolloading(false)
            // setlist_cont(res.data.objModel)
            // const data_for = res.data.objModel;        
            // navigation.navigate("Wallet/Select_mont_andsend",{idf: id_for , name_for: name_for,email_for:email_for ,for:last_namefor  })

        } catch (error) {
            setbolloading(false)
            actionByError(error, navigation)
        }
    }

    useEffect(() => {
        async function ChangeAdress() {
            setbolloading(true)
            try {
                const res = await Axios.get(url_data + "/correo/" + email_for_send, { headers: { "authorization": `Bearer ${Token}` } });
                console.log(res.data);
                setlist_contact(res.data.objModel)
                setbolloading(false)
                setboollist(true)
            }
            catch (error) {
                setbolloading(false)
                actionByError(error, navigation)
            }
        }
        ChangeAdress()
    }, [email_for_send])

    return (
        <ScrollView style={styles.container}

        >
            <SpinnerModal loading={spiner_contactosf} text="Cargando Contactos " />

            <View style={{ paddingHorizontal: 20, marginBottom: 150 }}>
                <Row_simple>
                    <Text style={[styles.hello, {color: theme.dark ? "#fff" : "black"}]}>Usuarios</Text>
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




                <View style={{ marginTop: 20, marginBottom: 20 }}>
                    <Search_box fontSz={12} place={'Ingrese el correo electr??nico de un usuario'} bc={'#F1E9C4'} col_text={"#3b3b3b"} value={email_for_send} onChange={setemail_for_send} ></Search_box>
                </View>

                {(list_contact.length >= 1) ? (
                    <Row_simple pad_bot={10}>
                        <Text style={[textos.text_det, {
                            color: theme.dark ? "#ffff" : Colors.colorSecondaryVariant,
                            fontSize: 20,
                            fontFamily: 'Roboto-Regular'
                        }]}> Resultados </Text>
                    </Row_simple>

                ) : null
                    }
                {(list_contact.length <= 0) ? (
                    <View style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Row_simple jus_cont={'center'}>
                            {bolloading && email_for_send != "" && <ActivityIndicator size="large" color={"#b99a55"} />}

                        </Row_simple>
                    </View>

                ) : (
                    <View>

                        {


                            list_contact.map((a, i) => {


                                return (


                                    <TouchableHighlight style={{ paddingBottom: 20, }} key={i} key={a.id} activeOpacity={0.65} underlayColor="transparent" onPress={() => {

                                    }}>

                                        <View >
                                            <Cont_card_color style={{ marginBottom: 20, }} bc={'transparent'} key={a.dni} >
                                                <Row_simple flex={1}>
                                                    <Row_simple flex={1} jus_cont={'flex-start'}>
                                                        {a.iD_SEXO == 1 &&
                                                            <Image
                                                                source={require('../../../../../assets/man.png')}
                                                                style={styles.img_contac2}
                                                            />}
                                                        {a.iD_SEXO == 2 &&
                                                            <Image
                                                                source={require('../../../../../assets/woman.png')}
                                                                style={styles.img_contac2}
                                                            />}

                                                        <Colum_simple jus_cont={'center'} tav={'center'}>
                                                            <Text style={{ color: theme.dark ? "#fff" : "#3b3b3b", fontFamily: "Metropolis-Bold", fontSize: 12 }}>{a.nombre} {a.apE_PAT}</Text>

                                                            <Row_simple jus_cont={'flex-start'}>
                                                                {/* {( a.idTransactionType!=3) &&  <Text style={[textos.tit_det],{color:Colors.colorPrimaryVar2}}>{a.idTransactionType} status {a.idStatus} {  get_transaction_type(a.idTransactionType , User.primarysid , a.idSender) } </Text>} */}

                                                                {/* tipo de  cobro */}
                                                                {<Text style={[textos.text_det], { color: theme.dark ? "#fff" : "#3b3b3b", fontFamily: "Metropolis-SemiBold" }}> {a.dni} </Text>}


                                                            </Row_simple>

                                                        </Colum_simple>
                                                    </Row_simple>
                                                    <Colum_simple jus_cont={'center'}>
                                                        {a.iD_ROL == 1 &&
                                                            <Text style={[textos.tit_det], { color: theme.dark ? "#fff" : "#3b3b3b", fontFamily: "Metropolis-Bold" }}>Administrador</Text>}
                                                        {a.iD_ROL == 2 &&
                                                            <Text style={[textos.tit_det], { color: theme.dark ? "#fff" : "#3b3b3b", fontFamily: "Metropolis-Bold" }}>Soporte</Text>}
                                                        {a.iD_ROL == 3 &&
                                                            <Text style={[textos.tit_det], { color: theme.dark ? "#fff" : "#3b3b3b", fontFamily: "Metropolis-Bold" }}>Gerente</Text>}
                                                        {a.iD_ROL == 4 &&
                                                            <Text style={[textos.tit_det], { color: theme.dark ? "#fff" : "#3b3b3b", fontFamily: "Metropolis-Bold" }}>Trabajador</Text>}
                                                        {a.iD_ROL == 5 &&
                                                            <Text style={[textos.tit_det], { color: theme.dark ? "#fff" : "#3b3b3b", fontFamily: "Metropolis-Bold" }}>Cliente</Text>}
                                                    </Colum_simple>

                                                </Row_simple>
                                            </Cont_card_color>
                                        </View>
                                    </TouchableHighlight>


                                )
                            }


                            )


                        }



                    </View>
                )
                    }
                <View style={{ paddingHorizontal: 0 }}>
                    {/* <Transactions activity={false} /> */}
                    {(list_allcontact.length <= 0) ? (
                        <View>
                        </View>

                    ) : (


                        <View>
                            {
                                list_contact.length <= 0 && bolloading == false &&


                                list_allcontact.map((a, i) => {


                                    return (


                                        <TouchableHighlight style={{ paddingBottom: 20, }} key={i} key={a.id} activeOpacity={0.65} underlayColor="transparent" onPress={() => {

                                        }}>

                                            <View >
                                                <Cont_card_color style={{ marginBottom: 20, }} bc={'transparent'} key={a.dni} >
                                                    <Row_simple flex={1}>
                                                        <Row_simple flex={1} jus_cont={'flex-start'}>
                                                            {a.iD_SEXO == 1 &&
                                                                <Image
                                                                    source={require('../../../../../assets/man.png')}
                                                                    style={styles.img_contac2}
                                                                />}
                                                            {a.iD_SEXO == 2 &&
                                                                <Image
                                                                    source={require('../../../../../assets/woman.png')}
                                                                    style={styles.img_contac2}
                                                                />}

                                                            <Colum_simple jus_cont={'center'} tav={'center'}>
                                                                <Text style={{ color: theme.dark ? "#fff" : "#3b3b3b", fontFamily: "Metropolis-Bold", fontSize: 12 }}>{a.nombre} {a.apE_PAT}</Text>

                                                                <Row_simple jus_cont={'flex-start'}>
                                                                    {/* {( a.idTransactionType!=3) &&  <Text style={[textos.tit_det],{color:Colors.colorPrimaryVar2}}>{a.idTransactionType} status {a.idStatus} {  get_transaction_type(a.idTransactionType , User.primarysid , a.idSender) } </Text>} */}

                                                                    {/* tipo de  cobro */}
                                                                    {<Text style={[textos.text_det], { color: theme.dark ? "#fff" : "#3b3b3b", fontFamily: "Metropolis-SemiBold" }}> {a.dni} </Text>}


                                                                </Row_simple>

                                                            </Colum_simple>
                                                        </Row_simple>
                                                        <Colum_simple jus_cont={'center'}>
                                                            {a.iD_ROL == 1 &&
                                                                <Text style={[textos.tit_det], { color: theme.dark ? "#fff" : "#3b3b3b", fontFamily: "Metropolis-Bold" }}>Administrador</Text>}
                                                            {a.iD_ROL == 2 &&
                                                                <Text style={[textos.tit_det], { color: theme.dark ? "#fff" : "#3b3b3b", fontFamily: "Metropolis-Bold" }}>Soporte</Text>}
                                                            {a.iD_ROL == 3 &&
                                                                <Text style={[textos.tit_det], { color: theme.dark ? "#fff" : "#3b3b3b", fontFamily: "Metropolis-Bold" }}>Gerente</Text>}
                                                            {a.iD_ROL == 4 &&
                                                                <Text style={[textos.tit_det], { color: theme.dark ? "#fff" : "#3b3b3b", fontFamily: "Metropolis-Bold" }}>Trabajador</Text>}
                                                            {a.iD_ROL == 5 &&
                                                                <Text style={[textos.tit_det], { color: theme.dark ? "#fff" : "#3b3b3b", fontFamily: "Metropolis-Bold" }}>Cliente</Text>}
                                                        </Colum_simple>

                                                    </Row_simple>
                                                </Cont_card_color>
                                            </View>
                                        </TouchableHighlight>


                                    )
                                }
                                )
                            }
                        </View>
                    )
                    }
                </View>

            </View>
        </ScrollView>
    );
}

export default EditUser;

const styles = StyleSheet.create({
    container: {
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