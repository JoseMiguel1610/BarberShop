import { useTheme } from '@react-navigation/native';
import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import LoadingImg from '../../../utils/components/loadingImg';
import { useNavigation } from '@react-navigation/native';
import { AirbnbRating } from 'react-native-ratings';

const CardShop = (props) => {
    const { id, cate, nombre, sexo, promedio, descripcion, dni } = props
    const theme = useTheme();
    const navigation = useNavigation()
    const submit = () =>{
        navigation.navigate("Servicios2", { id : cate, nameCategory: descripcion, dni  })
    }
    return (
        <View style={styles.container} onTouchEnd={() => submit()}>
              {sexo == 1 &&
              <Image source={require("../../../../assets/man.png")} style={styles.img} indicator={LoadingImg} />}
              {sexo == 2 &&
              <Image source={require("../../../../assets/woman.png")} style={styles.img} indicator={LoadingImg} />}
            <View style={styles.container_description}>
            <Text style={[styles.name, { color: theme.dark ? "#fff" : "black"}]}>{descripcion}</Text>
                <Text style={[styles.category, { color: theme.dark ? "#fff" : "black"}]}>{nombre}</Text>
                <View style={styles.container_icons}>
                    <View style={styles.stars}>
                    <AirbnbRating showRating={false} defaultRating={promedio} size={12} selectedColor={"#ff9300"} isDisabled />
                    </View>
                    
                </View>
            </View>
        </View>
    )
}

export default CardShop

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
