import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, Image, TouchableHighlight, ImageBackground, Alert } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import Header from './components/header';
import { Picker } from '@react-native-community/picker';
import DateInputComp from './components/dateInputComp';
import Axios from 'axios';
import moment from 'moment'
import 'moment/locale/es'
import SpinnerModal from '../../../utils/components/spinnerModal';
import { SaveUser } from '../../../actions/loginActions';
import { storeUserData } from '../../../utils/AsyncStore'
import BtnForm1 from '../../../utils/components/btnForm1';
import Icon from 'react-native-vector-icons/Ionicons';
import { Config } from '../../../configuration/config';
import { actionByError } from '../../../utils/actionServerResponse';

const EditProfile = ({ navigation }) => {
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
    const [sexo, setSexo] = useState(null)
    const [prefix, setPrefix] = useState("+51")
    const dispatch = useDispatch();
    //Start code Modal+InputDate
    const [date, setDate] = useState(null)
    const [isModalVisible, setModalVisible] = useState(false);
    const [avatarSource, setAvatarSource] = useState(null)
    const url_data = Config.URL_SERVER + "/Usuarios"
    const { Token, User } = useSelector((reducers) => reducers.loginReducer);
    console.log("User", User);
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
    //End code Modal+InputDate
    useEffect(() => {
        async function getUser() {
            setLoading1(true)
            try {
                const res = await Axios.get(url_data + "/" + User.dni, { headers: { "authorization": `Bearer ${Token}` } });
                const userData = res.data.objModel[0]
                if(res.data.objModel.length > 0){
                    setDni(userData.dni)
                    setEmail(userData.correo)
                    setName(userData.nombre)
                    setLastNameP(userData.apE_PAT)
                    setLastNameM(userData.apE_MAT)
                    setDate(new Date(userData.fechA_NACIMIENTO))
                    setBirthdate(userData.fechA_NACIMIENTO)
                    setSexo(userData.iD_SEXO)
                    setLoading1(false)
                }
            }
            catch(e){
                setLoading1(false)
                actionByError(error, navigation)
            }
            
            
            
        }
        getUser()
    }, [])

    async function submit() {
        if (!name || !dni || !email || !birthdate || !lastnameP || !lastnameM || !sexo) {
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
                contrasena: contrasena,
                iD_SEXO: sexo
            }
            console.log(formData);
            try {
                const res = await Axios.put(url_data, formData, { headers: { "authorization": `Bearer ${Token}` } });
                console.log(res.data);
                setLoading2(false)
                Alert.alert(
                    "Mensaje",
                    "Sus datos fueron actualizados.",
                    [{ text: "Aceptar", style: "default" }]
                )
            } catch (error) {
                setLoading2(false)
                actionByError(error, navigation)
            }
        }
    }

    return (
        <ScrollView style={styles.container}>
            <SpinnerModal loading={loading1} text="Cargando datos del usuario" />
            <SpinnerModal loading={loading2} text="Actualizando datos del usuario" />
            <Header sexo={sexo} setFormData={setFormData} avatarSource={avatarSource} setAvatarSource={setAvatarSource} />
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
                        style={[styles.input, { color: "#000" }]}
                    />
                </View>
                {date && <DateInputComp isModalVisible={isModalVisible} date={date}
                    setDate={setDate} closeModal={closeModal} selectDate={selectDate} />}

                <Text style={styles.label}>Género</Text>
                <View style={styles.row} flex={1}>
                    <View flex={1}>
                        <Picker
                            enabled={true}
                            selectedValue={sexo}
                            onValueChange={date => setSexo(date)}
                            itemStyle={{ fontSize: 20, fontFamily: "Metropolis-Bold" }}
                            style={{ color: "#000" }}
                        >
                            <Picker.Item label="Género" value="" color="#a0aec0" />
                            <Picker.Item label="Masculino" value={1} color="#000"/>
                            <Picker.Item label="Femenino" value={2} color="#000" />

                        </Picker>
                    </View>
                </View>
                <Text style={styles.label}>Contraseña</Text>
                <View style={styles.container_inputPass}>
                    <TextInput
                        placeholder='******'
                        placeholderTextColor="#7c7878"
                        keyboardType="default"
                        secureTextEntry={showPassword ? false : true}
                        onChangeText={(e) => setPassword(e)}
                        style={styles.input}
                    />
                    {
                        showPassword ? <Icon name='md-eye-off-outline' color="#868686" size={20} style={{ marginRight: 10 }}
                            onPress={() => setShowPassWord(false)} /> :
                            <Icon name='ios-eye-outline' color="#868686" size={20} style={{ marginRight: 10 }}
                                onPress={() => setShowPassWord(true)} />
                    }
                </View>

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

                <BtnForm1 text="Actualizar mis datos" onPress={() => submit()} classContainer={{ marginVertical: 10 }} />

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
export default EditProfile

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
        fontFamily: "Metropolis-Bold"
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
