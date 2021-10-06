import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import BtnForm2 from '../../../../../utils/components/btnForm2'
import moment from "moment"
import 'moment/locale/es'
import textos from '../../../../../styles/textos'
import Row_simple from '../../../../../utils/components/row_simple';
import Colum_simple from '../../../../../utils/components/colum_simple';
import { Colors } from '../../../../../styles/colors'

const CardCategoria = (props) => {
    const navigation = useNavigation()
    const { toggleModal, setcate, setinfocate, data } = props;

    async function Select() {
        toggleModal();
        setcate(data.id)
        setinfocate(data.name)
    }
    return (
        <Pressable flex={1} style={styles.container} onPress={() => Select()} android_ripple={{ color: "#ff3d2a" }}>
                <Row_simple flex={1} jus_cont={'flex-start'}>
                    <Row_simple flex={1}>
                        <Colum_simple jus_cont={'center'}>
                            <Text style={[textos.tit_det], { fontFamily: "Poppins-Bold", color: "black", fontSize: 16 }} >{data.name}</Text>
                        </Colum_simple>
                    </Row_simple>
                </Row_simple>
        </Pressable>
    )
}

export default CardCategoria

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        borderRadius: 10,
        marginVertical: 10,
    },
    img_contac: {
        marginRight: 5,
        marginTop: "auto",
        marginBottom: "auto"
    },
    img: {
        width: 80,
        height: 80,
        borderRadius: 999
    },
    content: {
        flex: 1,
        marginLeft: 15
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: -2
    },
    data: {
        flex: 1,
        textAlign: "right",
        fontFamily: "Poppins-SemiBold",
        fontSize: 11.5
    },
    name: {
        fontFamily: "Poppins-Medium",
        fontSize: 16
    },
    field: {
        fontFamily: "Poppins-Light",
        fontSize: 11.5
    },
    container_btn: {
        backgroundColor: "#ff9400",
        width: 110,
        borderRadius: 5,
        alignSelf: "center",
        marginTop: 10,
        marginBottom: 0
    },
    container_btn2: {
        backgroundColor: "transparent",
        width: 140,
        borderRadius: 5,
        alignSelf: "center",
        marginTop: 10,
        marginBottom: 0,
        marginRight: 15,
        borderWidth: 1,
        borderColor: "#ff9100"
    },
    footerBtns: {
        flexDirection: "row",
        justifyContent: "flex-end"
    }
})

function padWithZeroes(number, length) {

    var my_string = '' + number;
    while (my_string.length < length) {
        my_string = '0' + my_string;
    }

    return my_string;

}