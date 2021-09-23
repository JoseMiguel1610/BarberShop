import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import React, { useEffect } from "react";
import { Image, ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/Ionicons';
import { useSelector } from "react-redux";
import { Config } from "../../../../configuration/config";
import BtnForm1 from "../../../../utils/components/btnForm1";
import Colum_simple from "../../../../utils/components/colum_simple";
import Cont_card_color from "../../../../utils/components/cont_card_color";
import Row_simple from "../../../../utils/components/row_simple";
const InfoEstilista = (props) => {
    const { route: { params: {nombre, apE_MAT, apE_PAT, iD_SEXO, iD_SERVICIO} } } = props
    console.log(iD_SEXO);
    const navigation = useNavigation()
    const { Token, User } = useSelector((reducers) => reducers.loginReducer);
    const namecomplete = nombre + " " + apE_PAT + " " + apE_MAT
    const url_data = Config.URL_SERVER + "/Categorias"

    const submit = () =>{
        navigation.navigate("Citas", props)
    }

    return (
        <>
            <View style={{ flex: 1 }}>
                <ImageBackground style={styles.container_top} source={require("../../../../../assets/fondo-02.png")} >
                    <View style={styles.top}>
                        <Row_simple jus_cont={'flex-start'} alitems={'space-around'} flex={1}>
                            <Colum_simple jus_cont={'center'} alitems={'flex-start'} flex={1}>
                                <Pressable android_ripple={{ color: "#3b3b3b" }}
                                    onPress={() => navigation.goBack()}>
                                    <Icon name='arrow-left' color={"#b99a55"} size={30} />
                                </Pressable>
                            </Colum_simple>
                            <Colum_simple jus_cont={'center'} alitems={'center'} flex={1}>
                                <Text style={{ fontSize: 20, color: "#fff" }}>Estilista</Text>
                            </Colum_simple>
                            <Colum_simple jus_cont={'center'} alitems={'flex-end'} flex={1}>
                                <Image
                                    source={require("../../../../../assets/logobarber.png")} style={{ width: 80, height: 80 }}>
                                </Image>
                            </Colum_simple>
                        </Row_simple>

                    </View>
                </ImageBackground>
                <View style={styles.container}>
                    <Cont_card_color pad={15} marg_top={10} bc={'#fff'} brad={20} flex={1} elev={5}>
                        <Row_simple just_cont={'center'} alitems={"center"}>
                            <Colum_simple flex={1} just_cont={'center'} alitems={"center"}>
                                {iD_SEXO == 1 && 
                                <Image source={require("../../../../../assets/man.png")} style={styles.img} resizeMode="cover" />}
                                {iD_SEXO == 2 && 
                                <Image source={require("../../../../../assets/woman.png")} style={styles.img} resizeMode="cover" />}
                                <Text style={styles.title}>{namecomplete}</Text>
                                {/* <Text style={styles.price}>s/ 5.70</Text> */}
                                <View style={styles.stars}>
                                    {[1, 2, 3, 4].map(e => <Icon2 name='star-sharp' size={20} color="#ff9300" style={styles.icon} key={e} />)}
                                </View>
                            </Colum_simple>

                        </Row_simple>
                    </Cont_card_color>
                </View>
                <View style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                <BtnForm1 text="Continuar" classContainer={{width: 190}} onPress={() => submit()} />
                </View>
            </View>
        </>
    );
}

export default InfoEstilista;

const styles = StyleSheet.create({
    container_top: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
        resizeMode: "cover"
    },
    container: {
        flexDirection: "row",
        marginBottom: 10,
        paddingVertical: 10,
    },
    top: {
        height: 100,
    },
    h1: {
        color: "#fff",
        textTransform: "uppercase",
        marginTop: 5
    },
    img: {
        height: 100,
        width: 100,
    },
    title: {
        fontWeight: "bold",
        textTransform: "uppercase",
        fontSize: 12,
        width: 180,
        textAlign: "center"
    },//
    descrip: {
        color: "#6b6b6b",
        fontWeight: "700",
        fontSize: 11
    },
    price: {
        color: "#c5c3c3",
        fontSize: 11
    },
    stars: {
        flexDirection: "row"
    },
})