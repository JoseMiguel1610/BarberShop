import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, Image, TouchableHighlight, ImageBackground, Alert } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import Header from './components/header';
import { Picker } from '@react-native-community/picker';
import DropDownPicker from 'react-native-dropdown-picker';
import DateInputComp from './components/dateInputComp';
import Modal from "react-native-modal"
import Axios from 'axios';
import moment from 'moment'
import 'moment/locale/es'
import SpinnerModal from '../../../../utils/components/spinnerModal';
import { GetDataLogin, SaveUser } from '../../../../actions/loginActions';
import { storeUserData } from '../../../../utils/AsyncStore'
import BtnForm1 from '../../../../utils/components/btnForm1';
import Icon from 'react-native-vector-icons/Ionicons';
import { Config } from '../../../../configuration/config';
import { actionByError } from '../../../../utils/actionServerResponse';
import ModalSexo from './components/modal';
import ModalRol from './components/modalRol';
import ModalCategoria from './components/modalCategoria';

const EditProfileAdmin = (props) => {
    const { navigation, route: { params: { props: user } } } = props
    const [formData, setFormData] = useState(formDataInit)
    const [loading1, setLoading1] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [name, setName] = useState(null)
    const [dni, setDni] = useState(null)
    const [email, setEmail] = useState(null)
    const [contrasena, setPassword] = useState(null)
    const [showPassword, setShowPassWord] = useState(false);
    const [birthdate, setBirthdate] = useState(null);
    const [lastnameP, setLastNameP] = useState(null);
    const [lastnameM, setLastNameM] = useState(null);
    const [rol, setrol] = useState(null);
    const [inforol, setinforol] = useState(null);
    const [cate, setcate] = useState(null);
    const [infocate, setinfocate] = useState(null);
    const [sexo, setSexo] = useState(null)
    const [prefix, setPrefix] = useState("+51")
    const dispatch = useDispatch();
    //Start code Modal+InputDate
    const [date, setDate] = useState(null)
    const [isModalVisible, setModalVisible] = useState(false);
    const [avatarSource, setAvatarSource] = useState(null)
    const url_data = Config.URL_SERVER + "/Usuarios"
    const { Token, User } = useSelector((reducers) => reducers.loginReducer);
    const openModal = () => {
        setModalVisible(true);
    };
    const closeModal = () => {
        setModalVisible(false);
    };
    const selectDate = () => {
        date && setBirthdate(date)
        setModalVisible(false);
    }

    const [modalCurrent, setModalCurrent] = useState(false);
    const toggleModalCurrent = () => {
        setModalCurrent(!modalCurrent);
    };

    const [modalCurrent2, setModalCurrent2] = useState(false);
    const toggleModalCurrent2 = () => {
        setModalCurrent2(!modalCurrent2);
    };

    const [modalCurrent3, setModalCurrent3] = useState(false);
    const toggleModalCurrent3 = () => {
        setModalCurrent3(!modalCurrent3);
    };
    //End code Modal+InputDate
    useEffect(() => {
        async function getUser() {
            setLoading1(true)
            try {
                const res = await Axios.get(url_data + "/" + user.dni, { headers: { "authorization": `Bearer ${Token}` } });
                const userData = res.data.objModel[0]
                console.log(userData);
                if (res.data.objModel.length > 0) {
                    setDni(userData.dni)
                    setEmail(userData.correo)
                    setName(userData.nombre)
                    setLastNameP(userData.apE_PAT)
                    setLastNameM(userData.apE_MAT)
                    setDate(new Date(userData.fechA_NACIMIENTO))
                    setBirthdate(userData.fechA_NACIMIENTO)
                    setSexo(userData.iD_SEXO)
                    setinforol(userData.rol)
                    setrol(userData.iD_ROL)
                    setcate(userData.iD_CATE)
                    setinfocate(userData.cate)
                    setLoading1(false)
                }
            }
            catch (error) {
                setLoading1(false)
                actionByError(error, navigation)
            }



        }
        getUser()
    }, [])

    useEffect(() => {
        if (rol != 4) {
            setcate(null)
            setinfocate(null)
        }

    }, [rol])

    async function submit() {
        if (rol != 4) {
            if (!name || !dni || !email || !birthdate || !lastnameP || !lastnameM || !sexo || !rol) {
                const formData = {
                    dni: dni,
                    apE_PAT: lastnameP,
                    apE_MAT: lastnameM,
                    nombre: name,
                    fechA_NACIMIENTO: birthdate,
                    correo: email,
                    contrasena: contrasena,
                    iD_SEXO: sexo
                }
                console.log(formData);
                return Alert.alert(
                    "Alerta",
                    "Llene todo los campos",
                    [{ text: "Aceptar", style: "default" }]
                )
            } else {
                setLoading2(true)
                const formData = {
                    dni: dni,
                    apE_PAT: lastnameP,
                    apE_MAT: lastnameM,
                    nombre: name,
                    fechA_NACIMIENTO: birthdate,
                    correo: email,
                    iD_SEXO: sexo,
                    iD_ROL: rol,
                    iD_CATE: cate
                }
                console.log(formData);
                try {
                    const res = await Axios.put(url_data + "/admin", formData, { headers: { "authorization": `Bearer ${Token}` } });
                    console.log(res.data);
                    setLoading2(false)
                    dispatch(GetDataLogin(navigation))
                    Alert.alert(
                        "Mensaje",
                        "Los datos fueron actualizados.",
                        [{ text: "Aceptar", style: "default" }]
                    )
                } catch (error) {
                    setLoading2(false)
                    actionByError(error, navigation)
                }
            }
        }else{
            if (!name || !dni || !email || !birthdate || !lastnameP || !lastnameM || !sexo || !rol || !cate) {
                const formData = {
                    dni: dni,
                    apE_PAT: lastnameP,
                    apE_MAT: lastnameM,
                    nombre: name,
                    fechA_NACIMIENTO: birthdate,
                    correo: email,
                    contrasena: contrasena,
                    iD_SEXO: sexo
                }
                console.log(formData);
                return Alert.alert(
                    "Alerta",
                    "Llene todo los campos",
                    [{ text: "Aceptar", style: "default" }]
                )
            } else {
                setLoading2(true)
                const formData = {
                    dni: dni,
                    apE_PAT: lastnameP,
                    apE_MAT: lastnameM,
                    nombre: name,
                    fechA_NACIMIENTO: birthdate,
                    correo: email,
                    iD_SEXO: sexo,
                    iD_ROL: rol,
                    iD_CATE: cate
                }
                console.log(formData);
                try {
                    const res = await Axios.put(url_data + "/admin", formData, { headers: { "authorization": `Bearer ${Token}` } });
                    console.log(res.data);
                    setLoading2(false)
                    dispatch(GetDataLogin(navigation))
                    Alert.alert(
                        "Mensaje",
                        "Los datos fueron actualizados.",
                        [{ text: "Aceptar", style: "default" }]
                    )
                } catch (error) {
                    setLoading2(false)
                    actionByError(error, navigation)
                }
            }
        }
    }

    return (
        <ScrollView style={styles.container}>
            <SpinnerModal loading={loading1} text="Cargando datos del usuario" />
            <SpinnerModal loading={loading2} text="Actualizando datos del usuario" />
            <Header name={name} sexo={sexo} setFormData={setFormData} avatarSource={avatarSource} setAvatarSource={setAvatarSource} />
            <View style={styles.content}>
                <Text style={styles.label}>DNI</Text>
                <View style={styles.container_input}>
                    <TextInput
                        placeholder='DNI'
                        placeholderTextColor="#7c7878"
                        keyboardType="default"
                        defaultValue={dni}
                        onChangeText={(e) => setDni(e)}
                        style={[styles.input, { color: "#7c7878" }]}
                        editable={false}
                    />
                </View>
                <Text style={styles.label}>E-mail</Text>
                <View style={styles.container_input}>
                    <TextInput
                        placeholder='E-mail'
                        placeholderTextColor="#7c7878"
                        keyboardType="default"
                        defaultValue={email}
                        onChangeText={(e) => setDni(e)}
                        style={[styles.input, { color: "#7c7878" }]}
                        editable={false}
                    />
                </View>
                <Text style={styles.label}>Nombres</Text>
                <View style={styles.container_input}>
                    <TextInput
                        placeholder='Nombres'
                        placeholderTextColor="#7c7878"
                        keyboardType="default"
                        defaultValue={name}
                        onChangeText={(e) => setName(e)}
                        style={styles.input}
                    />
                </View>
                <Text style={styles.label}>Apellido Paterno</Text>
                <View style={styles.container_input}>
                    <TextInput
                        placeholder='Apellido Paterno'
                        placeholderTextColor="#7c7878"
                        keyboardType="default"
                        defaultValue={lastnameP}
                        onChangeText={(e) => setLastNameP(e)}
                        style={styles.input}
                    />
                </View>
                <Text style={styles.label}>Apellido Materno</Text>
                <View style={styles.container_input}>
                    <TextInput
                        placeholder='Apellido Materno'
                        placeholderTextColor="#7c7878"
                        keyboardType="default"
                        defaultValue={lastnameM}
                        onChangeText={(e) => setLastNameM(e)}
                        style={styles.input}
                    />
                </View>
                {/*                 <Text style={styles.label}>Número de identidad</Text>
                <View style={styles.container_input}>
                    <TextInput
                        placeholder='Número de identidad'
                        placeholderTextColor="#7c7878"
                        keyboardType="default"
                        onChangeText={(e) => onChange(e, 'number')}
                        style={styles.input}
                    />
                </View> */}
                {/* <Text style={styles.label}>Celular</Text>
                <View style={styles.container_input2}>
                    <View style={styles.container_input2_left}>
                        <Image source={require("../../../../assets/flag-peru.png")} style={{ height: 14, width: 28, marginLeft: 20 }} />
                        <Picker
                            selectedValue={prefix}
                            onValueChange={date => setPrefix(date)}
                            style={{ width: 98, backgroundColor: "white" }}
                        >
                            <Picker.Item label="+51" value="+51" color="black" />
                        </Picker>
                    </View>
                    <View style={styles.container_input2_right}>
                        <TextInput style={styles.input} placeholder="Celular" placeholderTextColor="#a0aec0"
                            onChangeText={(e) => onChange(prefix + e, 'phone')} keyboardType="numeric" />
                    </View>
                </View> */}
                <Text style={styles.label}>Fecha de nacimiento</Text>
                <View style={styles.container_input} onTouchEnd={() => openModal()}>
                    <TextInput
                        placeholder='Fecha de nacimiento'
                        placeholderTextColor="#7c7878"
                        keyboardType="default"
                        value={birthdate ? moment(birthdate).format('DD/MM/YYYY') : ""}
                        editable={false}
                        onChangeText={(e) => setBirthdate(e)}
                        style={styles.input}
                    />
                </View>
                {date && <DateInputComp isModalVisible={isModalVisible} date={date}
                    setDate={setDate} closeModal={closeModal} selectDate={selectDate} />}

                <Text style={styles.label}>Género</Text>
                <View style={styles.container_input} onTouchEnd={() => toggleModalCurrent()}>
                    <TextInput
                        placeholder='Género'
                        placeholderTextColor="#7c7878"
                        keyboardType="default"
                        value={sexo && sexo == 1 ? "Masculino" : "Femenino"}
                        editable={false}
                        style={styles.input}
                    />
                </View>
                <ModalSexo setsexo={setSexo} isModalVisible={modalCurrent} toggleModal={toggleModalCurrent}
                    onBackButtonPress={() => setModalCurrent(false)} />

                <Text style={styles.label}>Rol</Text>
                <View style={styles.container_input} onTouchEnd={() => toggleModalCurrent2()}>
                    <TextInput
                        placeholder='Rol'
                        placeholderTextColor="#7c7878"
                        keyboardType="default"
                        value={inforol}
                        editable={false}
                        style={styles.input}
                    />
                </View>
                <ModalRol setinforol={setinforol} setrol={setrol} isModalVisible={modalCurrent2} toggleModal={toggleModalCurrent2}
                    onBackButtonPress={() => setModalCurrent2(false)} />
                {rol == 4 &&
                    <View>
                        <Text style={styles.label}>Categoría</Text>
                        <View style={styles.container_input} onTouchEnd={() => toggleModalCurrent3()}>
                            <TextInput
                                placeholder='Categoría'
                                placeholderTextColor="#7c7878"
                                keyboardType="default"
                                value={infocate}
                                editable={false}
                                style={styles.input}
                            />
                        </View>
                    </View>
                }
                <ModalCategoria setinfocate={setinfocate} setcate={setcate} isModalVisible={modalCurrent3} toggleModal={toggleModalCurrent3}
                    onBackButtonPress={() => setModalCurrent3(false)} />

                {/* <Text style={styles.label}>Sexo</Text>
                <View style={styles.container_sex}>
                    <TouchableHighlight onPressOut={() => onChange("M", "sex")} underlayColor="#eeeeee"
                        style={[styles.buttonLeft, { backgroundColor: formData.sex === "M" ? "orange" : "transparent" }]}>
                        <Text style={styles.text1}>Hombre</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPressOut={() => onChange("F", "sex")} underlayColor="#eeeeee"
                        style={[styles.buttonRight, { backgroundColor: formData.sex === "F" ? "orange" : "transparent" }]} >
                        <Text style={styles.text1}>Mujer</Text>
                    </TouchableHighlight>
                </View> */}

                <BtnForm1 text="Actualizar datos" onPress={() => submit()} classContainer={{ marginVertical: 10 }} />

            </View>
        </ScrollView>
    )
}

