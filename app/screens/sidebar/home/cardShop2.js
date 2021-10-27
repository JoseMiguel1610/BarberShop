import { useTheme } from '@react-navigation/native';
import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import LoadingImg from '../../../utils/components/loadingImg';
import { useNavigation } from '@react-navigation/native';

const CardShop2 = (props) => {
    const { descripcion, descripcioN_SER, iD_SERVICIO, iD_CATE, precio } = props
    const theme = useTheme();
    const navigation = useNavigation()
    const submit = () =>{
        navigation.navigate("Estilistas", { id : iD_CATE, iD_SERVICIO, precio  })
    }
    return (
        <View style={styles.container} onTouchEnd={() => submit()}>
            {iD_SERVICIO == 1 &&
              <Image source={require("../../../../assets/categorias/corte-regular.jpg")} style={styles.img} indicator={LoadingImg} />}
              {iD_SERVICIO == 2 &&
              <Image source={require("../../../../assets/categorias/corte-fade.jpg")} style={styles.img} indicator={LoadingImg} />}
              {iD_SERVICIO == 3 &&
              <Image source={require("../../../../assets/categorias/corte-diseño.jpg")} style={styles.img} indicator={LoadingImg} />}
              {iD_SERVICIO == 4 &&
              <Image source={require("../../../../assets/categorias/barte-corte.jpg")} style={styles.img} indicator={LoadingImg} />}
              {iD_SERVICIO == 5 &&
              <Image source={require("../../../../assets/categorias/barba-diseño.jpg")} style={styles.img} indicator={LoadingImg} />}
              {iD_SERVICIO == 6 &&
              <Image source={require("../../../../assets/categorias/mascarilla-negra.jpg")} style={styles.img} indicator={LoadingImg} />}
              {iD_SERVICIO == 7 &&
              <Image source={require("../../../../assets/categorias/mascarilla-blanca.jpg")} style={styles.img} indicator={LoadingImg} />}
              {iD_SERVICIO == 8 &&
              <Image source={require("../../../../assets/categorias/mascarilla-dorada.jpg")} style={styles.img} indicator={LoadingImg} />}
              {iD_SERVICIO == 9 &&
              <Image source={require("../../../../assets/categorias/mascarilla-completa.jpg")} style={styles.img} indicator={LoadingImg} />}
              {iD_SERVICIO == 10 &&
              <Image source={require("../../../../assets/categorias/masaje_hombro.png")} style={styles.img} indicator={LoadingImg} />}
              {iD_SERVICIO == 11 &&
              <Image source={require("../../../../assets/categorias/masaje_cabeza.jpg")} style={styles.img} indicator={LoadingImg} />}
              {iD_SERVICIO == 12 &&
              <Image source={require("../../../../assets/categorias/masaje_completo.jpg")} style={styles.img} indicator={LoadingImg} />}
              {iD_SERVICIO == 13 &&
              <Image source={require("../../../../assets/categorias/peinado-regular.jpg")} style={styles.img} indicator={LoadingImg} />}
              {iD_SERVICIO == 14 &&
              <Image source={require("../../../../assets/categorias/peinado-completo.jpg")} style={styles.img} indicator={LoadingImg} />}
              {iD_SERVICIO == 15 &&
              <Image source={require("../../../../assets/categorias/peinado-evento.jpg")} style={styles.img} indicator={LoadingImg} />}
              {iD_SERVICIO == 16 &&
              <Image source={require("../../../../assets/categorias/tinte-completo.jpg")} style={styles.img} indicator={LoadingImg} />}
              {iD_SERVICIO == 17 &&
              <Image source={require("../../../../assets/categorias/tinte-puntas.jpg")} style={styles.img} indicator={LoadingImg} />}
              {iD_SERVICIO == 18 &&
              <Image source={require("../../../../assets/categorias/tinte-iluminacion.jpg")} style={styles.img} indicator={LoadingImg} />}
            <View style={styles.container_description}>
                <Text style={[styles.name, { color: theme.dark ? "#fff" : "black"}]}>{descripcion}</Text>
                <Text style={[styles.category, { color: theme.dark ? "#fff" : "black"}]}>{descripcioN_SER}</Text>
                <View style={styles.container_icons}>
                    <View style={styles.stars}>
                        {[1, 2, 3, 4, 5].map(e => <Icon name='star-sharp' size={14} color="#ff9300" style={styles.icon} key={e} />)}
                    </View>
                    
                </View>
            </View>
        </View>
    )
}

export default CardShop2

const styles = StyleSheet.create({
    container: {
        width: 130,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 15,
        marginRight: 20
    },
    img: {
        width: 110,
        height: 100,
        borderRadius: 15,
        alignSelf:"center"
    },
    stars: {
        flexDirection: "row"
    },
    name: {
        fontSize: 10.5,
        fontFamily: "Poppins-Medium",
        textTransform: "uppercase"
    },
    category: {
        fontSize: 10,
        fontFamily: "Poppins-Medium",
        color: "#888888"
    },
    container_icons: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
})
