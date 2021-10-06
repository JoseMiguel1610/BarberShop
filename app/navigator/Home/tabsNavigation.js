import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from "react-native"
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconEnt from 'react-native-vector-icons/Entypo';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFont5 from 'react-native-vector-icons/FontAwesome5';
import IconFont from 'react-native-vector-icons/FontAwesome';
import IconFeat from 'react-native-vector-icons/Feather';
import Oticons from 'react-native-vector-icons/Octicons';
// import Icon from 'react-native-icons/FontAwesome';

import EditProfile from '../../screens/sidebar/editProfile/index';

import { Colors } from '../../styles/colors';
import Home from '../../screens/sidebar/home/Home';
import { Pressable } from 'react-native';
import { Image } from 'react-native';
import Row_simple from '../../utils/components/row_simple';
import { useSelector } from 'react-redux';
import { Dimensions } from 'react-native';
import EditUser from '../../screens/sidebar/business/editUser';
import axios from 'axios';
import { actionByError } from '../../utils/actionServerResponse';
import { Config } from '../../configuration/config';


// const Tab = createBottomTabNavigator();
const Tab = createMaterialTopTabNavigator();

export default function TabsNavigation({ navigation }) {
    const wh_icon_bottom = 43;
    const style_icon_tab = {
        width: wh_icon_bottom,
        height: wh_icon_bottom,
        marginLeft: -10,
        // backgroundColor:'red',
        marginTop: -10,

    };
    const url_data = Config.URL_SERVER + "/Usuarios"
    const [rol, setRol] = useState()
    const { Token, User } = useSelector((reducers) => reducers.loginReducer);

    useEffect(() => {
        async function getUser() {
            try {
                const res = await axios.get(url_data + "/" + User.dni, { headers: { "authorization": `Bearer ${Token}` } });
                const userData = res.data.objModel[0]
                if (res.data.objModel.length > 0) {
                    setRol(userData.iD_ROL)
                }
            }
            catch (error) {
                actionByError(error, navigation)
            }
        }
        getUser()
    },[])


    return (
        <>
            <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 10 }}>
                <Row_simple jus_cont={'space-between'} w={'100%'}>
                    <Row_simple>
                    <Pressable onPress={() => navigation.openDrawer()}
                        style={{ marginLeft: 15, marginRight: 5 }}>
                        <Ionicons name='ios-menu' color="#b99a55" size={34} ></Ionicons>
                        </Pressable>
                    </Row_simple>
                </Row_simple>

            </View>
            <Tab.Navigator tabBarPosition="bottom" swipeVelocityImpact={0.1}
                screenOptions={
                    ({ route }) => ({
                    tabBarActiveTintColor: Colors.colorSecondaryVariant,
                    tabBarInactiveTintColor: Colors.colorSecondary,
                    tabBarShowIcon: true,
                    tabBarStyle: {
                        paddingTop: 3,
                        paddingBottom: 6,
                    },
                    tabBarPressColor: "white",
                    tabBarShowLabel: false,
                    tabBarIndicatorStyle: {
                        height: 3,
                        // marginLeft:((Dimensions.get('window').width)/4)-65,
                        width: rol == 1 || rol == 3 ? ((Dimensions.get('window').width) / 2.5) : Dimensions.get('window').width,
                        marginLeft: rol == 1 || rol == 3 ? 20 : 0,
                        top: 0,
                    },
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        if (route.name == 'shop_home') {
                            if (focused) {
                                return <Ionicons name='ios-home' size={25} color={"#b99a55"}></Ionicons>
                            } else {
                                return <Ionicons name='ios-home' size={25} color={"#888780"}></Ionicons>
                            }

                        }
                        if (route.name == 'shop_home5') {


                            if (focused) {

                                return <Oticons name='checklist' size={25} color={"#b99a55"}></Oticons>

                            } else {

                                return <Oticons name='checklist' size={25} color={"#888780"}></Oticons>

                            }


                            //return <IconFont5 name='coins' size={25} color={"#888780"}></IconFont5>
                        }
                        if (route.name == 'shop_home6') {

                            if (focused) {

                                return <IconFont name='user' size={25} color={"#b99a55"}></IconFont>

                            } else {

                                return <IconFont name='user' size={25} color={"#888780"}></IconFont>

                            }

                            //return <IconFont name='university' size={25} color={"#888780"}></IconFont>
                        }
                        if (route.name == 'shop_home7') {
                            return <IconEnt name='dots-three-horizontal' size={25} color={"#888780"}></IconEnt>
                        }
                        // return <Ionicons name={iconName} size={25} color={"white"}></Ionicons>
                        // return <Icon name='home'></Icon>
                        // return <Icon source={iconName} size={25}></Icon>
                    }
                })}
                initialRouteName="shop_home3"
            >
                {/* <Tab.Screen name='shop_home' component={Home}
                    options={{ title: "" , tabBarButton: CustomTabButton, }}                  
                                    
                    ></Tab.Screen>
                <Tab.Screen name='shop_home2' component={Home}
                    options={{ title: "" }}></Tab.Screen> */}
                {/* <Tab.Screen name='shop_home4' component={WalletHome} */}
                <Tab.Screen name='shop_home' component={Home}

                    options={{ title: "" }}></Tab.Screen>
                    {rol == 1 || rol == 3 ?
                <Tab.Screen name='shop_home6' component={EditUser}
                    options={{ title: "" }}></Tab.Screen>
                    : 
                    null }
                {/* <Tab.Screen name='shop_home7' component={Home}
                    options={{ title: "" }}></Tab.Screen> */}
            </Tab.Navigator>
        </>
    );
}
const styles = StyleSheet.create({
    ico_tabnav: {
        height: 24,
        width: 25,
        marginRight: 15,
        marginTop: 11
    },
    ico_tabnav_1: {
        height: 23,
        width: 21,
        marginRight: 15
    },
    ico_tabnav5: {
        height: 40,
        width: 40,
        marginRight: 15,
        marginTop: 0
    }
})