const formDataInit = {
    name: "",
    lastname: "",
    //number: "",
    email: "",
    //phone: "",
    birthdate: "",
    //sex: "",
    photoBase64: "",
    idAccountType: null,
    photoUser: ""
}
export default EditProfileAdmin

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        backgroundColor: "#eeeeee"
    },
    content: {
        marginVertical: 20,
        paddingVertical: 0,
        borderRadius: 20,
        paddingHorizontal: 10
    },
    container_input: {
        color: "#000",
        borderWidth: 0.5,
        borderColor: "#cbd5e0",
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        marginVertical: 6,
        width: "100%"
    },
    container_inputPass: {
        backgroundColor: "#fff",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 6,
        paddingHorizontal: 10
    },
    input: {
        flex: 1,
        color: "#000",
        fontFamily: "Metropolis-Semibold"
    },
    label: {
        color: "#959393",
        marginTop: 10,
        fontSize: 15,
        fontWeight: "bold"
    },
    container_input2: {
        flexDirection: "row",
        width: "100%"
    },
    container_input2_left: {
        color: "#000",
        borderWidth: 0.5,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderColor: "#cbd5e0",
        backgroundColor: "#fff",
        paddingLeft: 0,
        paddingRight: 0,
        borderRadius: 10,
        marginVertical: 6,
        width: "35%",
        flexDirection: "row",
        alignItems: "center",
        overflow: "hidden"
    },
    container_input2_right: {
        color: "#000",
        borderWidth: 0.5,
        borderColor: "#cbd5e0",
        backgroundColor: "#fff",
        paddingLeft: 15,
        paddingRight: 0,
        borderRadius: 10,
        marginVertical: 6,
        width: "65%",
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0
    },
    container_sex: {
        width: "100%",
        borderWidth: 0.5,
        borderColor: "#cbd5e0",
        borderRadius: 10,
        flexDirection: "row",
        marginVertical: 15,
        overflow: "hidden"
    },
    buttonLeft: {
        width: "50%",
        height: 40,
        justifyContent: "center",
        borderRightWidth: 0.5,
        borderColor: "#cbd5e0"
    },
    buttonRight: {
        width: "50%",
        height: 40,
        justifyContent: "center"
    },
    text1: {
        textAlign: "center"
    },
    btn2: {
        paddingVertical: 7,
        borderRadius: 12,
        overflow: "hidden",
    },
    text_btn2: {
        textAlign: "center",
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold"
    },
    row: {
        color: "#000",
        backgroundColor: "transparent",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
        backgroundColor: "#fff",
        marginVertical: 10,
        paddingHorizontal: 10
    }
})
