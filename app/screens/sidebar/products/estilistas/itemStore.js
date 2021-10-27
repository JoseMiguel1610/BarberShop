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
import { AirbnbRating } from 'react-native-ratings';

const ItemStore = (props) => {
    //console.log("props itemSotre:", props)
    const { dni, apE_PAT, apE_MAT, nombre, iD_SEXO, promedio, iD_SERVICIO, nameStore, photoStore, idCategory_subcategory, precio } = props
    const namecomplete = nombre + " " + apE_PAT + " " + apE_MAT
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
            navigation.navigate("InfoEstilistas", props)
        }}>
        <Cont_card_color marg_top={10} bc={'white'} brad={20} flex={1} elev={5}>
           <Row_simple just_cont={'space-around'}>
            {/* <Pressable style={styles.left} onPress={() => {
                console.log("props params:", props)
                dispatch(setLoadingFullCategories(true))//Esto evita el warning del estado con pérdida de memoria.
                navigation.navigate("StoresSales/ProductsShop", props)
            }} > */}
            <Colum_simple flex={1}>
                {iD_SEXO == 1 &&
              <Image source={require("../../../../../assets/man.png")} style={styles.img} resizeMode="cover" /> }
              {iD_SEXO == 2 &&
              <Image source={require("../../../../../assets/woman.png")} style={styles.img} resizeMode="cover" /> }
            </Colum_simple>
              
            {/* </Pressable> bc={'yellow'}  */}
            <Colum_simple flex={1.8}  pad_top={10} pad_bot={10}>
                {/* <View style={styles.right}> */}
                    <View style={{ justifyContent: "center", width: "100%", flex: 1 }}>
                        <Row_simple>
                        <Colum_simple>
                          <Text style={styles.title}>{namecomplete}</Text>
                        {/* <Text style={styles.price}>s/ 5.70</Text> */}
                        <View style={styles.stars}>
                        <AirbnbRating showRating={false} defaultRating={promedio} size={20} selectedColor={"#ff9300"} isDisabled />
                        </View>
                        </Colum_simple>
                      </Row_simple>
                    </View>
                {/* </View> */}
            </Colum_simple>
            
            </Row_simple>
            </Cont_card_color>
        </Pressable>
    )
}

export default ItemStore

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
        width: 46,
        height: 20,
        backgroundColor: "#e5e5e5",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        borderRadius: 8
    },
    text_ind: {
        fontSize: 8,
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
