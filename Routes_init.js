import React, { lazy, Suspense, useEffect } from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import Loading from './app/screens/loading';
import LoginStack from './app/navigator/loginStack'
import HomeStack from './app/navigator/SideBar/homeStack';
import { getListFertilizantes, getListRegisters, getListRiesgo, getListTipFertilizantes, getListTipRiesgo, getUserData } from './app/utils/AsyncStore';
import { AddRegistersFertilizantes, AddRegistersRiesgo, AddRegistersTipFertilizantes, AddRegistersTipRiesgo, SaveListFertilizantes, SaveListRegisters, SaveListRiesgo, SaveListTipFertilizantes, SaveListTipRiesgo } from './app/actions/ProductionActions';
import { SaveLogin, SaveUser } from './app/actions/loginActions';

const Stack = createStackNavigator();
const Routes_init = () => {

    /*****/
    const theme = useTheme();
    const dispatch = useDispatch();
    const LoginState = useSelector(reducers => reducers.loginReducer).Login;
    console.log('que hay:', LoginState);
    useEffect(() => {
        async function getList() {
            const list = await getListRegisters()
            const list2 = await getListRiesgo()
            const list3 = await getListFertilizantes()
            const list4 = await getListTipRiesgo()
            const list5 = await getListTipFertilizantes()
            const user = await getUserData()
            console.log("lista de registros:", list)
            console.log("lista de registros2:", list2)
            console.log("lista de registros3:", list3)
            console.log("lista de registros4:", list4)
            console.log("lista de registros5:", list5)
            console.log("usuario?:", user)
            if (list) dispatch(SaveListRegisters(list))
            if (list2) dispatch(SaveListRiesgo(list2))
            if (list3) dispatch(SaveListFertilizantes(list3))
            if (list4) dispatch(SaveListTipRiesgo(list4))
            if (list5) dispatch(SaveListTipFertilizantes(list5))
            if (user) {
                dispatch(SaveUser(user))
                dispatch(SaveLogin(true))

            } else {
                dispatch(SaveLogin(null))
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
                    {LoginState == null &&
                        <Stack.Screen name='validation_jwt' component={LoginStack} options={{ headerShown: false }} ></Stack.Screen>}
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
