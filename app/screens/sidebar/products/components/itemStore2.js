import React, { useState } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import ImgErr from '../../../../utils/components/ImgErr';
import Cont_card_color from '../../../../utils/components/cont_card_color';
import Row_simple from '../../../../utils/components/row_simple';
import Colum_simple from '../../../../utils/components/colum_simple';

const ItemStore2 = (props) => {
    console.log(props);
    //console.log("props itemSotre:", props)
    const { iD_SERVICIO, dni, descripcion, precio, photoStore, subCategorys, idCategory_subcategory, id } = props
    const nameSubcategory = subCategorys.find(e => e.idCategory_subcategory === idCategory_subcategory).name
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const [like, setLike] = useState(false)
    const [errorImg, setErrorImg] = useState(false)
    const img = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb3X16KInJpoH3IXd6kLyF7ZBkFRM44JjVKg&usqp=CAU";
    /* 
    <Image source={{ uri: !photoStore || errorImg ? img : photoStore }} style={styles.img} onError={() => setErrorImg(true)}
                    indicator={LoadingImg} />
    */
    return (
        <Pressable style={styles.container} android_ripple={{ color: "#ff9300" }}   onPress={() => {
            console.log("props params:", props)
            navigation.navigate("Citas", { dni, iD_SERVICIO, precio })
        }}>
        <Cont_card_color marg_top={10} bc={'white'} brad={20} flex={1} elev={5}>
           <Row_simple just_cont={'space-around'}>
            {/* <Pressable style={styles.left} onPress={() => {
                console.log("props params:", props)
                dispatch(setLoadingFullCategories(true))//Esto evita el warning del estado con pérdida de memoria.
                navigation.navigate("StoresSales/ProductsShop", props)
            }} > */}
            <Colum_simple flex={1}>
              {iD_SERVICIO == 1 &&
              <Image source={require("../../../../../assets/categorias/corte-regular.jpg")} style={styles.img} resizeMode="cover" />}
              {iD_SERVICIO == 2 &&
              <Image source={require("../../../../../assets/categorias/corte-fade.jpg")} style={styles.img} resizeMode="cover" />}
              {iD_SERVICIO == 3 &&
              <Image source={require("../../../../../assets/categorias/corte-diseño.jpg")} style={styles.img} resizeMode="cover" />}
              {iD_SERVICIO == 4 &&
              <Image source={require("../../../../../assets/categorias/barte-corte.jpg")} style={styles.img} resizeMode="cover" />}
              {iD_SERVICIO == 5 &&
              <Image source={require("../../../../../assets/categorias/barba-diseño.jpg")} style={styles.img} resizeMode="cover" />}
              {iD_SERVICIO == 6 &&
              <Image source={require("../../../../../assets/categorias/mascarilla-negra.jpg")} style={styles.img} resizeMode="cover" />}
              {iD_SERVICIO == 7 &&
              <Image source={require("../../../../../assets/categorias/mascarilla-blanca.jpg")} style={styles.img} resizeMode="cover" />}
              {iD_SERVICIO == 8 &&
              <Image source={require("../../../../../assets/categorias/mascarilla-dorada.jpg")} style={styles.img} resizeMode="cover" />}
              {iD_SERVICIO == 9 &&
              <Image source={require("../../../../../assets/categorias/mascarilla-completa.jpg")} style={styles.img} resizeMode="cover" />}
              {iD_SERVICIO == 10 &&
              <Image source={require("../../../../../assets/categorias/masaje_hombro.png")} style={styles.img} resizeMode="cover" />}
              {iD_SERVICIO == 11 &&
              <Image source={require("../../../../../assets/categorias/masaje_cabeza.jpg")} style={styles.img} resizeMode="cover" />}
              {iD_SERVICIO == 12 &&
              <Image source={require("../../../../../assets/categorias/masaje_completo.jpg")} style={styles.img} resizeMode="cover" />}
              {iD_SERVICIO == 13 &&
              <Image source={require("../../../../../assets/categorias/peinado-regular.jpg")} style={styles.img} resizeMode="cover" />}
              {iD_SERVICIO == 14 &&
              <Image source={require("../../../../../assets/categorias/peinado-completo.jpg")} style={styles.img} resizeMode="cover" />}
              {iD_SERVICIO == 15 &&
              <Image source={require("../../../../../assets/categorias/peinado-evento.jpg")} style={styles.img} resizeMode="cover" />}
              {iD_SERVICIO == 16 &&
              <Image source={require("../../../../../assets/categorias/tinte-completo.jpg")} style={styles.img} resizeMode="cover" />}
              {iD_SERVICIO == 17 &&
              <Image source={require("../../../../../assets/categorias/tinte-puntas.jpg")} style={styles.img} resizeMode="cover" />}
              {iD_SERVICIO == 18 &&
              <Image source={require("../../../../../assets/categorias/tinte-iluminacion.jpg")} style={styles.img} resizeMode="cover" />}
            </Colum_simple>
              
            {/* </Pressable> bc={'yellow'}  */}
            <Colum_simple flex={1.8}  pad_top={10} pad_bot={10}>
                {/* <View style={styles.right}> */}
                    <View style={{ justifyContent: "center", width: "100%", flex: 1 }}>
                        <Row_simple>
                        <Colum_simple>
                          <Text style={styles.title}>{descripcion}</Text>
                        {/* <Text style={styles.price}>s/ 5.70</Text> */}
                        <View style={styles.stars}>
                            {[1, 2, 3, 4, 5].map(e => <Icon name='star-sharp' size={20} color="#ff9300" style={styles.icon} key={e} />)}
                        </View>
                        </Colum_simple>
                      </Row_simple>
                    </View>
                    <View style={{ width: "100%",position:'absolute' ,bottom:5,right:5}}>
                        {/* <View style={styles.indicators}> */}
                         <Row_simple jus_cont={'flex-end'} >
                            {/* <View style={styles.container_clock_marker}> */}
                                <View style={styles.clock}>
                                    <Text style={styles.text_ind}>S/{precio}.00</Text>
                                </View>
                            {/* </View> */}
                        </Row_simple>
                        {/* </View> */}
                    </View>
                {/* </View> */}
            </Colum_simple>
            
            </Row_simple>
            </Cont_card_color>
        </Pressable>
    )
}

export default ItemStore2

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: "100%",
        marginBottom: 10,
        paddingVertical: 10,
        // backgroundColor:'white'
    },
    title: {
        fontWeight: "bold",
        textTransform: "uppercase",
        fontSize: 12,
        width: 180,
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
    img: {
        height: 100,
        width: 100,
        borderRadius: 20
    },
    right: {
        width: "65%",
        paddingLeft: 10,
        flexDirection: "row"
    },
    left: {
        width: "35%"
    },
    indicators: {
        width: "100%",
        height: 70,
        //backgroundColor: "yellow",
        bottom: 0,
        position: "absolute",
        alignItems: "flex-end"
    },
    marker: {
        width: 50,
        height: 20,
        backgroundColor: "#e5e5e5",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        borderRadius: 8
    },
    clock: {
        width: 80,
        height: 20,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        borderRadius: 8
    },
    text_ind: {
        fontSize: 12,
        color: "#ff9700"
    },
    container_clock_marker: {
        width: "100%",
        flexDirection: "row",
        bottom: 0,
        position: "absolute",
        justifyContent: "space-between"
    }
})
