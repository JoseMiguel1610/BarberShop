import React, { lazy, Suspense, useEffect } from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import Loading from './app/screens/loading';
import LoginStack from './app/navigator/loginStack'
import HomeStack from './app/navigator/SideBar/homeStack';
import { getJWT, getListFertilizantes, getListRegisters, getListRiesgo, getListTipFertilizantes, getListTipRiesgo, getUserData } from './app/utils/AsyncStore';
import { AddRegistersFertilizantes, AddRegistersRiesgo, AddRegistersTipFertilizantes, AddRegistersTipRiesgo, SaveListFertilizantes, SaveListRegisters, SaveListRiesgo, SaveListTipFertilizantes, SaveListTipRiesgo } from './app/actions/ProductionActions';
import { SaveLogin, SaveToken, SaveUser } from './app/actions/loginActions';

const Stack = createStackNavigator();
const Routes_init = () => {

    /*****/
    const theme = useTheme();
    const dispatch = useDispatch();
    const LoginState = useSelector(reducers => reducers.loginReducer).Login;
    console.log('que hay:', LoginState);
    useEffect(() => {
        async function getList() {
            const jwt = await getJWT()
            console.log("JWT", jwt);
            const user = await getUserData()
            console.log("usuario?:", user)
            if (jwt) {
                console.log("Entra?");
                dispatch(SaveToken(jwt))
                dispatch(SaveUser(user))
                /* const stores = await getStoresByUserAdmin() //esta parte lo hago en navigator/SideBarStack.jsx
                console.log("stores:", stores) 
                dispatch(rechargeStoreInfo(stores))*/
                dispatch(SaveLogin(true))

            } else {
                dispatch(SaveLogin(false))
                dispatch(SaveUser(null))
            }
        }
        getList();
    }, [])

    return (
        <>
            <StatusBar barStyle= { theme.dark ? "light-content" : "dark-content" } backgroundColor={"#b99a55"}/>
            <NavigationContainer >
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                {LoginState === null &&
                        <Stack.Screen name='validation_jwt' component={Loading} options={{ headerShown: false }} ></Stack.Screen>}
                    {LoginState == false &&
                        <Stack.Screen name='ValidationStack' component={LoginStack} options={{ headerShown: false }} ></Stack.Screen>}
                    {LoginState &&
                        <Stack.Screen name='Sidebar' component={SideBarStack} options={{ headerShown: false }} />}

                </Stack.Navigator>
            </NavigationContainer>
        </>
    )
}

const SideBarStackLazy = lazy(() => import("./app/navigator/SideBarStack"), 'default');
const SideBarStack = (props) => (
    <Suspense fallback={<Loading view />}>
        <SideBarStackLazy {...props} />
    </Suspense>
)


/* const LoadingSuspense = () => (
    <View style={styles.container}>
        <Text style={styles.text}>
            CARGANDO...
        </Text>
    </View>
)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#df7639"
    },
    text: {
        fontSize: 23,
        fontWeight: "bold",
        color: "white"
    }
}) */

export default Routes_init
