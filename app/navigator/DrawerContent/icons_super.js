import React from 'react'
import { StyleSheet, Text, View, Image, TouchableHighlight, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {Colors} from '../../styles/colors';
import Cont_card_color from '../../utils/components/cont_card_color';
import Row_simple from '../../utils/components/row_simple';
import Colum_simple from '../../utils/components/colum_simple';
// import { Cont_card_color} from '../../utils/components/global/containers/cont_card_color';



const Icons_super = () => {
    const User = useSelector(reducers => reducers.loginReducer).User;
    const navigation = useNavigation()
    const photoDefaut = 'https://i.stack.imgur.com/34AD2.jpg'
    return (
    <Cont_card_color bc={Colors.color_gray_bg_clear} flex={1}  w={'90%'} brad={10} elev={3} pad={15} marg={15}> 
       
        
            <Row_simple jus_cont={'center'}>
            
            <TouchableHighlight   underlayColor="#fff"  onPress={() => navigation.navigate("SideEditProfile")}>   
                <Colum_simple w={80} marg={6}  alitems={'center'}>
                    <Image  source={require('../../../assets/icons_sidebar_1.png')} style={styles.ico_super} />
                    <Text style={styles.txt_brekeable} > Mi Perfil</Text>
                </Colum_simple> 
               </TouchableHighlight>
                <Colum_simple w={80} marg={6}  alitems={'center'}>
                    <Image  source={require('../../../assets/icons_sidebar_2.png')} style={styles.ico_super} />
                    <Text style={styles.txt_brekeable} > Historial de  Pedidos</Text>
                </Colum_simple> 
                <TouchableHighlight   underlayColor="#fff"  onPress={() => navigation.navigate("SideMyBusiness")}>
                <Colum_simple w={80} marg={6}     alitems={'center'}>
                    <Image  source={require('../../../assets/icons_sidebar_3.png')} style={styles.ico_super} />
                    <Text style={styles.txt_brekeable} > Mi Negocio</Text>
                </Colum_simple> 
                </TouchableHighlight>
            
                
            </Row_simple>
            
            {/* <Row_simple jus_cont={'center'}>
                <TouchableHighlight   underlayColor="#fff"  onPress={() => navigation.navigate("SideWallet")}>           
       
                <Colum_simple w={80} marg={6}  alitems={'center'}>
                    <Image  source={require('../../../assets/icons_sidebar_4.png')} style={styles.ico_super} />
                    <Text style={styles.txt_brekeable} > Monedero Keola</Text>
                </Colum_simple> 
                </TouchableHighlight>
                <TouchableHighlight   underlayColor="#fff"  onPress={() => navigation.navigate("SidePoints")}>
                <Colum_simple w={80} marg={6}  alitems={'center'}>
                    <Image  source={require('../../../assets/icons_sidebar_5.png')} style={styles.ico_super} />
                    <Text style={styles.txt_brekeable} > Puntos {"\n"}Keola</Text>
                </Colum_simple> 
                </TouchableHighlight>
                <Colum_simple w={80} marg={6}     alitems={'center'}>
                    <Image  source={require('../../../assets/icons_sidebar_6.png')} style={styles.ico_super} />
                    <Text style={styles.txt_brekeable} > Soporte{"\n"}Keola</Text>
                </Colum_simple> 
            </Row_simple> */}
        </Cont_card_color>
    )
}

export default Icons_super

const styles = StyleSheet.create({
    perfil: {
        width: "100%",
        height: 'auto',
        // backgroundColor: Colors.color_gray_bg,
        borderTopRightRadius:20,        
        paddingTop: 28,
        paddingLeft: 20,
        flexDirection: "row"
    },
    
    txt_brekeable:{
        fontSize:9,
        textAlign:'center', 
        color:Colors.textColor,
        fontFamily: "Metropolis-Regular"
    },
    ico_super:{
    height:60,
    width:60,   
    }, 
    icon: {
        color: "black"
    },
   
})
