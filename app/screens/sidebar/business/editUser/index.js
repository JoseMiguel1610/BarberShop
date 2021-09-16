import React, { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Search_box from "../../../../utils/components/search_box";
import SpinnerModal from "../../../../utils/components/spinnerModal";
import Icon from 'react-native-vector-icons/Feather';
import Row_simple from '../../../../utils/components/row_simple';
import { useSelector } from 'react-redux';
import { Config } from '../../../../configuration/config';
import { actionByError } from '../../../../utils/actionServerResponse';

function EditUser() {
    const [spiner_contactosf, setspiner_contactosf] = useState(false);
    const [email_for_send, setemail_for_send] = useState("")
    const [loading1, setLoading1] = useState(false)
    const [sexo, setSexo] = useState(null)
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
            catch (e) {
                setLoading1(false)
                actionByError(error, navigation)
            }



        }
        getUser()
    }, [])

    return (
        <ScrollView style={styles.container}

        >
            <SpinnerModal loading={spiner_contactosf} text="Cargando Contactos " />

            <View style={{ paddingHorizontal: 20, marginBottom: 150 }}>
                <Row_simple>
                    <Text style={styles.hello}>Sexo sudor y calor</Text>
                    {/* {sexo == 1 && */}
                        <Image
                            source={require('../../../../../assets/man.png')}
                            style={styles.img_prof} />
                            {/* } */}
                    {/* {sexo == 2 && */}
                        {/* <Image
                            source={require('../../../../../assets/woman.png')}
                            style={styles.img_prof} /> */}
                            {/* } */}



                </Row_simple>




                <View style={{ marginTop: 20 }}>
                    <Search_box fontSz={11} place={'Ingrese el correo electrónico de un usuario'} bc={'#F1E9C4'} col_text={"#3b3b3b"} value={email_for_send} onChange={setemail_for_send} ></Search_box>
                </View>
            </View>
        </ScrollView>
    );
}

export default EditUser;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f6f6f4",
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
    img_prof: {
        marginTop: 5,
        height: 80,
        width: 80,
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