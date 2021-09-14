import React from 'react'
import { StyleSheet, Text, View, Image, TouchableHighlight, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../styles/colors';
import Cont_card_color from '../../utils/components/cont_card_color';
import Row_simple from '../../utils/components/row_simple';
import Colum_simple from '../../utils/components/colum_simple';
import Cont_degrade2 from '../../utils/components/cont_degrade2';
// import { Cont_card_color} from '../../utils/components/global/containers/cont_card_color';



const DiscountsCard = () => {
    const User = useSelector(reducers => reducers.loginReducer).User;
    const navigation = useNavigation()
    const photoDefaut = 'https://i.stack.imgur.com/34AD2.jpg'
    return (
        <TouchableHighlight underlayColor="#fff" onPress={() => navigation.navigate('SideDiscount')}>
            <Cont_degrade2 col1={'#f6382a'} col2={'#efba2e'} flex={1} elev={3} w={'90%'} brad={18} pad={15} marg={15} >
                <Row_simple jus_cont={'space-around'} flex={1}>
                    <Colum_simple marg={6} alitems={'flex-start'} flex={0.6} >
                        <Text style={styles.titular_h1} >Descubre los</Text>
                        <Text style={styles.titular_h1} >mejores descuentos</Text>
                        <Text style={styles.titular_h2} >Aprovecha oportunidades únicas en Keola</Text>
                        <Cont_card_color bc={'#ff9400'} pad={6} ph={12} elev={3} brad={8}>
                            <Text style={styles.titular}  >Ingresa Aquí</Text>
                        </Cont_card_color>
                    </Colum_simple>
                    <Colum_simple marg={0} alitems={'center'} flex={0.4}>
                        <Image source={require('../../../assets/icons-14.png')} style={styles.ico_super} />

                    </Colum_simple>
                </Row_simple>
            </Cont_degrade2>
        </TouchableHighlight>
    )
}

export default DiscountsCard

const styles = StyleSheet.create({
    perfil: {
        width: "100%",
        height: 'auto',
        // backgroundColor: Colors.color_gray_bg,
        borderTopRightRadius: 20,
        paddingTop: 28,
        paddingLeft: 20,
        flexDirection: "row"
    },
    titular: {
        fontSize: 15,

        color: 'white',
        fontFamily: "Metropolis-Regular"
    },
    titular_h2: {
        fontSize: 15,

        color: 'white',
        fontFamily: "Metropolis-Regular"
    },
    titular_h1: {
        fontSize: 19,
        color: 'white',


        fontFamily: "Metropolis-Bold",
    },
    ico_super: {
        height: 100,
        width: 105,
        marginTop: 10
    },
    icon: {
        color: "black"
    },

})
