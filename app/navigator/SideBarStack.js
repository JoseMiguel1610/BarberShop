import React, { useEffect, useRef, useState } from 'react';
import { createDrawerNavigator, useIsDrawerOpen } from '@react-navigation/drawer';
import { DrawerContent } from '../navigator/DrawerContent'
import { Image, View, Text, Pressable, useWindowDimensions } from 'react-native';
import {
    NavigationContainer,
    DefaultTheme as NavigationDefaultTheme,
    DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import HomeStack from './SideBar/homeStack';
import LogOut from '../screens/sidebar/home/logout';
import EditProfile from '../screens/sidebar/editProfile';
import {
    Provider as PaperProvider,
    DefaultTheme as PaperDefaultTheme,
    DarkTheme as PaperDarkTheme
} from 'react-native-paper';
import { AuthContext } from './DrawerContent/context';
import Out_of_service from '../utils/modals/Out_of_service';
import { Config } from '../configuration/config';
import axios from 'axios';
import { actionByError } from '../utils/actionServerResponse';

const Drawer = createDrawerNavigator();

export default function SideBarStack(props) {


    const dispatch = useDispatch();
    const navigation = useNavigation()
    const dimensions = useWindowDimensions();
    const isLargeScreen = dimensions.width >= 768;
    const [isDarkTheme, setIsDarkTheme] = React.useState(false);
    const { Token, User } = useSelector((reducers) => reducers.loginReducer);
    const [idcita, setidcita ] = useState(null)
    const [ sexo, setsexo] = useState(null)
    const [name , setname ] = useState(null)
    const url_data = Config.URL_SERVER + "/Citas/usuario"
    const CustomDefaultTheme = {
        ...NavigationDefaultTheme,
        ...PaperDefaultTheme,
        colors: {
            ...NavigationDefaultTheme.colors,
            ...PaperDefaultTheme.colors,
            background: '#ffffff',
            text: '#333333'
        }
    }

    const CustomDarkTheme = {
        ...NavigationDarkTheme,
        ...PaperDarkTheme,
        colors: {
            ...NavigationDarkTheme.colors,
            ...PaperDarkTheme.colors,
            background: '#333333',
            text: '#ffffff'
        }
    }
    const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;
    const authContext = React.useMemo(() => ({
        toggleTheme: () => {
            setIsDarkTheme(isDarkTheme => !isDarkTheme);
        }
    }), []);

    useEffect(() => {
        async function getCitasUsuario() {
            try {
                const res = await axios.get(url_data + "/" + User.dni, { headers: { "authorization": `Bearer ${Token}` } });
                const userData = res.data.objModel
                console.log("CitasUsuario:", userData);
                if(userData.length > 0){
                    let ultimo = null;
                    userData.map((a, i) => {

                        if(a.estado == 2){
                            console.log("entre: ", i);
                            setvis_out_of_serv(true)
                            ultimo = userData[i];
                            
                        }
                    })
                    setidcita(ultimo.iD_CITA)
                    setsexo(ultimo.iD_SEXO)
                    setname(ultimo.nombrE_ESTILISTA)
                    
                }
            }
            catch (error) {
            }
        }
        getCitasUsuario()
    },)

    function titleHome() {
        return (
            <View style={{ justifyContent: "center" }}>
                <Image source={require("../../assets/fondo.jpg")} style={{ height: 33, width: 80 }} />
            </View>
        )
    }

    const [vis_out_of_serv, setvis_out_of_serv] = useState(false);
    const toggleOut_of_serv = () => {
        // setModalLoadingOrder(bol_loaderst => !bol_loaderst);
    };

    return (
        <>
        <Out_of_service name={name} sexo={sexo} idcita={idcita} isModalVisible={vis_out_of_serv} toggleModal={toggleOut_of_serv} setvis_out_of_serv={setvis_out_of_serv} />
            <PaperProvider theme={theme}>
                <AuthContext.Provider value={authContext}>
                    <NavigationContainer theme={theme} independent={true}>
                        <Drawer.Navigator drawerContent={props => <DrawerContent {...props}></DrawerContent>}
                            screenOptions={{
                                headerStyle: {
                                    // backgroundColor: "#f4f6f8",
                                    backgroundColor: 'red',
                                },
                                headerTitleStyle: {
                                    fontWeight: "bold",
                                    color: "#d6692a",
                                    fontSize: 24
                                },
                                headerTitleAlign: "left",
                                headerTintColor: "#ee710c",
                                drawerStyle: {
                                    width: Dimensions.get("window").width * 0.80,
                                    margin: 0,
                                    marginTop: 20,
                                    borderTopRightRadius: 20,
                                    flex: 1
                                }
                                //headerLeft: () => titleHome2()
                            }}
                            drawerPosition="left"
                            drawerType="front"


                        >
                            <Drawer.Screen name='SideHome' component={HomeStack}
                                options={{
                                    title: titleHome(),
                                    headerShown: false
                                }}
                            />
                            
                            <Drawer.Screen name='SideLogout' options={{ title: 'Cerrar sesión', headerShown: false }} component={LogOut} />

                        </Drawer.Navigator>

                    </NavigationContainer>
                </AuthContext.Provider>
            </PaperProvider>
        </>
    );
}